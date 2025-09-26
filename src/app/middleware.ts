import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: "", // Redireciona para /login se não estiver autenticado
  },
})

export const config = {
  matcher: ["/dashboard/:path*"], // Protege todas as rotas dentro de /dashboard
}
