"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Page({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        senha,
      });

      if (result?.ok) {
        router.push("/dashboard");
      } else {
        setError("E-mail ou senha inválidos.");
      }
    } catch {
      setError("Ocorreu um erro. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm  space-y-4">
        <div className={cn("flex flex-col items-center justify-center gap-6", className)}>
          <Card className="w-90 ">
            <CardHeader>
              <CardTitle>Faça Login na sua Conta</CardTitle>
              <CardDescription>
                Digite seu e-mail e senha abaixo para acessar sua conta.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  {/* Input Email */}
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                      aria-describedby="emailHelp"
                    />
                  </div>

                  {/* Input Senha */}
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Senha</Label>
                      <a
                        href="/recuperar-senha"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Esqueceu sua senha?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      required
                      autoComplete="current-password"
                    />
                  </div>

                  {/* Mensagem de erro */}
                  {error && (
                    <p className="text-red-500 text-sm" role="alert">
                      {error}
                    </p>
                  )}

                  {/* Botão de login */}
                  <div className="flex flex-col gap-3">
                    <Button
                      type="submit"
                      className="w-full cursor-pointer"
                      disabled={loading}
                      aria-busy={loading}
                    >
                      {loading ? "Entrando..." : "Login"}
                    </Button>
                  </div>
                </div>

                {/* Link para cadastro */}
                <div className="mt-4 text-center text-sm">
                  Não possui uma conta?{" "}
                  <a href="/cadastro" className="underline underline-offset-4">
                    Cadastre-se
                  </a>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
