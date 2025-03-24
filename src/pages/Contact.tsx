import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Layout from '@/components/Layout';
import { Mail, Send, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Imię i nazwisko musi mieć co najmniej 2 znaki.',
  }),
  email: z.string().email({
    message: 'Proszę podać poprawny adres email.',
  }),
  subject: z.string().min(5, {
    message: 'Temat musi mieć co najmniej 5 znaków.',
  }),
  message: z.string().min(10, {
    message: 'Wiadomość musi mieć co najmniej 10 znaków.',
  }),
});

const Contact: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Send form data to PHP mailer
      const response = await fetch('/mailer.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(values as any).toString()
      });
      
      if (!response.ok) {
        throw new Error('Błąd podczas wysyłania wiadomości');
      }
      
      setIsSubmitted(true);
      form.reset();
      
      toast({
        title: "Wiadomość wysłana!",
        description: "Dziękujemy za kontakt. Odpowiemy najszybciej jak to możliwe.",
      });
    } catch (error) {
      console.error('Błąd wysyłania formularza:', error);
      setSubmitError(error instanceof Error ? error.message : 'Wystąpił nieznany błąd');
      
      toast({
        variant: "destructive",
        title: "Błąd wysyłania",
        description: "Nie udało się wysłać wiadomości. Spróbuj ponownie później.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-8">
          <div className="p-3 rounded-full bg-primary/10 mr-4">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Kontakt</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          <div className="md:col-span-3">
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-medium mb-6">Napisz do mnie</h2>
              
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                  <h3 className="text-xl font-medium mb-2">Wiadomość wysłana!</h3>
                  <p className="text-muted-foreground mb-6">
                    Dziękujemy za kontakt. Odpowiemy najszybciej jak to możliwe.
                  </p>
                  <Button onClick={() => setIsSubmitted(false)}>
                    Wyślij nową wiadomość
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form 
                    onSubmit={form.handleSubmit(onSubmit)} 
                    className="space-y-6"
                    method="POST"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Imię i nazwisko</FormLabel>
                            <FormControl>
                              <Input placeholder="Jan Kowalski" {...field} />
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
                              <Input placeholder="jan@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Temat</FormLabel>
                          <FormControl>
                            <Input placeholder="W sprawie współpracy..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Wiadomość</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Treść Twojej wiadomości..." 
                              className="min-h-[150px]" 
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {submitError && (
                      <div className="bg-destructive/10 text-destructive p-3 rounded-md flex items-start">
                        <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{submitError}</p>
                      </div>
                    )}
                    
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>Wysyłanie...</>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Wyślij wiadomość
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              )}
              
              <div className="mt-6 text-sm text-muted-foreground border-t pt-4">
                <p>
                  <strong>Uwaga:</strong> Aby wysłać wiadomość bezpośrednio, napisz email na adres{' '}
                  <a href="mailto:info@ap-development.eu" className="text-primary hover:underline">
                    info@ap-development.eu
                  </a>
                </p>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="bg-card rounded-lg p-6 shadow-sm mb-6">
              <h3 className="font-medium mb-4">Dane kontaktowe</h3>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Firma:</strong> AP-Development.eu
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                <strong>Email:</strong> info@ap-development.eu
              </p>
              
              <a 
                href="https://www.ap-development.eu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-primary hover:underline mt-4"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Odwiedź naszą stronę
              </a>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="font-medium mb-4">Wesprzyj projekt</h3>
              <p className="text-sm text-muted-foreground mb-4">
                APDocs jest całkowicie darmowym narzędziem, które rozwijam w ramach swojej pasji do tworzenia
                użytecznych aplikacji. Jeśli chcesz wesprzeć dalszy rozwój tego narzędzia, możesz to zrobić 
                poprzez kontakt lub współpracę.
              </p>
              <p className="text-sm text-muted-foreground">
                Twoje wsparcie pomaga mi utrzymać aplikację darmową i dostępną dla wszystkich.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
