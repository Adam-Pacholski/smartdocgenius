
/**
 * Teal Sidebar Template
 * 
 * Description:
 * A modern template with a teal sidebar for personal details and a clean white content area.
 * It's designed to present a professional image with a touch of color.
 * 
 * Structure:
 * - Teal sidebar for contact details and skills
 * - White content area for the letter body
 * 
 * Customization Points:
 * - primaryColor: Controls the sidebar background color (default: #2c3e50)
 * - fontFamily: Controls the font used throughout the document
 * - fontSize: Controls the base font size 
 * 
 * A4 Layout:
 * The template is designed to fit A4 paper size with appropriate margins for printing.
 */

import { DocumentTemplate } from '../types/document-types';
import { allCoverLetterFields } from '../form-fields/cover-letter-fields';
import { prepareTemplateData, getRecipientSection } from './template-utils';
import { formatDateByLanguage } from '../utils/document-utils';

export const tealSidebarTemplate: DocumentTemplate = {
  id: 'teal-sidebar',
  name: 'Boczny pasek (teal)',
  description: 'Nowoczesny szablon z tealowym paskiem bocznym na dane kontaktowe',
  thumbnail: 'lm-teal-sidebar.png',
  fields: allCoverLetterFields,
  template: (data, config = {}) => {
    // Prepare data and styles
    const {
      fullName,
      position,
      date,
      primaryColor,
      fontFamily,
      fontSize
    } = prepareTemplateData(data, config);
    
    const birthDate = data.birthDate || '';
    const language = config.language || 'pl';
    
    // Format the date according to the selected language if a custom date is specified
    let formattedDate = date;
    if (data.letterDate) {
      const parts = data.letterDate.split('.');
      if (parts.length === 3) {
        const day = parseInt(parts[0]);
        const month = parseInt(parts[1]) - 1;
        const year = parseInt(parts[2]);
        const dateObj = new Date(year, month, day);
        if (!isNaN(dateObj.getTime())) {
          formattedDate = formatDateByLanguage(dateObj, language);
        }
      }
    }
    
    return `
      <div style="width: 100%; max-width: 21cm; margin: 0 auto; padding: 0; font-family: ${fontFamily}; font-size: ${fontSize}; line-height: 1.5; color: #333; box-sizing: border-box; display: flex; flex-direction: row; min-height: 29.7cm;">
        <!-- Sidebar -->
        <div style="width: 30%; background-color: ${primaryColor}; color: white; padding: 40px 20px 20px 20px; box-sizing: border-box; border-radius: 6px 0 0 6px;">
        
${data.photo ? `
  <div style="width: 100%; height: 150px; margin-bottom: 16px; overflow: hidden;  display: flex; align-items: center; justify-content: center;">
    <img src="${data.photo}" style="width: 150px; height: 100%; border-radius: 8px; object-fit: cover;" alt="${fullName}" />
  </div>
` : ''}
          <h1 style="margin: 0 0 10px 0; font-size: 24px; text-transform: uppercase;">${fullName}</h1>
          <p style="margin: 0 0 20px 0; text-transform: uppercase; font-size: 14px;">${position}</p>
          
          <div style="margin-bottom: 20px; font-size: 13px;">
            ${data.email ? `<p style="margin: 0 0 5px; word-break: break-word;"><span>✉</span> ${data.email}</p>` : ''}
            ${data.phone ? `<p style="margin: 0 0 5px; word-break: break-word;"><span>✆</span> ${data.phone}</p>` : ''}
            ${birthDate ? `<p style="margin: 0 0 5px; word-break: break-word;"><span>🎂</span> ${birthDate}</p>` : ''}
            ${data.address ? `<p style="margin: 0 0 5px; word-break: break-word;"><span>📍</span> ${data.address}</p>` : ''}
          </div>
        </div>
        
        <!-- Document Content -->
        <div style="width: 70%; padding: 40px 20px 50px 20px;">
          <!-- Date -->
          <p style="text-align: right; margin-bottom: 20px;">${formattedDate}</p>
          
          <!-- Recipient -->
          ${getRecipientSection(data)}
          
          <!-- Subject line -->
          ${data.subject ? `<p style="margin: 20px 0; font-weight: bold;">Temat: ${data.subject}</p>` : ''}
          
          <!-- Content -->
          <p style="margin-bottom: 15px;">${data.opening || 'Szanowni Państwo,'}</p>
          
          <div style="text-align: justify;">
            <p style="white-space: pre-line; margin-bottom: 20px;">${data.body || ''}</p>
          </div>
          
          <!-- Closing -->
          <p style="margin-top: 20px;">${data.closing || 'Z wyrazami szacunku,'}</p>
          <p style="margin-top: 5px;">${fullName}</p>
          
          <!-- Clause -->
          <div style="margin-top: 40px; padding-bottom: 30px;">
            <p style="font-size: 9px; color: #666;">${data.clause || ''}</p>
          </div>
        </div>
      </div>
    `;
  },
};
