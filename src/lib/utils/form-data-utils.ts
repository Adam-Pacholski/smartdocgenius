
/**
 * Utility functions for parsing and formatting form data
 */

/**
 * Parse experience and education entries from form data
 * @param fieldName Name of the field to parse (doswiadczenie or edukacja)
 * @param formData The form data object
 */
export function parseExperienceOrEducationEntries(fieldName: string, formData: Record<string, string>): Array<Record<string, string | number | boolean>> {
  if (!formData[fieldName]) return [];
  
  try {
    console.log(`Parsing ${fieldName} data:`, formData[fieldName]);
    // Process the text as-is without filtering any lines
    const lines = formData[fieldName].split('\n');
    const entries = [];
    let currentEntry: Record<string, string | number | boolean> = {};
    let currentLines: string[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      if (line.includes('|') && !line.startsWith('-')) {
        if (Object.keys(currentEntry).length > 0 || currentLines.length > 0) {
          if (currentLines.length > 0) {
            currentEntry.details = currentLines.join('\n');
          }
          entries.push({...currentEntry});
          currentEntry = {};
          currentLines = [];
        }
        
        const parts = line.split('|').map(part => part);
        
        if (fieldName === 'doswiadczenie') {
          currentEntry.company = parts[0] || '';
          currentEntry.position = parts[1] || '';
          
          const periodText = parts[2] || '';
          currentEntry.isCurrent = periodText.includes('do teraz');
          
          if (periodText) {
            const dateParts = periodText.split('-').map(d => d);
            currentEntry.startDate = dateParts[0] || '';
            
            if (dateParts.length > 1 && !currentEntry.isCurrent) {
              currentEntry.endDate = dateParts[1] || '';
            } else {
              currentEntry.endDate = '';
            }
          }
        } else if (fieldName === 'edukacja') {
          currentEntry.school = parts[0] || '';
          currentEntry.degree = parts[1] || '';
          
          const periodText = parts[2] || '';
          currentEntry.isCurrent = periodText.includes('do teraz');
          
          if (periodText) {
            const dateParts = periodText.split('-').map(d => d);
            currentEntry.startDate = dateParts[0] || '';
            
            if (dateParts.length > 1 && !currentEntry.isCurrent) {
              currentEntry.endDate = dateParts[1] || '';
            } else {
              currentEntry.endDate = '';
            }
          }
        }
      } 
      else {
        // Always add lines to preserve empty lines which represent line breaks
        currentLines.push(line);
      }
    }
    
    if (Object.keys(currentEntry).length > 0 || currentLines.length > 0) {
      if (currentLines.length > 0) {
        currentEntry.details = currentLines.join('\n');
      }
      entries.push({...currentEntry});
    }
    
    console.log(`Parsed ${fieldName} entries:`, entries);
    return entries;
  } catch (e) {
    console.error(`Error parsing ${fieldName} entries:`, e);
    return [];
  }
}

/**
 * Parse skills entries from form data
 */
export function parseSkillsEntries(formData: Record<string, string>): Array<Record<string, string | number | boolean>> {
  if (!formData.umiejetnosci) return [];
  
  try {
    return formData.umiejetnosci.split('\n')
      .filter(line => line.trim() !== '')
      .map(line => {
        if (line.includes('|')) {
          const parts = line.replace(/^-\s*/, '').split('|');
          return {
            skill: parts[0],
            proficiency: parseInt(parts[1]) || 3
          };
        }
        return {
          skill: line.replace(/^-\s*/, ''),
          proficiency: 3
        };
      });
  } catch (e) {
    console.error("Error parsing skills:", e);
    return [];
  }
}

/**
 * Parse language entries from form data
 */
export function parseLanguageEntries(formData: Record<string, string>): Array<Record<string, string | number | boolean>> {
  if (!formData.jezyki) return [];
  
  try {
    return formData.jezyki.split('\n')
      .filter(line => line.trim() !== '')
      .map(line => {
        const parts = line.replace(/^-\s*/, '').split('-');
        return {
          language: parts[0],
          level: parts.length > 1 ? parts[1] : ''
        };
      });
  } catch (e) {
    console.error("Error parsing languages:", e);
    return [];
  }
}

/**
 * Parse interest entries from form data
 */
export function parseInterestEntries(formData: Record<string, string>): Array<Record<string, string | number | boolean>> {
  if (!formData.zainteresowania) return [];
  
  try {
    return formData.zainteresowania.split('\n')
      .filter(line => line.trim() !== '')
      .map(line => ({
        interest: line.replace(/^-\s*/, '')
      }));
  } catch (e) {
    console.error("Error parsing interests:", e);
    return [];
  }
}

/**
 * Parse portfolio entries from form data
 */
export function parsePortfolioEntries(formData: Record<string, string>): Array<Record<string, string | number | boolean>> {
  if (!formData.portfolio) return [];
  
  try {
    return formData.portfolio.split('\n')
      .filter(line => line.trim() !== '')
      .map(line => {
        const parts = line.replace(/^-\s*/, '').split('|');
        return {
          title: parts[0] || '',
          url: parts.length > 1 ? parts[1] : '',
          type: parts.length > 2 ? parts[2] : 'website'
        };
      });
  } catch (e) {
    console.error("Error parsing portfolio links:", e);
    return [];
  }
}

/**
 * Format entries to string for form data storage
 */
export function formatEntriesToString(
  fieldName: string, 
  entries: Array<Record<string, string | number | boolean>>
): string {
  let result = '';
  
  entries.forEach(entry => {
    if (fieldName === 'doswiadczenie') {
      let period = '';
      if (entry.startDate) {
        const start = entry.startDate.toString();
        const end = entry.endDate ? entry.endDate.toString() : '';
        period = entry.isCurrent ? `${start} - do teraz` : `${start}${end ? ` - ${end}` : ''}`;
      }

      result += `${entry.company ? entry.company.toString() : ''}|${entry.position ? entry.position.toString() : ''}|${period}\n`;
      if (entry.details) {
        // Preserve the details text exactly as it is
        result += `${entry.details.toString()}`;
        // Only add a newline if the details don't already end with one
        if (!entry.details.toString().endsWith('\n')) {
          result += '\n';
        }
      }
    } else if (fieldName === 'edukacja') {
      let period = '';
      if (entry.startDate) {
        const start = entry.startDate.toString();
        const end = entry.endDate ? entry.endDate.toString() : '';
        period = entry.isCurrent ? `${start} - do teraz` : `${start}${end ? ` - ${end}` : ''}`;
      }

      result += `${entry.school ? entry.school.toString() : ''}|${entry.degree ? entry.degree.toString() : ''}|${period}\n`;
      if (entry.details) {
        // Preserve the details text exactly as it is
        result += `${entry.details.toString()}`;
        // Only add a newline if the details don't already end with one
        if (!entry.details.toString().endsWith('\n')) {
          result += '\n';
        }
      }
    } else if (fieldName === 'umiejetnosci') {
      result += `- ${entry.skill ? entry.skill.toString() : ''}|${entry.proficiency !== undefined ? entry.proficiency.toString() : '3'}\n`;
    } else if (fieldName === 'jezyki') {
      result += `- ${entry.language ? entry.language.toString() : ''}-${entry.level ? entry.level.toString() : ''}\n`;
    } else if (fieldName === 'zainteresowania') {
      result += `- ${entry.interest ? entry.interest.toString() : ''}\n`;
    } else if (fieldName === 'portfolio') {
      result += `${entry.title ? entry.title.toString() : ''}|${entry.url ? entry.url.toString() : ''}|${entry.type ? entry.type.toString() : 'website'}\n`;
    }
    
    result += '\n';
  });
  
  return result;
}

/**
 * Parse existing entries from form data based on section name
 */
export function parseExistingEntries(sectionName: string, formData: Record<string, string>): Array<Record<string, string | number | boolean>> {
  switch (sectionName) {
    case 'doswiadczenie':
    case 'edukacja':
      return parseExperienceOrEducationEntries(sectionName, formData);
    case 'umiejetnosci':
      return parseSkillsEntries(formData);
    case 'jezyki':
      return parseLanguageEntries(formData);
    case 'zainteresowania':
      return parseInterestEntries(formData);
    case 'portfolio':
      return parsePortfolioEntries(formData);
    default:
      return [];
  }
}
