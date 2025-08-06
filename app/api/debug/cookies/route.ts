import {NextRequest, NextResponse} from "next/server";
import {COOKIES_NAME} from "@/lib/utils";
import {encrypt} from "@/lib/oauth/token";

export async function GET(req: NextRequest) {
  console.log("=== COOKIE DEBUG ENDPOINT ===");

  // Test 1: Check existing cookies
  const existingCookie = req.cookies.get(COOKIES_NAME);
  console.log("Existing cookie:", existingCookie);

  // Test 2: Try NextResponse.json() approach (working)
  const jsonResponse = NextResponse.json({
    message: "JSON response test",
    existingCookie: existingCookie?.value || "No cookie found",
    cookieName: COOKIES_NAME,
  });

  const testToken = "test_token_" + Date.now();
  const encryptedTest = encrypt(testToken);

  jsonResponse.cookies.set(COOKIES_NAME + "_json", encryptedTest, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60, // 1 hour
  });

  console.log(
    "JSON Response Set-Cookie headers:",
    jsonResponse.headers.getSetCookie()
  );

  return jsonResponse;
}

export async function POST(req: NextRequest) {
  console.log("=== REDIRECT COOKIE TEST ===");

  // Test 3: Try NextResponse.redirect() approach (not working)
  const redirectResponse = NextResponse.redirect("http://localhost:3000/login");

  const testToken = "redirect_test_" + Date.now();
  const encryptedTest = encrypt(testToken);

  redirectResponse.cookies.set(COOKIES_NAME + "_redirect", encryptedTest, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60, // 1 hour
  });

  console.log(
    "Redirect Response Set-Cookie headers:",
    redirectResponse.headers.getSetCookie()
  );

  return redirectResponse;
}
