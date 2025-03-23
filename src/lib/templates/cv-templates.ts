
import { DocumentTemplate, TemplateField, SECTIONS } from '../types/document-types';
import { 
  blueHeaderCvTemplate, 
  tealSidebarCvTemplate, 
  minimalistIconsCvTemplate, 
  whiteWithPhotoCvTemplate 
} from './template-utils';

// Define CV fields with ability to track skills, experience, education, etc.
const cvFields: TemplateField[] = [
  // Personal information
  { id: 'firstName', label: 'Imię', placeholder: 'Jan', type: 'text', required: true, section: SECTIONS.PERSONAL },
  { id: 'lastName', label: 'Nazwisko', placeholder: 'Kowalski', type: 'text', required: true, section: SECTIONS.PERSONAL },
  { id: 'position', label: 'Stanowisko', placeholder: 'Frontend Developer', type: 'text', required: true, section: SECTIONS.PERSONAL },
  { id: 'email', label: 'Email', placeholder: 'jan.kowalski@example.com', type: 'email', required: true, section: SECTIONS.PERSONAL },
  { id: 'phone', label: 'Telefon', placeholder: '+48 123 456 789', type: 'tel', required: true, section: SECTIONS.PERSONAL },
  { id: 'address', label: 'Adres', placeholder: 'Warszawa, Polska', type: 'text', required: false, section: SECTIONS.PERSONAL },
  { id: 'photo', label: 'Zdjęcie', placeholder: 'Dodaj zdjęcie', type: 'photo', required: false, section: SECTIONS.PERSONAL },
  { id: 'birthDate', label: 'Data urodzenia', placeholder: '01.01.1990', type: 'text', required: false, section: SECTIONS.PERSONAL },
  
  // Professional summary
  { id: 'summary', label: 'Podsumowanie zawodowe', placeholder: 'Krótkie podsumowanie Twoich umiejętności i doświadczenia...', type: 'textarea', required: false, section: SECTIONS.SUMMARY },
  
  // Work experience - structured as a textarea but could be expanded to be more structured
  { id: 'experience', label: 'Doświadczenie zawodowe', placeholder: 'Opisz swoje doświadczenie zawodowe...\n\nPrzykład:\n2020-obecnie: Frontend Developer w XYZ\n- Tworzenie aplikacji webowych w React\n- Optymalizacja wydajności stron\n\n2018-2020: Junior Developer w ABC\n- Rozwój interfejsu użytkownika\n- Współpraca z zespołem UX', type: 'textarea', required: false, section: SECTIONS.EXPERIENCE },
  
  // Education
  { id: 'education', label: 'Wykształcenie', placeholder: 'Opisz swoje wykształcenie...\n\nPrzykład:\n2015-2020: Informatyka, Politechnika Warszawska\n- Specjalizacja: Inżynieria Oprogramowania\n- Praca magisterska: "Implementacja algorytmów uczenia maszynowego"', type: 'textarea', required: false, section: SECTIONS.EDUCATION },
  
  // Skills with rating possibility
  { id: 'skills', label: 'Umiejętności', placeholder: 'JavaScript: 4, React: 5, Node.js: 3, HTML/CSS: 5\n\nWpisz umiejętności w formacie "Nazwa: ocena (1-5)", każda w nowej linii', type: 'textarea', required: false, section: SECTIONS.SKILLS },
  
  // Languages with proficiency
  { id: 'languages', label: 'Języki obce', placeholder: 'Angielski: zaawansowany (C1), Niemiecki: średniozaawansowany (B1)\n\nWpisz języki w formacie "Język: poziom", każdy w nowej linii', type: 'textarea', required: false, section: SECTIONS.ADDITIONAL },
  
  // Hobbies and interests
  { id: 'hobbies', label: 'Zainteresowania', placeholder: 'Twoje zainteresowania...', type: 'textarea', required: false, section: SECTIONS.ADDITIONAL },
  
  // RODO clause
  { id: 'clause', label: 'Klauzula RODO', placeholder: 'Wyrażam zgodę na przetwarzanie moich danych osobowych...', type: 'textarea', required: true, section: SECTIONS.CLAUSE, defaultValue: 'Wyrażam zgodę na przetwarzanie moich danych osobowych dla potrzeb niezbędnych do realizacji procesu rekrutacji zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (RODO).' },
];

export const cvTemplates: DocumentTemplate[] = [
  {
    id: 'cv-blue-header',
    name: 'CV z niebieskim nagłówkiem',
    description: 'Profesjonalne CV z niebieskim nagłówkiem i zdjęciem',
    thumbnail: '/lm-blue-header.png',
    fields: cvFields,
    template: blueHeaderCvTemplate,
  },
  {
    id: 'cv-teal-sidebar',
    name: 'CV z turkusowym paskiem',
    description: 'Eleganckie CV z turkusowym paskiem bocznym i paskami postępu',
    thumbnail: '/lm-teal-sidebar.png',
    fields: cvFields,
    template: tealSidebarCvTemplate,
  },
  {
    id: 'cv-minimalist-icons',
    name: 'CV minimalistyczne z ikonami',
    description: 'Minimalistyczne CV z nowoczesnymi ikonami',
    thumbnail: '/lm-minimalist-icons.png',
    fields: cvFields,
    template: minimalistIconsCvTemplate,
  },
  {
    id: 'cv-white-photo',
    name: 'CV białe ze zdjęciem',
    description: 'Czyste, białe CV ze zdjęciem',
    thumbnail: '/lm-white-photo.png',
    fields: cvFields,
    template: whiteWithPhotoCvTemplate,
  },
];
