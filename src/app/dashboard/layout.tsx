"use client";

import { AppSidebar } from "@/components/_sidebar/app-sidebar";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>

        <div>
          <AppSidebar />
        </div>
          <main>{children}</main>
        </div>

    </div>
  );
}
