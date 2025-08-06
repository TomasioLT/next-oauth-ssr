import {NextRequest, NextResponse} from "next/server";
import {COOKIES_NAME} from "@/lib/utils";

export async function GET(req: NextRequest) {
  console.log("=== COOKIE READER ===");

  // Get all cookies from the request
  const allCookies = req.cookies.getAll();
  console.log("All cookies:", allCookies);

  // Get specific cookie
  const sessionCookie = req.cookies.get(COOKIES_NAME);
  console.log("Session cookie:", sessionCookie);

  // Get test cookies
  const testCookies = allCookies.filter(
    (cookie) =>
      cookie.name.includes(COOKIES_NAME) || cookie.name.includes("test")
  );

  return NextResponse.json({
    message: "Cookie reader",
    allCookies: allCookies.length,
    sessionCookie: sessionCookie?.value || "Not found",
    testCookies: testCookies,
    cookieName: COOKIES_NAME,
  });
}
