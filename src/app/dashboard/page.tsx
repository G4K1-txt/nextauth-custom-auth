"use client";
import { Dialog } from "@/components/ui/dialog";
import { CadastroDespesa } from "@/components/_forms/despesa_insert";
import { TabelaDespesa } from "@/components/_forms/despesa_tabela";
import React, { useState } from "react";

export default function DashboardPage() {
  const [atualizarTabela, setAtualizarTabela] = useState(false);
  function triggerAtualizacao() {
    setAtualizarTabela((prev) => !prev);
  }

  return (
    <div className="mt-4 ml-4">
      <div>
        <Dialog>
          <CadastroDespesa onDespesaCadastrada={triggerAtualizacao} />
        </Dialog>
      </div>
      <div>
        <TabelaDespesa atualizar={atualizarTabela} />
      </div>
    </div>
  );
}
