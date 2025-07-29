// app/api/recuperar-senha/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    return NextResponse.json({ sucess: "Email Enviado com sucesso" }, {status: 202});
  } catch (err) {
    return NextResponse.json({ error: "Erro ao enviar e-mail" + err }, { status: 500 });
  }
}
