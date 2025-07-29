import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { signIn } from "next-auth/react"; // 

import zxcvbn from "zxcvbn";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
const [form, setForm] = useState({
  email: "",
  senha: "",
  nome: "",
  cpf: "",
});
const [senhaConfirma, setSenhaConfirma] = useState("");
const [strength, setStrength] = useState(0);
const [erroSenha, setErroSenha] = useState('');

//MASCARAMENTO CPF
const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  let value = e.target.value.replace(/\D/g, "").slice(0, 11);
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  setForm((prev) => ({ ...prev, cpf: value }));
};

//VERIFICAÇÃO SENHA PARA FORÇA DA SENHA
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedForm = { ...form, [e.target.name]: e.target.value };
    setForm(updatedForm);

    // Atualiza a força da senha enquanto digita
    if (e.target.name === "senha") {
      const result = zxcvbn(e.target.value);
      setStrength(result.score);
    }
  };

const strengthClass =
    [
      "bg-red-500",
      "bg-orange-500",
      "bg-yellow-500",
      "bg-green-500",
      "bg-green-700",
    ][strength] || "bg-gray-300";


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (form.senha !== senhaConfirma) {
    return alert("As senhas não coincidem!");
  }

  try {
    const res = await fetch("/api/cadastro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const error = await res.json();
      return alert(error.error || "Erro no cadastro");
    }

    alert("Usuário cadastrado com sucesso! Enviando link de verificação...");

    await signIn("email", {
      email: form.email,
      callbackUrl: "/",
    });

  } catch (error) {
    console.error("Erro no submit:", error);
    alert("Erro inesperado no envio do formulário.");
  }
};


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="justify-center flex">
            Crie sua Conta Moedin
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="nome">Nome Completo</Label>
                <Input
                  onChange={handleChange}
                  name="nome"
                  id="nome"
                  value={form.nome}
                  type="text"
                  placeholder="José da Silva"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  onChange={handleCpfChange}
                  name="cpf"
                  id="cpf"
                  value={form.cpf}
                  type="text"
                  placeholder="000.000.00-00"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={handleChange}
                  name="email"
                  id="email"
                  value={form.email}
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="senha">Senha</Label>
                </div>
                <Input
                  onChange={handleChange}
                  name="senha"
                  value={form.senha}
                  id="senha"
                  type="password"
                  required
                />
                <div className="flex items-center">
                  <Label htmlFor="senhaConfirma">Confirme sua Senha</Label>
                </div>
                <Input
                  onChange={(e) => {
                    const confirm = e.target.value;
                    setSenhaConfirma(confirm);
                    if (form.senha && confirm && form.senha !== confirm) {
                        setErroSenha ("Senhas não coincidem!");
                    }else{
                        setErroSenha("");
                    }
                }}
                  name="senhaConfirma"
                  id="senhaConfirma"
                  value={senhaConfirma}
                  type="password"
                  required
                />
                {erroSenha && <p className="text-sm text-red-600 mb-2">{erroSenha}</p>}
                <div className="h-2 w-full bg-gray-300 rounded overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${strengthClass}`}
                    style={{ width: `${(strength + 1) * 20}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">
                  Força da senha:{" "}
                  {["Muito fraca", "Fraca", "Ok", "Boa", "Forte"][strength]}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Button  onClick={handleSubmit} type="submit" className="w-full cursor-pointer">
                  Cadastrar
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Já possuí uma conta?{" "}
              <a href="/login" className="underline underline-offset-4">
                Logue-se
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
