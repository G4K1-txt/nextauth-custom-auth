
import { Dialog } from "@/components/ui/dialog";
import { CadastroDespesa } from "@/components/_forms/cadastro_despesa";
export default function DashboardPage() {
  return (
    <div className="flex overflow-hidden min-h-screen">
      <div className="flex flex-col flex-1">
        <h1 className="py-4 pl-2 text-4xl font-bold tracking-tight text-balance">
          Dashboard
        </h1>
        <main className="flex justify-center flex-1">
          <div className="flex pt-10 gap-2">
            <Dialog>
              <CadastroDespesa />
            </Dialog>
          </div>
        </main>
      </div>
    </div>
  );
}
