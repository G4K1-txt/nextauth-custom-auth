// app/api/atualiza-senha/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { token, novaSenha } = await req.json();

    const tokenValido = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!tokenValido || new Date(tokenValido.expires) < new Date()) {
      return NextResponse.json({ error: "Token inválido ou expirado" }, { status: 400 });
    }

    await prisma.user.update({
      where: { email: tokenValido.identifier },
      data: { senha: await bcrypt.hash(novaSenha, 10) },
    });

    await prisma.verificationToken.delete({ where: { token } });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro ao atualizar a senha" }, { status: 500 });
  }
}
