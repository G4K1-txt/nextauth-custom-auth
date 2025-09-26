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
  pago?: boolean;
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
      const data: Despesa[] = await res.json();

      const despesasComPago = data.map((d) => ({
        ...d,
        pago: d.pago ?? false,
      }));

      setDespesas(despesasComPago);
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
          <TableHead className="">Descrição</TableHead>
          <TableHead className="">Categoria</TableHead>
          <TableHead className="text-center">Data</TableHead>
          <TableHead className="text-center">Valor</TableHead>
          <TableHead className="text-center">Fixa</TableHead>
          <TableHead className="">Pago</TableHead>
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
              <TableCell className=" text-center">
                {new Date(d.dataDespesa).toLocaleDateString("pt-BR")}
              </TableCell>
              <TableCell className="text-center">
                R$ {Number(String(d.valorDespesa).replace(",", ".")).toFixed(2)}
              </TableCell>
              <TableCell className="text-center">{d.despesaFixa ? "Sim" : "Não"}</TableCell>
              <TableCell>
                <Checkbox
                  checked={d.pago}
                  onCheckedChange={async (checked) => {
                    try {
                      const res = await fetch(`/api/despesa/${d.id}`, {
                        method: "PATCH",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ pago: checked }),
                      });
                      if (!res.ok) throw new Error("Erro ao atualizar pago");
                      const despesaAtualizada = await res.json();

                      setDespesas((prev) =>
                        prev.map((item) =>
                          item.id === despesaAtualizada.id
                            ? despesaAtualizada
                            : item
                        )
                      );
                    } catch (err) {
                      console.error(err);
                      alert("Erro ao marcar como pago");
                    }
                  }}
                  className="cursor-pointer ml-2"
                />
              </TableCell>
              <TableCell className="inline-flex">
                
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
