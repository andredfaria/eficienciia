'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { computeResult, type Answers } from '@/lib/calculator';
import { QUESTIONS } from './questions';
import { QuestionStep } from './question-step';
import { ContactGate, type ContactData } from './contact-gate';
import { ResultView } from './result-view';
import { RESULT_COPY, pillarLabel } from './result-content';

const WEBHOOK_URL = 'https://n8n.eficienciia.com.br/webhook/calculadora';
const CONTACT_URL = '/#contact';
// Link público da agenda do Google (Appointment schedules).
const CALENDAR_URL = 'https://calendar.app.google/X6J4sz2SFLtK7LDs7';
const WHATSAPP_URL =
  'https://wa.me/5535991404064?text=Olá%20vim%20pelo%20site%20e%20gostaria%20de%20saber%20mais%20informações%20sobre%20a%20EFICIENCI%20IA,%20QUERO%20AUTOMATICAR%20MEU%20NEGOCIO';

type Stage = 'questions' | 'gate' | 'result';

export function Calculator() {
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const [step, setStep] = useState(0);
  const [stage, setStage] = useState<Stage>('questions');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estimate parcial (horas) precisa de respostas completas; só calculamos no gate/result.
  const result = useMemo(
    () => (stage !== 'questions' ? computeResult(answers as Answers) : null),
    [stage, answers],
  );

  const handleSelect = (value: string) => {
    const q = QUESTIONS[step];
    const next = { ...answers, [q.id]: value } as Partial<Answers>;
    setAnswers(next);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setStage('gate');
    }
  };

  const handleBack = () => setStep((s) => Math.max(0, s - 1));

  const handleContactSubmit = async (contact: ContactData) => {
    setIsSubmitting(true);
    const a = answers as Answers;
    const res = computeResult(a);
    const copy = RESULT_COPY[res.recommendation.reasonKey];

    // Rótulos legíveis de cada resposta, para o n8n montar o PDF sem traduzir códigos.
    const respostasLabels: Record<string, string> = {};
    for (const q of QUESTIONS) {
      const value = a[q.id] as string;
      const opt = (q.options as ReadonlyArray<{ value: string; label: string }>).find(
        (o) => o.value === value,
      );
      respostasLabels[q.id] = opt?.label ?? value;
    }

    const payload = {
      ...contact,
      origem: 'calculadora-roi',
      segmento: a.segment,
      respostas: answers,
      respostas_labels: respostasLabels,
      lead_score: res.score,
      classificacao: res.recommendation.classification,
      recomendacao: res.recommendation.pillar,
      recomendacao_label: pillarLabel(res.recommendation.pillar),
      motivo: res.recommendation.reasonKey,
      estimativas: {
        fator: res.estimate.fator,
        economia_mes: Math.round(res.estimate.economiaMes),
        economia_ano: Math.round(res.estimate.economiaAno),
        horas_liberadas_mes: Math.round(res.estimate.horasLiberadasMes),
        investimento_ref: res.financials.investimentoRef,
        payback_meses: Number.isFinite(res.financials.paybackMeses)
          ? Math.round(res.financials.paybackMeses)
          : null,
        roi_ano_pct: Math.round(res.financials.roiAnoPct),
      },
      relatorio: {
        headline: copy.headline,
        mensagem: copy.message,
      },
    };
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch {
      // Não bloqueia a exibição do resultado se o webhook falhar.
    } finally {
      setIsSubmitting(false);
      setStage('result');
    }
  };

  const handleCtaClick = (kind: 'primary' | 'secondary') => {
    if (kind === 'secondary') {
      window.open(WHATSAPP_URL, '_blank');
      return;
    }
    // CTA primário: cenários de venda (diagnóstico / primeiro passo) vão para a
    // agenda do Google; "soluções prontas" (inicial) segue para o contato do site.
    if (result?.recommendation.reasonKey === 'inicial') {
      window.location.href = CONTACT_URL;
    } else {
      window.open(CALENDAR_URL, '_blank');
    }
  };

  return (
    <div className="mx-auto w-full max-w-xl rounded-xl border border-border bg-card/80 p-5 md:p-8 backdrop-blur-md">
      <AnimatePresence mode="wait">
        {stage === 'questions' && (
          <QuestionStep
            key={QUESTIONS[step].id}
            question={QUESTIONS[step]}
            index={step}
            total={QUESTIONS.length}
            selected={answers[QUESTIONS[step].id]}
            onSelect={handleSelect}
            onBack={handleBack}
          />
        )}
        {stage === 'gate' && result && (
          <ContactGate
            key="gate"
            estimate={result.estimate}
            isSubmitting={isSubmitting}
            onSubmit={handleContactSubmit}
          />
        )}
        {stage === 'result' && result && (
          <ResultView key="result" result={result} onCtaClick={handleCtaClick} />
        )}
      </AnimatePresence>
    </div>
  );
}
