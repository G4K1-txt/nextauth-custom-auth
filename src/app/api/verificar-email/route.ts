// app/api/verificar-email/route.ts
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ error: 'Token de verificação ausente.' }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: {
        tokenVerificacao: token,
        emailVerificado: null,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Token de verificação inválido ou expirado.' }, { status: 404 });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerificado: new Date(),
        tokenVerificacao: null,
      },
    });

    return NextResponse.json(
      { message: 'E-mail verificado com sucesso! Você já pode fazer login.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro na verificação de e-mail:', error);
    return NextResponse.json(
      { error: 'Erro interno ao verificar o e-mail.' },
      { status: 500 }
    );
  }
}