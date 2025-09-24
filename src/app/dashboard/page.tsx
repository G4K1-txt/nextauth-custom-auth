"use client";
import { Dialog } from "@/components/ui/dialog";
import { CadastroDespesa } from "@/components/_forms/despesa_insert";
import { TabelaDespesa } from "@/components/_forms/despesa_tabela";
import React, { useState } from "react";

export default function DashboardPage() {
  const [atualizarTabela, setAtualizarTabela] = useState(false);

  // Função que dispara a atualização da tabela
  function triggerAtualizacao() {
    setAtualizarTabela((prev) => !prev);
  }

  return (
    <div className="flex flex-col h-dvh w-dvw">
      <div className="mt-4  mr-4 justify-items-center">
        <div className="w-4/6 ">
          <div className="">
            <Dialog>
              <CadastroDespesa onDespesaCadastrada={triggerAtualizacao} />
            </Dialog>
          </div>
        </div>
      </div>
      <div className="mt-4 justify-items-center">
        <TabelaDespesa atualizar={atualizarTabela} />
      </div>
    </div>
  );
}
