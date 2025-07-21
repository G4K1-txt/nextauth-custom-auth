import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        senha: { label: "Senha", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.senha) {
          throw new Error("Por favor, forneça e-mail e senha.");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("E-mail ou senha inválidos.");
        }

        const isPasswordValid = await bcrypt.compare(credentials.senha, user.senha);
        if (!isPasswordValid) {
          throw new Error("E-mail ou senha inválidos.");
        }

        if (!user.emailVerificado) {
          throw new Error("Seu e-mail ainda não foi verificado. Por favor, verifique sua caixa de entrada.");
        }

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.nome,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
async session({ session, token }) {
  if (token) {
    session.user = {
      id: token.id as string,
      email: token.email as string,
      name: token.name as string,
    };
  }
  return session;
}

  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// 2. Passe as 'authOptions' para o NextAuth e exporte o handler
const handler = NextAuth(authOptions);

// 3. Exporte os métodos GET e POST do handler para o Next.js reconhecer a rota de API
export { handler as GET, handler as POST };