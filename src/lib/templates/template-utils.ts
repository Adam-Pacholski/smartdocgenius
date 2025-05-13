import { format } from "date-fns";
import { formatDateByLanguage, currentDate } from '../utils/document-utils';

export const formatExperienceSection = (experienceText: string): string => {
  if (!experienceText) return '';
  
  try {
    const experiences = experienceText.split('\n\n').filter(exp => exp.trim() !== '');
    let output = '';
    
    experiences.forEach(experience => {
      const lines = experience.split('\n');
      const header = lines[0];
      const details = lines.slice(1).join('\n');
      
      const [company, position, period] = header.split('|').map(item => item.trim());
      
      output += `
        <div style="margin-bottom: 15px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
            <strong>${company}</strong>
            <span>${period}</span>
          </div>
          <div style="margin-bottom: 5px;">${position}</div>
          ${details ? `<div style="color: #555; font-size: 0.95em;">${details.replace(/\n/g, '<br>')}</div>` : ''}
        </div>
      `;
    });
    
    return output;
  } catch (error) {
    console.error('Error formatting experience section:', error);
    return `<p>Error formatting experience data</p>`;
  }
};

export const formatEducationSection = (educationText: string): string => {
  if (!educationText) return '';
  
  try {
    const entries = parseMultiEntryData(educationText);
    let output = '';
    
    entries.forEach(entry => {
      const school = entry.school || '';
      const degree = entry.degree || '';
      const period = entry.period || '';
      const details = entry.details || '';
      
      output += `
        <div style="margin-bottom: 15px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
            <strong>${school}</strong>
            <span>${period}</span>
          </div>
          <div style="margin-bottom: 5px;">${degree}</div>
          ${details ? `<div style="color: #555; font-size: 0.95em;">${details.replace(/\n/g, '<br>')}</div>` : ''}
        </div>
      `;
    });
    
    return output;
  } catch (error) {
    console.error('Error formatting education section:', error);
    return `<p>Error formatting education data</p>`;
  }
};

export const formatSkillsSection = (skillsData: string, progressColor = '#3498db'): string => {
  if (!skillsData) return '';
  
  try {
    const skills = skillsData.split('\n')
      .filter(line => line.trim() !== '')
      .map(line => {
        const cleanLine = line.replace(/^-\s*/, '').trim();
        if (cleanLine.includes('|')) {
          const [skill, proficiencyStr] = cleanLine.split('|').map(part => part.trim());
          const proficiency = parseInt(proficiencyStr) || 3;
          const percentage = (proficiency / 5) * 100;
          
          return {
            skill,
            proficiency,
            percentage
          };
        }
        
        return {
          skill: cleanLine,
          proficiency: 3,
          percentage: 60
        };
      });
    
    let output = '<div style="margin-top: 10px;">';
    
    skills.forEach(({ skill, proficiency, percentage }) => {
      output += `
        <div style="margin-bottom: 10px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
            <div>${skill}</div>
            <div>${proficiency}/5</div>
          </div>
          <div style="background-color: #eee; height: 8px; border-radius: 4px; overflow: hidden;">
            <div style="background-color: ${progressColor}; height: 100%; width: ${percentage}%;"></div>
          </div>
        </div>
      `;
    });
    
    output += '</div>';
    return output;
  } catch (error) {
    console.error('Error formatting skills section:', error);
    return `<p>Error formatting skills data</p>`;
  }
};

export const formatLanguagesSection = (languagesData: string): string => {
  if (!languagesData) return '';
  
  try {
    const languages = languagesData.split('\n')
      .filter(line => line.trim() !== '')
      .map(line => {
        const parts = line.replace(/^-\s*/, '').split('-').map(part => part.trim());
        return {
          language: parts[0],
          level: parts.length > 1 ? parts[1] : ''
        };
      });
    
    let output = '<ul>';
    
    languages.forEach(({ language, level }) => {
      output += `<li>${language} ${level ? ` - ${level}` : ''}</li>`;
    });
    
    output += '</ul>';
    return output;
  } catch (error) {
    console.error('Error formatting languages section:', error);
    return `<p>Error formatting languages data</p>`;
  }
};

export const formatInterestsSection = (interestsData: string): string => {
  if (!interestsData) return '';
  
  try {
    const interests = interestsData.split('\n')
      .filter(line => line.trim() !== '')
      .map(line => line.replace(/^-\s*/, '').trim());
    
    let output = '<ul>';
    
    interests.forEach(interest => {
      output += `<li>${interest}</li>`;
    });
    
    output += '</ul>';
    return output;
  } catch (error) {
    console.error('Error formatting interests section:', error);
    return `<p>Error formatting interests data</p>`;
  }
};

export const formatPortfolioSection = (portfolioData: string): string => {
  if (!portfolioData) return '';
  
  try {
    const links = portfolioData.split('\n')
      .filter(line => line.trim() !== '')
      .map(line => {
        const parts = line.split('|').map(part => part.trim());
        const title = parts[0] || '';
        const url = parts.length > 1 ? parts[1] : '';
        const type = parts.length > 2 ? parts[2] : 'website';
        
        return {
          title,
          url,
          type
        };
      });
    
    let output = '<ul class="portfolio-links">';
    
    links.forEach(link => {
      output += `
        <li>
          <strong>${link.title}:</strong> 
          <a href="${link.url}" target="_blank" style="color: #555; text-decoration: underline;">
            ${link.url}
          </a>
        </li>
      `;
    });
    
    output += '</ul>';
    return output;
  } catch (error) {
    console.error('Error formatting portfolio section:', error);
    return `<p>Error formatting portfolio links</p>`;
  }
};

export const parseMultiEntryData = (text: string): Array<Record<string, string>> => {
  if (!text) return [];
  
  const lines = text.split('\n').filter(line => line.trim() !== '');
  const entries: Array<Record<string, string>> = [];
  let currentEntry: Record<string, string> = {};
  let currentDetails: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.includes('|') && !line.startsWith('-')) {
      if (Object.keys(currentEntry).length > 0 || currentDetails.length > 0) {
        if (currentDetails.length > 0) {
          currentEntry.details = currentDetails.join('\n');
          currentDetails = [];
        }
        entries.push({...currentEntry});
        currentEntry = {};
      }
      
      const parts = line.split('|').map(part => part.trim());
      
      if (parts.length >= 1) currentEntry.school = parts[0];
      if (parts.length >= 2) currentEntry.degree = parts[1];
      if (parts.length >= 3) currentEntry.period = parts[2];
    } 
    else if (line.trim() !== '') {
      currentDetails.push(line);
    }
  }
  
  if (Object.keys(currentEntry).length > 0 || currentDetails.length > 0) {
    if (currentDetails.length > 0) {
      currentEntry.details = currentDetails.join('\n');
    }
    entries.push({...currentEntry});
  }
  
  console.log('Parsed education entries:', entries);
  return entries;
};

/**
 * Prepare common template data from form data and config
 */
export const prepareTemplateData = (data: Record<string, string>, config: Record<string, any> = {}): Record<string, any> => {
  const firstName = data.firstName || '';
  const lastName = data.lastName || '';
  const fullName = `${firstName} ${lastName}`.trim();
  const position = data.position || '';
  
  // Default date (today) or custom date if provided
  const dateValue = data.letterDate || currentDate();
  const date = data.letterDate || dateValue;
  
  // Template styling
  const primaryColor = config.primaryColor || data.primaryColor || '#3498db';
  const fontFamily = config.fontFamily || '"Segoe UI", Arial, sans-serif';
  const fontSize = config.fontSize || '12px';
  
  return {
    firstName,
    lastName,
    fullName,
    position,
    date,
    dateValue,
    primaryColor,
    fontFamily,
    fontSize,
  };
};

export const getRecipientSection = (data: Record<string, any>) => {
  const recipientParts = [];
  
  if (data.recipientName) {
    recipientParts.push(`<p>${data.recipientName}</p>`);
  }
  
  if (data.recipientPosition) {
    recipientParts.push(`<p>${data.recipientPosition}</p>`);
  }
  
  if (data.recipientCompany) {
    recipientParts.push(`<p><strong>${data.recipientCompany}</strong></p>`);
  }
  
  if (data.recipientAddress) {
    recipientParts.push(`<p>${data.recipientAddress}</p>`);
  }
  
  return recipientParts.length > 0 
    ? `<div style="margin-bottom: 30px;">${recipientParts.join('\n')}</div>` 
    : '';
};

export const getClauseSection = (data: Record<string, string>): string => {
  return `
    <div style="position: absolute; bottom: 30px; left: 30px; right: 30px;">
      <p data-clause style="margin: 0; font-size: 10px; color: #666; text-align: justify;">
        ${data.clause || ''}
      </p>
    </div>
  `;
};

export const formatLinksSection = formatPortfolioSection;
