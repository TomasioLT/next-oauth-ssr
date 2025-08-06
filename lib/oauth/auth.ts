// lib/auth.ts
import {cookies} from "next/headers";
import {COOKIES_NAME} from "../utils";

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIES_NAME);
  return session?.value || null;
}
