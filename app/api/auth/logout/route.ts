// backend/src/app/api/auth/logout/route.ts
import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import {decrypt} from "@/lib/oauth/token";
export async function POST(req: NextRequest) {
  const sessionCookie = req.cookies.get("adaptacija_session")?.value;

  if (!sessionCookie) {
    return NextResponse.json({error: "No session cookie"}, {status: 401});
  }

  const response = NextResponse.json({success: true});

  // ✅ Add CORS headers
  response.headers.set(
    "Access-Control-Allow-Origin",
    process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000"
  );
  response.headers.set("Access-Control-Allow-Credentials", "true");

  // ✅ Clear cookie
  response.cookies.set("adaptacija_session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
    maxAge: 0,
  });

  return response;
}

// Optional: Handle preflight request
export async function OPTIONS() {
  const response = new NextResponse(null, {status: 204});

  response.headers.set(
    "Access-Control-Allow-Origin",
    process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000"
  );
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  response.headers.set("Access-Control-Allow-Credentials", "true");

  return response;
}
