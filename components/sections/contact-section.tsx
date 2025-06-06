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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Prepare the message body with all form fields
      const messageBody = `
        Nome: ${values.name}
        Email: ${values.email}
        Ideia do Projeto: ${values.projectIdea}
        Estágio do Projeto: ${values.projectStage}
        Canal de Vendas: ${values.hasSalesChannel}
        Público-alvo: ${values.targetAudience}
        Dor que Resolve: ${values.painPoint}
        Links do Projeto: ${values.projectLinks || 'Não informado'}
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
    <section id="contact" className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Vamos dar o próximo passo no seu projeto?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conte-nos sobre sua ideia e como podemos ajudar a transformá-la em um produto robusto.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-2xl mx-auto bg-card rounded-lg shadow-lg border border-border p-4 md:p-6"
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
                    <FormLabel className="text-sm">Ideia do projeto</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descreva brevemente o que seu projeto faz"
                        className="resize-none h-20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="projectStage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Estágio do projeto</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-9">
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
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hasSalesChannel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Canal de vendas</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-9">
                            <SelectValue placeholder="Selecione uma opção" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="yes">Sim</SelectItem>
                          <SelectItem value="no">Não</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="targetAudience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Público-alvo</FormLabel>
                    <FormControl>
                      <Input placeholder="Descreva seu público-alvo" {...field} className="h-9" />
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
                    <FormLabel className="text-sm">Dor que resolve</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Qual problema seu projeto soluciona para os usuários"
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
                    <FormLabel className="text-sm">Links do projeto (opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Sites, redes sociais, landing pages, etc." {...field} className="h-9" />
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