'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { CalculatorResult } from '@/lib/calculator';
import { formatBRL, formatHoras } from './format';
import { RESULT_COPY, pillarLabel } from './result-content';

interface ResultViewProps {
  result: CalculatorResult;
  onCtaClick: (kind: 'primary' | 'secondary') => void;
}

export function ResultView({ result, onCtaClick }: ResultViewProps) {
  const { estimate, recommendation, financials } = result;
  const copy = RESULT_COPY[recommendation.reasonKey];
  const showFinanceira = recommendation.classification !== 'baixa-maturidade';

  const metrics = [
    { label: 'Economia/mês', value: formatBRL(estimate.economiaMes) },
    { label: 'Economia/ano', value: formatBRL(estimate.economiaAno) },
    { label: 'Horas liberadas/mês', value: formatHoras(estimate.horasLiberadasMes) },
    {
      label: 'Payback estimado',
      value: Number.isFinite(financials.paybackMeses)
        ? `${Math.max(1, Math.round(financials.paybackMeses))} meses`
        : '—',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <p className="mb-1 text-xs uppercase tracking-wide text-primary">Estimativa</p>
      <h2 className="mb-2 text-xl md:text-2xl font-bold">{copy.headline}</h2>
      <p className="mb-6 text-sm text-muted-foreground">{copy.message}</p>

      {showFinanceira && (
        <div className="mb-6 grid grid-cols-2 gap-3">
          {metrics.map((m) => (
            <Card key={m.label} className="bg-card/60 p-4 text-center neon-ring">
              <p className="text-lg md:text-2xl font-bold text-primary">{m.value}</p>
              <p className="text-xs text-muted-foreground">{m.label}</p>
            </Card>
          ))}
        </div>
      )}

      <Card className="mb-6 border-primary/30 bg-primary/5 p-5">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Recomendação para o seu momento
        </p>
        <p className="text-lg font-bold">{pillarLabel(recommendation.pillar)}</p>
      </Card>

      <p className="mb-4 text-center text-xs text-muted-foreground">
        Valores estimados com base nas suas respostas. A economia e o payback são aproximações e
        podem variar conforme o escopo e o investimento do projeto. Os números reais dependem de
        um diagnóstico.
      </p>

      <div className="flex flex-col gap-3">
        <Button className="h-11 w-full" onClick={() => onCtaClick('primary')}>
          {copy.ctaPrimary}
        </Button>
        <Button
          variant="outline"
          className="h-11 w-full"
          onClick={() => onCtaClick('secondary')}
        >
          {copy.ctaSecondary}
        </Button>
      </div>
    </motion.div>
  );
}
