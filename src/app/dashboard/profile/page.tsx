"use client";

import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { ButtonIconEditar } from "@/components/_button/iconButtonEditar";
import { ButtonIconSalvar } from "@/components/_button/iconButtonSalvar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DadosPerfilFormHandle } from "@/types/forms";
import { DadosPerfilForm } from "@/components/_forms/profile_dados_form";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [editando, setEditando] = useState(false);
  const formRef = useRef<DadosPerfilFormHandle>(null);
  const handleEditClick = () => setEditando(true);
  const handleFormSaveSuccess = () => setEditando(false);
  
  if (status === "loading") return <p>Carregando...</p>;
  if (!session) return <p>Usuário não logado</p>;

  const handleSaveClick = async () => {
    if (formRef.current) {
      try {
        await formRef.current.submitForm();
        setEditando(false);
      } catch (error) {
        console.error("Erro na submissão do formulário via ref:", error);
      }
    }
  };

  return (
    <div className="px-4">
      <div className="flex justify-center">
        <h1 className="py-4 text-3xl sm:text-4xl font-bold tracking-tight text-balance">
          Perfil
        </h1>
      </div>

      <div className="flex justify-center gap-5">
        <Card className="w-150 h-auto mx-auto">
          <CardHeader>
            <CardTitle>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
                  {session.user?.name}
                </h3>
                <div className="flex gap-3">
                  {!editando ? (
                    <ButtonIconEditar onClick={handleEditClick} />
                  ) : (
                    <ButtonIconSalvar onClick={handleSaveClick} />
                  )}
                </div>
              </div>
              <Separator className="mt-2" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DadosPerfilForm
              ref={formRef}
              editando={editando}
              onSaveSuccess={handleFormSaveSuccess}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
