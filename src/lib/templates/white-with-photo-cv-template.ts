
import { DocumentTemplate } from '../types/document-types';
import { prepareTemplateData, formatSectionContent, formatLanguages } from './template-utils';

/**
 * CV Template with white background and photo
 * 
 * Features:
 * - Clean white background
 * - Professional photo placement
 * - Clear section separation
 * - Traditional CV layout
 */
export const whiteWithPhotoCvTemplate: DocumentTemplate['template'] = (data: Record<string, string>, config: Record<string, any> = {}) => {
  // Prepare data and styles
  const {
    firstName,
    lastName,
    fullNameUpper,
    position,
    primaryColor,
    fontFamily,
    fontSize
  } = prepareTemplateData(data, config);
  
  return `
    <div style="max-width: 21cm; margin: 0; padding: 0; font-family: ${fontFamily}; font-size: ${fontSize}; line-height: 1.5; color: #333;">
      <!-- Main content with padding -->
      <div style="padding: 30px 30px 80px 30px; min-height: 1000px; position: relative;">
        <!-- Header section -->
        <div style="display: flex; justify-content: space-between; padding-bottom: 20px;">
          <div>
            <h1 style="margin: 0; color: ${primaryColor}; font-size: 26px;">${fullNameUpper}</h1>
            <p style="margin: 5px 0 0; color: #666; text-transform: uppercase;">${position}</p>
          </div>
          
          ${data.photo ? `
            <div style="width: 150px; height: 170px; border: 1px solid #ddd; overflow: hidden;">
              <img src="${data.photo}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;" alt="${fullNameUpper}" />
            </div>
          ` : ''}
        </div>
        
        <!-- Contact info section -->
        <div style="display: flex; flex-wrap: wrap; margin-bottom: 20px; border-top: 1px solid #eee; border-bottom: 1px solid #eee; padding: 10px 0;">
          ${data.email ? `<div style="flex: 1; min-width: 200px; margin-right: 20px; margin-bottom: 5px;"><strong>Email:</strong> ${data.email}</div>` : ''}
          ${data.phone ? `<div style="flex: 1; min-width: 200px; margin-right: 20px; margin-bottom: 5px;"><strong>Telefon:</strong> ${data.phone}</div>` : ''}
          ${data.birthDate ? `<div style="flex: 1; min-width: 200px; margin-right: 20px; margin-bottom: 5px;"><strong>Data urodzenia:</strong> ${data.birthDate}</div>` : ''}
          ${data.address ? `<div style="flex: 1; min-width: 200px; margin-right: 20px; margin-bottom: 5px;"><strong>Adres:</strong> ${data.address}</div>` : ''}
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
        
        <!-- Skills and Additional Info in two columns -->
        <div style="display: flex; flex-wrap: wrap; margin: 0 -10px;">
          <!-- Skills Column -->
          <div style="flex: 1; min-width: 45%; padding: 0 10px; box-sizing: border-box;">
            ${data.skills ? `
              <div style="margin-bottom: 25px;">
                <h2 style="font-size: 16px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 5px; margin-bottom: 10px; color: ${primaryColor};">UMIEJĘTNOŚCI</h2>
                <div>${data.skills.replace(/\n/g, '<br>')}</div>
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
