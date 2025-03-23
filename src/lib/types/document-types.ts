
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

// Sections for forms
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

// Helper for parsing JSON safely
export const parseSafeJson = <T>(jsonString: string | undefined, fallback: T): T => {
  if (!jsonString) return fallback;
  try {
    return JSON.parse(jsonString) as T;
  } catch (e) {
    console.error('Error parsing JSON:', e);
    return fallback;
  }
};

// Helper for formatting education items
export const formatEducation = (educationJson: string | undefined): string => {
  if (!educationJson) return '';

  try {
    const educationItems = parseSafeJson<Array<{id: string, data: any}>>(educationJson, []);
    if (!Array.isArray(educationItems)) return '';
    
    let html = '';

    for (const item of educationItems) {
      if (!item || !item.data) continue;
      
      const { data } = item;
      
      const school = data.school || '';
      const startDate = data.educationStartDate || '';
      const endDate = data.currentEducation === 'true' ? 'obecnie' : (data.educationEndDate || '');
      const description = data.educationDescription || '';

      html += `
        <div class="education-item" style="margin-bottom: 16px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <strong>${school}</strong>
            <span>${startDate}${startDate && endDate ? ' — ' : ''}${endDate}</span>
          </div>
          <div>${description.replace(/\n/g, '<br>')}</div>
        </div>
      `;
    }

    return html;
  } catch (e) {
    console.error('Error formatting education:', e);
    return '';
  }
};

// Helper for formatting experience items
export const formatExperience = (experienceJson: string | undefined): string => {
  if (!experienceJson) return '';

  try {
    const experienceItems = parseSafeJson<Array<{id: string, data: any}>>(experienceJson, []);
    if (!Array.isArray(experienceItems)) return '';
    
    let html = '';

    for (const item of experienceItems) {
      if (!item || !item.data) continue;
      
      const { data } = item;
      
      const jobTitle = data.jobTitle || '';
      const company = data.company || '';
      const location = data.location ? `, ${data.location}` : '';
      const startDate = data.startDate || '';
      const endDate = data.currentJob === 'true' ? 'obecnie' : (data.endDate || '');
      const description = data.jobDescription || '';

      html += `
        <div class="experience-item" style="margin-bottom: 16px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <strong>${jobTitle}</strong>
            <span>${startDate}${startDate && endDate ? ' — ' : ''}${endDate}</span>
          </div>
          <div style="margin-bottom: 4px;">${company}${location}</div>
          <div>${description.replace(/\n/g, '<br>')}</div>
        </div>
      `;
    }

    return html;
  } catch (e) {
    console.error('Error formatting experience:', e);
    return '';
  }
};

// Helper for formatting skills items
export const formatSkills = (skillsJson: string | undefined, primaryColor: string = '#3498db'): string => {
  if (!skillsJson) return '';

  try {
    const skillItems = parseSafeJson<Array<{id: string, data: any}>>(skillsJson, []);
    if (!Array.isArray(skillItems)) return '';
    
    let html = '';

    for (const item of skillItems) {
      if (!item || !item.data || !item.data.skillName) continue;
      
      const { data } = item;
      
      const skillName = data.skillName;
      const skillLevel = parseInt(data.skillLevel || '3');
      const hideLevel = data.hideSkillLevel === 'true';
      const percentage = Math.min(Math.max(skillLevel, 0), 5) * 20; // Convert 0-5 to 0-100%

      if (hideLevel) {
        html += `
          <div class="skill-item" style="margin-bottom: 8px;">
            <div style="font-size: 12px;">${skillName}</div>
          </div>
        `;
      } else {
        html += `
          <div class="skill-item" style="margin-bottom: 8px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
              <span style="font-size: 12px;">${skillName}</span>
              <span style="font-size: 12px;">${skillLevel}/5</span>
            </div>
            <div style="height: 6px; background-color: rgba(0,0,0,0.1); border-radius: 3px; overflow: hidden;">
              <div style="height: 100%; width: ${percentage}%; background-color: ${primaryColor}; border-radius: 3px;"></div>
            </div>
          </div>
        `;
      }
    }

    return html;
  } catch (e) {
    console.error('Error formatting skills:', e);
    return '';
  }
};

// Helper for formatting section content
export const formatSectionContent = (content: string | undefined): string => {
  if (!content) return '';
  
  const lines = content.split('\n\n').filter(line => line.trim());
  let html = '';
  
  for (const line of lines) {
    html += `<div style="margin-bottom: 12px;">${line.replace(/\n/g, '<br>')}</div>`;
  }
  
  return html;
};

// Helper for formatting languages
export const formatLanguages = (languagesText: string | undefined): string => {
  if (!languagesText) return '';
  
  try {
    // Próbujemy najpierw zinterpretować jako JSON
    const languageItems = parseSafeJson<Array<{id: string, data: any}>>(languagesText, null);
    
    if (Array.isArray(languageItems)) {
      let html = '';
      
      for (const item of languageItems) {
        if (!item || !item.data) continue;
        
        const { data } = item;
        const language = data.language || '';
        const level = data.level || '';
        
        html += `<div style="margin-bottom: 8px; display: flex; justify-content: space-between;">
          <span>${language}</span>
          <span>${level}</span>
        </div>`;
      }
      
      return html;
    }
    
    // Jeśli to nie jest JSON, traktujemy jako zwykły tekst
    const languageLines = languagesText.split('\n').filter(line => line.trim());
    let html = '';
    
    for (const line of languageLines) {
      html += `<div style="margin-bottom: 4px;">${line}</div>`;
    }
    
    return html;
  } catch (e) {
    // Fallback dla zwykłego tekstu
    const languageLines = languagesText.split('\n').filter(line => line.trim());
    let html = '';
    
    for (const line of languageLines) {
      html += `<div style="margin-bottom: 4px;">${line}</div>`;
    }
    
    return html;
  }
};

// Helper for formatting hobbies as tags
export const formatHobbies = (hobbiesText: string | undefined, primaryColor: string = '#3498db'): string => {
  if (!hobbiesText) return '';
  
  try {
    // Próbujemy najpierw zinterpretować jako JSON
    const hobbyItems = parseSafeJson<Array<{id: string, data: any}>>(hobbiesText, null);
    
    if (Array.isArray(hobbyItems)) {
      let html = '<div style="display: flex; flex-wrap: wrap; gap: 8px;">';
      
      for (const item of hobbyItems) {
        if (!item || !item.data) continue;
        
        const { data } = item;
        const hobby = data.hobby || '';
        
        if (hobby) {
          html += `
            <span style="
              padding: 3px 10px;
              background-color: ${primaryColor}20;
              color: ${primaryColor};
              border-radius: 30px;
              font-size: 12px;
              white-space: nowrap;
            ">
              ${hobby}
            </span>
          `;
        }
      }
      
      html += '</div>';
      return html;
    }
    
    // Jeśli to nie jest JSON, traktujemy jako zwykły tekst z przecinkami
    const hobbies = hobbiesText.split(',').map(hobby => hobby.trim()).filter(hobby => hobby);
    let html = '<div style="display: flex; flex-wrap: wrap; gap: 8px;">';
    
    for (const hobby of hobbies) {
      html += `
        <span style="
          padding: 3px 10px;
          background-color: ${primaryColor}20;
          color: ${primaryColor};
          border-radius: 30px;
          font-size: 12px;
          white-space: nowrap;
        ">
          ${hobby}
        </span>
      `;
    }
    
    html += '</div>';
    return html;
  } catch (e) {
    // Fallback dla zwykłego tekstu
    const hobbies = hobbiesText.split(',').map(hobby => hobby.trim()).filter(hobby => hobby);
    let html = '<div style="display: flex; flex-wrap: wrap; gap: 8px;">';
    
    for (const hobby of hobbies) {
      html += `
        <span style="
          padding: 3px 10px;
          background-color: ${primaryColor}20;
          color: ${primaryColor};
          border-radius: 30px;
          font-size: 12px;
          white-space: nowrap;
        ">
          ${hobby}
        </span>
      `;
    }
    
    html += '</div>';
    return html;
  }
};
