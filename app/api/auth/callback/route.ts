// api/auth/callback.ts
import {exchangeCodeForToken} from "@/lib/oauth/microsoft";
import {encrypt} from "@/lib/oauth/token";
import prisma from "@/lib/prisma";
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
  // Save or update user in DB
  // Upsert user (create or update)
  const user = await prisma.user.upsert({
    where: {email: userInfo.userPrincipalName},
    update: {
      name: userInfo.displayName,
      updatedAt: new Date(),
    },
    create: {
      name: userInfo.displayName,
      email: userInfo.userPrincipalName,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Create a new session for the user with tokens
  await prisma.session.create({
    data: {
      userId: user.id,
      accessToken: access_token,
      accessTokenExpiresAt: new Date(Date.now() + expires_in * 1000), // 1 hour expiry
      refreshToken: refresh_token,
      refreshTokenExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days expiry
    },
  });

  const cookieStore = await cookies();
  cookieStore.set(COOKIES_NAME, access_token, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: false,
  });

  return NextResponse.redirect(`${request.nextUrl.origin}/`);
}
