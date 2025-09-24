"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
};

type TabelaProps = {
  atualizar: boolean;
};

export function TabelaDespesa({ atualizar }: TabelaProps) {
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchDespesas() {
    setLoading(true);
    try {
      const res = await fetch("/api/despesa");
      if (!res.ok) throw new Error("Erro ao carregar despesas");
      const data = await res.json();
      setDespesas(data);
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
        setDespesas((prev) => prev.filter((d) => d.id !== id));
      } else {
        alert("Erro ao excluir a despesa.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir a despesa.");
    }
  };

  const atualizarDespesaLocal = (novaDespesa: Despesa) => {
    setDespesas((prev) =>
      prev.map((d) => (d.id === novaDespesa.id ? novaDespesa : d))
    );
  };

  const total = despesas.reduce((acc, d) => {
    const valor = Number(String(d.valorDespesa).replace(",", ".") || 0);
    return acc + valor;
  }, 0);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Descrição</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Fixa</TableHead>
          <TableHead>Data</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Pago</TableHead>
          <TableHead>Ações</TableHead>
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
              <TableCell>{d.despesaFixa ? "Sim" : "Não"}</TableCell>
              <TableCell>
                {new Date(d.dataDespesa).toLocaleDateString("pt-BR")}
              </TableCell>
              <TableCell>
                R$ {Number(String(d.valorDespesa).replace(",", ".")).toFixed(2)}
              </TableCell>
              <TableCell>
                <Checkbox id="pago" className="cursor-pointer ml-2" />
              </TableCell>
              <TableCell className="inline-flex gap-2">
                <AlteraDespesa
                  despesa={d}
                  onDespesaAtualizada={(nova) => atualizarDespesaLocal(nova)}
                />
                <Button
                  className="bg-gray-800 w-18 h-8 hover:bg-red-800 cursor-pointer text-white font-bold"
                  onClick={() => excluirDespesa(d.id)}
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell className="font-bold">Total</TableCell>
          <TableCell colSpan={3}></TableCell>
          <TableCell className="font-bold">R$ {total.toFixed(2)}</TableCell>
          <TableCell colSpan={2}></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
