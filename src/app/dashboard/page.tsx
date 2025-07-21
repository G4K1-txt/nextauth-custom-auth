"use client";

import CardDashboard from "@/components/_card/cardDashboard";
import { AppSidebar } from "@/components/_sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Carregando...</p>;
  if (!session) return <p>Usuário não logado</p>;

  return (
    <div>
      <SidebarProvider>
        <div>
          <AppSidebar />
        </div>
        <div className="flex overflow-hidden">
          <div>
            <h1 className="py-4 pl-2 text-4xl font-bold tracking-tight text-balance">Dashboard</h1>
            <main className="flex justify-center h-screen w-screen">
              <div className="flex pt-10 gap-2">
                <CardDashboard />
                <CardDashboard />
                <CardDashboard />
                <CardDashboard />
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
      <div className=" justify-center"></div>
    </div>
  );
}
