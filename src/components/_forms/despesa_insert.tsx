"use client";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { BadgePlus } from "lucide-react";
import { toast } from "sonner";
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
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DespesaFixaCheckboxProps = {
  checked: boolean;
  onChange: (val: boolean) => void;
};

const DespesaFixaCheckbox = React.memo(function DespesaFixaCheckbox({
  checked,
  onChange,
}: DespesaFixaCheckboxProps) {
  return (
    <div className="flex items-center gap-3 mt-9 ms-5">
      <Checkbox
        id="despesa_fixa"
        className="cursor-pointer"
        checked={checked}
        onCheckedChange={(c) => onChange(!!c)}
      />
      <Label htmlFor="despesa_fixa">Despesa Fixa</Label>
    </div>
  );
});

type CadastroDespesaProps = {
  onDespesaCadastrada?: () => void;
};

export function CadastroDespesa({ onDespesaCadastrada }: CadastroDespesaProps) {
  const [date, setDate] = React.useState<Date>();
  const [open, setOpen] = React.useState(false);
  const [openCalendar, setOpenCalendar] = React.useState(false);
  const [descrDespesa, setDescricao] = React.useState("");
  const [valorDespesa, setValor] = React.useState("");
  const [categDespesa, setCategoria] = React.useState("");
  const [despesaFixa, setDespesaFixa] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!descrDespesa || !valorDespesa || !categDespesa || !date) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }
    setLoading(true);

    const payload = {
      descrDespesa,
      valorDespesa,
      categDespesa,
      dataDespesa: date.toISOString(),
      despesaFixa,
    };

    try {
      const res = await fetch("/api/cadastro-despesa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Erro ao cadastrar despesa.");
        return;
      }

      toast.success("Despesa cadastrada com sucesso!");

      setDescricao("");
      setValor("");
      setCategoria("");
      setDespesaFixa(false);
      setDate(undefined);
      onDespesaCadastrada?.();
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer w-10 h-9 bg-gray-800 hover:bg-green-600 text-white font-bold">
          <BadgePlus className="" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="mb-2 ml-1">Nova despesa</DialogTitle>
            <DialogDescription className="mb-2 ml-1">
              Adicione uma nova despesa preenchendo os campos abaixo.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            {/* Descrição */}
            <div className="grid gap-3 w-full">
              <Label htmlFor="descricao" className="ml-1">
                Descrição
              </Label>
              <Input
                id="descricao"
                placeholder="Aluguel"
                value={descrDespesa}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>

            {/* Valor e Categoria */}
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
                  onChange={(e) => {
                    const valor = e.target.value.replace(/[^0-9,]/g, "");
                    setValor(valor);
                  }}
                />
              </div>
              <div className="grid gap-3 w-full">
                <Label htmlFor="categoria" className="ml-1">
                  Categoria
                </Label>
                <Select value={categDespesa} onValueChange={setCategoria}>
                  <SelectTrigger className="cursor-pointer">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
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
                      onSelect={setDate}
                    />
                  </PopoverContent>
                </Popover>
                <DespesaFixaCheckbox
                  checked={despesaFixa}
                  onChange={setDespesaFixa}
                />
              </div>
            </div>
          </div>

          <DialogFooter className="mt-8">
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
  );
}
