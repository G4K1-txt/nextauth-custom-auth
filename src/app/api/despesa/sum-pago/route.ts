// app/api/despesas/sum/route.ts
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const soma = await prisma.despesa.aggregate({
      _sum: {
        valorDespesa: true,
      },
      where: {
        pago: true,
      },
    })

    return NextResponse.json({ total: soma._sum.valorDespesa ?? 0 })
  } catch (error) {
    console.error("Erro ao calcular soma:", error)
    return NextResponse.json({ error: "Erro interno" }, { status: 500 })
  }
}
