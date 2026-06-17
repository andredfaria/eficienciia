import { describe, it, expect } from 'vitest';
import { isValidEmail, digitsOnly, isValidBRPhone, maskBRPhone } from './validate';

describe('isValidEmail', () => {
  it('aceita e-mail bem formado', () => {
    expect(isValidEmail('joao@empresa.com.br')).toBe(true);
  });
  it('rejeita sem dominio', () => {
    expect(isValidEmail('joao@empresa')).toBe(false);
  });
  it('rejeita com espaco', () => {
    expect(isValidEmail('joao @empresa.com')).toBe(false);
  });
  it('rejeita vazio', () => {
    expect(isValidEmail('')).toBe(false);
  });
});

describe('digitsOnly', () => {
  it('remove tudo que nao e digito', () => {
    expect(digitsOnly('(35) 99140-4064')).toBe('35991404064');
  });
});

describe('isValidBRPhone', () => {
  it('aceita 11 digitos (celular com DDD)', () => {
    expect(isValidBRPhone('(35) 99140-4064')).toBe(true);
  });
  it('aceita 10 digitos (fixo com DDD)', () => {
    expect(isValidBRPhone('(35) 3214-0640')).toBe(true);
  });
  it('rejeita 9 digitos', () => {
    expect(isValidBRPhone('991404064')).toBe(false);
  });
  it('rejeita 12 digitos', () => {
    expect(isValidBRPhone('359914040640')).toBe(false);
  });
});

describe('maskBRPhone', () => {
  it('formata 11 digitos como (XX) XXXXX-XXXX', () => {
    expect(maskBRPhone('35991404064')).toBe('(35) 99140-4064');
  });
  it('formata 10 digitos como (XX) XXXX-XXXX', () => {
    expect(maskBRPhone('3532140640')).toBe('(35) 3214-0640');
  });
  it('formata parcial enquanto digita', () => {
    expect(maskBRPhone('35')).toBe('(35');
    expect(maskBRPhone('359')).toBe('(35) 9');
  });
  it('trunca em 11 digitos', () => {
    expect(maskBRPhone('359914040649999')).toBe('(35) 99140-4064');
  });
});
