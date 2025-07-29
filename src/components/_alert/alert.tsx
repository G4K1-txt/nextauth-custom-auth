import { CheckCircle2Icon } from "lucide-react"

import {
  Alert,
  AlertTitle,
} from "@/components/ui/alert"

export function AlertEnviado() {
  return (
    <div className="grid w-full max-w-xl items-start gap-4">
      <Alert>
        <CheckCircle2Icon />
        <AlertTitle>E-mail Enviado com sucesso, verifique!</AlertTitle>
      </Alert>
    </div>
  )
}
