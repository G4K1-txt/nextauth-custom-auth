import { AppSidebar } from "@/components/_sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("");
  }

  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <div>
          <main>{children}</main>
        </div>
      </SidebarProvider>
    </div>
  );
}
