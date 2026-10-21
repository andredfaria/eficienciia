'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';

// Vazamentos marcados na seção Leaks, enviados junto com o formulário final.
type LeadState = { marked: number[]; toggle: (i: number) => void };

const LeadContext = createContext<LeadState>({ marked: [], toggle: () => {} });

export function LeadProvider({ children }: { children: React.ReactNode }) {
  const [marked, setMarked] = useState<number[]>([]);
  const toggle = useCallback(
    (i: number) => setMarked((m) => (m.includes(i) ? m.filter((x) => x !== i) : [...m, i].sort((a, b) => a - b))),
    []
  );
  const value = useMemo(() => ({ marked, toggle }), [marked, toggle]);
  return <LeadContext.Provider value={value}>{children}</LeadContext.Provider>;
}

export const useLead = () => useContext(LeadContext);
