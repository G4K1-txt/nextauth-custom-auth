
"use client"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

export function LogoutButton() {
  return (
    <Button className="cursor-pointer bg-gray-600 hover:bg-red-950 text-white " onClick={() => signOut({ callbackUrl: "/login" })}>
      Sair
    </Button>
  )
}
