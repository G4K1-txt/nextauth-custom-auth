"use client";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
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

export function CadastroDespesa() {
  const [date, setDate] = React.useState<Date>();
  const [open, setOpen] = React.useState(false);
  const [descrDespesa, setDescricao] = React.useState("");
  const [valorDespesa, setValor] = React.useState("");
  const [categDespesa, setCategoria] = React.useState("");
  const [despesaFixa, setDespesaFixa] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!descrDespesa || !valorDespesa || !categDespesa || !date) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

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
    } catch (err) {
      console.error(err);
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          Adicionar Despesa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Adicionar nova despesa</DialogTitle>
          <DialogDescription>
            Adicione uma nova despesa preenchendo os campos abaixo.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3 w-full">
            <Label htmlFor="descricao">Descrição</Label>
            <Input
              id="descricao"
              value={descrDespesa}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>
          <div className="columns-2 gap-8 max-w-[270px]">
            <div className="grid gap-3">
              <Label htmlFor="valor">Valor</Label>
              <Input
                id="valor"
                type="text"
                value={valorDespesa}
                onChange={(e) => {
                  const valor = e.target.value;
                  const somenteNumerosEVirgula = valor.replace(/[^0-9,]/g, "");
                  setValor(somenteNumerosEVirgula);
                }}
              />
            </div>
            <div className="grid gap-3 w-full">
              <Label htmlFor="categoria">Categoria</Label>
              <Select
                value={categDespesa}
                onValueChange={(value) => setCategoria(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alimentacao">Alimentação</SelectItem>
                  <SelectItem value="transporte">Transporte</SelectItem>
                  <SelectItem value="saude">Saúde</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="columns-2">
            <div className="flex flex-col gap-3 max-w-[150px]">
              <Label htmlFor="date" className="px-1">
                Data da Despesa
              </Label>
              <Popover open={open} onOpenChange={setOpen}>
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
              <div className="flex items-center gap-3 mt-5 ms-5">
                <Checkbox
                  id="despesa_fixa"
                  checked={despesaFixa}
                  onCheckedChange={(checked) => setDespesaFixa(!!checked)}
                />
                <Label htmlFor="despesa_fixa">Despesa Fixa</Label>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="cursor-pointer" variant="outline">Cancelar</Button>
          </DialogClose>
          <Button className="cursor-pointer" onClick={handleSubmit} type="submit">
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </form>
  );
}
