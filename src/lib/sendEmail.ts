import nodemailer from "nodemailer"

export async function sendMail({ to, subject, html }: { to: string; subject: string; html: string }) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Seu App" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });

    console.log('Email enviado:', info.messageId);
  } catch (error) {
    console.error('Erro no sendMail():');
    throw error;
  }
}

