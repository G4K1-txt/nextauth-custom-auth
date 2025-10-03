"use client";

import * as React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BadgePlus } from "lucide-react";
import { formataCartao, formataDataCartao } from "@/lib/mascaras"; // <- função utilitária

export function DadosCartoesPerfilForm() {
  const [iniciarDialog, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const [dados, setDados] = useState({
    numeroCartao: "",
    cvv: "",
    dataValidade: "",
    nomeTitular: "",
  });

  // Handlers de input
  const handleNumeroCartaoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formataCartao(e.target.value);
    setDados((prev) => ({ ...prev, numeroCartao: value }));
  };

  const handleDataCartaoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formataDataCartao(e.target.value);
    setDados((prev) => ({ ...prev, dataValidade: value }));
  };

  const abreForm = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Cartão enviado:", dados.numeroCartao);
  };

  return (
    <div>
      <div className="flex items-center justify-between p-4">
        <h1 className="sm:text-2xl font-semibold">Cartões</h1>
        <Dialog open={iniciarDialog} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="cursor-pointer h-9 bg-sky-900 hover:bg-green-600 transition-colors duration-600 ease-in-out text-white font-bold">
              <BadgePlus />
              Adicionar
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[400px]">
            <form onSubmit={abreForm}>
              <DialogHeader>
                <DialogTitle className="mb-2 ml-1">Novo Cartão</DialogTitle>
                <DialogDescription className="mb-2 ml-1">
                  Preencha os campos abaixo, para adicionar um novo cartão.
                </DialogDescription>
              </DialogHeader>
              <div className="flex gap-3">
                <div className="grid gap-3 w-full">
                  <Label htmlFor="numeroCartao" className="ml-1 mt-4">
                    Número do Cartão
                  </Label>
                  <Input
                    id="numeroCartao"
                    className="w-40"
                    value={dados.numeroCartao}
                    onChange={handleNumeroCartaoChange}
                    placeholder="0000 0000 0000 0000"
                    maxLength={19}
                  />
                </div>
                <div className="grid gap-3 w-full">
                  <Label htmlFor="cvv" className="ml-1 mt-4">
                    CVV
                  </Label>
                  <Input
                    id="cvv"
                    className="w-12"
                    value={dados.cvv}
                    onChange={(e) => {
                      const apenasNumeros = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 3);
                      setDados((prev) => ({ ...prev, cvv: apenasNumeros }));
                    }}
                    placeholder="000"
                    maxLength={3}
                  />
                </div>
                <div className="grid gap-3 w-full">
                  <Label htmlFor="dataValidade" className="ml-1 mt-4">
                    Data de Validade
                  </Label>
                  <Input
                    id="dataValidade"
                    className="w-30 text-center"
                    value={dados.dataValidade}
                    onChange={handleDataCartaoChange}
                    placeholder="00/00"
                    maxLength={5}
                  />
                </div>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="nomeTitular" className="ml-1 mt-4">
                  Nome do Titular
                </Label>
                <Input
                  id="nomeTitular"
                  className="w-full"
                  value={dados.nomeTitular}
                  onChange={(e) =>
                    setDados((prev) => ({
                      ...prev,
                      nomeTitular: e.target.value,
                    }))
                  }
                  placeholder="Fulano da Silva"
                />
              </div>

              <DialogFooter className="mt-4">
                <DialogClose asChild>
                  <Button
                    className="cursor-pointer hover:bg-red-800 bg-gray-800 text-white"
                    disabled={loading}
                  >
                    Cancelar
                  </Button>
                </DialogClose>
                <Button
                  className="cursor-pointer hover:bg-green-600 hover:text-white"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Salvando..." : "Salvar"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
