
import { TemplateField, SECTIONS } from '../types/document-types';

// Pola formularza dla danych osobowych
export const personalDataFields: TemplateField[] = [
  { id: 'firstName', label: 'Imię', placeholder: 'Adam', type: 'text', required: true, section: SECTIONS.PERSONAL },
  { id: 'lastName', label: 'Nazwisko', placeholder: 'Kowalski', type: 'text', required: true, section: SECTIONS.PERSONAL },
  { id: 'position', label: 'Zawód', placeholder: 'Specjalista ds. marketingu', type: 'text', required: true, section: SECTIONS.PERSONAL },
  { id: 'email', label: 'Email', placeholder: 'adam.kowalski@example.com', type: 'email', required: true, section: SECTIONS.PERSONAL },
  { id: 'phone', label: 'Numer telefonu', placeholder: '+48 123 456 789', type: 'tel', required: true, section: SECTIONS.PERSONAL },
  { id: 'birthDate', label: 'Data urodzenia', placeholder: '01.01.1990', type: 'date', section: SECTIONS.PERSONAL },
  { id: 'address', label: 'Adres', placeholder: 'ul. Przykładowa 1, 00-001 Warszawa', type: 'text', section: SECTIONS.PERSONAL },
  { id: 'photo', label: 'Zdjęcie', placeholder: 'Dodaj zdjęcie', type: 'photo', section: SECTIONS.PERSONAL },
];

// Pola formularza dla odbiorcy
export const recipientFields: TemplateField[] = [
  { id: 'recipientName', label: 'Imię i nazwisko odbiorcy', placeholder: 'Anna Nowak', type: 'text', section: SECTIONS.RECIPIENT },
  { id: 'recipientPosition', label: 'Stanowisko odbiorcy', placeholder: 'Kierownik działu HR', type: 'text', section: SECTIONS.RECIPIENT },
  { id: 'recipientCompany', label: 'Nazwa firmy', placeholder: 'Firma Handlowa Sp. z o.o.', type: 'text', required: true, section: SECTIONS.RECIPIENT },
  { id: 'recipientAddress', label: 'Adres firmy', placeholder: 'ul. Biznesowa 5, 00-001 Warszawa', type: 'text', section: SECTIONS.RECIPIENT },
];

// Pola formularza dla treści listu
export const contentFields: TemplateField[] = [
  { id: 'subject', label: 'Temat', placeholder: 'Aplikacja na stanowisko Specjalisty ds. marketingu', type: 'text', required: true, section: SECTIONS.CONTENT },
  { id: 'opening', label: 'Otwarcie', placeholder: 'Szanowni Państwo,', type: 'text', required: true, section: SECTIONS.CONTENT },
  { id: 'body', label: 'Treść listu', placeholder: 'Z wielką przyjemnością zgłaszam swoją kandydaturę na stanowisko...', type: 'textarea', required: true, section: SECTIONS.CONTENT },
  { id: 'closing', label: 'Zakończenie', placeholder: 'Z wyrazami szacunku,', type: 'text', required: true, section: SECTIONS.CONTENT },
];

// Pola formularza dla klauzuli
export const clauseFields: TemplateField[] = [
  { id: 'clause', label: 'Klauzula', placeholder: 'Wyrażam zgodę na przetwarzanie moich danych osobowych w celu prowadzenia rekrutacji na aplikowane przeze mnie stanowisko.', type: 'textarea', section: SECTIONS.CLAUSE },
];

// Wszystkie pola formularza
export const allCoverLetterFields = [
  ...personalDataFields,
  ...recipientFields,
  ...contentFields,
  ...clauseFields,
];
