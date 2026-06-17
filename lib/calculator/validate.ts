export function isValidEmail(email: string): boolean {
  // pragmático: algo@algo.dominio, sem espaços
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function digitsOnly(value: string): string {
  return value.replace(/\D/g, '');
}

export function isValidBRPhone(phone: string): boolean {
  const d = digitsOnly(phone);
  return d.length === 10 || d.length === 11;
}

export function maskBRPhone(phone: string): string {
  const d = digitsOnly(phone).slice(0, 11);
  if (d.length === 0) return '';
  if (d.length <= 2) return `(${d}`;
  const ddd = d.slice(0, 2);
  const rest = d.slice(2);
  if (rest.length <= 4) return `(${ddd}) ${rest}`;
  // 11 dígitos -> 5+4; 10 dígitos -> 4+4
  const splitAt = rest.length >= 9 ? 5 : 4;
  return `(${ddd}) ${rest.slice(0, splitAt)}-${rest.slice(splitAt)}`;
}
