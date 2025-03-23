
import { TemplateField, SECTIONS } from '../types/document-types';

// Pola formularza dla danych osobowych w CV
export const personalDataFields: TemplateField[] = [
  { id: 'firstName', label: 'Imię', placeholder: 'Jan', type: 'text', required: true, section: SECTIONS.PERSONAL },
  { id: 'lastName', label: 'Nazwisko', placeholder: 'Kowalski', type: 'text', required: true, section: SECTIONS.PERSONAL },
  { id: 'position', label: 'Stanowisko', placeholder: 'Frontend Developer', type: 'text', required: true, section: SECTIONS.PERSONAL },
  { id: 'email', label: 'Email', placeholder: 'jan.kowalski@example.com', type: 'email', required: true, section: SECTIONS.PERSONAL },
  { id: 'phone', label: 'Telefon', placeholder: '+48 123 456 789', type: 'tel', required: true, section: SECTIONS.PERSONAL },
  { id: 'birthDate', label: 'Data urodzenia', placeholder: '01.01.1990', type: 'text', required: false, section: SECTIONS.PERSONAL },
  { id: 'address', label: 'Adres', placeholder: 'Warszawa, Polska', type: 'text', required: false, section: SECTIONS.PERSONAL },
  { id: 'photo', label: 'Zdjęcie', placeholder: 'Dodaj zdjęcie', type: 'photo', required: false, section: SECTIONS.PERSONAL },
];

// Pola formularza dla podsumowania zawodowego
export const summaryFields: TemplateField[] = [
  { id: 'summary', label: 'Podsumowanie zawodowe', placeholder: 'Jestem doświadczonym przedstawicielem handlowym z podejściem silnym, zorientowanym na realizację B2B, B2C. Moje doświadczenie obejmuje długoterminowe relacje z klientami, skuteczne negocjacje oraz realizację ambitnych celów sprzedażowych...', type: 'textarea', required: false, section: SECTIONS.SUMMARY },
];

// Pola formularza dla doświadczenia zawodowego
export const experienceFields: TemplateField[] = [
  { id: 'experience', label: 'Doświadczenie zawodowe', placeholder: 'Opisz swoje doświadczenie zawodowe...\n\nPrzykład:\n01.2020 - obecnie: Przedstawiciel Handlowy w XYZ\n- Pozyskiwanie klientów biznesowych\n- Zwiększenie sprzedaży o 20% poprzez budowanie relacji z kluczowymi klientami\n\n06.2018 - 12.2019: Młodszy Przedstawiciel Handlowy w ABC\n- Prowadzenie prezentacji produktowych i szkoleń dla klientów\n- Realizowanie miesięcznych wyników sprzedaży z nadwyżką', type: 'textarea', required: false, section: SECTIONS.EXPERIENCE },
];

// Pola formularza dla wykształcenia
export const educationFields: TemplateField[] = [
  { id: 'education', label: 'Wykształcenie', placeholder: 'Opisz swoje wykształcenie...\n\nPrzykład:\n09.2015 - 06.2019: Zarządzanie (Uniwersytet Warszawski)\n- Specjalizacja: Sprzedaż i marketing\n- Praca magisterska: "Strategie zwiększania efektywności sprzedaży w sektorze B2B"\n\n10.2012 - 06.2015: Licencjat z Ekonomii / Szkoła Główna Handlowa w Warszawie', type: 'textarea', required: false, section: SECTIONS.EDUCATION },
];

// Pola formularza dla umiejętności
export const skillsFields: TemplateField[] = [
  { id: 'skills', label: 'Umiejętności', placeholder: 'Techniki sprzedaży: 5\nNegocjacje biznesowe: 4\nObsługa CRM: 5\nPrezentacje i wystąpienia publiczne: 4\n\nWpisz umiejętności w formacie "Nazwa: ocena (1-5)", każda w nowej linii', type: 'textarea', required: false, section: SECTIONS.SKILLS },
];

// Pola formularza dla języków obcych
export const languagesFields: TemplateField[] = [
  { id: 'languages', label: 'Znajomość języków', placeholder: 'Angielski: poziom C1\nNiemiecki: poziom B2\n\nWpisz języki w formacie "Język: poziom", każdy w nowej linii', type: 'textarea', required: false, section: SECTIONS.ADDITIONAL },
];

// Pola formularza dla zainteresowań
export const hobbiesFields: TemplateField[] = [
  { id: 'hobbies', label: 'Zainteresowania', placeholder: 'Nowe technologie, taniec', type: 'textarea', required: false, section: SECTIONS.ADDITIONAL },
];

// Pola formularza dla klauzuli RODO
export const clauseFields: TemplateField[] = [
  { id: 'clause', label: 'Klauzula RODO', placeholder: 'Wyrażam zgodę na przetwarzanie moich danych osobowych...', type: 'textarea', required: true, section: SECTIONS.CLAUSE, defaultValue: 'Wyrażam zgodę na przetwarzanie moich danych osobowych dla potrzeb niezbędnych do realizacji procesu rekrutacji zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (RODO).' },
];

// Wszystkie pola formularza dla CV
export const allCVFields = [
  ...personalDataFields,
  ...summaryFields,
  ...experienceFields,
  ...educationFields,
  ...skillsFields,
  ...languagesFields,
  ...hobbiesFields,
  ...clauseFields,
];
