"use client";
import {LoginForm} from "@/components/login-form";
import {Button} from "@/components/ui/button";

export default function LoginPage() {
  const handleCookies = async () => {
    const resp = await fetch("/api/auth/cookies");
    const data = await resp.json();
    console.log("Cookie test response:", data);
    alert(
      `Cookie test: ${data.message}. Existing cookie: ${data.existingCookie}`
    );
  };
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>

      <Button onClick={handleCookies}>Btn</Button>
    </div>
  );
}
