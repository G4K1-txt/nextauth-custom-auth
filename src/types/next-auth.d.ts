// types/next-auth.d.ts
import NextAuth from "next-auth";

const NextAuth
declare module "next-auth" {
  interface Session {
    user: {
      id: string; // adiciona o id aqui
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}
