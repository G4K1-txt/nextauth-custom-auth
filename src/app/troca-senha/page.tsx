"use client";

import { AtualizarSenhaForm } from "@/components/_forms/senha_atualizar_form";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm space-y-4">
        <AtualizarSenhaForm />
      </div>
    </div>
  );
}
