
/**
 * Teal Sidebar Template (Morski z paskiem)
 * 
 * Description:
 * A modern template with a colorful sidebar on the left containing personal information.
 * The main content is displayed on a clean white background.
 * 
 * Structure:
 * - Colored sidebar on the left (35% width) with personal information
 * - Optional photo at the top of the sidebar
 * - White content area (65% width) for the letter
 * 
 * Customization Points:
 * - primaryColor: Controls the sidebar background color (default: #1e88e5)
 * - fontFamily: Controls the font used throughout the document
 * - fontSize: Controls the base font size 
 * 
 * A4 Layout:
 * The template is carefully designed to fit A4 paper dimensions. The sidebar extends
 * the full height of the page to create a professional visual impression.
 */

import { DocumentTemplate } from '../types/document-types';
import { allCoverLetterFields } from '../form-fields/cover-letter-fields';
import { prepareTemplateData, getA4Container } from './template-utils';

export const tealSidebarTemplate: DocumentTemplate = {
  id: 'teal-sidebar',
  name: 'Morski z paskiem',
  description: 'Nowoczesny układ z morskim paskiem po lewej stronie',
  thumbnail: 'lm-teal-sidebar.png',
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
      <div style="max-width: 21cm; margin: 0; padding: 0; font-family: ${fontFamily}; font-size: ${fontSize}; line-height: 1.5; color: #333; position: relative;">
        <!-- Two-column layout with fixed heights -->
        <div style="display: flex; min-height: 1123px;">
          <!-- Left Sidebar - must extend to the full height -->
          <div style="width: 35%; background-color: ${primaryColor}; color: white; padding: 25px 16px; box-sizing: border-box; min-height: 1123px;">
            ${data.photo ? `
              <div style="width: 130px; height: 160px; overflow: hidden; margin: 0 auto 20px; display: block; text-align: center;">
                <img src="${data.photo}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;" alt="${fullNameUpper}" />
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
          </div>
          
          <!-- Main Content -->
          <div style="width: 65%; padding: 25px 25px 80px 25px; box-sizing: border-box; background-color: white; position: relative;">
            <!-- Header -->
            <div style="margin-bottom: 30px;">
              <h1 style="margin: 0; color: ${primaryColor}; font-size: 26px;">${fullNameUpper}</h1>
              <p style="margin: 5px 0 0; color: #666; text-transform: uppercase;">${position}</p>
              <p style="margin: 15px 0 0;">${date}</p>
            </div>
            
            <!-- Recipient -->
            <div style="margin-bottom: 20px;">
              ${data.recipientName ? `<p style="margin: 0 0 3px;">${data.recipientName}</p>` : ''}
              ${data.recipientCompany ? `<p style="margin: 0 0 3px;">${data.recipientCompany}</p>` : ''}
              ${data.recipientAddress ? `<p style="margin: 0 0 3px;">${data.recipientAddress}</p>` : ''}
            </div>
            
            <!-- Greeting -->
            <p style="margin-bottom: 15px;">${data.opening || 'Szanowni Państwo,'}</p>
            
            <!-- Letter Content -->
            <div style="text-align: justify;">
              <p style="white-space: pre-line; margin-bottom: 20px;">${data.body || ''}</p>
            </div>
            
            <!-- Closing -->
            <p style="margin-top: 20px;">${data.closing || 'Z wyrazami szacunku,'}</p>
            <p style="margin-top: 5px;">${firstName} ${lastName}</p>
            
            <!-- Clause -->
            <div style="position: absolute; bottom: 20px; left: 25px; right: 25px; text-align: justify;">
              <p data-clause style="margin: 0; font-size: 10px; color: #666;">
                ${data.clause || 'Wyrażam zgodę na przetwarzanie moich danych osobowych w celu prowadzenia rekrutacji na aplikowane przeze mnie stanowisko.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  },
};
