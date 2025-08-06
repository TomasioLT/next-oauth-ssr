"use client";
import {Loader2} from "lucide-react";

import {COOKIES_NAME} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export function LoginForm({className, ...props}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleMicrosoftLogin = () => {
    setIsLoading(true);
    // window.location.href = `${
    //   process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000"
    // }/api/login`;
    window.location.href = `/api/auth/login`;
  };

  // // login/page.tsx or root layout/page
  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search);
  //   const token = params.get("token");
  //   if (token) {
  //     localStorage.setItem(COOKIES_NAME, token); // Or a secure cookie if you prefer
  //     router.push("/"); // redirect user after login
  //   }
  // }, [router]);

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 text-center">
        Use your Microsoft Azure AD account to sign in
      </p>
      <Button
        onClick={handleMicrosoftLogin}
        disabled={isLoading}
        className="w-full"
        size="lg">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          <>
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"
              />
            </svg>
            Sign in with Microsoft
          </>
        )}
      </Button>
    </div>
  );
}
