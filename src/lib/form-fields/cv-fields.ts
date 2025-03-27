
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
    id: 'dateOfBirth',
    label: 'Data urodzenia',
    placeholder: 'RRRR-MM-DD',
    type: 'date',
    required: false,
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
  },
  
  // Education fields
  {
    id: 'edukacja',
    label: 'Wykształcenie',
    placeholder: 'Opisz swoje wykształcenie',
    type: 'textarea',
    required: false,
    section: SECTIONS.EDUCATION,
  },

  // Skills fields
  {
    id: 'umiejetnosci',
    label: 'Umiejętności',
    placeholder: 'Wpisz swoje umiejętności',
    type: 'textarea',
    required: false,
    section: SECTIONS.SKILLS,
  },
  
  // Languages fields
  {
    id: 'jezyki',
    label: 'Języki obce',
    placeholder: 'Wpisz znane języki',
    type: 'textarea',
    required: false,
    section: SECTIONS.LANGUAGES,
  },
  
  // Interests fields
  {
    id: 'zainteresowania',
    label: 'Zainteresowania',
    placeholder: 'Twoje zainteresowania',
    type: 'textarea',
    required: false,
    section: SECTIONS.INTERESTS,
  },
  
  // Clause
  {
    id: 'clause',
    label: 'Klauzula CV',
    placeholder: 'Wpisz klauzulę do CV',
    type: 'textarea',
    required: true,
    section: SECTIONS.CLAUSE,
  },
  
  // Skills color configuration
  {
    id: 'skillsProgressColor',
    label: 'Kolor paska umiejętności',
    placeholder: 'Wybierz kolor',
    type: 'color',
    required: false,
    section: SECTIONS.CONFIG,
    defaultValue: '#3498db',
  },
];

// Export a function to get fields for a specific template if needed
export const getCVFieldsForTemplate = (templateId: string): TemplateField[] => {
  // Base fields for all CV templates
  return [...cvBaseFields];
};
