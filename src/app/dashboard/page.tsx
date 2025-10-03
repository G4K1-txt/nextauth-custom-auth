"use client";
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
    <div className="mt-4 ml-4">
      <div>
        <CadastroDespesa onDespesaCadastrada={triggerAtualizacao} />
      </div>
      <div className="flex gap-4">
        <div className="">
          <TabelaDespesa
            atualizar={atualizarTabela}
            onTotalPagoAtualizado={setTotalPago}
            onTotalNaoPagoAtualizado={setTotalNaoPago}
          />
        </div>
        <div className="flex mt-2">
          <CardDashboard totalPago={totalPago} totalNaoPago={totalNaoPago} />
        </div>
      </div>
    </div>
  );
}
