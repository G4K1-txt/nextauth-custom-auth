// src/components/profile/ProfileEditSection.tsx
'use client';

import React, { useState } from 'react';
import { UserAvatarUploader }from '@/components/_profile/UserAvatarUploader'
import { Button } from '@/components/ui/button'; // Se você tiver um botão Shadcn

interface ProfileEditSectionProps {
  currentAvatarUrl: string | null;
  userName: string;
}

export function ProfileEditSection({ currentAvatarUrl, userName }: ProfileEditSectionProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleImageChange = (file: File | null) => {
    setSelectedFile(file);
    // Aqui você pode adicionar lógica para fazer o upload da imagem
    // ou armazená-la no estado global para um formulário de edição maior.
    if (file) {
      console.log("Nova imagem selecionada:", file.name, file.type);
      // Ex: uploadFile(file);
    } else {
      console.log("Nenhuma imagem selecionada.");
    }
  };

  const handleSaveChanges = () => {
    // Lógica para salvar as mudanças, incluindo o upload do 'selectedFile'
    console.log("Salvando alterações...", selectedFile);
    // Ex: Fazer requisição API para upload e atualização do perfil
  };

  return (
    <div className="bg-gray-800 border-gray-700 text-white rounded-lg shadow-lg p-6 flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4">Editar Perfil</h2>
      <UserAvatarUploader
        initialAvatarUrl={currentAvatarUrl}
        onImageChange={handleImageChange}
        size={160} // Um pouco maior, por exemplo (160px)
      />
      <p className="mt-4 text-lg font-medium">Olá, {userName}!</p>
      {selectedFile && (
        <p className="text-sm text-green-400 mt-2">Imagem selecionada: {selectedFile.name}</p>
      )}
      <Button
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSaveChanges}
        disabled={!selectedFile} // Desabilita o botão se nenhuma imagem nova for selecionada
      >
        Salvar Alterações
      </Button>
    </div>
  );
}