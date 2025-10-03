"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash } from "lucide-react";
import { AlteraDespesa } from "@/components/_forms/despesa_update";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

type Despesa = {
  id: number;
  descrDespesa: string;
  valorDespesa: number | string;
  categDespesa: string;
  dataDespesa: string;
  despesaFixa: boolean;
  pago?: boolean;
};

type TabelaProps = {
  atualizar: boolean;
  onTotalPagoAtualizado: (totalPago: number) => void;
  onTotalNaoPagoAtualizado: (totalNaoPago: number) => void;
};

export function TabelaDespesa({
  atualizar,
  onTotalPagoAtualizado,
  onTotalNaoPagoAtualizado,
}: TabelaProps) {
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchDespesas() {
    setLoading(true);
    try {
      const res = await fetch("/api/despesa");
      if (!res.ok) throw new Error("Erro ao carregar despesas");
      const data: Despesa[] = await res.json();

      const despesasComPago = data.map((d) => ({
        ...d,
        pago: d.pago ?? false,
      }));

      setDespesas(despesasComPago);
      atualizarTotais(despesasComPago); 
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDespesas();
  }, [atualizar]);

  const excluirDespesa = async (id: number) => {
    if (!confirm("Tem certeza que quer excluir esta despesa?")) return;
    try {
      const res = await fetch(`/api/despesa/${id}`, { method: "DELETE" });
      if (res.ok) {
        const novaLista = despesas.filter((d) => d.id !== id);
        setDespesas(novaLista);
        atualizarTotais(novaLista);
      } else {
        alert("Erro ao excluir a despesa.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir a despesa.");
    }
  };

  const atualizarDespesaLocal = (novaDespesa: Despesa) => {
    const novaLista = despesas.map((d) =>
      d.id === novaDespesa.id ? novaDespesa : d
    );
    setDespesas(novaLista);
    atualizarTotais(novaLista);
  };

  const atualizarTotais = (lista: Despesa[]) => {
    const totalPago = lista
      .filter((d) => d.pago)
      .reduce(
        (acc, d) => acc + Number(String(d.valorDespesa).replace(",", ".")),
        0
      );

    const totalNaoPago = lista
      .filter((d) => !d.pago)
      .reduce(
        (acc, d) => acc + Number(String(d.valorDespesa).replace(",", ".")),
        0
      );

    onTotalPagoAtualizado(totalPago);
    onTotalNaoPagoAtualizado(totalNaoPago);
  };

  return (
    <Table className="bg-muted/50 border mt-2">
      <TableHeader>
        <TableRow>
          <TableHead>Descrição</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead className="text-center">Data</TableHead>
          <TableHead className="text-center">Valor</TableHead>
          <TableHead className="text-center">Fixa</TableHead>
          <TableHead className="text-center">Pago</TableHead>
          <TableHead className="text-center">Ações</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              Carregando...
            </TableCell>
          </TableRow>
        ) : (
          despesas.map((d) => (
            <TableRow key={d.id}>
              <TableCell>{d.descrDespesa}</TableCell>
              <TableCell>{d.categDespesa}</TableCell>
              <TableCell className="text-center">
                {new Date(d.dataDespesa).toLocaleDateString("pt-BR")}
              </TableCell>
              <TableCell className="text-center">R$ {d.valorDespesa}</TableCell>
              <TableCell className="text-center">
                {d.despesaFixa ? "Sim" : "Não"}
              </TableCell>
              <TableCell className="text-center">
                <Checkbox
                  checked={d.pago}
                  onCheckedChange={async (checked) => {
                    try {
                      const res = await fetch(`/api/despesa/${d.id}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ pago: checked }),
                      });
                      if (!res.ok) throw new Error("Erro ao atualizar pago");
                      const despesaAtualizada = await res.json();

                      const novaLista = despesas.map((item) =>
                        item.id === despesaAtualizada.id
                          ? despesaAtualizada
                          : item
                      );
                      setDespesas(novaLista);
                      atualizarTotais(novaLista);
                    } catch (err) {
                      console.error(err);
                      alert("Erro ao marcar como pago");
                    }
                  }}
                  className="cursor-pointer"
                />
              </TableCell>
              <TableCell className="text-center">
                <AlteraDespesa
                  despesa={d}
                  onDespesaAtualizada={atualizarDespesaLocal}
                />
                <Button
                  className="bg-gray-800 w-8 h-8 hover:bg-red-800 cursor-pointer text-white font-bold"
                  onClick={() => excluirDespesa(d.id)}
                >
                  <Trash />
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
