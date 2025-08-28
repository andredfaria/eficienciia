import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, ArrowLeft, Search, Zap } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 px-4">
      <div className="max-w-2xl w-full">
        <Card className="border-0 shadow-2xl bg-background/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mb-6">
              <Zap className="w-12 h-12 text-primary" />
            </div>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              404
            </CardTitle>
            <CardDescription className="text-xl text-muted-foreground">
              Página não encontrada
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <p className="text-muted-foreground text-lg">
                Ops! Parece que você se perdeu no caminho digital. 
                A página que você está procurando não existe ou foi movida.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="/" className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    Voltar ao Início
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                  <Link href="/project" className="flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    Ver Projetos
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="border-t pt-6">
              <div className="text-center space-y-3">
                <p className="text-sm text-muted-foreground">
                  Precisa de ajuda? Entre em contato conosco
                </p>
                <div className="flex justify-center gap-4 text-sm">
                  <Link 
                    href="mailto:contato@eficienciia.com.br" 
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    contato@eficienciia.com.br
                  </Link>
                  <span className="text-muted-foreground">|</span>
                  <Link 
                    href="https://wa.me/5535991404064" 
                    className="text-primary hover:text-primary/80 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Decorative elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}

