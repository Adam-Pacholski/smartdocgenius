
/**
 * White with Photo Template (Klasyczny ze zdjęciem)
 * 
 * Description:
 * An elegant clean white template with a photo in the upper right corner.
 * Features a professional layout with clear sections.
 * 
 * Structure:
 * - Header with name and position
 * - Optional photo at the top right
 * - Clean white background for the entire document
 * 
 * Customization Points:
 * - primaryColor: Controls the header text color (default: #333333)
 * - fontFamily: Controls the font used throughout the document
 * - fontSize: Controls the base font size 
 * 
 * A4 Layout:
 * The template is designed to fit A4 paper size with appropriate margins for printing.
 */

import { DocumentTemplate } from '../types/document-types';
import { allCoverLetterFields } from '../form-fields/cover-letter-fields';
import { prepareTemplateData, getRecipientSection, getClauseSection } from './template-utils';

export const whiteWithPhotoTemplate: DocumentTemplate = {
  id: 'white-with-photo',
  name: 'Klasyczny ze zdjęciem',
  description: 'Elegancki biały układ ze zdjęciem po prawej stronie',
  thumbnail: 'lm-white-photo.png',
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
        <!-- Main content with padding -->
        <div style="padding: 30px 30px 80px 30px; min-height: 800px; position: relative;">
          <!-- Header section -->
          <div style="display: flex; justify-content: space-between; padding-bottom: 20px;">
            <div>
              <h1 style="margin: 0; color: ${primaryColor}; font-size: 26px;">${fullNameUpper}</h1>
              <p style="margin: 5px 0 0; color: #666; text-transform: uppercase;">${position}</p>
              <p style="margin: 10px 0 0;">${date}</p>
            </div>
            
            ${data.photo ? `
              <div style="width: 150px; height: 170px; border: 1px solid #ddd; overflow: hidden;">
                <img src="${data.photo}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;" alt="${fullNameUpper}" />
              </div>
            ` : ''}
          </div>
          
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
