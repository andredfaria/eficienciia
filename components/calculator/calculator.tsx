'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { computeResult, type Answers } from '@/lib/calculator';
import { QUESTIONS } from './questions';
import { QuestionStep } from './question-step';
import { ContactGate, type ContactData } from './contact-gate';
import { ResultView } from './result-view';

const WEBHOOK_URL = 'https://n8n.eficienciia.com.br/webhook/salva-formulario';
const CONTACT_URL = '/#contact';
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
    const res = computeResult(answers as Answers);
    const payload = {
      ...contact,
      origem: 'calculadora-roi',
      segmento: (answers as Answers).segment,
      respostas: answers,
      lead_score: res.score,
      classificacao: res.recommendation.classification,
      recomendacao: res.recommendation.pillar,
      motivo: res.recommendation.reasonKey,
      estimativas: {
        economia_mes: Math.round(res.estimate.economiaMes),
        economia_ano: Math.round(res.estimate.economiaAno),
        horas_liberadas_mes: Math.round(res.estimate.horasLiberadasMes),
        payback_meses: Number.isFinite(res.financials.paybackMeses)
          ? Math.round(res.financials.paybackMeses)
          : null,
        roi_ano_pct: Math.round(res.financials.roiAnoPct),
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
    } else {
      window.location.href = CONTACT_URL;
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
            horasLiberadasMes={result.estimate.horasLiberadasMes}
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
