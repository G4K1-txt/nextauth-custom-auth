// types/forms.ts

export interface DadosPerfilFormProps {
  editando: boolean;
  onSaveSuccess?: () => void;
  onSaveError?: (error: string) => void;
}

export interface DadosPerfilFormHandle {
  submitForm: () => Promise<void>;
}
