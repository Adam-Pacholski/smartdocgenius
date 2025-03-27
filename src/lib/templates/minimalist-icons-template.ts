
/**
 * Minimalist Icons Template
 * 
 * Description:
 * A clean and minimalist template that uses icons to represent contact information.
 * It focuses on simplicity and readability, making it suitable for various professional contexts.
 * 
 * Structure:
 * - Header with name and job title
 * - Contact information displayed using icons
 * - Main content area for the letter body
 * 
 * Customization Points:
 * - primaryColor: Controls the color of the divider line and icons
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

export const minimalistIconsTemplate: DocumentTemplate = {
  id: 'minimalist-icons',
  name: 'Minimalistyczne ikony',
  description: 'Czysty i minimalistyczny szablon z ikonami dla danych kontaktowych',
  thumbnail: 'lm-minimalist-icons.png',
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
      <div style="width: 100%; max-width: 21cm; margin: 0 auto; padding: 40px; font-family: ${fontFamily}; font-size: ${fontSize}; line-height: 1.4; color: #333; box-sizing: border-box;">
      
        <!-- Header -->
        <div style="padding-bottom: 20px;">
            <div style="margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
                 <div>
                 <h1 style="margin: 0; font-size: 28px; font-weight: bold; color: #1e293b;">${fullName}</h1>
                  <p style="margin: 5px 0; font-size: 16px; color: #475569;">${position}</p>
                </div>
                 ${data.photo ? `
            <div style="width: 100px; height: 100px; overflow: hidden; border-radius: 50%;">
              <img src="${data.photo}" style="width: 100%; height: 100%; object-fit: cover;" alt="${fullName}" />
            </div>
          ` : ''}
            </div>
         
          
          <!-- Contact Information -->
          <div style="margin-top: 20px; display: flex; flex-wrap: wrap; gap: 15px; font-size: 14px; color: #64748b;">
            ${data.email ? `<p style="margin: 0;"><span style="color: ${primaryColor}; margin-right: 5px;">✉</span> ${data.email}</p>` : ''}
            ${data.phone ? `<p style="margin: 0;"><span style="color: ${primaryColor}; margin-right: 5px;">✆</span> ${data.phone}</p>` : ''}
            ${data.address ? `<p style="margin: 0;"><span style="color: ${primaryColor}; margin-right: 5px;">📍</span> ${data.address}</p>` : ''}
            ${birthDate ? `<p style="margin: 0;"><span style="color: ${primaryColor}; margin-right: 5px;">🎂</span> ${birthDate}</p>` : ''}
          </div>
          
          
        </div>
        
        <!-- Divider line with primary color -->
        <div style="border-bottom: 2px solid ${primaryColor}; margin: 0 0 30px 0;"></div>
      
      <!-- Document Body -->
      <div style="position: relative;">
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
        <p style="margin-top: 5px; font-weight: bold;">${fullName}</p>
        
        <!-- Clause -->
        <div style="margin-top: 60px;">
          <p style="font-size: 9px; color: #666; text-align: justify;">${data.clause || ''}</p>
        </div>
      </div>
    `;
  },
};
