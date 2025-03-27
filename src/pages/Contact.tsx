
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import emailjs from 'emailjs-com';
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
import { Mail, Send, ExternalLink, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

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
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    // Parametry dla wiadomości do właściciela – dodajemy "to_email"
    const templateParamsOwner = {
      from_name: values.name,
      from_email: values.email,
      subject: values.subject,
      message: values.message,
      to_email: "info@ap-development.eu", // adres, na który chcesz otrzymywać wiadomości
    };

    // Parametry dla wiadomości potwierdzającej dla użytkownika – tutaj "to_email" ustawiamy na adres użytkownika
    const templateParamsUser = {
      from_name: values.name,
      from_email: values.email,
      subject: values.subject,
      message: values.message,
      to_email: values.email,
    };

    console.log("USER_ID:", process.env.REACT_APP_EMAILJS_USER_ID);
    console.log("SERVICE_ID:", process.env.REACT_APP_EMAILJS_SERVICE_ID);
    console.log("TEMPLATE_ID:", process.env.REACT_APP_EMAILJS_TEMPLATE_ID);
    console.log("TEMPLATE_ID_CONFIRM:", process.env.REACT_APP_EMAILJS_TEMPLATE_ID_CONFIRM);
    console.log("test")
    // Wysyłka maila do właściciela
    emailjs
        .send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            templateParamsOwner,
            import.meta.env.VITE_EMAILJS_USER_ID
        )
        .then((resultOwner) => {
          console.log("Wiadomość do właściciela wysłana:", resultOwner);
          // Po wysłaniu do właściciela wysyłamy wiadomość potwierdzającą do użytkownika
          return emailjs.send(
              import.meta.env.VITE_EMAILJS_SERVICE_ID,
              import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CONFIRM,
              templateParamsUser,
              import.meta.env.VITE_EMAILJS_USER_ID
          );
        })
        .then((resultConfirm) => {
          console.log("Wiadomość potwierdzająca wysłana:", resultConfirm);
          setIsSubmitting(false);
          setIsSubmitted(true);
          toast({
            title: t('contact.form.success.title'),
            description: t('contact.form.success.desc'),
          });
          form.reset();
        })
        .catch((error) => {
          console.error("Błąd wysyłki wiadomości:", error);
          setIsSubmitting(false);
          toast({
            title: "Błąd",
            description: t('contact.form.error'),
          });
        });
  }

  return (
      <Layout>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-8">
            <div className="p-3 rounded-full bg-primary/10 mr-4">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">{t('contact.title')}</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-3">
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-medium mb-6">{t('contact.form.title')}</h2>

                {isSubmitted ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                      <h3 className="text-xl font-medium mb-2">{t('contact.form.success.title')}</h3>
                      <p className="text-muted-foreground mb-6">
                        {t('contact.form.success.desc')}
                      </p>
                      <Button onClick={() => setIsSubmitted(false)}>
                        {t('contact.form.newmessage')}
                      </Button>
                    </div>
                ) : (
                    <Form {...form}>
                      <form
                          onSubmit={form.handleSubmit(onSubmit)}
                          className="space-y-6"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>{t('contact.form.name')}</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Jan Kowalski" {...field} name="name" />
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
                                    <FormLabel>{t('contact.form.email')}</FormLabel>
                                    <FormControl>
                                      <Input placeholder="jan@example.com" {...field} name="email" />
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
                                  <FormLabel>{t('contact.form.subject')}</FormLabel>
                                  <FormControl>
                                    <Input placeholder="W sprawie współpracy..." {...field} name="subject" />
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
                                  <FormLabel>{t('contact.form.message')}</FormLabel>
                                  <FormControl>
                                    <Textarea
                                        placeholder="Treść Twojej wiadomości..."
                                        className="min-h-[150px]"
                                        {...field}
                                        name="message"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                          {isSubmitting ? (
                              <>{t('contact.form.sending')}</>
                          ) : (
                              <>
                                <Send className="mr-2 h-4 w-4" />
                                {t('contact.form.submit')}
                              </>
                          )}
                        </Button>
                      </form>
                    </Form>
                )}
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="bg-card rounded-lg p-6 shadow-sm mb-6">
                <h3 className="font-medium mb-4">{t('contact.info.title')}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>{t('contact.info.company')}:</strong> AP-Development.eu
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  <strong>{t('contact.info.email')}:</strong> info@ap-development.eu
                </p>

                <a
                    href="https://www.ap-development.eu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary hover:underline mt-4"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {t('contact.info.website')}
                </a>
              </div>

              <div className="bg-card rounded-lg p-6 shadow-sm">
                <h3 className="font-medium mb-4">{t('contact.support.title')}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('contact.support.desc1')}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t('contact.support.desc2')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
  );
};

export default Contact;
