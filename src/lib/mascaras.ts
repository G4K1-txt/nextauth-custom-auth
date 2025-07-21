export function formatCpf(value: string): string {
  value = value.replace(/\D/g, "").slice(0, 11);

  if (value.length > 9) {
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  } else if (value.length > 6) {
    return value.replace(/(\d{3})(\d{3})(\d{3})/, "$1.$2.$3");
  } else if (value.length > 3) {
    return value.replace(/(\d{3})(\d{3})/, "$1.$2");
  }

  return value;
}

export function formatContato(value: string): string {
  value = value.replace(/\D/g, "").slice(0, 11);

  if (value.length === 0) return "";

  let formatted = `(${value}`;

  if (value.length > 2) {
    formatted = `(${value.slice(0, 2)}) ${value.slice(2)}`;
  }
  if (value.length > 7) {
    formatted = `${formatted.slice(0, 10)}-${formatted.slice(10)}`;
  }

  return formatted;
}
