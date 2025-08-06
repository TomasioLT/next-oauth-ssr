// src/app/oauth/route.js

import {exchangeCodeForToken} from "@/lib/oauth/microsoft";
import {COOKIES_NAME} from "@/lib/utils";
import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  if (!code) return new Response("Missing code", {status: 400});

  const tokenData = await exchangeCodeForToken(code);
  const {access_token, refresh_token, expires_in} = tokenData;
  console.log("Token exchange successful:", {
    hasAccessToken: !!access_token,
    hasRefreshToken: !!refresh_token,
    expiresIn: expires_in,
  });

  // Fetch Microsoft user profile
  const userInfo = await fetch("https://graph.microsoft.com/v1.0/me", {
    headers: {Authorization: `Bearer ${access_token}`},
  }).then((res) => res.json());
  console.log("UserPrincipal:", userInfo.userPrincipalName);

  const cookieStore = await cookies();
  cookieStore.set(COOKIES_NAME, access_token, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: false,
  });

  return NextResponse.redirect(`${request.nextUrl.origin}/`);
}
