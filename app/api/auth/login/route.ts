import {getAuthorizationUrl} from "@/lib/oauth/microsoft";
import {NextResponse} from "next/server";

export async function GET() {
  const state = crypto.randomUUID(); // Store in DB or cookie if needed
  const url = getAuthorizationUrl(state);
  return NextResponse.redirect(url);
}
