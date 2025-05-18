
/**
 * Blue Header Template (Niebieski nagłówek)
 * 
 * Description:
 * A professional template with a blue header section that spans the full width.
 * It features the applicant's photo on the right side of the header.
 * 
 * Structure:
 * - Blue header bar with contact details and optional photo
 * - White content area for the letter body
 * 
 * Customization Points:
 * - primaryColor: Controls the header background color (default: #2c3e50)
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

export const blueHeaderTemplate: DocumentTemplate = {
  id: 'blue-header',
  name: 'Niebieski nagłówek',
  description: 'Profesjonalny szablon z niebieskim nagłówkiem i zdjęciem',
  thumbnail: 'lm-blue-header.png',
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
      <div style="width: 100%; max-width: 21cm; margin: 0 auto; padding: 0; font-family: ${fontFamily}; font-size: ${fontSize}; line-height: 1.5; color: #333; box-sizing: border-box;">
        <!-- Header -->
        <div style="display: flex; background-color: ${primaryColor}; color: white; padding: 20px; margin: 0; width: 100%; box-sizing: border-box; border-radius: 6px 6px 0 0; align-items: flex-start;">
          <div style="flex: 1; padding: 0;">
            <h1 style="margin: 0; font-size: 24px; text-transform: uppercase;">${fullName}</h1>
            <p style="margin: 5px 0 0; text-transform: uppercase; font-size: 14px;">${position}</p>
            <div style="margin-top: 15px; font-size: 13px;">
              ${data.email ? `<p style="margin: 0 0 5px; word-break: break-word;"><span>✉</span> ${data.email}</p>` : ''}
              ${data.phone ? `<p style="margin: 0 0 5px; word-break: break-word;"><span>✆</span> ${data.phone}</p>` : ''}
              ${birthDate ? `<p style="margin: 0 0 5px; word-break: break-word;"><span>🎂</span> ${birthDate}</p>` : ''}
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
        <div style="padding: 40px 30px 80px; background-color: #ffffff; position: relative; min-height: 800px; box-sizing: border-box;">
          <!-- Date -->
          <p style="margin-bottom: 25px;">${formattedDate}</p>
          
          <!-- Recipient -->
          ${getRecipientSection(data)}
          
          <!-- Subject line -->
          ${data.subject ? `<p style="margin: 30px 0; font-weight: bold;">Temat: ${data.subject}</p>` : ''}
          
          <!-- Greeting -->
          <p style="margin-bottom: 25px;">${data.opening || 'Szanowni Państwo,'}</p>
          
          <!-- Content -->
          <div style="text-align: justify;">
            <p style="white-space: pre-line; margin-bottom: 30px; line-height: 1.6;">${data.body || ''}</p>
          </div>
          
          <!-- Closing -->
          <p style="margin-top: 30px; margin-bottom: 15px;">${data.closing || 'Z wyrazami szacunku,'}</p>
          <p style="margin-top: 15px; margin-bottom: 30px; font-weight: bold;">${fullName}</p>
          
          <!-- Clause - Fixed positioning to avoid overlap -->
          <footer style="margin-top: 80px; padding-top: 60px; padding-bottom: 80px;">
            <p data-clause style="font-size: 10px; color: #666; text-align: justify; margin-bottom: 80px;">
              ${data.clause || ''}
            </p>
          </footer>
        </div>
      </div>
    `;
  },
};
