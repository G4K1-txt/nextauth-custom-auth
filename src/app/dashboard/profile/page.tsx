"use client";

import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { ButtonIconEditar } from "@/components/_button/iconButtonEditar";
import { ButtonIconSalvar } from "@/components/_button/iconButtonSalvar";
import { DadosPerfilFormHandle } from "@/types/forms";
import { DadosPerfilForm } from "@/components/_forms/profile_dados_form";
import { DadosCartoesPerfilForm } from "@/components/_forms/profile_cartoes_form";

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
    <div className="flex">
      <div>
        <h1 className="scroll-m-20 ml-8 text-4xl mt-4 font-semibold tracking-tight text-balance">
          Meu Perfil
        </h1>
        <h4 className="scroll-m-20 ml-6 mb-2 text-xl font-semibold tracking-tight">
          Gerencie suas informações pessoais e de contato.
        </h4>
        <div className="bg-muted/50 p-4 ml-4 rounded-2xl border min-[1200px]:w-[550px] min-[1200px]:h-[310px] min-[1700px]:w-[620px] min-[1700px]:h-[310px] ">
          <div className="flex justify-between ml-1 mb-4">
            <h3 className="sm:text-2xl font-semibold">{session.user?.name}</h3>
            <div>
              {!editando ? (
                <ButtonIconEditar onClick={handleEditClick} />
              ) : (
                <ButtonIconSalvar onClick={handleSaveClick} />
              )}
            </div>
          </div>
          <div>
            <DadosPerfilForm
              ref={formRef}
              editando={editando}
              onSaveSuccess={handleFormSaveSuccess}
            />
          </div>
        </div>
      </div>
      <div className="mt-23 flex">
        <div className="bg-muted/50 min-[1200px]:w-[500px] min-[1200px]:h-[310px] min-[1700px]:w-[620px] min-[1700px]:h-[310px] ml-4 rounded-2xl border">
          <DadosCartoesPerfilForm />
        </div>
      </div>
    </div>
  );
}
