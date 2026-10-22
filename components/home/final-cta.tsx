'use client';

import { useRef, useState, type FormEvent, type ReactNode } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Loader2, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { isValidBRPhone, maskBRPhone } from '@/lib/calculator/validate';
import { useContent } from './content-context';
import { site, whatsappHref } from './content/shared';
import { useLead } from './lead-context';
import { Container, CtaLink, DrawCheck, EASE, Reveal, Stagger, StaggerItem, useReduced } from './primitives';
import { track } from './track';

type Field = 'name' | 'phone' | 'company' | 'lgpd';
type Errors = Partial<Record<Field, string>>;

const PRIVACY = 'Política de Privacidade';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];

export function FinalCta() {
  const { finalCta, leaks, slug } = useContent();
  const f = finalCta.form;
  const [lgpdBefore, lgpdAfter] = f.lgpd.split(PRIVACY);
  const reduced = useReduced();
  const { marked } = useLead();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState({ name: '', phone: '', company: '', team: '', source: '', lgpd: false });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  const validate = (v = values): Errors => {
    const e: Errors = {};
    if (v.name.trim().length < 2) e.name = f.errors.name;
    if (!isValidBRPhone(v.phone)) e.phone = f.errors.phone;
    if (v.company.trim().length < 2) e.company = f.errors.company;
    if (!v.lgpd) e.lgpd = f.errors.lgpd;
    return e;
  };

  const set = <K extends keyof typeof values>(key: K, value: (typeof values)[K]) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (touched[key as Field]) setErrors(validate(next));
  };

  const blur = (key: Field) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors((prev) => ({ ...prev, [key]: validate()[key] }));
  };

  const leakTexts = marked.map((i) => leaks.items[i]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    setTouched({ name: true, phone: true, company: true, lgpd: true });
    const first = (['name', 'phone', 'company', 'lgpd'] as Field[]).find((k) => errs[k]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus('sending');
    const params = new URLSearchParams(window.location.search);
    const utms = Object.fromEntries(UTM_KEYS.filter((k) => params.get(k)).map((k) => [k, params.get(k)]));
    const payload = {
      origem: 'home-diagnostico',
      landing: slug,
      respostas: { [f.team]: values.team, [f.source]: values.source },
      nome: values.name.trim(),
      whatsapp: values.phone,
      empresa: values.company.trim(),
      pessoas_atendimento: values.team,
      origem_leads: values.source,
      lgpd_aceite: values.lgpd,
      vazamentos: leakTexts,
      ...utms,
      pagina_origem: window.location.href,
      referrer: document.referrer || undefined,
      enviado_em: new Date().toISOString(),
      // compatibilidade com o fluxo atual do n8n
      name: values.name.trim(),
      telefone: values.phone,
    };

    try {
      const res = await fetch(site.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(String(res.status));
      track('generate_lead', { location: 'final_cta' });
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  const done = status === 'done';

  return (
    <section id="contato" aria-labelledby="contato-title" className="ef-section bg-ink text-white">
      <Container className="grid items-start gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <Reveal>
          <h2 id="contato-title" className="ef-h2">
            {finalCta.title}
          </h2>
          <p className="mt-5 max-w-[520px] text-[17px] text-subtle-dark md:text-[18px]">{finalCta.support}</p>
          <Stagger as="ul" className="mt-8 flex flex-col gap-4">
            {finalCta.checks.map((c, i) => (
              <StaggerItem as="li" key={c} className="flex gap-3 text-[17px]">
                <DrawCheck className="mt-0.5 text-brand" delay={0.1 + i * 0.08} />
                {c}
              </StaggerItem>
            ))}
          </Stagger>
          <p className="mt-10 text-[16px] text-subtle-dark">
            {finalCta.whatsappLead}{' '}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('whatsapp_click', { location: 'final_cta' })}
              className="inline-flex min-h-[44px] items-center gap-1.5 font-bold text-white underline decoration-brand decoration-2 underline-offset-4 hover:text-brand"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={2} aria-hidden />
              {finalCta.whatsappLink}
            </a>
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="[perspective:1400px]">
            <motion.div
              className="relative [transform-style:preserve-3d]"
              initial={false}
              animate={{ rotateY: done && !reduced ? 180 : 0 }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              {/* frente: formulário */}
              <div
                className={cn(
                  'ef-light rounded-[24px] bg-surface p-6 text-copy transition-[visibility] [backface-visibility:hidden] md:p-8',
                  // some do tab order depois que o card vira (meio do flip)
                  done && 'invisible',
                  done && !reduced && 'delay-[400ms]'
                )}
              >
                <h3 className="font-display text-[26px] font-bold tracking-[-0.02em]">{f.title}</h3>
                <form ref={formRef} onSubmit={onSubmit} noValidate className="mt-6 flex flex-col gap-4">
                  <input type="hidden" name="vazamentos" value={leakTexts.join(' | ')} />
                  <TextField
                    name="name"
                    label={f.name}
                    autoComplete="name"
                    value={values.name}
                    error={errors.name}
                    onChange={(v) => set('name', v)}
                    onBlur={() => blur('name')}
                  />
                  <TextField
                    name="phone"
                    label={f.phone}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel-national"
                    placeholder={f.phonePlaceholder}
                    value={values.phone}
                    error={errors.phone}
                    onChange={(v) => set('phone', maskBRPhone(v))}
                    onBlur={() => blur('phone')}
                  />
                  <TextField
                    name="company"
                    label={f.company}
                    autoComplete="organization"
                    value={values.company}
                    error={errors.company}
                    onChange={(v) => set('company', v)}
                    onBlur={() => blur('company')}
                  />
                  <SelectField name="team" label={f.team} placeholder={f.selectPlaceholder} options={f.teamOptions} value={values.team} onChange={(v) => set('team', v)} />
                  <SelectField name="source" label={f.source} placeholder={f.selectPlaceholder} options={f.sourceOptions} value={values.source} onChange={(v) => set('source', v)} />

                  <div>
                    <label className="flex cursor-pointer gap-3 text-[14px] leading-[1.5] text-subtle">
                      <input
                        type="checkbox"
                        name="lgpd"
                        checked={values.lgpd}
                        onChange={(e) => {
                          set('lgpd', e.target.checked);
                          setTouched((t) => ({ ...t, lgpd: true }));
                        }}
                        aria-invalid={!!errors.lgpd}
                        aria-describedby={errors.lgpd ? 'err-lgpd' : undefined}
                        className="mt-0.5 h-5 w-5 shrink-0 accent-[#0E7490]"
                      />
                      <span>
                        {lgpdBefore}
                        <Link href="/privacidade" className="font-semibold text-brand-ink underline underline-offset-2">
                          {PRIVACY}
                        </Link>
                        {lgpdAfter}
                      </span>
                    </label>
                    <FieldError id="err-lgpd">{errors.lgpd}</FieldError>
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="mt-2 inline-flex min-h-[54px] items-center justify-center gap-2 rounded-[14px] bg-ink px-6 text-[16px] font-bold text-white transition-colors duration-200 hover:bg-ink-2 disabled:opacity-70"
                  >
                    {status === 'sending' && <Loader2 className="h-5 w-5 animate-spin" aria-hidden />}
                    {f.submit}
                  </button>
                  <p className="text-center text-[14px] text-subtle" role="status">
                    {status === 'error' ? <span className="font-semibold text-red-700">{f.errors.submit}</span> : f.micro}
                  </p>
                </form>
              </div>

              {/* verso: sucesso */}
              <div
                className={cn(
                  'ef-light absolute inset-0 flex flex-col items-center justify-center rounded-[24px] bg-surface p-8 text-center text-copy',
                  !reduced && '[backface-visibility:hidden] [transform:rotateY(180deg)]',
                  !done && 'invisible'
                )}
              >
                <AnimatePresence>{done && <SuccessCheck reduced={reduced} />}</AnimatePresence>
                <p className="mt-6 max-w-[320px] font-display text-[26px] font-bold leading-tight tracking-[-0.02em]" role="status">
                  {done ? f.success : ''}
                </p>
                <CtaLink href={whatsappHref} location="form_success" variant="dark" className="mt-8" arrow>
                  {f.successCta}
                </CtaLink>
              </div>
            </motion.div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function SuccessCheck({ reduced }: { reduced: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16 text-brand-ink" fill="none" aria-hidden>
      <motion.circle
        cx="32"
        cy="32"
        r="29"
        stroke="currentColor"
        strokeWidth="3"
        initial={{ pathLength: reduced ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.6, ease: EASE }}
      />
      <motion.path
        d="M20 33l8 8 16-17"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: reduced ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 1.05, ease: EASE }}
      />
    </svg>
  );
}

const inputBase =
  'mt-1.5 h-12 w-full rounded-[12px] border bg-surface px-4 text-[16px] text-copy outline-none transition-colors duration-200 placeholder:text-[#64748B]';

function TextField({
  name,
  label,
  value,
  error,
  onChange,
  onBlur,
  type = 'text',
  ...rest
}: {
  name: Field;
  label: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  type?: string;
  inputMode?: 'tel';
  autoComplete?: string;
  placeholder?: string;
}) {
  const id = `f-${name}`;
  return (
    <div>
      <label htmlFor={id} className="text-[14px] font-semibold text-copy">
        {label} <span className="text-subtle" aria-hidden>*</span>
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={!!error}
        aria-describedby={error ? `err-${name}` : undefined}
        className={cn(inputBase, error ? 'border-red-600' : 'border-[#CBD5E1] focus:border-brand-ink')}
        {...rest}
      />
      <FieldError id={`err-${name}`}>{error}</FieldError>
    </div>
  );
}

function SelectField({
  name,
  label,
  placeholder,
  options,
  value,
  onChange,
}: {
  name: string;
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  const id = `f-${name}`;
  return (
    <div>
      <label htmlFor={id} className="text-[14px] font-semibold text-copy">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(inputBase, 'appearance-none border-[#CBD5E1] pr-10 focus:border-brand-ink', !value && 'text-[#64748B]')}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o} className="text-copy">
              {o}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 mt-[3px] h-4 w-4 -translate-y-1/2 text-subtle" aria-hidden />
      </div>
    </div>
  );
}

function FieldError({ id, children }: { id: string; children?: ReactNode }) {
  return (
    <AnimatePresence initial={false}>
      {children && (
        <motion.p
          id={id}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-1.5 text-[13px] font-semibold text-red-700"
        >
          {children}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
