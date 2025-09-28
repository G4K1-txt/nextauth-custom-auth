import { UserPen } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ButtonIconEditar(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <Button
      size="sm"
      className="cursor-pointer bg-sky-900 border transition-colors duration-600 ease-in-out hover:bg-sky-600 text-white"
      {...props}
    >
      <UserPen />
      Editar
    </Button>
  );
}
