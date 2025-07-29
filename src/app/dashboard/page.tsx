"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated" || (status === "loading" && !session)) {
      router.replace("/login");
    }
  }, [status, session, router]);

  if (status === "loading") return <p>Carregando...</p>;

  if (!session) return null;

  return (
    <div className="flex overflow-hidden min-h-screen">
      <div className="flex flex-col flex-1">
        <h1 className="py-4 pl-2 text-4xl font-bold tracking-tight text-balance">
          Dashboard
        </h1>
        <main className="flex justify-center flex-1">
          <div className="flex pt-10 gap-2"></div>
        </main>
      </div>
    </div>
  );
}
