"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CardDashboardProps {
  totalPago: number;
  totalNaoPago: number;
}

export function CardDashboard({ totalPago, totalNaoPago }: CardDashboardProps) {
  return (
    <div className="mt-10 justify-center gap-3 ">
      <Card className="min-w-[210px] w-auto p-0 h-22 mb-2 bg-muted/50">
        <CardHeader className="p-3">
          <CardDescription className="text-white font-semibold">
            Total Pago
          </CardDescription>
          <CardTitle className="font-semibold tabular-nums @[250px]/card:text-3xl">
            <h2 className="scroll-m-20 text-green-500 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              {totalPago !== undefined
                ? totalPago.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                : "Carregando..."}
            </h2>
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="min-w-[210px] w-auto  p-0 h-22 mb-2 bg-muted/50">
        <CardHeader className="p-3">
          <CardDescription className="text-white font-semibold">
            Total Não Pago
          </CardDescription>
          <CardTitle className="font-semibold tabular-nums @[250px]/card:text-3xl">
            <h2 className="scroll-m-20 text-red-500 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              {totalNaoPago !== undefined
                ? totalNaoPago.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                : "Carregando..."}
            </h2>
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
