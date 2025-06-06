import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Eficienci IA | Do MVP ao Produto Robusto',
  description: 'Transformamos MVPs de IA em produtos escaláveis, seguros e prontos para o mundo real.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}