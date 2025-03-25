
import { DocumentTemplate } from '../types/document-types';
import { format } from 'date-fns';

/**
 * Prepares common template data and styling from form data and configuration
 */
export const prepareTemplateData = (data: Record<string, string>, config: Record<string, any> = {}) => {
  const firstName = data.firstName || '';
  const lastName = data.lastName || '';
  const fullName = `${firstName} ${lastName}`.trim();
  const fullNameUpper = fullName.toUpperCase(); // Added fullNameUpper property
  const position = data.position || '';
  const currentDate = data.date ? data.date : format(new Date(), 'dd.MM.yyyy');
  
  const primaryColor = config.primaryColor || '#3498db';
  const fontFamily = config.fontFamily || 'Arial, sans-serif';
  const fontSize = config.fontSize || '12px';
  
  return {
    firstName,
    lastName,
    fullName,
    fullNameUpper, // Return the new property
    position,
    date: currentDate,
    primaryColor,
    fontFamily,
    fontSize
  };
};

/**
 * Gets recipient section HTML for cover letter
 */
export const getRecipientSection = (data: Record<string, string>) => {
  if (!data.recipientName && !data.recipientCompany && !data.recipientAddress) {
    return '';
  }
  
  return `
    <div style="margin-bottom: 25px;">
      ${data.recipientName ? `<p style="margin: 0;">${data.recipientName}</p>` : ''}
      ${data.recipientPosition ? `<p style="margin: 0;">${data.recipientPosition}</p>` : ''}
      ${data.recipientCompany ? `<p style="margin: 0;">${data.recipientCompany}</p>` : ''}
      ${data.recipientAddress ? `<p style="margin: 0;">${data.recipientAddress}</p>` : ''}
    </div>
  `;
};

/**
 * Gets clause section HTML for cover letter
 */
export const getClauseSection = (data: Record<string, string>) => {
  if (!data.clause) {
    return '';
  }
  
  return `
    <div style="margin-top: 30px; font-size: 9px; color: #666;">
      <p style="margin: 0;">${data.clause}</p>
    </div>
  `;
};

/**
 * Format the experience section for CV from string data
 */
export const formatExperienceSection = (experienceData: string) => {
  if (!experienceData) return '';
  
  try {
    const entries = parseMultiEntryData(experienceData);
    let html = '';
    
    entries.forEach(entry => {
      html += `
        <div style="margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
            <strong>${entry.company || ''}</strong>
            <span>${entry.period || ''}</span>
          </div>
          <div style="font-style: italic; margin-bottom: 5px;">${entry.position || ''}</div>
          ${entry.details ? `<ul style="margin: 5px 0; padding-left: 20px;">
            ${entry.details.split('\n').filter(line => line.trim().startsWith('-')).map(line => 
              `<li>${line.replace(/^-\s*/, '')}</li>`
            ).join('')}
          </ul>` : ''}
        </div>
      `;
    });
    
    return html;
  } catch (e) {
    console.error("Error parsing experience data:", e);
    return '<p>Error displaying experience data</p>';
  }
};

/**
 * Format the education section for CV from string data
 */
export const formatEducationSection = (educationData: string) => {
  if (!educationData) return '';
  
  try {
    const entries = parseMultiEntryData(educationData);
    let html = '';
    
    entries.forEach(entry => {
      html += `
        <div style="margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
            <strong>${entry.school || ''}</strong>
            <span>${entry.period || ''}</span>
          </div>
          <div style="font-style: italic; margin-bottom: 5px;">${entry.degree || ''}</div>
          ${entry.details ? `<ul style="margin: 5px 0; padding-left: 20px;">
            ${entry.details.split('\n').filter(line => line.trim().startsWith('-')).map(line => 
              `<li>${line.replace(/^-\s*/, '')}</li>`
            ).join('')}
          </ul>` : ''}
        </div>
      `;
    });
    
    return html;
  } catch (e) {
    console.error("Error parsing education data:", e);
    return '<p>Error displaying education data</p>';
  }
};

/**
 * Format the skills section for CV from string data with proficiency bar
 */
export const formatSkillsSection = (skillsData: string) => {
  if (!skillsData) return '';
  
  try {
    const lines = skillsData.split('\n')
      .filter(line => line.trim() !== '')
      .map(line => {
        // Check if line contains proficiency level
        if (line.includes('|')) {
          const parts = line.replace(/^-\s*/, '').split('|').map(part => part.trim());
          return {
            skill: parts[0] || '',
            proficiency: parseInt(parts[1]) || 3
          };
        } else {
          return {
            skill: line.replace(/^-\s*/, '').trim(),
            proficiency: 3 // Default level
          };
        }
      });
    
    let html = '<div>';
    
    lines.forEach(item => {
      const percentage = (item.proficiency / 5) * 100;
      
      html += `
        <div style="margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <div style="font-weight: 500;">${item.skill}</div>
            <div>${item.proficiency}/5</div>
          </div>
          <div style="height: 6px; width: 100%; background-color: #f0f0f0; border-radius: 3px; overflow: hidden;">
            <div style="height: 100%; width: ${percentage}%; background-color: #8B5CF6;"></div>
          </div>
        </div>
      `;
    });
    
    html += '</div>';
    return html;
  } catch (e) {
    console.error("Error parsing skills data:", e);
    return '<p>Error displaying skills data</p>';
  }
};

/**
 * Format the languages section for CV from string data
 */
export const formatLanguagesSection = (languagesData: string) => {
  if (!languagesData) return '';
  
  try {
    const lines = languagesData.split('\n')
      .filter(line => line.trim() !== '')
      .map(line => {
        const parts = line.replace(/^-\s*/, '').split('-').map(part => part.trim());
        return {
          language: parts[0] || '',
          level: parts.length > 1 ? parts[1] : ''
        };
      });
    
    let html = '<ul style="padding-left: 20px; margin: 10px 0;">';
    
    lines.forEach(item => {
      html += `<li><strong>${item.language}</strong>${item.level ? ` - ${item.level}` : ''}</li>`;
    });
    
    html += '</ul>';
    return html;
  } catch (e) {
    console.error("Error parsing languages data:", e);
    return '<p>Error displaying languages data</p>';
  }
};

/**
 * Format the interests section for CV from string data
 */
export const formatInterestsSection = (interestsData: string) => {
  if (!interestsData) return '';
  
  try {
    const lines = interestsData.split('\n')
      .filter(line => line.trim() !== '')
      .map(line => line.replace(/^-\s*/, '').trim());
    
    return `
      <ul style="padding-left: 20px; margin: 10px 0;">
        ${lines.map(interest => `<li>${interest}</li>`).join('')}
      </ul>
    `;
  } catch (e) {
    console.error("Error parsing interests data:", e);
    return '<p>Error displaying interests data</p>';
  }
};

/**
 * Parse multi-entry data from string format
 */
export function parseMultiEntryData(data: string): Array<Record<string, string>> {
  if (!data || data.trim() === '') return [];
  
  const lines = data.split('\n').filter(line => line.trim() !== '');
  const entries = [];
  let currentEntry: Record<string, string> = {};
  let currentLines: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // New entry starts with pipe-separated values
    if (line.includes('|') && !line.startsWith('-')) {
      // Save previous entry if exists
      if (Object.keys(currentEntry).length > 0) {
        if (currentLines.length > 0) {
          currentEntry.details = currentLines.join('\n');
        }
        entries.push(currentEntry);
        currentEntry = {};
        currentLines = [];
      }
      
      // Parse header line with pipe separators
      const parts = line.split('|').map(part => part.trim());
      
      if (line.includes('company') || (!line.includes('school') && parts.length >= 3)) {
        currentEntry.company = parts[0] || '';
        currentEntry.position = parts[1] || '';
        currentEntry.period = parts[2] || '';
      } else if (line.includes('school') || parts.length >= 3) {
        currentEntry.school = parts[0] || '';
        currentEntry.degree = parts[1] || '';
        currentEntry.period = parts[2] || '';
      }
    } 
    // Detail lines
    else if (line.startsWith('-')) {
      currentLines.push(line);
    }
    // Empty line marks the end of an entry
    else if (line.trim() === '' && Object.keys(currentEntry).length > 0) {
      if (currentLines.length > 0) {
        currentEntry.details = currentLines.join('\n');
      }
      entries.push(currentEntry);
      currentEntry = {};
      currentLines = [];
    }
  }
  
  // Add the last entry
  if (Object.keys(currentEntry).length > 0) {
    if (currentLines.length > 0) {
      currentEntry.details = currentLines.join('\n');
    }
    entries.push(currentEntry);
  }
  
  return entries;
}
