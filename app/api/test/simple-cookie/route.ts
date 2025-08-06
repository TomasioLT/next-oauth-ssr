import {COOKIES_NAME} from "@/lib/utils";
import {NextResponse} from "next/server";

export async function GET() {
  console.log("=== SIMPLE COOKIE TEST ===");

  // Test 1: Set a simple unencrypted cookie
  const response = NextResponse.json({message: "Simple cookie test"});

  const simpleCookie = "simple_test_value_" + Date.now();

  response.cookies.set(COOKIES_NAME + "_simple", simpleCookie, {
    httpOnly: true,
    secure: false, // Force to false for development testing
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60, // 1 hour
  });

  console.log(
    "Simple cookie set:",
    COOKIES_NAME + "_simple",
    "=",
    simpleCookie
  );
  console.log("Response headers:", response.headers.getSetCookie());

  return response;
}
