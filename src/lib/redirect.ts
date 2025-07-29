// lib/useTokenRedirect.ts
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export function Redirecionar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    }
  }, [token, router]);
  return token;

}
