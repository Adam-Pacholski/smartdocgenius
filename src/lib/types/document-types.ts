export interface TemplateField {
  id: string;
  label: string;
  placeholder: string;
  type: 'text' | 'textarea' | 'date' | 'email' | 'tel' | 'photo' | 'color';
  required?: boolean;
  section: string;
  defaultValue?: string;
  description?: string; // Added this property
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
  comingSoon?: boolean;
  displayComingSoon?: boolean; // Added this property to fix type errors
}

// Sekcje formularza
export const SECTIONS = {
  PERSONAL: 'dane_osobowe',
  RECIPIENT: 'odbiorca',
  CONTENT: 'tresc_listu',
  CLAUSE: 'klauzula',
  CONFIG: 'konfiguracja',
  // CV sections
  EXPERIENCE: 'doswiadczenie',
  EDUCATION: 'edukacja',
  SKILLS: 'umiejetnosci',
  LANGUAGES: 'jezyki',
  INTERESTS: 'zainteresowania'
};
