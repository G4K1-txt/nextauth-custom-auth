import { UserPen } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ButtonIconEditar(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <Button
      variant="outline"
      size="sm"
      className=" cursor-pointer hover:bg-sky-950 text-white"
      {...props}
    >
      <UserPen />
      Editar
    </Button>
  );
}
