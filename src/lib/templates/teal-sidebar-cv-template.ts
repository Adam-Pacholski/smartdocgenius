
import { DocumentTemplate } from '../types/document-types';
import { prepareTemplateData, formatSectionContent, createSkillsProgressBars, formatLanguages } from './template-utils';

/**
 * CV Template with teal sidebar
 * 
 * Features:
 * - Colored sidebar for contact information and skills
 * - Main content in white section
 * - Skill progress bars to visualize competency levels
 * - Clean and professional design
 */
export const tealSidebarCvTemplate: DocumentTemplate['template'] = (data: Record<string, string>, config: Record<string, any> = {}) => {
  // Prepare data and styles
  const {
    firstName,
    lastName,
    fullNameUpper,
    position,
    primaryColor,
    fontFamily,
    fontSize
  } = prepareTemplateData(data, {
    ...config,
    primaryColor: config.primaryColor || '#1e88e5'
  });
  
  return `
    <div style="width: 100%; max-width: 21cm; margin: 0 auto; padding: 0; font-family: ${fontFamily}; font-size: ${fontSize}; line-height: 1.5; color: #333; position: relative; box-sizing: border-box;">
      <!-- Two-column layout with fixed heights -->
      <div style="display: flex; min-height: 1123px; overflow: hidden; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        <!-- Left Sidebar - must extend to the full height -->
        <div style="width: 35%; background-color: ${primaryColor}; color: white; padding: 25px 16px; box-sizing: border-box; min-height: 1123px; border-radius: 6px 0 0 6px;">
          ${data.photo ? `
            <div style="width: 130px; height: 160px; overflow: hidden; margin: 10px auto 30px; display: block; text-align: center;">
              <img src="${data.photo}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px; box-shadow: 0 3px 6px rgba(0,0,0,0.2);" alt="${fullNameUpper}" />
            </div>
          ` : ''}
          
          <h2 style="margin: 0 0 20px; text-align: center; font-size: 16px; text-transform: uppercase;">DANE OSOBOWE</h2>
          
          <div style="margin-bottom: 30px; font-size: 13px; padding: 0 16px;">
            ${data.email ? `
              <p style="margin: 0 0 10px; word-break: break-all;">
                <strong>Email:</strong><br/>
                ${data.email}
              </p>
            ` : ''}
            
            ${data.phone ? `
              <p style="margin: 0 0 10px; word-break: break-all;">
                <strong>Telefon:</strong><br/>
                ${data.phone}
              </p>
            ` : ''}
            
            ${data.birthDate ? `
              <p style="margin: 0 0 10px; word-break: break-all;">
                <strong>Data urodzenia:</strong><br/>
                ${data.birthDate}
              </p>
            ` : ''}
            
            ${data.address ? `
              <p style="margin: 0 0 10px; word-break: break-all;">
                <strong>Adres:</strong><br/>
                ${data.address}
              </p>
            ` : ''}
          </div>
          
          <!-- Skills with progress bars -->
          ${data.skills ? `
            <div style="margin-bottom: 30px;">
              <h2 style="margin: 0 0 20px; text-align: center; font-size: 16px; text-transform: uppercase;">UMIEJĘTNOŚCI</h2>
              <div style="padding: 0 16px;">
                ${createSkillsProgressBars(data.skills, primaryColor)}
              </div>
            </div>
          ` : ''}
          
          <!-- Languages -->
          ${data.languages ? `
            <div style="margin-bottom: 30px;">
              <h2 style="margin: 0 0 20px; text-align: center; font-size: 16px; text-transform: uppercase;">JĘZYKI OBCE</h2>
              <div style="padding: 0 16px; font-size: 13px;">
                ${formatLanguages(data.languages)}
              </div>
            </div>
          ` : ''}
          
          <!-- Hobbies -->
          ${data.hobbies ? `
            <div style="margin-bottom: 30px;">
              <h2 style="margin: 0 0 20px; text-align: center; font-size: 16px; text-transform: uppercase;">ZAINTERESOWANIA</h2>
              <div style="padding: 0 16px; font-size: 13px;">
                ${data.hobbies.replace(/\n/g, '<br>')}
              </div>
            </div>
          ` : ''}
        </div>
        
        <!-- Main Content -->
        <div style="width: 65%; padding: 25px 25px; box-sizing: border-box; background-color: white; position: relative; display: flex; flex-direction: column; min-height: 1123px; border-radius: 0 6px 6px 0;">
          <!-- Header -->
          <div style="margin-bottom: 30px;">
            <h1 style="margin: 0; color: ${primaryColor}; font-size: 26px;">${fullNameUpper}</h1>
            <p style="margin: 5px 0 0; color: #666; text-transform: uppercase;">${position}</p>
          </div>
          
          <!-- Summary -->
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
          
          <!-- Clause - Bottom positioned -->
          <div style="margin-top: auto; border-top: 1px solid #eee; padding-top: 15px;">
            <p data-clause style="margin: 0; font-size: 10px; color: #666; text-align: justify;">
              ${data.clause || 'Wyrażam zgodę na przetwarzanie moich danych osobowych dla potrzeb niezbędnych do realizacji procesu rekrutacji zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (RODO).'}
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
};
