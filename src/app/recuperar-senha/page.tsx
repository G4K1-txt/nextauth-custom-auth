"use client";

import { RecuperarSenhaForm } from "@/components/_forms/senha_recuperar_form";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm space-y-4">
        <RecuperarSenhaForm />
      </div>
    </div>
  );
}
