
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
    'button.back': 'Wstecz',
    'button.next': 'Dalej',
    'button.download': 'Pobierz PDF',
    'common.confirm': 'Potwierdź',
    'common.cancel': 'Anuluj',


    // Features section
    'features.title': 'Dlaczego APDocs?',
    'features.subtitle': 'Narzędzie stworzone, aby ułatwić i przyspieszyć proces tworzenia profesjonalnych dokumentów.',
    'features.templates.title': 'Profesjonalne szablony',
    'features.templates.desc': 'Różnorodne szablony dokumentów dostosowane do różnych branż i potrzeb.',
    'features.ease.title': 'Łatwe w użyciu',
    'features.ease.desc': 'Intuicyjny interfejs, który przeprowadzi Cię krok po kroku przez proces tworzenia dokumentu.',
    'features.custom.title': 'Zaawansowana personalizacja',
    'features.custom.desc': 'Pełna kontrola nad wyglądem i zawartością dokumentów, dostosowanych do Twoich potrzeb.',
    
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
    'editor.defaultDocName': 'Dokument',
    'editor.cv': 'CV',
    'editor.coverLetter': 'List motywacyjny',
    'editor.step.type': 'Wybierz typ dokumentu',
    'editor.step.template': 'Wybierz szablon',
    'editor.export.title': 'Eksport PDF',
    'editor.export.success': 'Dokument został wygenerowany i pobrany.',
    'editor.export.error': 'Nie udało się wygenerować dokumentu PDF.',
    'editor.section.personal': 'Dane osobowe',
    'editor.section.personal.desc': 'Wprowadź swoje dane osobowe',
    'editor.section.recipient': 'Odbiorca',
    'editor.section.recipient.desc': 'Wprowadź dane odbiorcy',
    'editor.section.content': 'Treść listu',
    'editor.section.content.desc': 'Napisz treść swojego listu motywacyjnego',
    'editor.section.clause': 'Klauzula',
    'editor.section.clause.desc': 'Dodaj klauzulę o przetwarzaniu danych osobowych',
    'editor.section.config': 'Konfiguracja',
    'editor.section.config.desc': 'Dostosuj wygląd dokumentu',
    'editor.section.experience': 'Doświadczenie',
    'editor.section.experience.desc': 'Dodaj informacje o swoim doświadczeniu zawodowym',
    'editor.section.education': 'Wykształcenie',
    'editor.section.education.desc': 'Uzupełnij dane o swoim wykształceniu',
    'editor.section.skills': 'Umiejętności',
    'editor.section.skills.desc': 'Wymień swoje umiejętności',
    'editor.section.languages': 'Języki obce',
    'editor.section.languages.desc': 'Podaj znane Ci języki obce i poziom ich znajomości',
    'editor.section.interests': 'Zainteresowania',
    'editor.section.interests.desc': 'Opisz swoje zainteresowania i hobby',
    'editor.reset.confirmTitle':"Czy na pewno chcesz zresetować dokument?",
    'editor.reset.confirmDescription': 'Wszystkie wprowadzone dane zostaną usunięte i nie będzie można ich odzyskać.',
    'editor.reset.button':'Resetuj dokument',

    // Date picker
    'datepicker.selectDate': 'Wybierz datę',
    'datepicker.year': 'rok',
    'datepicker.years': 'lat',
    
    // Document form
    'form.letterDate': 'Data listu',
    'form.firstName': 'Imię',
    'form.lastName': 'Nazwisko',
    'form.position': 'Stanowisko',
    'form.email': 'Email',
    'form.phone': 'Telefon',
    'form.birthDate': 'Data urodzenia',
    'form.address': 'Adres',
    'form.photo': 'Zdjęcie',
    'form.photo.add': 'Dodaj zdjęcie',
    'form.photo.desc': 'Zalecany rozmiar zdjęcia: 400x400 pikseli',
    'form.company': 'Firma',
    'form.recipientName': 'Imię i nazwisko odbiorcy',
    'form.recipientPosition': 'Stanowisko odbiorcy',
    'form.subject': 'Temat',
    'form.opening': 'Powitanie',
    'form.body': 'Treść',
    'form.closing': 'Zakończenie',
    'form.clause': 'Klauzula RODO',
  },

  "en": {
  "app.name": "APDocs",
      "app.tagline": "Your professional documents. Fast and easy.",
      "app.description": "APDocs is a modern app that helps you create professional documents in just minutes.",
      "app.subtitle": "Create professional documents in one minute",
      "nav.home": "Home",
      "nav.editor": "Editor",
      "nav.about": "About me",
      "nav.contact": "Contact",
      "nav.privacy": "Privacy Policy & Cookies",
      "button.start": "Start now",
      "button.learn": "Learn more",
      "button.back": "Back",
      "button.next": "Next",
      "button.download": "Download PDF",
      "common.confirm": "Confirm",
      "common.cancel": "Cancel",
      "features.title": "Why APDocs?",
      "features.subtitle": "A tool designed to simplify and speed up the creation of professional documents.",
      "features.templates.title": "Professional templates",
      "features.templates.desc": "Various document templates tailored to different industries and needs.",
      "features.ease.title": "Easy to use",
      "features.ease.desc": "An intuitive interface that guides you step-by-step through the document creation process.",
      "features.custom.title": "Advanced customization",
      "features.custom.desc": "Full control over the look and content of your documents, tailored to your needs.",
      "cta.title": "Ready to create professional documents?",
      "cta.subtitle": "Join thousands of satisfied users and start creating professional documents today.",
      "footer.rights": "All rights reserved.",
      "about.title": "About me",
      "about.whoami": "Who I am",
      "about.approach": "My approach to work",
      "about.project": "About the APDocs project",
      "about.visit": "Visit AP-Development.eu",
      "about.support": "Support the project",
      "contact.title": "Contact",
      "contact.form.title": "Write to me",
      "contact.form.name": "Full name",
      "contact.form.email": "Email",
      "contact.form.subject": "Subject",
      "contact.form.message": "Message",
      "contact.form.submit": "Send message",
      "contact.form.sending": "Sending...",
      "contact.form.success.title": "Message sent!",
      "contact.form.success.desc": "Thank you for contacting us. We will reply as soon as possible.",
      "contact.form.newmessage": "Send new message",
      "contact.form.error": "There was a problem sending the message",
      "contact.info.title": "Contact information",
      "contact.info.company": "Company",
      "contact.info.email": "Email",
      "contact.info.website": "Visit our website",
      "contact.support.title": "Support the project",
      "contact.support.desc1": "APDocs is a completely free tool that I develop out of passion for creating useful applications. If you want to support its further development, you can do so through contact or collaboration.",
      "contact.support.desc2": "Your support helps keep the application free and available to everyone.",
      "privacy.cookie.title": "Cookie Policy",
      "privacy.cookie.content": "This site uses cookies to ensure the best user experience. By using our site, you agree to the use of cookies in accordance with our",
      "privacy.title": "Privacy and Cookie Policy",
      "privacy.section1.title": "1. General information",
      "privacy.section1.content": "This Privacy and Cookie Policy defines the principles for processing and protecting personal data and the use of cookies within the APDocs service.",
      "privacy.section2.title": "2. Data controller",
      "privacy.section2.content": "The data controller is AP-Development.eu.",
      "privacy.section3.title": "3. Cookies",
      "privacy.section3.content": "The service uses cookies to personalize content and analyze site traffic.",
      "privacy.section3.what.title": "What are cookies?",
      "privacy.section3.what.content": "Cookies are small text files stored on the user's device while browsing websites. They are used to remember user preferences and facilitate website use.",
      "privacy.section3.types.title": "Types of cookies used:",
      "privacy.section3.types.necessary": "Necessary cookies – essential for the proper functioning of the site",
      "privacy.section3.types.functional": "Functional cookies – enable remembering user preferences",
      "privacy.section3.types.analytical": "Analytical cookies – used to analyze how the service is used",
      "privacy.section4.title": "4. Managing cookies",
      "privacy.section4.content1": "Users can manage cookies themselves by changing their web browser settings. Limiting cookie use may affect the functionality of the site.",
      "privacy.section4.content2": "Not changing browser settings means acceptance of the used cookies.",
      "privacy.section5.title": "5. Contact",
      "privacy.section5.content": "If you have any questions regarding the Privacy and Cookie Policy, please contact us at: info@ap-development.eu",
      "cookie.message": "We use cookies to ensure the best experience on our website.",
      "cookie.accept": "I accept",
      "cookie.learnMore": "Learn more",
      "editor.title": "Document Editor",
      "editor.subtitle": "Create a professional document in a few simple steps",
      "editor.defaultDocName": "Document",
      "editor.cv": "CV",
      "editor.coverLetter": "Cover Letter",
      "editor.step.type": "Choose document type",
      "editor.step.template": "Choose template",
      "editor.export.title": "PDF Export",
      "editor.export.success": "Document has been generated and downloaded.",
      "editor.export.error": "Failed to generate PDF document.",
      "editor.section.personal": "Personal Information",
      "editor.section.personal.desc": "Enter your personal information",
      "editor.section.recipient": "Recipient",
      "editor.section.recipient.desc": "Enter recipient details",
      "editor.section.content": "Letter Content",
      "editor.section.content.desc": "Write your cover letter content",
      "editor.section.clause": "Clause",
      "editor.section.clause.desc": "Add data processing consent clause",
      "editor.section.config": "Configuration",
      "editor.section.config.desc": "Customize the document layout",
      "editor.section.experience": "Experience",
      "editor.section.experience.desc": "Add your professional experience",
      "editor.section.education": "Education",
      "editor.section.education.desc": "Fill in your educational background",
      "editor.section.skills": "Skills",
      "editor.section.skills.desc": "List your skills",
      "editor.section.languages": "Languages",
      "editor.section.languages.desc": "Specify languages you know and proficiency levels",
      "editor.section.interests": "Interests",
      "editor.section.interests.desc": "Describe your interests and hobbies",
      "editor.reset.confirmTitle": "Are you sure you want to reset the document?",
      "editor.reset.confirmDescription": "All entered data will be deleted and cannot be recovered.",
      "editor.reset.button": "Reset document",
      "datepicker.selectDate": "Select date",
      "datepicker.year": "year",
      "datepicker.years": "years",
      "form.letterDate": "Letter date",
      "form.firstName": "First name",
      "form.lastName": "Last name",
      "form.position": "Position",
      "form.email": "Email",
      "form.phone": "Phone",
      "form.birthDate": "Date of birth",
      "form.address": "Address",
      "form.photo": "Photo",
      "form.photo.add": "Add photo",
      "form.photo.desc": "Recommended photo size: 400x400 pixels",
      "form.company": "Company",
      "form.recipientName": "Recipient name",
      "form.recipientPosition": "Recipient position",
      "form.subject": "Subject",
      "form.opening": "Opening",
      "form.body": "Body",
      "form.closing": "Closing",
      "form.clause": "GDPR Clause"
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
    'button.back': 'Zurück',
    'button.next': 'Weiter',
    'button.download': 'PDF herunterladen',
    'common.confirm': 'Bestätigen',
    'common.cancel': 'Abbrechen',

    // Features section
    'features.title': 'Warum APDocs?',
    'features.subtitle': 'Ein Tool, das den Prozess der Erstellung professioneller Dokumente vereinfacht und beschleunigt.',
    'features.templates.title': 'Professionelle Vorlagen',
    'features.templates.desc': 'Verschiedene Dokumentvorlagen, die auf unterschiedliche Branchen und Bedürfnisse zugeschnitten sind.',
    'features.ease.title': 'Einfach zu bedienen',
    'features.ease.desc': 'Eine intuitive Benutzeroberfläche, die Sie Schritt für Schritt durch den Prozess der Dokumentenerstellung führt.',
    'features.custom.title': 'Erweiterte Anpassung',
    'features.custom.desc': 'Volle Kontrolle über das Aussehen und den Inhalt von Dokumenten, angepasst an Ihre Bedürfnisse.',

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
    'privacy.cookie.title': 'Cookie-Richtlinie',
    'privacy.cookie.content': 'Diese Website verwendet Cookies, um die bestmögliche Benutzererfahrung zu gewährleisten. Durch die Nutzung unserer Website stimmen Sie der Verwendung von Cookies gemäß unserer',
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
    'editor.defaultDocName': 'Dokument',
    'editor.cv': 'Lebenslauf',
    'editor.coverLetter': 'Anschreiben',
    'editor.step.type': 'Dokumenttyp auswählen',
    'editor.step.template': 'Vorlage auswählen',
    'editor.export.title': 'PDF-Export',
    'editor.export.success': 'Das Dokument wurde generiert und heruntergeladen.',
    'editor.export.error': 'Fehler beim Generieren des PDF-Dokuments.',
    'editor.section.personal': 'Persönliche Daten',
    'editor.section.personal.desc': 'Geben Sie Ihre persönlichen Daten ein',
    'editor.section.recipient': 'Empfänger',
    'editor.section.recipient.desc': 'Geben Sie die Empfängerdaten ein',
    'editor.section.content': 'Briefinhalt',
    'editor.section.content.desc': 'Schreiben Sie den Inhalt Ihres Anschreibens',
    'editor.section.clause': 'Klausel',
    'editor.section.clause.desc': 'Fügen Sie eine Datenschutzklausel hinzu',
    'editor.section.config': 'Konfiguration',
    'editor.section.config.desc': 'Passen Sie das Erscheinungsbild des Dokuments an',
    'editor.section.experience': 'Erfahrung',
    'editor.section.experience.desc': 'Fügen Sie Informationen zu Ihrer Berufserfahrung hinzu',
    'editor.section.education': 'Bildung',
    'editor.section.education.desc': 'Vervollständigen Sie Ihre Bildungsinformationen',
    'editor.section.skills': 'Fähigkeiten',
    'editor.section.skills.desc': 'Listen Sie Ihre Fähigkeiten auf',
    'editor.section.languages': 'Sprachen',
    'editor.section.languages.desc': 'Geben Sie Sprachen an, die Sie kennen, und deren Kenntnisstand',
    'editor.section.interests': 'Interessen',
    'editor.section.interests.desc': 'Beschreiben Sie Ihre Interessen und Hobbys',
    'editor.reset.confirmTitle': 'Möchten Sie das Dokument wirklich zurücksetzen?',
    'editor.reset.confirmDescription': 'Alle eingegebenen Daten werden gelöscht und können nicht wiederhergestellt werden.',
    'editor.reset.button': 'Dokument zurücksetzen',
    
    // Date picker
    'datepicker.selectDate': 'Datum auswählen',
    'datepicker.year': 'Jahr',
    'datepicker.years': 'Jahre',
    
    // Document form
    'form.letterDate': 'Briefdatum',
    'form.firstName': 'Vorname',
    'form.lastName': 'Nachname',
    'form.position': 'Position',
    'form.email': 'E-Mail',
    'form.phone': 'Telefon',
    'form.birthDate': 'Geburtsdatum',
    'form.address': 'Adresse',
    'form.photo': 'Foto',
    'form.photo.add': 'Foto hinzufügen',
    'form.photo.desc': 'Empfohlene Fotogröße: 400x400 Pixel',
    'form.company': 'Unternehmen',
    'form.recipientName': 'Name des Empfängers',
    'form.recipientPosition': 'Position des Empfängers',
    'form.subject': 'Betreff',
    'form.opening': 'Anrede',
    'form.body': 'Inhalt',
    'form.closing': 'Grußformel',
    'form.clause': 'DSGVO-Klausel',
  },
};

export default LanguageContext;
