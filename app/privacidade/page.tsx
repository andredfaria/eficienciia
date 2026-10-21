import { Metadata } from 'next';
import Link from 'next/link';
import { fontVars } from '@/components/home/fonts';
import { site } from '@/components/home/content';
import { Container, Logo } from '@/components/home/primitives';
import { Footer } from '@/components/home/footer';

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Como a Eficienci IA coleta, usa e protege os seus dados pessoais, conforme a LGPD.',
  alternates: { canonical: `${site.url}/privacidade` },
};

// TEXTO BASE — revisar com assessoria jurídica antes de considerar final.
const sections = [
  {
    title: '1. Quem somos',
    body: `A Eficienci IA${site.cnpj ? `, inscrita no CNPJ ${site.cnpj}` : ''}, com sede em ${site.cityUf}, é a controladora dos dados pessoais tratados por meio deste site.`,
  },
  {
    title: '2. Quais dados coletamos',
    body: 'Coletamos os dados que você informa nos formulários (nome, WhatsApp, empresa, tamanho do time comercial, origem dos leads e respostas da calculadora), além de dados de navegação como páginas visitadas, parâmetros de campanha (UTMs) e cookies de medição.',
  },
  {
    title: '3. Para que usamos',
    body: 'Usamos seus dados para entrar em contato pelo WhatsApp, agendar e realizar o diagnóstico comercial, enviar a proposta, medir o desempenho das nossas campanhas e melhorar o site. Não vendemos seus dados.',
  },
  {
    title: '4. Base legal',
    body: 'O tratamento se baseia no seu consentimento (art. 7º, I, da LGPD), no procedimento preliminar a um contrato solicitado por você (art. 7º, V) e no nosso legítimo interesse em medir e melhorar nossos serviços (art. 7º, IX).',
  },
  {
    title: '5. Com quem compartilhamos',
    body: 'Compartilhamos dados apenas com fornecedores necessários para operar o serviço, como ferramentas de automação, CRM, hospedagem e medição (por exemplo, Google Analytics e Meta). Esses fornecedores tratam os dados conforme nossas instruções.',
  },
  {
    title: '6. Por quanto tempo guardamos',
    body: 'Mantemos os dados enquanto houver relação comercial ou interesse legítimo, e pelo prazo exigido por lei. Depois disso, os dados são excluídos ou anonimizados.',
  },
  {
    title: '7. Seus direitos',
    body: 'Você pode pedir a qualquer momento a confirmação do tratamento, acesso, correção, anonimização, portabilidade ou exclusão dos seus dados, além de revogar o consentimento. Basta falar com o nosso time pelos canais abaixo.',
  },
  {
    title: '8. Segurança',
    body: 'Adotamos medidas técnicas e administrativas para proteger seus dados contra acesso não autorizado, perda ou alteração, com acesso restrito às pessoas do time que precisam deles.',
  },
  {
    title: '9. Contato',
    body: `Para exercer seus direitos ou tirar dúvidas sobre esta política, fale com a gente pelo WhatsApp${site.email ? ` ou pelo e-mail ${site.email}` : ''}.`,
  },
];

export default function PrivacidadePage() {
  return (
    <div className={`ef ${fontVars}`}>
      <header className="border-b border-ink-line bg-ink">
        <Container className="flex h-[68px] items-center">
          <Link href="/" aria-label="Eficienci IA, voltar ao início" className="text-white">
            <Logo />
          </Link>
        </Container>
      </header>
      <main className="ef-light bg-surface py-16 md:py-24">
        <Container className="max-w-[820px]">
          <p className="mb-6 inline-flex rounded-full border border-dashed border-[#94A3B8] px-3 py-1 text-[13px] font-semibold text-subtle">
            Texto base em revisão jurídica
          </p>
          <h1 className="ef-h2 text-copy">Política de Privacidade</h1>
          <p className="mt-4 text-[15px] text-subtle">Última atualização: outubro de 2026</p>
          <div className="mt-10 flex flex-col gap-8">
            {sections.map((s) => (
              <section key={s.title}>
                <h2 className="font-display text-[22px] font-bold tracking-[-0.02em] text-copy">{s.title}</h2>
                <p className="mt-2 text-[17px] text-subtle">{s.body}</p>
              </section>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
