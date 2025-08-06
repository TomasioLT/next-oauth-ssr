import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import {COOKIES_NAME} from "./lib/utils";

export async function middleware(req: NextRequest) {
  const isAuth = req.cookies.get(COOKIES_NAME);
  // const isAuth = true;
  const isAuthPage = req.nextUrl.pathname.startsWith("/login");
  if (!isAuth && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (isAuth && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico).*)"],
};
