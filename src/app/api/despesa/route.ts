// app/api/despesas/route.ts
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const despesas = await prisma.despesa.findMany({
      orderBy: { dataDespesa: "desc" },
       select: {
        id: true,              // garante que vem
        descrDespesa: true,
        categDespesa: true,
        valorDespesa: true,
        dataDespesa: true,
        pago: true,            // garante que vem (mesmo se null/false)
      }, // ordena da mais recente pra mais antiga
    })
    return NextResponse.json(despesas)
  } catch (error) {
    console.error("Erro ao buscar despesas:", error)
    return NextResponse.json(
      { error: "Erro interno ao buscar despesas." },
      { status: 500 }
    )
  }
}
