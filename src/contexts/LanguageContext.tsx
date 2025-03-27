
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define available languages
export type Language = 'pl' | 'en' | 'de';

// Language context type
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Create provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Get initial language from localStorage or use Polish as default
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['pl', 'en', 'de'].includes(savedLanguage)) {
      return savedLanguage;
    }
    return 'pl';
  });

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
    // Update HTML lang attribute for accessibility
    document.documentElement.lang = language;
  }, [language]);

  // Function to change language
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translations dictionary
const translations: Record<Language, Record<string, string>> = {
  pl: {
    // Common
    'app.name': 'APDocs',
    'app.tagline': 'Twoje profesjonalne dokumenty. Szybko i prosto.',
    'app.description': 'APDocs to nowoczesna aplikacja, która pomoże Ci stworzyć profesjonalne dokumenty w kilka minut.',
    'app.subtitle': 'Twórz profesjonalne dokumenty w minutę',
    
    // Navigation
    'nav.home': 'Strona główna',
    'nav.editor': 'Edytor',
    'nav.about': 'O mnie',
    'nav.contact': 'Kontakt',
    'nav.privacy': 'Polityka prywatności i cookies',
    
    // Buttons
    'button.start': 'Rozpocznij teraz',
    'button.learn': 'Dowiedz się więcej',
    
    // Features section
    'features.title': 'Dlaczego APDocs?',
    'features.subtitle': 'Narzędzie stworzone, aby ułatwić i przyspieszyć proces tworzenia profesjonalnych dokumentów.',
    'features.templates.title': 'Profesjonalne szablony',
    'features.templates.desc': 'Różnorodne szablony dokumentów dostosowane do różnych branż i potrzeb.',
    'features.ease.title': 'Łatwe w użyciu',
    'features.ease.desc': 'Intuicyjny interfejs, który przeprowadzi Cię krok po kroku przez proces tworzenia dokumentu.',
    'features.custom.title': 'Zaawansowana personalizacja',
    'features.custom.desc': 'Pełna kontrola nad wyglądem i zawartością dokumentów, dostosowanych do Twoich potrzeb.',
    
    // Roadmap section (kept for reference)
    'roadmap.title': 'Co planujemy w przyszłości?',
    'roadmap.subtitle': 'APDocs stale się rozwija. Oto co przygotowujemy dla Ciebie.',
    'roadmap.label': 'Plany rozwoju',
    'roadmap.templates.title': 'Więcej szablonów dokumentów',
    'roadmap.templates.desc': 'Dodanie nowych profesjonalnych szablonów CV, listów motywacyjnych i innych dokumentów biznesowych.',
    'roadmap.languages.title': 'Wsparcie wielu języków',
    'roadmap.languages.desc': 'Tłumaczenie interfejsu i szablonów na popularne języki w celu poszerzenia dostępności.',
    'roadmap.sharing.title': 'Współpraca i udostępnianie',
    'roadmap.sharing.desc': 'Możliwość udostępniania dokumentów i współpracy z innymi użytkownikami w czasie rzeczywistym.',
    'roadmap.pro.title': 'Wersja profesjonalna',
    'roadmap.pro.desc': 'Subskrypcja oferująca zaawansowane funkcje, przechowywanie w chmurze i wsparcie priorytetowe.',
    
    // CTA section
    'cta.title': 'Gotowy do tworzenia profesjonalnych dokumentów?',
    'cta.subtitle': 'Dołącz do tysięcy zadowolonych użytkowników i zacznij tworzyć profesjonalne dokumenty już dziś.',
    
    // Footer
    'footer.rights': 'Wszystkie prawa zastrzeżone.',
    
    // About page
    'about.title': 'O mnie',
    'about.whoami': 'Kim jestem',
    'about.approach': 'Moje podejście do pracy',
    'about.project': 'O projekcie APDocs',
    'about.visit': 'Odwiedź AP-Development.eu',
    'about.support': 'Wesprzyj projekt',
    
    // Contact page
    'contact.title': 'Kontakt',
    'contact.form.title': 'Napisz do mnie',
    'contact.form.name': 'Imię i nazwisko',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Temat',
    'contact.form.message': 'Wiadomość',
    'contact.form.submit': 'Wyślij wiadomość',
    'contact.form.sending': 'Wysyłanie...',
    'contact.form.success.title': 'Wiadomość wysłana!',
    'contact.form.success.desc': 'Dziękujemy za kontakt. Odpowiemy najszybciej jak to możliwe.',
    'contact.form.newmessage': 'Wyślij nową wiadomość',
    'contact.form.error': 'Wystąpił problem przy wysyłaniu wiadomości',
    'contact.info.title': 'Dane kontaktowe',
    'contact.info.company': 'Firma',
    'contact.info.email': 'Email',
    'contact.info.website': 'Odwiedź naszą stronę',
    'contact.support.title': 'Wesprzyj projekt',
    'contact.support.desc1': 'APDocs jest całkowicie darmowym narzędziem, które rozwijam w ramach swojej pasji do tworzenia użytecznych aplikacji. Jeśli chcesz wesprzeć dalszy rozwój tego narzędzia, możesz to zrobić poprzez kontakt lub współpracę.',
    'contact.support.desc2': 'Twoje wsparcie pomaga mi utrzymać aplikację darmową i dostępną dla wszystkich.',
    
    // Privacy policy page
    'privacy.cookie.title':'Polityka cookie',
    'privacy.cookie.content':' Ta strona używa plików cookie, aby zapewnić najlepsze doświadczenie użytkownika. Korzystając z naszej strony, zgadzasz się na używanie plików cookie zgodnie z naszą',
    'privacy.title': 'Polityka Prywatności i Plików Cookie',
    'privacy.section1.title': '1. Informacje ogólne',
    'privacy.section1.content': 'Niniejsza Polityka Prywatności i Plików Cookie określa zasady przetwarzania i ochrony danych osobowych oraz wykorzystywania plików cookie w ramach serwisu APDocs.',
    'privacy.section2.title': '2. Administrator danych',
    'privacy.section2.content': 'Administratorem danych osobowych jest AP-Development.eu.',
    'privacy.section3.title': '3. Pliki Cookie',
    'privacy.section3.content': 'Serwis korzysta z plików cookie w celu personalizacji treści oraz analizowania ruchu na stronie.',
    'privacy.section3.what.title': 'Czym są pliki cookie?',
    'privacy.section3.what.content': 'Pliki cookie to małe pliki tekstowe, które są przechowywane na urządzeniu użytkownika podczas przeglądania stron internetowych. Służą one do zapamiętywania preferencji użytkownika oraz ułatwiają korzystanie z witryny.',
    'privacy.section3.types.title': 'Rodzaje wykorzystywanych plików cookie:',
    'privacy.section3.types.necessary': 'Niezbędne pliki cookie - konieczne do prawidłowego funkcjonowania serwisu',
    'privacy.section3.types.functional': 'Funkcjonalne pliki cookie - umożliwiające zapamiętywanie preferowanych ustawień użytkownika',
    'privacy.section3.types.analytical': 'Analityczne pliki cookie - służące do analizy sposobu korzystania z serwisu',
    'privacy.section4.title': '4. Zarządzanie plikami cookie',
    'privacy.section4.content1': 'Użytkownik może samodzielnie zarządzać plikami cookie, zmieniając ustawienia przeglądarki internetowej. Ograniczenie stosowania plików cookie może wpłynąć na funkcjonalność serwisu.',
    'privacy.section4.content2': 'Brak zmiany ustawień przeglądarki oznacza akceptację dla stosowanych plików cookie.',
    'privacy.section5.title': '5. Kontakt',
    'privacy.section5.content': 'W przypadku pytań dotyczących Polityki Prywatności i Plików Cookie, prosimy o kontakt pod adresem: info@ap-development.eu',
    
    // Cookie consent
    'cookie.message': 'Używamy plików cookie, aby zapewnić najlepsze doświadczenia na naszej stronie.',
    'cookie.accept': 'Akceptuję',
    'cookie.learnMore': 'Dowiedz się więcej',
    
    // Editor page
    'editor.title': 'Edytor dokumentów',
    'editor.subtitle': 'Stwórz profesjonalny dokument w kilku prostych krokach',
    'editor.step.type': 'Wybierz typ dokumentu',
    'editor.step.template': 'Wybierz szablon',
    'editor.export.title': 'Eksport PDF',
    'editor.export.success': 'Dokument został wygenerowany i pobrany.',
    'editor.export.error': 'Nie udało się wygenerować dokumentu PDF.',
    'editor.section.personal': 'Dane osobowe',
    'editor.section.recipient': 'Odbiorca',
    'editor.section.content': 'Treść listu',
    'editor.section.clause': 'Klauzula',
    'editor.section.config': 'Konfiguracja',
    'editor.section.experience': 'Doświadczenie',
    'editor.section.education': 'Wykształcenie',
    'editor.section.skills': 'Umiejętności',
    'editor.section.languages': 'Języki obce',
    'editor.section.interests': 'Zainteresowania',
  },
  
  en: {
    // Common
    'app.name': 'APDocs',
    'app.tagline': 'Your professional documents. Quick and easy.',
    'app.description': 'APDocs is a modern application that will help you create professional documents in minutes.',
    'app.subtitle': 'Create professional documents in a minute',
    
    // Navigation
    'nav.home': 'Home',
    'nav.editor': 'Editor',
    'nav.about': 'About me',
    'nav.contact': 'Contact',
    'nav.privacy': 'Privacy and cookies policy',
    
    // Buttons
    'button.start': 'Start now',
    'button.learn': 'Learn more',
    
    // Features section
    'features.title': 'Why APDocs?',
    'features.subtitle': 'A tool designed to simplify and speed up the process of creating professional documents.',
    'features.templates.title': 'Professional templates',
    'features.templates.desc': 'Various document templates tailored to different industries and needs.',
    'features.ease.title': 'Easy to use',
    'features.ease.desc': 'An intuitive interface that guides you step by step through the document creation process.',
    'features.custom.title': 'Advanced customization',
    'features.custom.desc': 'Full control over the appearance and content of documents, tailored to your needs.',
    
    // Roadmap section (kept for reference)
    'roadmap.title': 'What are we planning for the future?',
    'roadmap.subtitle': 'APDocs is constantly evolving. Here is what we are preparing for you.',
    'roadmap.label': 'Development plans',
    'roadmap.templates.title': 'More document templates',
    'roadmap.templates.desc': 'Adding new professional CV templates, cover letters and other business documents.',
    'roadmap.languages.title': 'Multi-language support',
    'roadmap.languages.desc': 'Translating the interface and templates into popular languages to expand accessibility.',
    'roadmap.sharing.title': 'Collaboration and sharing',
    'roadmap.sharing.desc': 'The ability to share documents and collaborate with other users in real time.',
    'roadmap.pro.title': 'Professional version',
    'roadmap.pro.desc': 'Subscription offering advanced features, cloud storage and priority support.',
    
    // CTA section
    'cta.title': 'Ready to create professional documents?',
    'cta.subtitle': 'Join thousands of satisfied users and start creating professional documents today.',
    
    // Footer
    'footer.rights': 'All rights reserved.',
    
    // About page
    'about.title': 'About me',
    'about.whoami': 'Who I am',
    'about.approach': 'My approach to work',
    'about.project': 'About the APDocs project',
    'about.visit': 'Visit AP-Development.eu',
    'about.support': 'Support the project',
    
    // Contact page
    'contact.title': 'Contact',
    'contact.form.title': 'Write to me',
    'contact.form.name': 'Full name',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send message',
    'contact.form.sending': 'Sending...',
    'contact.form.success.title': 'Message sent!',
    'contact.form.success.desc': 'Thank you for contacting us. We will respond as soon as possible.',
    'contact.form.newmessage': 'Send a new message',
    'contact.form.error': 'There was a problem sending your message',
    'contact.info.title': 'Contact information',
    'contact.info.company': 'Company',
    'contact.info.email': 'Email',
    'contact.info.website': 'Visit our website',
    'contact.support.title': 'Support the project',
    'contact.support.desc1': 'APDocs is a completely free tool that I develop as part of my passion for creating useful applications. If you want to support the further development of this tool, you can do so through contact or cooperation.',
    'contact.support.desc2': 'Your support helps me keep the application free and available to everyone.',
    
    // Privacy policy page
    'privacy.cookie.title':'Cookie Policy',
    'privacy.title': 'Privacy and Cookies Policy',
    'privacy.section1.title': '1. General Information',
    'privacy.section1.content': 'This Privacy and Cookie Policy defines the rules for processing and protecting personal data and the use of cookies within the APDocs service.',
    'privacy.section2.title': '2. Data Administrator',
    'privacy.section2.content': 'The administrator of personal data is AP-Development.eu.',
    'privacy.section3.title': '3. Cookies',
    'privacy.section3.content': 'The service uses cookies to personalize content and analyze site traffic.',
    'privacy.section3.what.title': 'What are cookies?',
    'privacy.section3.what.content': 'Cookies are small text files that are stored on the user\'s device while browsing websites. They are used to remember user preferences and make it easier to use the website.',
    'privacy.section3.types.title': 'Types of cookies used:',
    'privacy.section3.types.necessary': 'Necessary cookies - required for the proper functioning of the service',
    'privacy.section3.types.functional': 'Functional cookies - allowing to remember the user\'s preferred settings',
    'privacy.section3.types.analytical': 'Analytical cookies - used to analyze how the service is used',
    'privacy.section4.title': '4. Cookie Management',
    'privacy.section4.content1': 'The user can manage cookies themselves by changing the settings of their web browser. Limiting the use of cookies may affect the functionality of the service.',
    'privacy.section4.content2': 'Failure to change browser settings means acceptance of the cookies used.',
    'privacy.section5.title': '5. Contact',
    'privacy.section5.content': 'If you have any questions regarding the Privacy and Cookie Policy, please contact us at: info@ap-development.eu',
    
    // Cookie consent
    'cookie.message': 'We use cookies to ensure the best experience on our website.',
    'cookie.accept': 'Accept',
    'cookie.learnMore': 'Learn more',
    
    // Editor page
    'editor.title': 'Document Editor',
    'editor.subtitle': 'Create a professional document in a few simple steps',
    'editor.step.type': 'Choose document type',
    'editor.step.template': 'Choose template',
    'editor.export.title': 'PDF Export',
    'editor.export.success': 'The document has been generated and downloaded.',
    'editor.export.error': 'Failed to generate PDF document.',
    'editor.section.personal': 'Personal data',
    'editor.section.recipient': 'Recipient',
    'editor.section.content': 'Letter content',
    'editor.section.clause': 'Clause',
    'editor.section.config': 'Configuration',
    'editor.section.experience': 'Experience',
    'editor.section.education': 'Education',
    'editor.section.skills': 'Skills',
    'editor.section.languages': 'Languages',
    'editor.section.interests': 'Interests',
  },
  
  de: {
    // Common
    'app.name': 'APDocs',
    'app.tagline': 'Ihre professionellen Dokumente. Schnell und einfach.',
    'app.description': 'APDocs ist eine moderne Anwendung, die Ihnen hilft, professionelle Dokumente in Minuten zu erstellen.',
    'app.subtitle': 'Erstellen Sie professionelle Dokumente in einer Minute',
    
    // Navigation
    'nav.home': 'Startseite',
    'nav.editor': 'Editor',
    'nav.about': 'Über mich',
    'nav.contact': 'Kontakt',
    'nav.privacy': 'Datenschutz- und Cookie-Richtlinie',
    
    // Buttons
    'button.start': 'Jetzt starten',
    'button.learn': 'Mehr erfahren',
    
    // Features section
    'features.title': 'Warum APDocs?',
    'features.subtitle': 'Ein Tool, das den Prozess der Erstellung professioneller Dokumente vereinfacht und beschleunigt.',
    'features.templates.title': 'Professionelle Vorlagen',
    'features.templates.desc': 'Verschiedene Dokumentvorlagen, die auf unterschiedliche Branchen und Bedürfnisse zugeschnitten sind.',
    'features.ease.title': 'Einfach zu bedienen',
    'features.ease.desc': 'Eine intuitive Benutzeroberfläche, die Sie Schritt für Schritt durch den Prozess der Dokumentenerstellung führt.',
    'features.custom.title': 'Erweiterte Anpassung',
    'features.custom.desc': 'Volle Kontrolle über das Aussehen und den Inhalt von Dokumenten, angepasst an Ihre Bedürfnisse.',
    
    // Roadmap section (kept for reference)
    'roadmap.title': 'Was planen wir für die Zukunft?',
    'roadmap.subtitle': 'APDocs entwickelt sich ständig weiter. Hier ist, was wir für Sie vorbereiten.',
    'roadmap.label': 'Entwicklungspläne',
    'roadmap.templates.title': 'Mehr Dokumentvorlagen',
    'roadmap.templates.desc': 'Hinzufügen neuer professioneller Lebenslaufvorlagen, Anschreiben und anderer Geschäftsdokumente.',
    'roadmap.languages.title': 'Mehrsprachige Unterstützung',
    'roadmap.languages.desc': 'Übersetzung der Benutzeroberfläche und Vorlagen in gängige Sprachen, um die Zugänglichkeit zu erweitern.',
    'roadmap.sharing.title': 'Zusammenarbeit und Teilen',
    'roadmap.sharing.desc': 'Die Möglichkeit, Dokumente zu teilen und in Echtzeit mit anderen Benutzern zusammenzuarbeiten.',
    'roadmap.pro.title': 'Professionelle Version',
    'roadmap.pro.desc': 'Abonnement mit erweiterten Funktionen, Cloud-Speicher und prioritärem Support.',
    
    // CTA section
    'cta.title': 'Bereit, professionelle Dokumente zu erstellen?',
    'cta.subtitle': 'Schließen Sie sich Tausenden zufriedener Benutzer an und beginnen Sie noch heute mit der Erstellung professioneller Dokumente.',
    
    // Footer
    'footer.rights': 'Alle Rechte vorbehalten.',
    
    // About page
    'about.title': 'Über mich',
    'about.whoami': 'Wer ich bin',
    'about.approach': 'Mein Arbeitsansatz',
    'about.project': 'Über das APDocs-Projekt',
    'about.visit': 'Besuchen Sie AP-Development.eu',
    'about.support': 'Unterstützen Sie das Projekt',
    
    // Contact page
    'contact.title': 'Kontakt',
    'contact.form.title': 'Schreiben Sie mir',
    'contact.form.name': 'Vollständiger Name',
    'contact.form.email': 'E-Mail',
    'contact.form.subject': 'Betreff',
    'contact.form.message': 'Nachricht',
    'contact.form.submit': 'Nachricht senden',
    'contact.form.sending': 'Senden...',
    'contact.form.success.title': 'Nachricht gesendet!',
    'contact.form.success.desc': 'Vielen Dank für Ihre Kontaktaufnahme. Wir werden so schnell wie möglich antworten.',
    'contact.form.newmessage': 'Neue Nachricht senden',
    'contact.form.error': 'Es gab ein Problem beim Senden Ihrer Nachricht',
    'contact.info.title': 'Kontaktinformationen',
    'contact.info.company': 'Unternehmen',
    'contact.info.email': 'E-Mail',
    'contact.info.website': 'Besuchen Sie unsere Website',
    'contact.support.title': 'Unterstützen Sie das Projekt',
    'contact.support.desc1': 'APDocs ist ein völlig kostenloses Tool, das ich im Rahmen meiner Leidenschaft für die Erstellung nützlicher Anwendungen entwickle. Wenn Sie die Weiterentwicklung dieses Tools unterstützen möchten, können Sie dies durch Kontakt oder Zusammenarbeit tun.',
    'contact.support.desc2': 'Ihre Unterstützung hilft mir, die Anwendung kostenlos und für alle verfügbar zu halten.',
    
    // Privacy policy page
    'privacy.title': 'Datenschutz- und Cookie-Richtlinie',
    'privacy.section1.title': '1. Allgemeine Informationen',
    'privacy.section1.content': 'Diese Datenschutz- und Cookie-Richtlinie definiert die Regeln für die Verarbeitung und den Schutz personenbezogener Daten sowie die Verwendung von Cookies im Rahmen des APDocs-Dienstes.',
    'privacy.section2.title': '2. Datenverwalter',
    'privacy.section2.content': 'Der Verwalter personenbezogener Daten ist AP-Development.eu.',
    'privacy.section3.title': '3. Cookies',
    'privacy.section3.content': 'Der Dienst verwendet Cookies, um Inhalte zu personalisieren und den Website-Verkehr zu analysieren.',
    'privacy.section3.what.title': 'Was sind Cookies?',
    'privacy.section3.what.content': 'Cookies sind kleine Textdateien, die beim Surfen auf Websites auf dem Gerät des Benutzers gespeichert werden. Sie dienen dazu, die Benutzereinstellungen zu speichern und die Nutzung der Website zu erleichtern.',
    'privacy.section3.types.title': 'Arten von verwendeten Cookies:',
    'privacy.section3.types.necessary': 'Notwendige Cookies - erforderlich für das ordnungsgemäße Funktionieren des Dienstes',
    'privacy.section3.types.functional': 'Funktionale Cookies - ermöglichen das Speichern der bevorzugten Einstellungen des Benutzers',
    'privacy.section3.types.analytical': 'Analytische Cookies - dienen zur Analyse der Nutzung des Dienstes',
    'privacy.section4.title': '4. Cookie-Verwaltung',
    'privacy.section4.content1': 'Der Benutzer kann Cookies selbst verwalten, indem er die Einstellungen seines Webbrowsers ändert. Die Einschränkung der Verwendung von Cookies kann die Funktionalität des Dienstes beeinträchtigen.',
    'privacy.section4.content2': 'Wenn die Browser-Einstellungen nicht geändert werden, bedeutet dies, dass die verwendeten Cookies akzeptiert werden.',
    'privacy.section5.title': '5. Kontakt',
    'privacy.section5.content': 'Bei Fragen zur Datenschutz- und Cookie-Richtlinie kontaktieren Sie uns bitte unter: info@ap-development.eu',
    
    // Cookie consent
    'cookie.message': 'Wir verwenden Cookies, um das beste Erlebnis auf unserer Website zu gewährleisten.',
    'cookie.accept': 'Akzeptieren',
    'cookie.learnMore': 'Mehr erfahren',
    
    // Editor page
    'editor.title': 'Dokumenten-Editor',
    'editor.subtitle': 'Erstellen Sie ein professionelles Dokument in wenigen einfachen Schritten',
    'editor.step.type': 'Dokumenttyp auswählen',
    'editor.step.template': 'Vorlage auswählen',
    'editor.export.title': 'PDF-Export',
    'editor.export.success': 'Das Dokument wurde generiert und heruntergeladen.',
    'editor.export.error': 'Fehler beim Generieren des PDF-Dokuments.',
    'editor.section.personal': 'Persönliche Daten',
    'editor.section.recipient': 'Empfänger',
    'editor.section.content': 'Briefinhalt',
    'editor.section.clause': 'Klausel',
    'editor.section.config': 'Konfiguration',
    'editor.section.experience': 'Erfahrung',
    'editor.section.education': 'Bildung',
    'editor.section.skills': 'Fähigkeiten',
    'editor.section.languages': 'Sprachen',
    'editor.section.interests': 'Interessen',
  },
};

export default LanguageContext;
