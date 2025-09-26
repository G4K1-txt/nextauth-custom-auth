// app/api/despesa/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// DELETE despesa
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> } // 👈 params é uma Promise
) {
  try {
    const { id } = await context.params; // 👈 precisa do await
    const idNumber = Number(id);

    await prisma.despesa.delete({
      where: { id: idNumber },
    });

    return NextResponse.json(
      { message: "Despesa excluída com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao excluir despesa:", error);
    return NextResponse.json(
      { error: "Erro interno ao excluir despesa." },
      { status: 500 }
    );
  }
}

// PUT (atualiza todos os campos enviados)
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const idNumber = Number(id);

    const body = await req.json();
    const { descrDespesa, valorDespesa, dataDespesa } = body;

    const despesaAtualizada = await prisma.despesa.update({
      where: { id: idNumber },
      data: {
        descrDespesa,
        valorDespesa: String(valorDespesa),
        dataDespesa: dataDespesa ? new Date(dataDespesa) : undefined,
      },
    });

    return NextResponse.json(despesaAtualizada, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar despesa (PUT):", error);
    return NextResponse.json(
      { error: "Erro interno ao atualizar despesa." },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const idNumber = Number(id);

    const body = await req.json();

    const despesaAtualizada = await prisma.despesa.update({
      where: { id: idNumber },
      data: body,
    });

    return NextResponse.json(despesaAtualizada, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar despesa (PATCH):", error);
    return NextResponse.json(
      { error: "Erro interno ao atualizar despesa." },
      { status: 500 }
    );
  }
}
