import { UserRoundCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ButtonIconSalvar(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <Button
      variant="outline"
      size="sm"
      className=" cursor-pointer hover:bg-green-950 text-white"
      {...props}
    >
      <UserRoundCheck />
      Salvar
    </Button>
  );
}
