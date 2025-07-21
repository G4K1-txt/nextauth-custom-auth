interface CepResponse {
  uf: string;
  localidade: string;
  logradouro: string;
  bairro: string;
  erro?: boolean;
}

export async function fetchCepData(cep: string) {
  const cleanCep = cep.replace(/\D/g, "").slice(0, 8);
  const formattedCep = cleanCep.length > 5 ? `${cleanCep.slice(0, 5)}-${cleanCep.slice(5)}` : cleanCep;

  if (cleanCep.length !== 8) return { formattedCep };

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    const data: CepResponse = await response.json();

    if (data.erro) {
      throw new Error("CEP inválido");
    }

    return {
      formattedCep,
      estado: data.uf,
      cidade: data.localidade,
      endereco: `${data.logradouro} - ${data.bairro}`,
    };
  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
    return { formattedCep };
  }
}
