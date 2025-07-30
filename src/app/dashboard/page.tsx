"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [date, setDate] = React.useState<Date>();
  useEffect(() => {
    if (status === "unauthenticated" || (status === "loading" && !session)) {
      router.replace("/login");
    }
  }, [status, session, router]);

  if (status === "loading") return <p>Carregando...</p>;

  if (!session) return null;

  return (
    <div className="flex overflow-hidden min-h-screen">
      <div className="flex flex-col flex-1">
        <h1 className="py-4 pl-2 text-4xl font-bold tracking-tight text-balance">
          Dashboard
        </h1>
        <main className="flex justify-center flex-1">
          <div className="flex pt-10 gap-2">
            <Dialog>
              <form>
                <DialogTrigger asChild>
                  <Button variant="outline">Adicionar Despesa</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[470px]">
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
                    <div className="columns-2 gap-4 max-w-[280px]">
                      <div className="grid gap-3">
                        <Label htmlFor="valor">Valor</Label>
                        <Input id="valor" name="valor" />
                      </div>
                      <div className="grid gap-3">
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
                    <div className="grid gap-3">
                      <Label htmlFor="valor">Data</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            data-empty={!date}
                            className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
                          >
                            <CalendarIcon />
                            {date ? (
                              format(date, "PPP")
                            ) : (
                              <span>Selecione uma data</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                          />
                        </PopoverContent>
                      </Popover>
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
            </Dialog>
          </div>
        </main>
      </div>
    </div>
  );
}
