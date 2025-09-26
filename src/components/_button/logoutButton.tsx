
"use client"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

export function LogoutButton() {
  return (
    <Button className="cursor-pointer bg-gray-800 hover:bg-red-800 text-white " onClick={() => signOut({ callbackUrl: "" })}>
      Sair
    </Button>
  )
}
