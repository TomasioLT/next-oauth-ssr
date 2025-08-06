import {exchangeCodeForToken} from "@/lib/oauth/microsoft";
import {encrypt} from "@/lib/oauth/token";
import {COOKIES_NAME} from "@/lib/utils";
import {cookies, headers} from "next/headers";
import {NextResponse} from "next/server";

export async function GET(req: Request) {
  try {
    const {searchParams} = new URL(req.url);
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    console.log("OAuth callback received:", {code: !!code, state});

    if (!code) return new Response("Missing code", {status: 400});

    const tokenData = await exchangeCodeForToken(code);
    const {access_token, refresh_token, expires_in} = tokenData;

    console.log("Token exchange successful:", {
      hasAccessToken: !!access_token,
      hasRefreshToken: !!refresh_token,
      expiresIn: expires_in,
    });

    // 1. Fetch Microsoft user profile
    const userInfo = await fetch("https://graph.microsoft.com/v1.0/me", {
      headers: {Authorization: `Bearer ${access_token}`},
    }).then((res) => res.json());

    console.log("UserPrinciple:", userInfo.userPrincipalName);
    const now = new Date();

    // 3. Get request headers for logging
    const resolvedHeaders = await headers();
    const ip = resolvedHeaders.get("x-forwarded-for") || "unknown";
    const userAgent = resolvedHeaders.get("user-agent") || "unknown";

    const accessTokenExpiration = new Date(
      now.getTime() + 60 * 60 * 1000
    ).toISOString(); // 1 hour
    const refreshTokenExpiration = new Date(
      now.getTime() + 30 * 24 * 60 * 60 * 1000
    ).toISOString(); // 30 days

    // 4. Set secure cookie with sessionId and redirect to dashboard
    const redirectUrl =
      process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";
    const response = NextResponse.redirect(redirectUrl);

    console.log("RESPONSE URL: ", redirectUrl);

    // Encrypt and set the access token cookie
    const encryptedToken = encrypt(access_token);
    console.log("Setting cookie with name:", COOKIES_NAME);
    console.log("Encrypted token length:", encryptedToken.length);

    response.cookies.set(COOKIES_NAME, encryptedToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    const cookieStore = await cookies();
    cookieStore.set(COOKIES_NAME, encryptedToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    console.log(
      "RESPONSE WITH COOKIES - Headers:",
      response.headers.getSetCookie()
    );

    // 5. Clear any OAuth state cookies
    response.cookies.set("oauth_state", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 0,
      sameSite: "lax",
      path: "/",
    });

    console.log("All cookies set, returning redirect response");
    console.log("Final set-cookie headers:", response.headers.getSetCookie());

    return response;
  } catch (error) {
    console.error("OAuth callback error:", error);
    return new Response("Authentication failed", {status: 500});
  }
}
