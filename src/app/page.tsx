"use client";
import * as React from "react";
import { LoginForm } from "@/components/_forms/login_form";

export default function LoginPage() {
  return (
    <div>
      <div className="relative w-full">
        <div className="absolute right-4 top-4">

        </div>
      </div>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
