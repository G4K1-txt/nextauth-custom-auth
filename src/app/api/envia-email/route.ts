import { NextResponse } from "next/server";
import { sendMail } from "@/lib/sendEmail";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const token = crypto.randomBytes(32).toString("hex");
    const expiracao = new Date(Date.now() + 60 * 60 * 1000); // 1h

    // Armazena token no banco
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires: expiracao,
      },
    });

    const resetLink = `http://localhost:3000/troca-senha?token=${token}`;

    await sendMail({
      to: email,
      subject: "Recuperação de Senha",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #111111; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">Recuperação de Senha</h1>
          </div>
          <div style="padding: 30px;">
            <p>Olá,</p>
            <p>Recebemos uma solicitação para redefinir sua senha. Para continuar, clique no botão abaixo:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" style="background-color: #111111; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">Redefinir Senha</a>
            </div>
            <p>Se você não solicitou a recuperação, apenas ignore este e-mail.</p>
            <p style="margin-top: 40px; font-size: 12px; color: #888;">Este link expira em 1 hora por segurança.</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ sucess: "Email enviado com sucesso" });
  } catch (err) {
    return NextResponse.json({ error: "Erro ao enviar e-mail: " + err }, { status: 500 });
  }
}
