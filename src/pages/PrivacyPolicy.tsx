
import React from 'react';
import Layout from '@/components/Layout';
import { Separator } from '@/components/ui/separator';

const PrivacyPolicy: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Polityka Prywatności i Plików Cookie</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Informacje ogólne</h2>
            <p className="text-muted-foreground">
              Niniejsza Polityka Prywatności i Plików Cookie określa zasady przetwarzania i ochrony danych osobowych oraz wykorzystywania plików cookie w ramach serwisu APDocs.
            </p>
          </section>
          
          <Separator />
          
          <section>
            <h2 className="text-xl font-semibold mb-3">2. Administrator danych</h2>
            <p className="text-muted-foreground">
              Administratorem danych osobowych jest AP-Development.eu.
            </p>
          </section>
          
          <Separator />
          
          <section>
            <h2 className="text-xl font-semibold mb-3">3. Pliki Cookie</h2>
            <p className="text-muted-foreground mb-4">
              Serwis korzysta z plików cookie w celu personalizacji treści oraz analizowania ruchu na stronie.
            </p>
            <h3 className="text-lg font-medium mb-2">Czym są pliki cookie?</h3>
            <p className="text-muted-foreground mb-4">
              Pliki cookie to małe pliki tekstowe, które są przechowywane na urządzeniu użytkownika podczas przeglądania stron internetowych. Służą one do zapamiętywania preferencji użytkownika oraz ułatwiają korzystanie z witryny.
            </p>
            <h3 className="text-lg font-medium mb-2">Rodzaje wykorzystywanych plików cookie:</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>
                <strong>Niezbędne pliki cookie</strong> - konieczne do prawidłowego funkcjonowania serwisu
              </li>
              <li>
                <strong>Funkcjonalne pliki cookie</strong> - umożliwiające zapamiętywanie preferowanych ustawień użytkownika
              </li>
              <li>
                <strong>Analityczne pliki cookie</strong> - służące do analizy sposobu korzystania z serwisu
              </li>
            </ul>
          </section>
          
          <Separator />
          
          <section>
            <h2 className="text-xl font-semibold mb-3">4. Zarządzanie plikami cookie</h2>
            <p className="text-muted-foreground mb-4">
              Użytkownik może samodzielnie zarządzać plikami cookie, zmieniając ustawienia przeglądarki internetowej. Ograniczenie stosowania plików cookie może wpłynąć na funkcjonalność serwisu.
            </p>
            <p className="text-muted-foreground">
              Brak zmiany ustawień przeglądarki oznacza akceptację dla stosowanych plików cookie.
            </p>
          </section>
          
          <Separator />
          
          <section>
            <h2 className="text-xl font-semibold mb-3">5. Kontakt</h2>
            <p className="text-muted-foreground">
              W przypadku pytań dotyczących Polityki Prywatności i Plików Cookie, prosimy o kontakt pod adresem: info@ap-development.eu
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
