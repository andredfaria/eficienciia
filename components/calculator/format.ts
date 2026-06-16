export function formatBRL(n: number): string {
  const rounded = Math.round(n / 50) * 50; // arredonda para parecer estimativa
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(rounded);
}

export function formatHoras(n: number): string {
  return `${Math.round(n)} h`;
}
