import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); 

  if (!id) {
    return NextResponse.json({ error: "ID não fornecido" }, { status: 400 });
  }

  const userId = parseInt(id);

  if (isNaN(userId)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
  }

  return NextResponse.json(user);
}


export async function PUT(request: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  const userId = parseInt(id);
  const data = await request.json();

  try {
    const userAtualizado = await prisma.user.update({
      where: { id: userId },
      data: {
        email: data.email,
        cpf: data.cpf,
        contato: data.contato,
        cep: data.cep,
        estado: data.estado,
        cidade: data.cidade,
        endereco: data.endereco,
        numero: data.numero,
      },
    });

    return NextResponse.json(userAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return new NextResponse("Erro ao atualizar usuário", { status: 500 });
  }
}