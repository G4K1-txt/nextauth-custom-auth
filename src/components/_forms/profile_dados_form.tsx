"use client";

import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import { formatCpf, formatContato } from "@/lib/mascaras";
import { fetchCepData } from "@/lib/buscaCep";
import { DadosPerfilFormProps, DadosPerfilFormHandle } from "@/types/forms";
import { toast } from "sonner"


export const DadosPerfilForm = forwardRef<
  DadosPerfilFormHandle,
  DadosPerfilFormProps
>(({ editando, onSaveSuccess, onSaveError }, ref) => {
  const { data: session } = useSession();
  const [dados, setDados] = useState({
    email: "",
    cpf: "",
    contato: "",
    cep: "",
    estado: "",
    cidade: "",
    endereco: "",
    numero: "",
  });

  useEffect(() => {
    if (!session?.user?.id) return;

    const carregarDados = async () => {
      try {
        const res = await fetch(`/api/user/${session.user.id}`);
        if (!res.ok) {
          throw new Error(`Erro ao carregar dados: ${res.statusText}`);
        }
        const json = await res.json();
        setDados(json);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário", error);
      }
    };

    carregarDados();
  }, [session, onSaveError]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDados({ ...dados, [e.target.id]: e.target.value });
  };

  //MASCARA CPF
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatCpf(e.target.value);
    setDados((prev) => ({ ...prev, cpf: value }));
  };

  //MASCARA CONTATO
  const handleContatoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatContato(e.target.value);
    setDados((prev) => ({ ...prev, contato: value }));
  };

  //BUSCA E MASCARA CEP
  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = await fetchCepData(e.target.value);
    setDados((prev) => ({
      ...prev,
      cep: result.formattedCep,
      estado: result.estado ?? prev.estado,
      cidade: result.cidade ?? prev.cidade,
      endereco: result.endereco ?? prev.endereco,
    }));
  };

  useImperativeHandle(ref, () => ({
    submitForm: async () => {
      if (!session?.user?.id) {
        return;
      }
      try {
        const res = await fetch(`/api/user/${session.user.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dados),
        });

        if (!res.ok) {
          const errorData = await res.text();
          throw new Error(
            `Erro ao salvar dados: ${errorData || res.statusText}`
          );
        }

        //const updatedUser = await res.json();
        toast.success('Usuario atualizado com sucesso!')
        onSaveSuccess?.();
      } catch (error) {
        toast.error("Erro ao salvar dados do usuário: " + error);
      } finally {
      }
    },
  }));

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-2 gap-6">
        <div className="gap-3">
          <Label htmlFor="email" className="ml-1">
            Email
          </Label>
          <Input
            className="mt-3"
            id="email"
            type="email"
            value={dados.email ?? ""}
            onChange={handleChange}
            disabled={!editando}
          />
        </div>
        <div className="gap-3">
          <Label htmlFor="cpf" className="ml-1">
            CPF
          </Label>
          <Input
            className="mt-3"
            id="cpf"
            type="text"
            value={dados.cpf ?? ""}
            onChange={handleCpfChange}
            disabled={!editando}
          />
        </div>
      </div>

      <Separator className="mt-5 mb-5" />

      <div className="grid grid-cols-2 gap-6">
        <div className="gap-3">
          <Label htmlFor="contato" className="ml-1">
            Contato
          </Label>
          <Input
            placeholder="(00) 00000-0000"
            className="mt-3"
            id="contato"
            type="text"
            value={dados.contato ?? ""}
            onChange={handleContatoChange}
            disabled={!editando}
          />
        </div>
        <div className="gap-3">
          <Label htmlFor="cep" className="ml-1">
            CEP
          </Label>
          <Input
            placeholder="00000-000"
            className="mt-3"
            id="cep"
            type="text"
            value={dados.cep ?? ""}
            onChange={handleCepChange}
            disabled={!editando}
          />
        </div>
      </div>

      <Separator className="mt-5 mb-5" />

      <div className="flex gap-3">
        <div className="gap-3 ">
          <Label htmlFor="estado" className="ml-1">
            UF
          </Label>
          <Input
            placeholder="UF"
            className="mt-3 w-12"
            id="estado"
            type="text"
            value={dados.estado ?? ""}
            onChange={handleChange}
            disabled={!editando}
          />
        </div>
        <div className="gap-3">
          <Label htmlFor="cidade" className="ml-1">
            Cidade
          </Label>
          <Input
            placeholder="Cidade"
            className="mt-3 w-60"
            id="cidade"
            type="text"
            value={dados.cidade ?? ""}
            onChange={handleChange}
            disabled={!editando}
          />
        </div>
        <div className="gap-3">
          <Label htmlFor="endereco" className="ml-1">
            Endereço
          </Label>
          <Input
            placeholder="Rua/Bairro"
            className="mt-3 w-60"
            id="endereco"
            type="text"
            value={dados.endereco ?? ""}
            onChange={handleChange}
            disabled={!editando}
          />
        </div>
        <div className="gap-3">
          <Label htmlFor="numero" className="ml-1">
            Número
          </Label>
          <Input
            placeholder="Nº"
            className="mt-3 w-21"
            id="numero"
            type="text"
            value={dados.numero ?? ""}
            onChange={handleChange}
            disabled={!editando}
          />
        </div>
      </div>
    </form>
  );
});
DadosPerfilForm.displayName = "DadosPerfilForm";
