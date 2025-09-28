import { UserRoundCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ButtonIconSalvar(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <Button

      size="sm"
      className="cursor-pointer bg-green-900 border  transition-colors duration-600 ease-in-out hover:bg-green-600 text-white"
      {...props}
    >
      <UserRoundCheck />
      Salvar
    </Button>
  );
}
