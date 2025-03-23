
import { DocumentTemplate } from '../types/document-types';

// Helper function to create HTML progress bars from skills
export const createSkillsProgressBars = (skillsText: string, primaryColor: string) => {
  if (!skillsText) return '';
  
  const skillLines = skillsText.split('\n').filter(line => line.trim());
  let skillsHtml = '';
  
  for (const line of skillLines) {
    const parts = line.split(':');
    if (parts.length < 2) continue;
    
    const skillName = parts[0].trim();
    const skillLevelText = parts[1].trim();
    const skillLevel = parseInt(skillLevelText) || 3; // Default to 3 if parsing fails
    const percentage = Math.min(Math.max(skillLevel, 0), 5) * 20; // Convert 0-5 to 0-100%
    
    skillsHtml += `
      <div class="skill-item" style="margin-bottom: 8px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
          <span style="font-size: 12px;">${skillName}</span>
          <span style="font-size: 12px;">${skillLevel}/5</span>
        </div>
        <div style="height: 6px; background-color: rgba(255,255,255,0.2); border-radius: 3px; overflow: hidden;">
          <div style="height: 100%; width: ${percentage}%; background-color: ${primaryColor === '#1e88e5' ? 'white' : primaryColor}; border-radius: 3px;"></div>
        </div>
      </div>
    `;
  }
  
  return skillsHtml;
};

// Helper function to format languages
export const formatLanguages = (languagesText: string) => {
  if (!languagesText) return '';
  
  const languageLines = languagesText.split('\n').filter(line => line.trim());
  let languagesHtml = '';
  
  for (const line of languageLines) {
    languagesHtml += `<div style="margin-bottom: 4px;">${line}</div>`;
  }
  
  return languagesHtml;
};

// Helper function to format education and experience sections
export const formatSectionContent = (content: string) => {
  if (!content) return '';
  
  const lines = content.split('\n\n').filter(line => line.trim());
  let html = '';
  
  for (const line of lines) {
    html += `<div style="margin-bottom: 12px;">${line.replace(/\n/g, '<br>')}</div>`;
  }
  
  return html;
};

// Common data preparation for templates
export const prepareTemplateData = (data: Record<string, string>, config: Record<string, any> = {}) => {
  const firstName = data.firstName || '';
  const lastName = data.lastName || '';
  const fullName = `${firstName} ${lastName}`;
  const fullNameUpper = fullName.toUpperCase();
  const position = data.position || '';
  const date = new Date().toLocaleDateString('pl-PL');
  
  // Apply custom configurations or use defaults
  const primaryColor = config.primaryColor || '#1e88e5';
  const fontFamily = config.fontFamily || 'Arial, sans-serif';
  const fontSize = config.fontSize || '12px';
  
  return {
    firstName,
    lastName,
    fullName,
    fullNameUpper,
    position,
    date,
    primaryColor,
    fontFamily,
    fontSize
  };
};

// Helper functions for common sections
export const getRecipientSection = (data: Record<string, string>) => {
  return `
    <div style="margin-bottom: 20px;">
      ${data.recipientName ? `<p style="margin: 0 0 3px;">${data.recipientName}</p>` : ''}
      ${data.recipientCompany ? `<p style="margin: 0 0 3px;">${data.recipientCompany}</p>` : ''}
      ${data.recipientAddress ? `<p style="margin: 0 0 3px;">${data.recipientAddress}</p>` : ''}
    </div>
  `;
};

export const getClauseSection = (data: Record<string, string>) => {
  return `
    <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #eee;">
      <p data-clause style="margin: 0; font-size: 10px; color: #666; text-align: justify;">
        ${data.clause || 'Wyrażam zgodę na przetwarzanie moich danych osobowych w celu prowadzenia rekrutacji na aplikowane przeze mnie stanowisko.'}
      </p>
    </div>
  `;
};
