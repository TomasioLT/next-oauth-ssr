import {NextRequest, NextResponse} from "next/server";
import {COOKIES_NAME} from "@/lib/utils";

export async function GET(req: NextRequest) {
  // Test cookie reading
  const existingCookie = req.cookies.get(COOKIES_NAME);
  console.log("Existing cookie:", existingCookie);

  const response = NextResponse.json({
    message: "Cookie test endpoint",
    existingCookie: existingCookie?.value || "No cookie found",
    cookieName: COOKIES_NAME,
  });

  // Set a test cookie
  response.cookies.set(COOKIES_NAME + "_test", "test_value_" + Date.now(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60, // 1 hour
  });

  return response;
}
