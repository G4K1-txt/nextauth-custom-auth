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
          <div>
            <AppSidebar />
          </div>
          <main>{children}</main>
        </SidebarProvider>
      </div>
  );
}
