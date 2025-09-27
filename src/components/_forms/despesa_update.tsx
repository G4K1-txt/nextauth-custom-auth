"use client";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { Settings } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Despesa = {
  id: number;
  descrDespesa: string;
  valorDespesa: string | number;
  categDespesa: string;
  dataDespesa: string;
  despesaFixa: boolean;
};

type AlteraDespesaProps = {
  despesa: Despesa;
  onDespesaAtualizada?: (nova: Despesa) => void;
};

export function AlteraDespesa({
  despesa,
  onDespesaAtualizada,
}: AlteraDespesaProps) {
  const [open, setOpen] = React.useState(false); // para o Dialog
  const [openCalendar, setOpenCalendar] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(
    despesa.dataDespesa ? new Date(despesa.dataDespesa) : undefined
  );
  const [descrDespesa, setDescricao] = React.useState(despesa.descrDespesa);
  const [valorDespesa, setValor] = React.useState(String(despesa.valorDespesa));
  const [categDespesa, setCategoria] = React.useState(despesa.categDespesa);
  const [despesaFixa, setDespesaFixa] = React.useState(despesa.despesaFixa);
  const descricaoRef = React.useRef<HTMLInputElement>(null);
  const valorRef = React.useRef<HTMLInputElement>(null);
  const categoriaRef = React.useRef<HTMLButtonElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!descrDespesa || !valorDespesa || !categDespesa || !date) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const payload = {
      descrDespesa,
      valorDespesa: String(valorDespesa),
      categDespesa,
      dataDespesa: date.toISOString(),
      despesaFixa,
    };

    try {
      const res = await fetch(`/api/despesa/${despesa.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Erro ao atualizar despesa.");
        return;
      }

      onDespesaAtualizada?.({ ...despesa, ...payload });

      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="items-center"asChild>
        <Button className="cursor-pointer items-center w-8 h-8 text-white mr-2 bg-gray-800 hover:bg-sky-600 font-bold">
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="mb-2 ml-1">Editar Despesa</DialogTitle>
            <DialogDescription className="mb-2 ml-1">
              Altere os campos da despesa e salve.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3 w-full">
              <Label htmlFor="descricao" className="ml-1">
                Descrição
              </Label>
              <Input
                id="descricao"
                placeholder="Aluguel"
                value={descrDespesa}
                ref={descricaoRef}
                onChange={(e) => setDescricao(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    valorRef.current?.focus();
                  }
                }}
              />
            </div>
            <div className="columns-2 gap-8 max-w-[270px]">
              <div className="grid gap-3">
                <Label htmlFor="valor" className="ml-1">
                  Valor
                </Label>
                <Input
                  id="valor"
                  placeholder="R$0,00"
                  type="text"
                  value={valorDespesa}
                  ref={valorRef}
                  onChange={(e) =>
                    setValor(e.target.value.replace(/[^0-9,]/g, ""))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      categoriaRef.current?.click();
                    }
                  }}
                />
              </div>
              <div className="grid gap-3 w-full">
                <Label htmlFor="categoria" className="ml-1">
                  Categoria
                </Label>
                <Select value={categDespesa} onValueChange={setCategoria}>
                  <SelectTrigger ref={categoriaRef}>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent className="cursor-pointer">
                    <SelectItem value="Moradia">Moradia</SelectItem>
                    <SelectItem value="Educação">Educação</SelectItem>
                    <SelectItem value="Alimentação">Alimentação</SelectItem>
                    <SelectItem value="Transporte">Transporte</SelectItem>
                    <SelectItem value="Saúde">Saúde</SelectItem>
                    <SelectItem value="Lazer">Lazer</SelectItem>
                    <SelectItem value="Serviços/Assinaturas">
                      Serviços/Assinaturas
                    </SelectItem>
                    <SelectItem value="Impostos/Taxas">
                      Impostos/Taxas
                    </SelectItem>
                    <SelectItem value="Outras Despesas">
                      Outras Despesas
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="columns-2">
              <div className="flex flex-col gap-3 max-w-[150px]">
                <Label htmlFor="date" className="px-1">
                  Data da Despesa
                </Label>
                <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className="w-48 justify-between font-normal"
                    >
                      {date ? date.toLocaleDateString() : "Selecione a data"}
                      <CalendarIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      captionLayout="dropdown"
                      onSelect={(d) => {
                        setDate(d);
                        setOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
                <div className="flex items-center gap-3 mt-9 ms-5">
                  <Checkbox
                    id="despesa_fixa"
                    className="cursor-pointer"
                    checked={despesaFixa}
                    onCheckedChange={(checked) => setDespesaFixa(!!checked)}
                  />
                  <Label htmlFor="despesa_fixa">Despesa Fixa</Label>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-8">
            <Button
              className="cursor-pointer hover:bg-red-800 bg-gray-800  text-white"
              type="button"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button className="cursor-pointer hover:bg-green-600 hover:text-white" type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
