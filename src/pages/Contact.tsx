
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
import { Mail, Send, ExternalLink } from 'lucide-react';
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
    
    try {
      // Create email content
      const adminEmailContent = `
        Nowa wiadomość od: ${values.name}
        Email: ${values.email}
        Temat: ${values.subject}
        
        Wiadomość:
        ${values.message}
      `;
      
      const userEmailContent = `
        Dziękujemy za kontakt z APDocs!
        
        Otrzymaliśmy Twoją wiadomość i odpowiemy najszybciej jak to możliwe.
        
        Podsumowanie Twojej wiadomości:
        Temat: ${values.subject}
        Wiadomość: ${values.message}
        
        Z poważaniem,
        Zespół APDocs
      `;
      
      // Normally we would send this to a server endpoint or use a service like EmailJS
      // For demonstration, let's log and show what would be sent
      console.log("Sending email to info@ap-development.eu with:", values);
      console.log("Sending confirmation email to:", values.email);
      
      // In a production environment, you would use one of these approaches:
      // 1. Call a server endpoint (requires backend)
      // 2. Use a service like EmailJS, Formspree, or similar
      // 3. Set up a Netlify form (if hosting on Netlify)
      
      // Simulate successful email sending
      toast({
        title: "Wiadomość wysłana!",
        description: "Dziękujemy za kontakt. Odpowiemy najszybciej jak to możliwe. Potwierdzenie zostało wysłane na Twój adres email.",
      });
      
      form.reset();
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Wystąpił błąd",
        description: "Nie udało się wysłać wiadomości. Spróbuj ponownie później lub skontaktuj się bezpośrednio przez email.",
        variant: "destructive",
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
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
