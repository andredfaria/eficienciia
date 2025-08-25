"use client";

import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { ChevronRightIcon, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // altura aproximada do header
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border neon-border neon-ring py-2"
          : "bg-transparent py-4"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <motion.div
          className="text-2xl font-bold text-primary neon-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            {/* <img
              src="/logo.png"
              alt="Eficienci IA Logo"
              width={40}
              height={40}
              className="h-10 w-auto"
            /> */}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Eficienci IA
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLinks />
          <Button 
            size="sm" 
            className="rounded-full hover:shadow-[0_0_0_1px_hsl(var(--primary)/.4),0_0_14px_hsl(var(--primary)/.35)]"
            onClick={() => scrollToSection('contact')}
          >
            Fale com Especialistas
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
          className="md:hidden bg-card/95 backdrop-blur-md shadow-lg absolute top-full left-0 right-0 neon-ring"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
            <NavLinks mobile onClick={() => setIsMenuOpen(false)} />
            <Button 
              onClick={() => {
                scrollToSection('contact');
                setIsMenuOpen(false);
              }}
              className="w-full rounded-full hover:shadow-[0_0_0_1px_hsl(var(--primary)/.4),0_0_14px_hsl(var(--primary)/.35)]"
            >
              Fale com Especialistas
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
    { href: "#services", label: "Serviços" },
    { href: "#methodology", label: "Metodologia" },
    { href: "#solution", label: "Soluções" },
    { href: "#contact", label: "Contato" },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // altura aproximada do header
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    if (onClick) onClick();
  };

  return (
    <>
      {navItems.map((item, index) => (
        <motion.a
          key={item.href}
          href={item.href}
          className={cn(
            "text-foreground/80 hover:text-primary transition-colors cursor-pointer",
            mobile && "block py-2 text-lg"
          )}
          onClick={(e) => handleClick(e, item.href.replace('#', ''))}
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