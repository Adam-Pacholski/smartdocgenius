
import { TemplateField, SECTIONS } from '../types/document-types';

export const cvBaseFields: TemplateField[] = [
  // Personal data fields
  {
    id: 'firstName',
    label: 'Imię',
    placeholder: 'Twoje imię',
    type: 'text',
    required: true,
    section: SECTIONS.PERSONAL,
  },
  {
    id: 'lastName',
    label: 'Nazwisko',
    placeholder: 'Twoje nazwisko',
    type: 'text',
    required: true,
    section: SECTIONS.PERSONAL,
  },
  {
    id: 'position',
    label: 'Stanowisko',
    placeholder: 'Np. Frontend Developer',
    type: 'text',
    required: true,
    section: SECTIONS.PERSONAL,
  },
  {
    id: 'email',
    label: 'Email',
    placeholder: 'twoj@email.com',
    type: 'email',
    required: true,
    section: SECTIONS.PERSONAL,
  },
  {
    id: 'phone',
    label: 'Telefon',
    placeholder: '+48 123 456 789',
    type: 'tel',
    required: true,
    section: SECTIONS.PERSONAL,
  },
  {
    id: 'address',
    label: 'Adres',
    placeholder: 'Miasto, województwo',
    type: 'text',
    required: false,
    section: SECTIONS.PERSONAL,
  },
  {
    id: 'photo',
    label: 'Zdjęcie',
    placeholder: '',
    type: 'photo',
    required: false,
    section: SECTIONS.PERSONAL,
  },
  {
    id: 'summary',
    label: 'Podsumowanie zawodowe',
    placeholder: 'Krótkie podsumowanie Twojego doświadczenia i umiejętności',
    type: 'textarea',
    required: false,
    section: SECTIONS.PERSONAL,
  },
  
  // Experience fields
  {
    id: 'doswiadczenie',
    label: 'Doświadczenie zawodowe',
    placeholder: 'Opisz swoje doświadczenie zawodowe',
    type: 'textarea',
    required: false,
    section: SECTIONS.EXPERIENCE,
    defaultValue: `Nazwa firmy | Stanowisko | Okres zatrudnienia
- Osiągnięcie 1
- Osiągnięcie 2

Nazwa firmy | Stanowisko | Okres zatrudnienia
- Osiągnięcie 1
- Osiągnięcie 2`,
  },
  
  // Education fields
  {
    id: 'edukacja',
    label: 'Wykształcenie',
    placeholder: 'Opisz swoje wykształcenie',
    type: 'textarea',
    required: false,
    section: SECTIONS.EDUCATION,
    defaultValue: `Nazwa uczelni | Kierunek | Okres
- Dodatkowe informacje

Nazwa szkoły | Profil | Okres
- Dodatkowe informacje`,
  },

  // Skills fields
  {
    id: 'umiejetnosci',
    label: 'Umiejętności',
    placeholder: 'Wpisz swoje umiejętności',
    type: 'textarea',
    required: false,
    section: SECTIONS.SKILLS,
    defaultValue: `- Umiejętność 1 | 4
- Umiejętność 2 | 3
- Umiejętność 3 | 5`,
  },
  
  // Languages fields
  {
    id: 'jezyki',
    label: 'Języki obce',
    placeholder: 'Wpisz znane języki',
    type: 'textarea',
    required: false,
    section: SECTIONS.LANGUAGES,
    defaultValue: `- Język angielski - poziom B2
- Język niemiecki - poziom A2`,
  },
  
  // Interests fields
  {
    id: 'zainteresowania',
    label: 'Zainteresowania',
    placeholder: 'Twoje zainteresowania',
    type: 'textarea',
    required: false,
    section: SECTIONS.INTERESTS,
    defaultValue: `- Zainteresowanie 1
- Zainteresowanie 2
- Zainteresowanie 3`,
  },
  
  // Clause
  {
    id: 'clause',
    label: 'Klauzula CV',
    placeholder: 'Wpisz klauzulę do CV',
    type: 'textarea',
    required: true,
    section: SECTIONS.CLAUSE,
    defaultValue: 'Wyrażam zgodę na przetwarzanie moich danych osobowych dla potrzeb niezbędnych do realizacji procesu rekrutacji (zgodnie z ustawą z dnia 10 maja 2018 roku o ochronie danych osobowych (Dz. Ustaw z 2018, poz. 1000) oraz zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (RODO)).',
  },
];

// Export a function to get fields for a specific template if needed
export const getCVFieldsForTemplate = (templateId: string): TemplateField[] => {
  // Base fields for all CV templates
  return [...cvBaseFields];
};
