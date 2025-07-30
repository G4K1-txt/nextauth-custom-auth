// lib/authOptions.ts

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        senha: { label: "Senha", type: "password" },
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

        const isPasswordValid = await bcrypt.compare(
          credentials.senha,
          user.senha
        );

        if (!isPasswordValid) {
          throw new Error("E-mail ou senha inválidos.");
        }

        if (!user.emailVerificado) {
          throw new Error("Seu e-mail ainda não foi verificado.");
        }

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.nome,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  },

  jwt: {
    maxAge: 60 * 60 * 24 * 7,
  },

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
    },
  },

  pages: {
    signIn: "/login",
    error: "/login", // opcional: redireciona erro para login
  },

  secret: process.env.NEXTAUTH_SECRET,
};
