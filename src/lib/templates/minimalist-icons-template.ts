
/**
 * Minimalist Icons Template (Minimalistyczny z ikonami)
 * 
 * Description:
 * A minimalist template with an emphasis on clean design and informative icons.
 * Features a subtle border under the header and contact information with icons.
 * 
 * Structure:
 * - Clean header with name and position
 * - Optional photo at the top right
 * - Contact information with colorful icons in the top section
 * - Colored underline separator
 * 
 * Customization Points:
 * - primaryColor: Controls the accent color for icons and the header underline (default: #c0392b)
 * - fontFamily: Controls the font used throughout the document
 * - fontSize: Controls the base font size 
 * 
 * A4 Layout:
 * The template is designed to fit A4 paper size with appropriate margins for printing.
 */

import { DocumentTemplate } from '../types/document-types';
import { allCoverLetterFields } from '../form-fields/cover-letter-fields';
import { prepareTemplateData, getRecipientSection, getClauseSection } from './template-utils';

export const minimalistIconsTemplate: DocumentTemplate = {
  id: 'minimalist-icons',
  name: 'Minimalistyczny z ikonami',
  description: 'Prosty układ z ikonami kontaktowymi w nagłówku',
  thumbnail: 'lm-minimalist-icons.png',
  fields: allCoverLetterFields,
  template: (data, config = {}) => {
    // Prepare data and styles
    const {
      firstName,
      lastName,
      fullNameUpper,
      position,
      date,
      primaryColor,
      fontFamily,
      fontSize
    } = prepareTemplateData(data, config);
    
    return `
      <div style="max-width: 21cm; margin: 0; padding: 0; font-family: ${fontFamily}; font-size: ${fontSize}; line-height: 1.5; color: #333;">
        <div style="padding: 30px 30px 80px 30px; min-height: 800px; position: relative;">
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
          
          <!-- Date -->
          <p style="margin: 20px 0;">${date}</p>
          
          <!-- Recipient -->
          ${getRecipientSection(data)}
          
          <!-- Greeting -->
          <p style="margin-bottom: 15px;">${data.opening || 'Szanowni Państwo,'}</p>
          
          <!-- Content -->
          <div style="text-align: justify;">
            <p style="white-space: pre-line; margin-bottom: 20px;">${data.body || ''}</p>
          </div>
          
          <!-- Closing -->
          <p style="margin-top: 20px;">${data.closing || 'Z wyrazami szacunku,'}</p>
          <p style="margin-top: 5px;">${firstName} ${lastName}</p>
          
          <!-- Clause -->
          ${getClauseSection(data)}
        </div>
      </div>
    `;
  },
};
