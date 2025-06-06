"use client";

import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { ChevronRightIcon, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm py-2"
          : "bg-transparent py-4"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <motion.div
          className="text-2xl font-bold text-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Logo can be replaced with an actual image */}
          Eficienci IA
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLinks />
          <Button 
            size="sm" 
            className="rounded-full"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Quero transformar meu MVP
            <ChevronRightIcon className="ml-1 h-4 w-4" />
          </Button>
        </nav>

        {/* Mobile Navigation Toggle */}
        <button
          className="md:hidden text-primary focus:outline-none"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Fechar Menu" : "Abrir Menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden bg-card/95 backdrop-blur-md shadow-lg absolute top-full left-0 right-0"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
            <NavLinks mobile onClick={() => setIsMenuOpen(false)} />
            <Button 
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
              className="w-full rounded-full"
            >
              Quero transformar meu MVP
              <ChevronRightIcon className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}

function NavLinks({ mobile = false, onClick }: { mobile?: boolean; onClick?: () => void }) {
  const navItems = [
    { href: "#about", label: "Sobre Nós" },
    { href: "#solution", label: "Solução" },
    { href: "#value", label: "Por que Evoluir?" },
    { href: "#contact", label: "Contato" },
  ];

  return (
    <>
      {navItems.map((item, index) => (
        <motion.a
          key={item.href}
          href={item.href}
          className={cn(
            "text-foreground/80 hover:text-primary transition-colors",
            mobile && "block py-2 text-lg"
          )}
          onClick={onClick}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index }}
        >
          {item.label}
        </motion.a>
      ))}
    </>
  );
}