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
    redirect("/login");
  }

  return (
    <div>
      <SidebarProvider>
        <div className="flex min-h-screen w-screen">
          <AppSidebar />
          <main className="flex mt-10 flex-1 justify-center ">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  );
}
