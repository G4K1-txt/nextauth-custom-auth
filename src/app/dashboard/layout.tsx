"use client";

import { AppSidebar } from "@/components/_sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SidebarProvider>
        <div className="flex min-h-screen w-screen">
          {/* Sidebar fixada à esquerda */}
          <AppSidebar />

          {/* Conteúdo centralizado */}
          <main className="flex mt-10 flex-1 justify-center ">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
