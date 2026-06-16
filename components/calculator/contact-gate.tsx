'use client';

import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatHoras } from './format';

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
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data: ContactData = {
      name: String(fd.get('name') ?? '').trim(),
      telefone: String(fd.get('telefone') ?? '').trim(),
      email: String(fd.get('email') ?? '').trim(),
      empresa: String(fd.get('empresa') ?? '').trim(),
    };
    if (!data.name || !data.telefone || !data.email) {
      setError('Preencha nome, WhatsApp e e-mail para liberar o resultado.');
      return;
    }
    setError('');
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
        {error && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500">
            {error}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input name="name" placeholder="Seu nome" className="h-11" />
          <Input name="telefone" type="tel" placeholder="WhatsApp" className="h-11" />
        </div>
        <Input name="email" type="email" placeholder="E-mail" className="h-11" />
        <Input name="empresa" placeholder="Empresa (opcional)" className="h-11" />
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
