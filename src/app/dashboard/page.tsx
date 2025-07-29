"use client";
import { AppSidebar } from "@/components/_sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Carregando...</p>;
  if (!session) return <p>Usuário não logado</p>;

  return (
    <SidebarProvider>
      <div className="flex overflow-hidden min-h-screen">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <h1 className="py-4 pl-2 text-4xl font-bold tracking-tight text-balance">Dashboard</h1>
          <main className="flex justify-center flex-1">
            <div className="flex pt-10 gap-2">
              
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
