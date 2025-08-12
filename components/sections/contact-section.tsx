"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Digite um e-mail válido.",
  }),
  projectIdea: z.string().min(10, {
    message: "Descreva sua ideia com pelo menos 10 caracteres.",
  }),
  projectStage: z.string({
    required_error: "Selecione o estágio do seu projeto.",
  }),
  hasSalesChannel: z.string({
    required_error: "Selecione uma opção.",
  }),
  targetAudience: z.string().min(5, {
    message: "Descreva seu público-alvo com pelo menos 5 caracteres.",
  }),
  painPoint: z.string().min(10, {
    message: "Descreva a dor que seu projeto resolve com pelo menos 10 caracteres.",
  }),
  projectLinks: z.string().optional(),
});

export function ContactSection() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      projectIdea: "",
      painPoint: "",
      projectLinks: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Prepare the message body with all form fields
      const messageBody = `
        Nome: ${values.name}
        Email: ${values.email}
        Objetivos: ${values.projectIdea}
        Principal desafio de negócio: ${values.painPoint}
        Site ou rede social (opcional): ${values.projectLinks || 'Não informado'}
      `;

      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('message', messageBody);

      // Send the form data to FormSubmit
      const response = await fetch('https://formsubmit.co/adfariacarvalho@gmail.com', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        toast({
          title: "Formulário enviado com sucesso!",
          description: "Entraremos em contato em breve.",
        });
        form.reset();
      } else {
        throw new Error('Falha ao enviar o formulário');
      }
    } catch (error) {
      toast({
        title: "Erro ao enviar formulário",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive"
      });
    }
  }

  return (
    <section id="contact" className="py-12 bg-background relative">
      <div className="pointer-events-none absolute inset-0 tech-grid opacity-[0.16]" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Entre em contato conosco
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conte-nos sobre sua necessidade. Vamos desenhar uma solução de IA personalizada, com foco em performance, ROI e escalabilidade.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-2xl mx-auto bg-card/80 backdrop-blur-md rounded-lg shadow-lg border border-border p-4 md:p-6 neon-ring"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu nome completo" {...field} className="h-9" />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="seu@email.com" {...field} className="h-9" />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="projectIdea"
                render={({ field }) => (
                  <FormItem>
                     <FormLabel className="text-sm">Objetivos</FormLabel>
                    <FormControl>
                       <Textarea
                        placeholder="Descreva brevemente o objetivo e o impacto esperado (eficiência, receita, redução de custos)"
                        className="resize-none h-20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="painPoint"
                render={({ field }) => (
                  <FormItem>
                       <FormLabel className="text-sm">Principal desafio de negócio</FormLabel>
                    <FormControl>
                       <Textarea
                        placeholder="Quais indicadores você quer melhorar (tempo, custo, taxas de conversão, satisfação)?"
                        className="resize-none h-20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projectLinks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Site ou rede social (opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://www.seu-site.com.br" {...field} className="h-9" />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full h-9">
                Enviar
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  );
}