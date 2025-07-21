
'use client'; 

import React, { useState, useRef, ChangeEvent } from 'react';
import Image from 'next/image';
import { CameraIcon } from '@heroicons/react/24/outline'; // Ícone de câmera

interface UserAvatarUploaderProps {
  initialAvatarUrl?: string | null; // URL da imagem atual do usuário (se houver)
  onImageChange?: (file: File | null) => void; // Callback para quando a imagem muda
  size?: number; // Tamanho do círculo (ex: 128 para 128px de largura/altura)
}

export function UserAvatarUploader({
  initialAvatarUrl,
  onImageChange,
  size = 128, // Tamanho padrão
}: UserAvatarUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialAvatarUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageChange?.(file); // Chama o callback com o arquivo
    } else {
      setPreviewUrl(initialAvatarUrl || null); // Volta para a URL inicial se nada for selecionado
      onImageChange?.(null); // Chama o callback com null
    }
  };

  const handleCircleClick = () => {
    fileInputRef.current?.click(); // Simula o clique no input de arquivo
  };


  // Convert size to Tailwind scale if possible, otherwise use arbitrary
  const tailwindSizeClass = size % 4 === 0 ? `w-${size / 4} h-${size / 4}` : `w-[${size}px] h-[${size}px]`;


  return (
    <div
      className={`relative rounded-full overflow-hidden border-2 border-dashed border-gray-600 flex items-center justify-center cursor-pointer group hover:border-blue-500 transition-colors duration-200 ${tailwindSizeClass}`}
      onClick={handleCircleClick}
    >
      {/* Input de arquivo escondido */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleImageChange}
      />

      {/* Imagem de pré-visualização ou fallback */}
      {previewUrl ? (
        <Image
          src={previewUrl}
          alt="Avatar Preview"
          layout="fill" // Permite que a imagem preencha o contêiner
          objectFit="cover" // Corta a imagem para cobrir o círculo
          className="transition-opacity duration-200 group-hover:opacity-75"
        />
      ) : (
        <CameraIcon className={`text-gray-400 group-hover:text-blue-400 transition-colors duration-200 w-1/2 h-1/2`} />
      )}

      {/* Overlay para o ícone de câmera (aparece no hover) */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <CameraIcon className={`text-white w-1/3 h-1/3`} />
      </div>
    </div>
  );
}