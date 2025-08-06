import {NextResponse} from "next/server";
import {COOKIES_NAME} from "@/lib/utils";

export async function GET(req: Request) {
  console.log("=== SIMPLE CALLBACK TEST ===");

  const {searchParams} = new URL(req.url);
  const code = searchParams.get("code");

  console.log("Code received:", !!code);

  // Create HTML response with simple cookie
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Simple Cookie Test</title>
      </head>
      <body>
        <h2>Simple Cookie Test</h2>
        <p>Setting a simple cookie and redirecting...</p>
        <script>
          setTimeout(() => {
            window.location.href = "${
              process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000"
            }";
          }, 2000);
        </script>
      </body>
    </html>
  `;

  const response = new Response(htmlContent, {
    status: 200,
    headers: {
      "Content-Type": "text/html",
    },
  });

  // Set a very simple cookie
  response.headers.set(
    "Set-Cookie",
    `${COOKIES_NAME}_simple=simple_test_value; Path=/; Max-Age=3600; SameSite=Lax`
  );

  console.log("Simple cookie set:", response.headers.get("Set-Cookie"));

  return response;
}
