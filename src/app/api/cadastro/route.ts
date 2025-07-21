import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { sendMail } from '@/lib/sendEmail';
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const {
      email,
      senha,
      nome,
      cpf,
      contato,
      cep,
      estado,
      cidade,
      endereco,
      numero,
      complemento,
      
    } = data;

    // Validação básica
    if (!email || !senha || !nome || !cpf) {
      return NextResponse.json({ error: 'Campos obrigatórios ausentes.' }, { status: 400 });
    }

    // Verifica se o usuário já existe
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'Usuário já existe.' }, { status: 409 });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Gera token de verificação
    const tokenVerificacao = crypto.randomBytes(32).toString("hex");

    // Cria o usuário no banco
    await prisma.user.create({
      data: {
        email,
        senha: hashedPassword,
        nome,
        cpf,
        contato,
        cep,
        estado,
        cidade,
        endereco,
        numero,
        complemento,
        tokenVerificacao,
      },
    });
    await sendMail({
      to: email,
      subject: 'Confirme seu cadastro',
      html: `
        <p>Olá ${nome},</p>
        <p>Para ativar sua conta, clique no link abaixo:</p>
        <a href="${process.env.NEXT_PUBLIC_URL}/api/verificar-email?token=${tokenVerificacao}">Confirmar e-mail</a>
      `
    });

    return NextResponse.json(
      { message: 'Usuário cadastrado com sucesso. Verifique seu e-mail.' },
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
