
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
    
    // Roadmap section
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
    
    // Privacy policy page
    'privacy.title': 'Polityka Prywatności i Plików Cookie',
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
    
    // Roadmap section
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
    
    // Privacy policy page
    'privacy.title': 'Privacy and Cookies Policy',
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
    
    // Roadmap section
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
    
    // Privacy policy page
    'privacy.title': 'Datenschutz- und Cookie-Richtlinie',
  },
};
