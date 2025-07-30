"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import * as React from "react";
export function CadastroDespesa() {
  const [date, setDate] = React.useState<Date>();
  const [open, setOpen] = React.useState(false);

  return (
    <form>
      <DialogTrigger asChild>
        <Button variant="outline">Adicionar Despesa</Button>
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
            <Input id="descricao" name="descricao" />
          </div>
          <div className="columns-2 gap-8 max-w-[270px] ">
            <div className="grid gap-3">
              <Label htmlFor="valor">Valor</Label>
              <Input id="valor" name="valor" />
            </div>
            <div className="grid gap-3 w-full">
              <Label htmlFor="categoria">Categoria</Label>
              <Select name="categoria">
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
          <div className="columns-2 gap-">
            <div className="columns-2 flex flex-col gap-3 max-w-[150px]">
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
                    {date ? date.toLocaleDateString() : "Select date"}
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
                    onSelect={(date) => {
                      setDate(date);
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
              <div className="flex items-center gap-3 mt-5 ms-5">
                <Checkbox id="despesa_fixa" />
                <Label htmlFor="despesa_fixa">Despesa Fixa</Label>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </form>
  );
}
