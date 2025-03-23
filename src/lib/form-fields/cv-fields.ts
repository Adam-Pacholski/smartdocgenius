
import { TemplateField, SECTIONS } from '../types/document-types';

// Pola formularza dla danych osobowych w CV
export const personalDataFields: TemplateField[] = [
  { id: 'firstName', label: 'Imię', placeholder: 'Jan', type: 'text', required: true, section: SECTIONS.PERSONAL },
  { id: 'lastName', label: 'Nazwisko', placeholder: 'Kowalski', type: 'text', required: true, section: SECTIONS.PERSONAL },
  { id: 'position', label: 'Stanowisko', placeholder: 'Specjalista ds. marketingu', type: 'text', required: true, section: SECTIONS.PERSONAL },
  { id: 'email', label: 'Email', placeholder: 'jan.kowalski@example.com', type: 'email', required: true, section: SECTIONS.PERSONAL },
  { id: 'phone', label: 'Telefon', placeholder: '+48 123 456 789', type: 'tel', required: true, section: SECTIONS.PERSONAL },
  { id: 'birthDate', label: 'Data urodzenia', placeholder: '01.01.1990', type: 'text', required: false, section: SECTIONS.PERSONAL },
  { id: 'address', label: 'Adres', placeholder: 'ul. Warszawska 123, 00-001 Warszawa', type: 'text', required: false, section: SECTIONS.PERSONAL },
  { id: 'photo', label: 'Zdjęcie', placeholder: 'Dodaj zdjęcie', type: 'photo', required: false, section: SECTIONS.PERSONAL },
];

// Pola formularza dla podsumowania zawodowego
export const summaryFields: TemplateField[] = [
  { id: 'summary', label: 'Podsumowanie zawodowe', placeholder: 'Przedstaw krótki opis swoich umiejętności, osiągnięć i doświadczenia.\n\nnp. Jestem testerem oprogramowania z 10 letnim doświadczeniem...', type: 'textarea', required: false, section: SECTIONS.SUMMARY },
];

// Pola formularza dla doświadczenia zawodowego
export const experienceFields: TemplateField[] = [
  { id: 'jobTitle', label: 'Stanowisko', placeholder: 'Specjalista ds. marketingu', type: 'text', required: false, section: SECTIONS.EXPERIENCE },
  { id: 'company', label: 'Firma', placeholder: 'Nazwa firmy', type: 'text', required: false, section: SECTIONS.EXPERIENCE },
  { id: 'location', label: 'Miejscowość', placeholder: 'Warszawa', type: 'text', required: false, section: SECTIONS.EXPERIENCE },
  { id: 'startDate', label: 'Data od', placeholder: 'mm.rrrr', type: 'text', required: false, section: SECTIONS.EXPERIENCE },
  { id: 'endDate', label: 'Data do', placeholder: 'mm.rrrr lub obecnie', type: 'text', required: false, section: SECTIONS.EXPERIENCE },
  { id: 'currentJob', label: 'Nadal tu pracuję', placeholder: '', type: 'checkbox', required: false, section: SECTIONS.EXPERIENCE },
  { id: 'jobDescription', label: 'Opis', placeholder: 'Opisz swoje obowiązki i osiągnięcia...', type: 'textarea', required: false, section: SECTIONS.EXPERIENCE },
  { id: 'experience', label: 'Doświadczenie zawodowe', placeholder: 'Możesz też wpisać całe doświadczenie w jednym polu:\n\n01.2020 - obecnie: Marketing Specialist w XYZ\n- Prowadzenie kampanii w mediach społecznościowych\n- Zwiększenie zasięgu marki o 40%\n\n06.2018 - 12.2019: Junior Marketing Specialist w ABC\n- Tworzenie materiałów promocyjnych\n- Wsparcie zespołu w organizacji wydarzeń', type: 'textarea', required: false, section: SECTIONS.EXPERIENCE },
];

// Pola formularza dla wykształcenia
export const educationFields: TemplateField[] = [
  { id: 'school', label: 'Uczelnia', placeholder: 'np. Uniwersytet Warszawski', type: 'text', required: false, section: SECTIONS.EDUCATION },
  { id: 'educationStartDate', label: 'Data od', placeholder: 'mm.rrrr', type: 'text', required: false, section: SECTIONS.EDUCATION },
  { id: 'educationEndDate', label: 'Data do', placeholder: 'mm.rrrr lub obecnie', type: 'text', required: false, section: SECTIONS.EDUCATION },
  { id: 'currentEducation', label: 'Nadal tu się uczę', placeholder: '', type: 'checkbox', required: false, section: SECTIONS.EDUCATION },
  { id: 'educationDescription', label: 'Opis', placeholder: 'np. Kierunek: psychologia, Poziom wykształcenia: magister', type: 'textarea', required: false, section: SECTIONS.EDUCATION },
  { id: 'education', label: 'Wykształcenie', placeholder: 'Możesz też wpisać całe wykształcenie w jednym polu:\n\n10.2015 - 06.2020: Uniwersytet Warszawski\n- Kierunek: Marketing i Zarządzanie\n- Stopień: magister\n\n10.2012 - 06.2015: Szkoła Główna Handlowa\n- Kierunek: Ekonomia\n- Stopień: licencjat', type: 'textarea', required: false, section: SECTIONS.EDUCATION },
];

// Pola formularza dla umiejętności
export const skillsFields: TemplateField[] = [
  { id: 'skillName', label: 'Umiejętność', placeholder: 'np. Obsługa MS Office', type: 'text', required: false, section: SECTIONS.SKILLS },
  { id: 'skillLevel', label: 'Poziom umiejętności', placeholder: 'Wybierz poziom umiejętności', type: 'text', required: false, section: SECTIONS.SKILLS },
  { id: 'hideSkillLevel', label: 'Ukryj poziom umiejętności', placeholder: '', type: 'checkbox', required: false, section: SECTIONS.SKILLS },
  { id: 'skills', label: 'Umiejętności', placeholder: 'Social media: 5\nGoogle Analytics: 4\nSEO/SEM: 5\nCopywriting: 4\n\nWpisz umiejętności w formacie "Nazwa: ocena (1-5)", każda w nowej linii', type: 'textarea', required: false, section: SECTIONS.SKILLS },
];

// Pola formularza dla języków obcych
export const languagesFields: TemplateField[] = [
  { id: 'languages', label: 'Znajomość języków', placeholder: 'Angielski: poziom C1\nNiemiecki: poziom B2\n\nWpisz języki w formacie "Język: poziom", każdy w nowej linii', type: 'textarea', required: false, section: SECTIONS.ADDITIONAL },
];

// Pola formularza dla zainteresowań
export const hobbiesFields: TemplateField[] = [
  { id: 'hobbies', label: 'Zainteresowania', placeholder: 'sport, muzyka, podróżowanie, motoryzacja, fotografia, nowe technologie, gotowanie, książki, psychologia, moda, piłka nożna, historia, informatyka, taniec, kino', type: 'textarea', required: false, section: SECTIONS.ADDITIONAL },
];

// Pola formularza dla klauzuli RODO
export const clauseFields: TemplateField[] = [
  { id: 'clause', label: 'Klauzula RODO', placeholder: 'Wyrażam zgodę na przetwarzanie moich danych osobowych...', type: 'textarea', required: true, section: SECTIONS.CLAUSE, defaultValue: 'Wyrażam zgodę na przetwarzanie moich danych osobowych w celu prowadzenia rekrutacji na aplikowane przeze mnie stanowisko.' },
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
