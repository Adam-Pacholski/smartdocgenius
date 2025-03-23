
import { DocumentTemplate, formatSectionContent, formatSkills, formatLanguages } from '../types/document-types';

/**
 * CV Template with minimalist icons
 * 
 * Features:
 * - Clean, minimalist design with icon accents
 * - Two-column layout for skills and experiences
 * - Modern and professional appearance
 */
export const minimalistIconsCvTemplate: DocumentTemplate['template'] = (data: Record<string, string>, config: Record<string, any> = {}) => {
  // Prepare data
  const firstName = data.firstName || '';
  const lastName = data.lastName || '';
  const fullName = `${firstName} ${lastName}`;
  const fullNameUpper = fullName.toUpperCase();
  const position = data.position || '';
  
  // Apply custom configurations or use defaults
  const primaryColor = config?.primaryColor || '#c0392b';
  const fontFamily = config?.fontFamily || 'Arial, sans-serif';
  const fontSize = config?.fontSize || '12px';
  
  return `
    <div style="max-width: 21cm; margin: 0; padding: 0; font-family: ${fontFamily}; font-size: ${fontSize}; line-height: 1.5; color: #333;">
      <div style="padding: 30px 30px 80px 30px; min-height: 1000px; position: relative;">
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid ${primaryColor}; padding-bottom: 10px; margin-bottom: 15px;">
          <div>
            <h1 style="margin: 0; color: ${primaryColor}; font-size: 28px;">${fullNameUpper}</h1>
            <p style="margin: 5px 0 0; color: #666; text-transform: uppercase;">${position}</p>
          </div>
          
          ${data.photo ? `
            <div style="width: 120px; height: 150px; overflow: hidden;">
              <img src="${data.photo}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;" alt="${fullNameUpper}" />
            </div>
          ` : ''}
        </div>
        
        <!-- Contact Info Icons -->
        <div style="display: flex; flex-wrap: wrap; justify-content: flex-end; margin: 15px 0 20px 0; color: #666; font-size: 13px;">
          ${data.email ? `<span style="margin-left: 15px; margin-bottom: 5px; word-break: break-all;"><span style="color: ${primaryColor}; font-size: 16px;">✉</span> ${data.email}</span>` : ''}
          ${data.phone ? `<span style="margin-left: 15px; margin-bottom: 5px; word-break: break-all;"><span style="color: ${primaryColor}; font-size: 16px;">✆</span> ${data.phone}</span>` : ''}
          ${data.birthDate ? `<span style="margin-left: 15px; margin-bottom: 5px; word-break: break-all;"><span style="color: ${primaryColor}; font-size: 16px;">📅</span> ${data.birthDate}</span>` : ''}
          ${data.address ? `<span style="margin-left: 15px; margin-bottom: 5px; word-break: break-all;"><span style="color: ${primaryColor}; font-size: 16px;">📍</span> ${data.address}</span>` : ''}
        </div>
        
        <!-- Summary -->
        ${data.summary ? `
          <div style="margin-bottom: 25px;">
            <h2 style="font-size: 16px; border-bottom: 1px solid ${primaryColor}; padding-bottom: 5px; margin-bottom: 10px; color: ${primaryColor};">PODSUMOWANIE ZAWODOWE</h2>
            <p style="text-align: justify;">${data.summary}</p>
          </div>
        ` : ''}
        
        <!-- Main content in two columns -->
        <div style="display: flex; margin: 0 -15px;">
          <!-- Left column -->
          <div style="flex: 3; padding: 0 15px;">
            <!-- Experience Section -->
            ${data.experience ? `
              <div style="margin-bottom: 25px;">
                <h2 style="font-size: 16px; border-bottom: 1px solid ${primaryColor}; padding-bottom: 5px; margin-bottom: 10px; color: ${primaryColor};">DOŚWIADCZENIE ZAWODOWE</h2>
                <div style="text-align: justify;">${formatSectionContent(data.experience)}</div>
              </div>
            ` : ''}
            
            <!-- Education Section -->
            ${data.education ? `
              <div style="margin-bottom: 25px;">
                <h2 style="font-size: 16px; border-bottom: 1px solid ${primaryColor}; padding-bottom: 5px; margin-bottom: 10px; color: ${primaryColor};">WYKSZTAŁCENIE</h2>
                <div style="text-align: justify;">${formatSectionContent(data.education)}</div>
              </div>
            ` : ''}
          </div>
          
          <!-- Right column -->
          <div style="flex: 2; padding: 0 15px;">
            <!-- Skills Section -->
            ${data.skills ? `
              <div style="margin-bottom: 25px;">
                <h2 style="font-size: 16px; border-bottom: 1px solid ${primaryColor}; padding-bottom: 5px; margin-bottom: 10px; color: ${primaryColor};">UMIEJĘTNOŚCI</h2>
                <div style="text-align: justify;">${formatSkills(data.skills)}</div>
              </div>
            ` : ''}
            
            <!-- Languages Section -->
            ${data.languages ? `
              <div style="margin-bottom: 25px;">
                <h2 style="font-size: 16px; border-bottom: 1px solid ${primaryColor}; padding-bottom: 5px; margin-bottom: 10px; color: ${primaryColor};">JĘZYKI OBCE</h2>
                <div style="text-align: justify;">${formatLanguages(data.languages)}</div>
              </div>
            ` : ''}
            
            <!-- Hobbies Section -->
            ${data.hobbies ? `
              <div style="margin-bottom: 25px;">
                <h2 style="font-size: 16px; border-bottom: 1px solid ${primaryColor}; padding-bottom: 5px; margin-bottom: 10px; color: ${primaryColor};">ZAINTERESOWANIA</h2>
                <div style="text-align: justify;">${data.hobbies.replace(/\n/g, '<br>')}</div>
              </div>
            ` : ''}
          </div>
        </div>
        
        <!-- Clause -->
        <div style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 15px;">
          <p data-clause style="margin: 0; font-size: 10px; color: #666; text-align: justify;">
            ${data.clause || 'Wyrażam zgodę na przetwarzanie moich danych osobowych dla potrzeb niezbędnych do realizacji procesu rekrutacji zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (RODO).'}
          </p>
        </div>
      </div>
    </div>
  `;
};
