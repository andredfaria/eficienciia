'use client';

import Link from 'next/link';
import { footer, landingPages, site } from './content/shared';
import { Container, Logo } from './primitives';
import { track } from './track';

export function Footer() {
  const year = new Date().getFullYear();
  const legal = [site.cnpj && `CNPJ ${site.cnpj}`, site.cityUf, `© ${year}`].filter(Boolean).join(' · ');
  const links = site.email ? [footer.links[0], { label: site.email, href: `mailto:${site.email}`, external: true }, ...footer.links.slice(1)] : footer.links;

  return (
    <footer className="border-t border-ink-line bg-ink text-white">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_1fr] md:items-start">
        <div>
          <Logo />
          <p className="mt-4 max-w-[360px] text-[15px] text-subtle-dark">{site.tagline}</p>
          <p className="mt-6 text-[14px] text-subtle-dark">{legal}</p>
        </div>
        <nav aria-label="Soluções">
          <p className="ef-eyebrow mb-2">Soluções</p>
          <ul className="flex flex-col">
            {landingPages.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  className="inline-flex min-h-[40px] items-center text-[15px] font-semibold text-subtle-dark transition-colors duration-200 hover:text-white"
                >
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Rodapé">
          <ul className="flex flex-wrap gap-x-6 gap-y-1 md:max-w-[360px]">
            {links.map((l) => (
              <li key={l.label}>
                {l.external ? (
                  <a
                    href={l.href}
                    target={l.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    onClick={() => l.href.includes('wa.me') && track('whatsapp_click', { location: 'footer' })}
                    className="inline-flex min-h-[44px] items-center text-[15px] font-semibold text-subtle-dark transition-colors duration-200 hover:text-white"
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link
                    href={l.href}
                    className="inline-flex min-h-[44px] items-center text-[15px] font-semibold text-subtle-dark transition-colors duration-200 hover:text-white"
                  >
                    {l.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
