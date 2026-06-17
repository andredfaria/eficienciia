'use client';

import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatHoras } from './format';
import { isValidEmail, isValidBRPhone, maskBRPhone } from '@/lib/calculator/validate';

export interface ContactData {
  name: string;
  telefone: string;
  email: string;
  empresa: string;
}

interface ContactGateProps {
  horasLiberadasMes: number;
  isSubmitting: boolean;
  onSubmit: (data: ContactData) => void;
}

export function ContactGate({ horasLiberadasMes, isSubmitting, onSubmit }: ContactGateProps) {
  type FieldErrors = { name?: string; telefone?: string; email?: string };
  const [errors, setErrors] = useState<FieldErrors>({});
  const [telefone, setTelefone] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data: ContactData = {
      name: String(fd.get('name') ?? '').trim(),
      telefone: telefone.trim(),
      email: String(fd.get('email') ?? '').trim(),
      empresa: String(fd.get('empresa') ?? '').trim(),
    };

    const next: FieldErrors = {};
    if (!data.name) next.name = 'Informe seu nome.';
    if (!isValidBRPhone(data.telefone)) next.telefone = 'Informe um WhatsApp válido com DDD.';
    if (!isValidEmail(data.email)) next.email = 'Informe um e-mail válido.';

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    onSubmit(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <div className="mb-6 rounded-lg border border-primary/30 bg-primary/5 p-5 text-center neon-ring">
        <p className="text-sm text-muted-foreground">Identificamos cerca de</p>
        <p className="my-1 text-3xl font-bold text-primary">
          {formatHoras(horasLiberadasMes)}/mês
        </p>
        <p className="text-sm text-muted-foreground">
          que sua equipe gasta em tarefas automatizáveis.
        </p>
      </div>

      <div className="mb-5 flex items-center gap-2 text-sm text-muted-foreground">
        <Lock className="h-4 w-4 text-primary" />
        Deixe seu contato para liberar a economia em R$, o ROI estimado e a recomendação.
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="contact-gate-name" className="text-xs md:text-sm font-medium">
              Nome
            </label>
            <Input
              id="contact-gate-name"
              name="name"
              placeholder="Seu nome"
              className="h-11 mt-1"
              required
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name}</p>
            )}
          </div>
          <div>
            <label htmlFor="contact-gate-telefone" className="text-xs md:text-sm font-medium">
              WhatsApp
            </label>
            <Input
              id="contact-gate-telefone"
              name="telefone"
              type="tel"
              inputMode="numeric"
              placeholder="(35) 99999-9999"
              className="h-11 mt-1"
              value={telefone}
              onChange={(e) => setTelefone(maskBRPhone(e.target.value))}
              required
            />
            {errors.telefone && (
              <p className="mt-1 text-xs text-red-500">{errors.telefone}</p>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="contact-gate-email" className="text-xs md:text-sm font-medium">
            E-mail
          </label>
          <Input
            id="contact-gate-email"
            name="email"
            type="email"
            placeholder="E-mail"
            className="h-11 mt-1"
            required
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="contact-gate-empresa" className="text-xs md:text-sm font-medium">
            Empresa <span className="text-muted-foreground">(opcional)</span>
          </label>
          <Input
            id="contact-gate-empresa"
            name="empresa"
            placeholder="Empresa (opcional)"
            className="h-11 mt-1"
          />
        </div>
        <Button type="submit" className="h-11 w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Liberando...' : 'Ver minha estimativa completa'}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Sem spam. Usamos seus dados só para enviar o resultado e, se quiser, falar com você.
        </p>
      </form>
    </motion.div>
  );
}
