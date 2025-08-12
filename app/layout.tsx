import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Eficienci IA | Do MVP ao Produto Robusto",
  description:
    "Automatizamos e evoluímos MVPs de IA para produtos escaláveis, seguros e prontos para o mundo real.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark scroll-smooth overflow-x-hidden">
      <body className={`${inter.className} antialiased overflow-x-hidden selection:bg-primary/20 selection:text-foreground`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}