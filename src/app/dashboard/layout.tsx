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
        <div className="flex flex-col items-center h-dvh w-dvw">
          <AppSidebar />
          <main className="flex ">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  );
}
