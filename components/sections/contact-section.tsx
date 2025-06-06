"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

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
      projectStage: "",
      hasSalesChannel: "",
      targetAudience: "",
      painPoint: "",
      projectLinks: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Formulário enviado com sucesso!",
      description: "Entraremos em contato em breve.",
    });
    form.reset();
  }

  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Vamos dar o próximo passo no seu projeto de IA?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Conte-nos sobre sua ideia e como podemos ajudar a transformá-la em um produto robusto.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-3xl mx-auto bg-card rounded-xl shadow-lg border border-border p-6 md:p-8"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu nome completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="seu@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="projectIdea"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ideia do projeto</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descreva brevemente o que seu projeto faz"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="projectStage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Em que estágio está o projeto?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o estágio" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="validated_mvp">MVP validado</SelectItem>
                          <SelectItem value="not_validated">Sem validação</SelectItem>
                          <SelectItem value="paying_customers">Já tenho pagantes</SelectItem>
                          <SelectItem value="seeking_investment">Buscando investimento</SelectItem>
                          <SelectItem value="other">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hasSalesChannel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Já tem canal de vendas?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma opção" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="yes">Sim</SelectItem>
                          <SelectItem value="no">Não</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="targetAudience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Qual o público-alvo?</FormLabel>
                    <FormControl>
                      <Input placeholder="Descreva seu público-alvo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="painPoint"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Que dor o projeto resolve?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Qual problema seu projeto soluciona para os usuários"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projectLinks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Links do projeto (opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Sites, redes sociais, landing pages, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" size="lg" className="w-full">
                Enviar e conversar com um especialista
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  );
}