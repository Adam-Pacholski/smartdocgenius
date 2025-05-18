
/**
 * White with Photo Template
 * 
 * Description:
 * A clean and modern template featuring a prominent photo on the right side
 * and the content of the letter on the left.
 * 
 * Structure:
 * - Simple clean layout with photo on the right
 * - Letter content on the left
 * 
 * Customization Points:
 * - primaryColor: Controls the color of the name and some elements
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

export const whiteWithPhotoTemplate: DocumentTemplate = {
  id: 'white-with-photo',
  name: 'Biały ze zdjęciem',
  description: 'Nowoczesny szablon z miejscem na zdjęcie i danymi kontaktowymi',
  thumbnail: 'lm-white-photo.png',
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
        <!-- Header with name and position -->
        <div style="margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h1 style="color: ${primaryColor}; margin: 0; font-size: 26px;">${fullName}</h1>
            <p style="margin: 5px 0 0; font-size: 14px; color: #555;">${position}</p>
          </div>
          
          <!-- Photo on the right - now using a square format instead of circle -->
          ${data.photo ? `
            <div style="width: 100px; height: 100px; overflow: hidden; border-radius: 8px; border: 1px solid #eee;">
              <img src="${data.photo}" style="width: 100%; height: 100%; object-fit: cover;" alt="${fullName}" />
            </div>
          ` : ''}
        </div>
        
        <!-- Contact info -->
        <div style="display: flex; margin-bottom: 30px; font-size: 13px; color: #666;">
          ${data.email ? `<div style="margin-right: 20px;"><span style="color: ${primaryColor}; margin-right: 5px;">✉</span> ${data.email}</div>` : ''}
          ${data.phone ? `<div style="margin-right: 20px;"><span style="color: ${primaryColor}; margin-right: 5px;">✆</span> ${data.phone}</div>` : ''}
          ${birthDate ? `<div style="margin-right: 20px;"><span style="color: ${primaryColor}; margin-right: 5px;">🎂</span> ${birthDate}</div>` : ''}
          ${data.address ? `<div style="margin-right: 20px;"><span style="color: ${primaryColor}; margin-right: 5px;">📍</span> ${data.address}</div>` : ''}
        </div>
        
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
        <div style="margin-top: 80px; padding-bottom: 80px;">
          <p style="font-size: 9px; color: #666; text-align: justify;">${data.clause || ''}</p>
        </div>
      </div>
    `;
  },
};
