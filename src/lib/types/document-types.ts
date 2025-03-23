
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

// Helpers for template generation
export const formatSectionContent = (content: string | undefined): string => {
  if (!content) return '';
  
  const lines = content.split('\n\n').filter(line => line.trim());
  let html = '';
  
  for (const line of lines) {
    html += `<div style="margin-bottom: 12px;">${line.replace(/\n/g, '<br>')}</div>`;
  }
  
  return html;
};

export const formatSkills = (skillsText: string | undefined): string => {
  if (!skillsText) return '';
  return skillsText.replace(/\n/g, '<br>');
};

export const formatLanguages = (languagesText: string | undefined): string => {
  if (!languagesText) return '';
  return languagesText.replace(/\n/g, '<br>');
};
