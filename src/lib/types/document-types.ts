
export interface TemplateField {
  id: string;
  label: string;
  placeholder: string;
  type: 'text' | 'textarea' | 'date' | 'email' | 'tel' | 'photo' | 'checkbox';
  required?: boolean;
  section: string;
  defaultValue?: string;
}

export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  fields: TemplateField[];
  template: (data: Record<string, string>, config?: Record<string, any>) => string;
}

export interface DocumentType {
  id: string;
  name: string;
  description: string;
  icon: string;
  templates: DocumentTemplate[];
}

// Sekcje formularza
export const SECTIONS = {
  PERSONAL: 'dane_osobowe',
  RECIPIENT: 'odbiorca',
  CONTENT: 'tresc_listu',
  CLAUSE: 'klauzula',
  CONFIG: 'konfiguracja',
  
  // CV sections
  SUMMARY: 'podsumowanie',
  EXPERIENCE: 'doswiadczenie',
  EDUCATION: 'wyksztalcenie',
  SKILLS: 'umiejetnosci',
  ADDITIONAL: 'dodatkowe'
};
