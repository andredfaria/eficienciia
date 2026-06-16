'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Question } from './questions';

interface QuestionStepProps {
  question: Question;
  index: number;
  total: number;
  selected?: string;
  onSelect: (value: string) => void;
  onBack: () => void;
}

export function QuestionStep({
  question,
  index,
  total,
  selected,
  onSelect,
  onBack,
}: QuestionStepProps) {
  const progress = Math.round(((index + 1) / total) * 100);

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>Passo {index + 1} de {total}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h2 className="text-xl md:text-2xl font-bold mb-1">{question.title}</h2>
      <p className="text-sm text-muted-foreground mb-6">{question.help}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {question.options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onSelect(opt.value)}
            className={cn(
              'rounded-lg border p-4 text-left text-sm font-medium transition-all',
              'hover:border-primary hover:bg-primary/5',
              selected === opt.value
                ? 'border-primary bg-primary/10 neon-ring'
                : 'border-border bg-card/60',
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <Button
          variant="ghost"
          onClick={onBack}
          disabled={index === 0}
          className="text-muted-foreground"
        >
          ← Voltar
        </Button>
      </div>
    </motion.div>
  );
}
