import { Dialog } from "@/components/ui/dialog";
import { CadastroDespesa } from "@/components/_forms/cadastro_despesa";

export default function DashboardPage() {
  return (
    <div className="flex flex-col  items-center h-full w-dvw ">
      <h1 className="text-4xl mt-10 font-bold mb-6">Dashboard</h1>
      <Dialog>
        <CadastroDespesa />
      </Dialog>
    </div>
  );
}
