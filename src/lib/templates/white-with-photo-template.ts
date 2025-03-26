/**
 * White with Photo Template
 * 
 * Description:
 * A clean and modern template featuring a prominent photo on the left side
 * and the content of the letter on the right.
 * 
 * Structure:
 * - Two-column layout with photo and contact details on the left
 * - Letter content on the right
 * 
 * Customization Points:
 * - primaryColor: Controls the color of the name and some icons (default: #3498db)
 * - fontFamily: Controls the font used throughout the document
 * - fontSize: Controls the base font size
 * 
 * A4 Layout:
 * The template is designed to fit A4 paper size with appropriate margins for printing.
 */

import { DocumentTemplate } from '../types/document-types';
import { allCoverLetterFields } from '../form-fields/cover-letter-fields';
import { prepareTemplateData, getRecipientSection } from './template-utils';

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
    
    return `
      <div style="width: 100%; max-width: 21cm; margin: 0 auto; padding: 0; font-family: ${fontFamily}; font-size: ${fontSize}; line-height: 1.4; color: #333; box-sizing: border-box; display: flex;">
        <!-- Left Column: Photo and Contact Info -->
        <div style="width: 30%; background-color: #f7f7f7; padding: 20px; box-sizing: border-box; text-align: center;">
          ${data.photo ? `
            <div style="width: 150px; height: 150px; border-radius: 50%; overflow: hidden; margin: 0 auto 20px;">
              <img src="${data.photo}" style="width: 100%; height: 100%; object-fit: cover;" alt="${fullName}" />
            </div>
          ` : ''}
          <h1 style="color: ${primaryColor}; margin: 0; font-size: 22px;">${fullName}</h1>
          <p style="margin: 5px 0; font-size: 14px;">${position}</p>
          <div style="margin-top: 20px; font-size: 13px; text-align: left;">
            ${data.email ? `<p style="margin: 5px 0; word-break: break-word;"><span style="color: ${primaryColor}; margin-right: 5px;">✉</span> ${data.email}</p>` : ''}
            ${data.phone ? `<p style="margin: 5px 0; word-break: break-word;"><span style="color: ${primaryColor}; margin-right: 5px;">✆</span> ${data.phone}</p>` : ''}
            ${data.address ? `<p style="margin: 5px 0; word-break: break-word;"><span style="color: ${primaryColor}; margin-right: 5px;">📍</span> ${data.address}</p>` : ''}
            ${data.birthDate ? `<p style="margin: 5px 0; word-break: break-word;"><span style="color: ${primaryColor}; margin-right: 5px;">📅</span> ${data.birthDate}</p>` : ''}
          </div>
        </div>
        
        <!-- Document Content -->
        <div style="width: 70%; padding: 0 20px;">
          <!-- Date -->
          <p style="text-align: right; margin-bottom: 20px;">${date}</p>
          
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
          <div style="margin-top: 40px;">
            <p style="font-size: 9px; color: #666;">${data.clause || ''}</p>
          </div>
        </div>
      </div>
    `;
  },
};
