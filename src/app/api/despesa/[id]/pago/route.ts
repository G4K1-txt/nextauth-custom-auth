import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { pago } = await req.json();
    const id = Number(params.id);

    const despesaAtualizada = await prisma.despesa.update({
      where: { id },
      data: { pago },
    });

    return NextResponse.json(despesaAtualizada);
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
