'use client';

import { createContext, useContext } from 'react';
import type { LandingContent } from './content/types';

// Conteúdo da versão atual da landing page. Cada rota passa o seu (geral, whatsapp, crm, processos).
const ContentContext = createContext<LandingContent | null>(null);

export function ContentProvider({ content, children }: { content: LandingContent; children: React.ReactNode }) {
  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const content = useContext(ContentContext);
  if (!content) throw new Error('useContent precisa estar dentro de <ContentProvider>');
  return content;
}
