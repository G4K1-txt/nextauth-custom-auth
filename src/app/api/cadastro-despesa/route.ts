import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const {
      descrDespesa,
      valorDespesa,
      categDespesa,
      dataDespesa,
      despesaFixa,
    } = data;

    if (
      !descrDespesa ||
      !valorDespesa ||
      !categDespesa ||
      !dataDespesa ||
      typeof despesaFixa !== 'boolean'
    ) {
      return NextResponse.json(
        { error: 'Campos obrigatórios ausentes ou inválidos.' },
        { status: 400 }
      );
    }

    await prisma.despesa.create({
      data: {
        descrDespesa,
        valorDespesa,
        categDespesa,
        dataDespesa: new Date(dataDespesa),
        despesaFixa,
      },
    });

    return NextResponse.json(
      { message: 'Despesa cadastrada com sucesso.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro no cadastro:', error);
    return NextResponse.json(
      { error: 'Erro interno ao processar o cadastro.' },
      { status: 500 }
    );
  }
}
