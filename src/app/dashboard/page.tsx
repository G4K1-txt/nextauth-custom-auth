"use client";
import { Dialog } from "@/components/ui/dialog";
import { CadastroDespesa } from "@/components/_forms/despesa_insert";
import { TabelaDespesa } from "@/components/_forms/despesa_tabela";
import React, { useState } from "react";
import { CardDashboard } from "@/components/_card/cardDashboard";

export default function DashboardPage() {
  const [atualizarTabela, setAtualizarTabela] = useState(false);
  const [totalPago, setTotalPago] = useState(0);
  const [totalNaoPago, setTotalNaoPago] = useState(0);

  function triggerAtualizacao() {
    setAtualizarTabela((prev) => !prev);
  }

  return (
    <div className="mt-4 w-full  ml-4">
      <div>
        <Dialog>
          <CadastroDespesa onDespesaCadastrada={triggerAtualizacao} />
        </Dialog>
      </div>
      <div className="flex gap-4 mt-4">
        <div className="">
          <TabelaDespesa
            atualizar={atualizarTabela}
            onTotalPagoAtualizado={setTotalPago}
            onTotalNaoPagoAtualizado={setTotalNaoPago}
          />
        </div>
        <div className="flex items-center">
          <CardDashboard totalPago={totalPago} totalNaoPago={totalNaoPago} />
        </div>
      </div>
    </div>
  );
}
