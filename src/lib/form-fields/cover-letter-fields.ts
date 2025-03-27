import { TemplateField } from '../types/document-types';
import { currentDate } from '../utils/document-utils';

// Define fields for personal information section
export const personalInfoFields: TemplateField[] = [
  {
    id: 'firstName',
    type: 'text',
    label: 'Imię',
    placeholder: 'Wprowadź swoje imię',
    section: 'dane_osobowe',
  },
  {
    id: 'lastName',
    type: 'text',
    label: 'Nazwisko',
    placeholder: 'Wprowadź swoje nazwisko',
    section: 'dane_osobowe',
  },
  {
    id: 'position',
    type: 'text',
    label: 'Stanowisko',
    placeholder: 'Np. Specjalista ds. marketingu',
    section: 'dane_osobowe',
  },
  {
    id: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'adres@email.com',
    section: 'dane_osobowe',
  },
  {
    id: 'phone',
    type: 'tel',
    label: 'Telefon',
    placeholder: '123 456 789',
    section: 'dane_osobowe',
  },
  {
    id: 'letterDate',
    type: 'date',
    label: 'Data listu',
    placeholder: 'Wybierz datę',
    defaultValue: currentDate(),
    section: 'dane_osobowe',
  },
  {
    id: 'birthDate',
    type: 'date',
    label: 'Data urodzenia',
    placeholder: 'Wybierz datę',
    section: 'dane_osobowe',
  },
  {
    id: 'address',
    type: 'text',
    label: 'Adres',
    placeholder: 'Wprowadź swój adres',
    section: 'dane_osobowe',
  },
  {
    id: 'photo',
    type: 'photo',
    label: 'Zdjęcie',
    placeholder: 'Dodaj zdjęcie',
    description: 'Zalecany rozmiar zdjęcia: 400x400 pikseli',
    section: 'dane_osobowe',
  },
];

// Define fields for recipient information section
export const recipientInfoFields: TemplateField[] = [
  {
    id: 'company',
    type: 'text',
    label: 'Firma',
    placeholder: 'Wprowadź nazwę firmy',
    section: 'odbiorca',
  },
  {
    id: 'recipientName',
    type: 'text',
    label: 'Imię i nazwisko odbiorcy',
    placeholder: 'Wprowadź imię i nazwisko odbiorcy',
    section: 'odbiorca',
  },
  {
    id: 'recipientPosition',
    type: 'text',
    label: 'Stanowisko odbiorcy',
    placeholder: 'Wprowadź stanowisko odbiorcy',
    section: 'odbiorca',
  },
];

// Define fields for the content of the cover letter
export const letterContentFields: TemplateField[] = [
  {
    id: 'subject',
    type: 'text',
    label: 'Temat',
    placeholder: 'Wprowadź temat listu',
    section: 'tresc_listu',
  },
  {
    id: 'opening',
    type: 'text',
    label: 'Powitanie',
    placeholder: 'Szanowni Państwo,',
    section: 'tresc_listu',
  },
  {
    id: 'body',
    type: 'textarea',
    label: 'Treść',
    placeholder: 'Wprowadź treść listu',
    section: 'tresc_listu',
  },
  {
    id: 'closing',
    type: 'text',
    label: 'Zakończenie',
    placeholder: 'Z wyrazami szacunku,',
    section: 'tresc_listu',
  },
];

// Define fields for the clause section
export const clauseFields: TemplateField[] = [
  {
    id: 'clause',
    type: 'textarea',
    label: 'Klauzula RODO',
    placeholder: 'Wyrażam zgodę na przetwarzanie moich danych osobowych w celu...',
    section: 'klauzula',
  },
];

export const allCoverLetterFields: TemplateField[] = [
  ...personalInfoFields,
  ...recipientInfoFields,
  ...letterContentFields,
  ...clauseFields,
];
