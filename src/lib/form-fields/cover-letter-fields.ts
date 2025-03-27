
import { TemplateField, SECTIONS } from '../types/document-types';

// Pola formularza dla danych osobowych
export const personalDataFields: TemplateField[] = [
  { id: 'firstName', label: 'Imię', placeholder: '', type: 'text', required: true, section: SECTIONS.PERSONAL },
  { id: 'lastName', label: 'Nazwisko', placeholder: '', type: 'text', required: true, section: SECTIONS.PERSONAL },
  { id: 'position', label: 'Zawód', placeholder: '', type: 'text', required: true, section: SECTIONS.PERSONAL },
  { id: 'email', label: 'Email', placeholder: '', type: 'email', required: true, section: SECTIONS.PERSONAL },
  { id: 'phone', label: 'Numer telefonu', placeholder: '', type: 'tel', required: true, section: SECTIONS.PERSONAL },
  { id: 'birthDate', label: 'Data urodzenia', placeholder: '', type: 'date', section: SECTIONS.PERSONAL },
  { id: 'address', label: 'Adres', placeholder: '', type: 'text', section: SECTIONS.PERSONAL },
  { id: 'photo', label: 'Zdjęcie', placeholder: 'Dodaj zdjęcie', type: 'photo', section: SECTIONS.PERSONAL },
];

// Pola formularza dla odbiorcy
export const recipientFields: TemplateField[] = [
  { id: 'recipientName', label: 'Imię i nazwisko odbiorcy', placeholder: '', type: 'text', section: SECTIONS.RECIPIENT },
  { id: 'recipientPosition', label: 'Stanowisko odbiorcy', placeholder: '', type: 'text', section: SECTIONS.RECIPIENT },
  { id: 'recipientCompany', label: 'Nazwa firmy', placeholder: '', type: 'text', required: true, section: SECTIONS.RECIPIENT },
  { id: 'recipientAddress', label: 'Adres firmy', placeholder: '', type: 'text', section: SECTIONS.RECIPIENT },
];

// Pola formularza dla treści listu
export const contentFields: TemplateField[] = [
  { id: 'subject', label: 'Temat', placeholder: '', type: 'text', required: true, section: SECTIONS.CONTENT },
  { id: 'opening', label: 'Otwarcie', placeholder: '', type: 'text', required: true, section: SECTIONS.CONTENT },
  { id: 'body', label: 'Treść listu', placeholder: '', type: 'textarea', required: true, section: SECTIONS.CONTENT },
  { id: 'closing', label: 'Zakończenie', placeholder: '', type: 'text', required: true, section: SECTIONS.CONTENT },
];

// Pola formularza dla klauzuli
export const clauseFields: TemplateField[] = [
  { id: 'clause', label: 'Klauzula', placeholder: '', type: 'textarea', section: SECTIONS.CLAUSE },
];

// Wszystkie pola formularza
export const allCoverLetterFields = [
  ...personalDataFields,
  ...recipientFields,
  ...contentFields,
  ...clauseFields,
];
