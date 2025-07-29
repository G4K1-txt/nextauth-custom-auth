"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Redirecionar } from "@/lib/redirect";
import zxcvbn from "zxcvbn";

export function AtualizarSenhaForm() {
  const router = useRouter();
  const token = Redirecionar();
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erroSenha, setErroSenha] = useState("");
  const [forcaSenha, setForcaSenha] = useState(0);

  const strengthClass =
    [
      "bg-red-500",
      "bg-orange-500",
      "bg-yellow-500",
      "bg-green-500",
      "bg-green-700",
    ][forcaSenha] || "bg-gray-300";

  const mensagensForca = ["Muito fraca", "Fraca", "Ok", "Boa", "Forte"];

  const handleNovaSenhaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const senha = e.target.value;
    setNovaSenha(senha);

    const result = zxcvbn(senha);
    setForcaSenha(result.score);

    if (confirmarSenha && senha !== confirmarSenha) {
      setErroSenha("Senhas não coincidem!");
    } else {
      setErroSenha("");
    }
  };

  const handleConfirmaSenhaChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const confirm = e.target.value;
    setConfirmarSenha(confirm);

    if (novaSenha && confirm && novaSenha !== confirm) {
      setErroSenha("Senhas não coincidem!");
    } else {
      setErroSenha("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (novaSenha !== confirmarSenha) {
      setErroSenha("Senhas não coincidem!");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/atualiza-senha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, novaSenha }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Erro ao atualizar a senha.");
        return;
      }

      toast.success("Senha atualizada com sucesso!");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (err) {
      toast.error("Erro inesperado: " + err);
    } finally {
      setLoading(false);
    }
  };

  if (!token) return null;

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Atualizar Senha</CardTitle>
          <CardDescription>Escolha sua nova senha abaixo.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <Input
                type="password"
                placeholder="Nova senha"
                value={novaSenha}
                onChange={handleNovaSenhaChange}
                required
              />
              <Input
                type="password"
                placeholder="Confirmar nova senha"
                value={confirmarSenha}
                onChange={handleConfirmaSenhaChange}
                required
              />
              {erroSenha && (
                <p className="text-sm text-red-600 mb-2">{erroSenha}</p>
              )}
              <div className="h-2 w-full bg-gray-300 rounded overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${strengthClass}`}
                  style={{ width: `${(forcaSenha + 1) * 20}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">
                Força da senha: {mensagensForca[forcaSenha]}
              </p>
              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={loading}
              >
                {loading ? "Atualizando..." : "Atualizar Senha"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
