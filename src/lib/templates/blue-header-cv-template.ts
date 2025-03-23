
import { DocumentTemplate, formatSectionContent, formatSkills, formatLanguages } from '../types/document-types';

/**
 * CV Template with blue header
 * 
 * Features:
 * - Blue header with contact information
 * - Optional photo on the right side of header
 * - Clearly separated sections for experience, education, skills
 * - Professional and clean design
 */
export const blueHeaderCvTemplate: DocumentTemplate['template'] = (data: Record<string, string>, config: Record<string, any> = {}) => {
  // Prepare data
  const firstName = data.firstName || '';
  const lastName = data.lastName || '';
  const fullName = `${firstName} ${lastName}`;
  const position = data.position || '';
  
  // Apply custom configurations or use defaults
  const primaryColor = config?.primaryColor || '#1e88e5';
  const fontFamily = config?.fontFamily || 'Arial, sans-serif';
  const fontSize = config?.fontSize || '12px';
  
  return `
    <div style="width: 100%; max-width: 21cm; margin: 0 auto; padding: 0; font-family: ${fontFamily}; font-size: ${fontSize}; line-height: 1.5; color: #333; box-sizing: border-box;">
      <!-- Header -->
      <div style="display: flex; background-color: ${primaryColor}; color: white; padding: 20px; margin: 0; width: 100%; box-sizing: border-box; border-radius: 6px 6px 0 0; align-items: center;">
        <div style="flex: 1; padding: 0;">
          <h1 style="margin: 0; font-size: 24px; text-transform: uppercase;">${fullName}</h1>
          <p style="margin: 0; text-transform: uppercase; font-size: 14px;">${position}</p>
          <div style="margin-top: 15px; font-size: 13px;">
            ${data.email ? `<p style="margin: 0 0 5px; word-break: break-word;"><span>✉</span> ${data.email}</p>` : ''}
            ${data.phone ? `<p style="margin: 0 0 5px; word-break: break-word;"><span>✆</span> ${data.phone}</p>` : ''}
            ${data.birthDate ? `<p style="margin: 0 0 5px; word-break: break-word;"><span>📅</span> ${data.birthDate}</p>` : ''}
            ${data.address ? `<p style="margin: 0 0 5px; word-break: break-word;"><span>📍</span> ${data.address}</p>` : ''}
          </div>
        </div>
        ${data.photo ? `
          <div style="width: 120px; height: 150px; overflow: hidden; margin-left: 20px; display: flex; align-items: center; justify-content: center;">
            <img src="${data.photo}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;" alt="${fullName}" />
          </div>
        ` : ''}
      </div>
      
      <!-- Document Body -->
      <div style="padding: 20px 30px; background-color: #ffffff; position: relative; min-height: 800px; box-sizing: border-box;">
        <!-- Summary Section -->
        ${data.summary ? `
          <div style="margin-bottom: 25px;">
            <h2 style="font-size: 16px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 5px; margin-bottom: 10px; color: ${primaryColor};">PODSUMOWANIE ZAWODOWE</h2>
            <p style="text-align: justify;">${data.summary}</p>
          </div>
        ` : ''}
        
        <!-- Experience Section -->
        ${data.experience ? `
          <div style="margin-bottom: 25px;">
            <h2 style="font-size: 16px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 5px; margin-bottom: 10px; color: ${primaryColor};">DOŚWIADCZENIE ZAWODOWE</h2>
            <div style="text-align: justify;">${formatSectionContent(data.experience)}</div>
          </div>
        ` : ''}
        
        <!-- Education Section -->
        ${data.education ? `
          <div style="margin-bottom: 25px;">
            <h2 style="font-size: 16px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 5px; margin-bottom: 10px; color: ${primaryColor};">WYKSZTAŁCENIE</h2>
            <div style="text-align: justify;">${formatSectionContent(data.education)}</div>
          </div>
        ` : ''}
        
        <!-- Skills and Additional Info in two columns -->
        <div style="display: flex; flex-wrap: wrap; margin: 0 -10px;">
          <!-- Skills Column -->
          <div style="flex: 1; min-width: 45%; padding: 0 10px; box-sizing: border-box;">
            ${data.skills ? `
              <div style="margin-bottom: 25px;">
                <h2 style="font-size: 16px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 5px; margin-bottom: 10px; color: ${primaryColor};">UMIEJĘTNOŚCI</h2>
                <div>${formatSkills(data.skills)}</div>
              </div>
            ` : ''}
          </div>
          
          <!-- Languages and Hobbies Column -->
          <div style="flex: 1; min-width: 45%; padding: 0 10px; box-sizing: border-box;">
            ${data.languages ? `
              <div style="margin-bottom: 25px;">
                <h2 style="font-size: 16px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 5px; margin-bottom: 10px; color: ${primaryColor};">JĘZYKI OBCE</h2>
                <div>${formatLanguages(data.languages)}</div>
              </div>
            ` : ''}
            
            ${data.hobbies ? `
              <div style="margin-bottom: 25px;">
                <h2 style="font-size: 16px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 5px; margin-bottom: 10px; color: ${primaryColor};">ZAINTERESOWANIA</h2>
                <p>${data.hobbies}</p>
              </div>
            ` : ''}
          </div>
        </div>
        
        <!-- Clause -->
        <div style="margin-top: 40px; padding-top: 20px;">
          <p data-clause style="font-size: 10px; color: #666; text-align: justify;">
            ${data.clause || 'Wyrażam zgodę na przetwarzanie moich danych osobowych dla potrzeb niezbędnych do realizacji procesu rekrutacji zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (RODO).'}
          </p>
        </div>
      </div>
    </div>
  `;
};
