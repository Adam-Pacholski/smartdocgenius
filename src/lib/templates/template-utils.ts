
/**
 * Utility functions and constants for document templates
 */
import { DocumentTemplate } from '../types/document-types';
import { currentDate } from '../utils/document-utils';

// A4 document constants
export const A4_HEIGHT_PX = 1123; // A4 height in pixels at 96 DPI

/**
 * Prepares common data needed across templates
 */
export const prepareTemplateData = (data: Record<string, string>, config: Record<string, any> = {}) => {
  const firstName = data.firstName || '';
  const lastName = data.lastName || '';
  const fullName = `${firstName} ${lastName}`.trim();
  const fullNameUpper = fullName.toUpperCase();
  const position = data.position || 'PRZEDSTAWICIEL HANDLOWY';
  const city = data.address?.split(',')?.pop()?.trim() || 'Warszawa';
  const date = `${data.date || currentDate()}, ${city}`;
  
  // Style configuration with defaults
  const primaryColor = config?.primaryColor || '#2c3e50';
  const fontFamily = config?.fontFamily || 'Arial, sans-serif';
  const fontSize = config?.fontSize || '12px';
  
  return {
    firstName,
    lastName,
    fullName,
    fullNameUpper,
    position,
    city,
    date,
    primaryColor,
    fontFamily,
    fontSize
  };
};

/**
 * Creates common base styles for document templates
 */
export const getBaseStyles = (fontFamily: string, fontSize: string) => `
  max-width: 21cm; 
  margin: 0; 
  padding: 0; 
  font-family: ${fontFamily}; 
  font-size: ${fontSize}; 
  line-height: 1.5; 
  color: #333;
`;

/**
 * Creates common full-height A4 container
 */
export const getA4Container = () => `
  min-height: ${A4_HEIGHT_PX}px;
`;

/**
 * Generates the recipient section HTML
 */
export const getRecipientSection = (data: Record<string, string>) => `
  <div style="margin-bottom: 20px;">
    ${data.recipientName ? `<p style="margin: 0 0 3px;">${data.recipientName}</p>` : ''}
    ${data.recipientCompany ? `<p style="margin: 0 0 3px;">${data.recipientCompany}</p>` : ''}
    ${data.recipientAddress ? `<p style="margin: 0 0 3px;">${data.recipientAddress}</p>` : ''}
  </div>
`;

/**
 * Generates the standard clause section HTML
 */
export const getClauseSection = (data: Record<string, string>) => `
  <p data-clause style="margin-top: 40px; font-size: 10px; color: #666; position: absolute; bottom: 20px; left: 30px; right: 30px; text-align: justify;">
    ${data.clause || 'Wyrażam zgodę na przetwarzanie moich danych osobowych w celu prowadzenia rekrutacji na aplikowane przeze mnie stanowisko.'}
  </p>
`;

// Template implementations
// Blue Header Template
export const blueHeaderTemplate = (data: Record<string, string>, config: Record<string, any> = {}) => {
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
    <div style="width: 100%; max-width: 21cm; margin: 0 auto; padding: 0; font-family: ${fontFamily}; font-size: ${fontSize}; line-height: 1.5; color: #333; box-sizing: border-box;">
      <!-- Header -->
      <div style="display: flex; background-color: ${primaryColor}; color: white; padding: 20px; margin: 0; width: 100%; box-sizing: border-box; border-radius: 6px 6px 0 0; align-items: center;">
        <div style="flex: 1; padding: 0;">
          <h1 style="margin: 0; font-size: 24px; text-transform: uppercase;">${fullName}</h1>
          <p style="margin: 0; text-transform: uppercase; font-size: 14px;">${position}</p>
          <div style="margin-top: 15px; font-size: 13px;">
            ${data.email ? `<p style="margin: 0 0 5px; word-break: break-word;"><span>✉</span> ${data.email}</p>` : ''}
            ${data.phone ? `<p style="margin: 0 0 5px; word-break: break-word;"><span>✆</span> ${data.phone}</p>` : ''}
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
      <div style="padding: 20px 30px; background-color: #ffffff; position: relative; min-height: 800px; box-sizing: border-box;">
        <!-- Summary -->
        ${data.summary ? `
          <div style="margin-bottom: 20px;">
            <h2 style="color: ${primaryColor}; font-size: 18px; margin-bottom: 10px; border-bottom: 1px solid ${primaryColor}; padding-bottom: 5px;">PODSUMOWANIE</h2>
            <p style="text-align: justify;">${data.summary}</p>
          </div>
        ` : ''}
        
        <!-- Experience -->
        ${data.experience ? `
          <div style="margin-bottom: 20px;">
            <h2 style="color: ${primaryColor}; font-size: 18px; margin-bottom: 10px; border-bottom: 1px solid ${primaryColor}; padding-bottom: 5px;">DOŚWIADCZENIE ZAWODOWE</h2>
            <p style="white-space: pre-line;">${data.experience}</p>
          </div>
        ` : ''}
        
        <!-- Education -->
        ${data.education ? `
          <div style="margin-bottom: 20px;">
            <h2 style="color: ${primaryColor}; font-size: 18px; margin-bottom: 10px; border-bottom: 1px solid ${primaryColor}; padding-bottom: 5px;">WYKSZTAŁCENIE</h2>
            <p style="white-space: pre-line;">${data.education}</p>
          </div>
        ` : ''}
        
        <!-- Skills -->
        ${data.skills ? `
          <div style="margin-bottom: 20px;">
            <h2 style="color: ${primaryColor}; font-size: 18px; margin-bottom: 10px; border-bottom: 1px solid ${primaryColor}; padding-bottom: 5px;">UMIEJĘTNOŚCI</h2>
            <p style="white-space: pre-line;">${data.skills}</p>
          </div>
        ` : ''}
        
        <!-- Languages -->
        ${data.languages ? `
          <div style="margin-bottom: 20px;">
            <h2 style="color: ${primaryColor}; font-size: 18px; margin-bottom: 10px; border-bottom: 1px solid ${primaryColor}; padding-bottom: 5px;">JĘZYKI OBCE</h2>
            <p style="white-space: pre-line;">${data.languages}</p>
          </div>
        ` : ''}
        
        <!-- Hobbies -->
        ${data.hobbies ? `
          <div style="margin-bottom: 40px;">
            <h2 style="color: ${primaryColor}; font-size: 18px; margin-bottom: 10px; border-bottom: 1px solid ${primaryColor}; padding-bottom: 5px;">ZAINTERESOWANIA</h2>
            <p style="white-space: pre-line;">${data.hobbies}</p>
          </div>
        ` : ''}
        
        <!-- Clause - Fixed positioning to avoid overlap -->
        <div style="margin-top: 60px; padding-top: 40px;">
          <p data-clause style="font-size: 10px; color: #666; text-align: justify;">
            ${data.clause || 'Wyrażam zgodę na przetwarzanie moich danych osobowych w celu prowadzenia rekrutacji na aplikowane przeze mnie stanowisko.'}
          </p>
        </div>
      </div>
    </div>
  `;
};

// Teal Sidebar Template
export const tealSidebarTemplate = (data: Record<string, string>, config: Record<string, any> = {}) => {
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
    <div style="width: 100%; max-width: 21cm; margin: 0 auto; padding: 0; font-family: ${fontFamily}; font-size: ${fontSize}; line-height: 1.5; color: #333; position: relative; box-sizing: border-box;">
      <!-- Two-column layout with fixed heights -->
      <div style="display: flex; min-height: 1123px; overflow: hidden; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        <!-- Left Sidebar - must extend to the full height -->
        <div style="width: 35%; background-color: ${primaryColor}; color: white; padding: 25px 16px; box-sizing: border-box; min-height: 1123px; border-radius: 6px 0 0 6px;">
          ${data.photo ? `
            <div style="width: 130px; height: 160px; overflow: hidden; margin: 20px auto 30px; display: block; text-align: center;">
              <img src="${data.photo}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px; box-shadow: 0 3px 6px rgba(0,0,0,0.2);" alt="${fullNameUpper}" />
            </div>
          ` : ''}
          
          <h2 style="margin: 0 0 20px; text-align: center; font-size: 16px; text-transform: uppercase;">DANE KONTAKTOWE</h2>
          
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
            
            ${data.address ? `
              <p style="margin: 0 0 10px; word-break: break-all;">
                <strong>Adres:</strong><br/>
                ${data.address}
              </p>
            ` : ''}
          </div>
          
          <!-- Skills in sidebar -->
          ${data.skills ? `
            <h2 style="margin: 30px 0 10px; text-align: center; font-size: 16px; text-transform: uppercase;">UMIEJĘTNOŚCI</h2>
            <div style="margin-bottom: 20px; font-size: 13px; padding: 0 16px;">
              <p style="white-space: pre-line; text-align: left;">${data.skills}</p>
            </div>
          ` : ''}
          
          <!-- Languages in sidebar -->
          ${data.languages ? `
            <h2 style="margin: 30px 0 10px; text-align: center; font-size: 16px; text-transform: uppercase;">JĘZYKI OBCE</h2>
            <div style="margin-bottom: 20px; font-size: 13px; padding: 0 16px;">
              <p style="white-space: pre-line; text-align: left;">${data.languages}</p>
            </div>
          ` : ''}
        </div>
        
        <!-- Main Content -->
        <div style="width: 65%; padding: 25px 25px; box-sizing: border-box; background-color: white; position: relative; display: flex; flex-direction: column; min-height: 1123px; border-radius: 0 6px 6px 0;">
          <!-- Header with name and position -->
          <div style="margin-bottom: 30px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 10px;">
            <h1 style="margin: 0; color: ${primaryColor}; font-size: 26px;">${fullNameUpper}</h1>
            <p style="margin: 5px 0 0; color: #666; text-transform: uppercase;">${position}</p>
          </div>
          
          <!-- Summary -->
          ${data.summary ? `
            <div style="margin-bottom: 25px;">
              <h2 style="color: ${primaryColor}; font-size: 18px; margin-bottom: 10px;">PODSUMOWANIE</h2>
              <p style="text-align: justify;">${data.summary}</p>
            </div>
          ` : ''}
          
          <!-- Experience -->
          ${data.experience ? `
            <div style="margin-bottom: 25px;">
              <h2 style="color: ${primaryColor}; font-size: 18px; margin-bottom: 10px;">DOŚWIADCZENIE ZAWODOWE</h2>
              <p style="white-space: pre-line;">${data.experience}</p>
            </div>
          ` : ''}
          
          <!-- Education -->
          ${data.education ? `
            <div style="margin-bottom: 25px;">
              <h2 style="color: ${primaryColor}; font-size: 18px; margin-bottom: 10px;">WYKSZTAŁCENIE</h2>
              <p style="white-space: pre-line;">${data.education}</p>
            </div>
          ` : ''}
          
          <!-- Hobbies -->
          ${data.hobbies ? `
            <div style="margin-bottom: 25px;">
              <h2 style="color: ${primaryColor}; font-size: 18px; margin-bottom: 10px;">ZAINTERESOWANIA</h2>
              <p style="white-space: pre-line;">${data.hobbies}</p>
            </div>
          ` : ''}
          
          <!-- Clause -->
          <div style="margin-top: auto; border-top: 1px solid #eee; padding-top: 15px;">
            <p data-clause style="margin: 0; font-size: 10px; color: #666; text-align: justify;">
              ${data.clause || 'Wyrażam zgodę na przetwarzanie moich danych osobowych w celu prowadzenia rekrutacji na aplikowane przeze mnie stanowisko.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
};

// Minimalist Icons Template
export const minimalistIconsTemplate = (data: Record<string, string>, config: Record<string, any> = {}) => {
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
          ${data.address ? `<span style="margin-left: 15px; margin-bottom: 5px; word-break: break-all;"><span style="color: ${primaryColor}; font-size: 16px;">📍</span> ${data.address}</span>` : ''}
        </div>
        
        <!-- Summary -->
        ${data.summary ? `
          <div style="margin-top: 20px; margin-bottom: 20px;">
            <h2 style="color: ${primaryColor}; font-size: 18px; margin-bottom: 10px; display: flex; align-items: center;">
              <span style="color: ${primaryColor}; margin-right: 8px;">📋</span> PODSUMOWANIE
            </h2>
            <p style="text-align: justify;">${data.summary}</p>
          </div>
        ` : ''}
        
        <!-- Experience -->
        ${data.experience ? `
          <div style="margin-bottom: 20px;">
            <h2 style="color: ${primaryColor}; font-size: 18px; margin-bottom: 10px; display: flex; align-items: center;">
              <span style="color: ${primaryColor}; margin-right: 8px;">💼</span> DOŚWIADCZENIE ZAWODOWE
            </h2>
            <p style="white-space: pre-line;">${data.experience}</p>
          </div>
        ` : ''}
        
        <!-- Education -->
        ${data.education ? `
          <div style="margin-bottom: 20px;">
            <h2 style="color: ${primaryColor}; font-size: 18px; margin-bottom: 10px; display: flex; align-items: center;">
              <span style="color: ${primaryColor}; margin-right: 8px;">🎓</span> WYKSZTAŁCENIE
            </h2>
            <p style="white-space: pre-line;">${data.education}</p>
          </div>
        ` : ''}
        
        <!-- Skills -->
        ${data.skills ? `
          <div style="margin-bottom: 20px;">
            <h2 style="color: ${primaryColor}; font-size: 18px; margin-bottom: 10px; display: flex; align-items: center;">
              <span style="color: ${primaryColor}; margin-right: 8px;">🔧</span> UMIEJĘTNOŚCI
            </h2>
            <p style="white-space: pre-line;">${data.skills}</p>
          </div>
        ` : ''}
        
        <!-- Languages -->
        ${data.languages ? `
          <div style="margin-bottom: 20px;">
            <h2 style="color: ${primaryColor}; font-size: 18px; margin-bottom: 10px; display: flex; align-items: center;">
              <span style="color: ${primaryColor}; margin-right: 8px;">🌐</span> JĘZYKI OBCE
            </h2>
            <p style="white-space: pre-line;">${data.languages}</p>
          </div>
        ` : ''}
        
        <!-- Hobbies -->
        ${data.hobbies ? `
          <div style="margin-bottom: 20px;">
            <h2 style="color: ${primaryColor}; font-size: 18px; margin-bottom: 10px; display: flex; align-items: center;">
              <span style="color: ${primaryColor}; margin-right: 8px;">🎯</span> ZAINTERESOWANIA
            </h2>
            <p style="white-space: pre-line;">${data.hobbies}</p>
          </div>
        ` : ''}
        
        <!-- Clause -->
        ${getClauseSection(data)}
      </div>
    </div>
  `;
};

// White With Photo Template
export const whiteWithPhotoTemplate = (data: Record<string, string>, config: Record<string, any> = {}) => {
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
      <div style="padding: 30px 30px 80px 30px; min-height: 800px; position: relative;">
        <!-- Header section -->
        <div style="display: flex; justify-content: space-between; padding-bottom: 20px; align-items: center;">
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
        
        <!-- Contact Information -->
        <div style="display: flex; flex-wrap: wrap; margin: 20px 0; gap: 15px;">
          ${data.email ? `<span style="margin-right: 20px;"><strong>Email:</strong> ${data.email}</span>` : ''}
          ${data.phone ? `<span style="margin-right: 20px;"><strong>Tel:</strong> ${data.phone}</span>` : ''}
          ${data.address ? `<span><strong>Adres:</strong> ${data.address}</span>` : ''}
        </div>
        
        <!-- Summary -->
        ${data.summary ? `
          <div style="margin-top: 25px; margin-bottom: 20px;">
            <h2 style="color: ${primaryColor}; margin-bottom: 10px; font-size: 18px; border-bottom: 1px solid #eee; padding-bottom: 5px;">PODSUMOWANIE</h2>
            <p style="text-align: justify;">${data.summary}</p>
          </div>
        ` : ''}
        
        <!-- Experience -->
        ${data.experience ? `
          <div style="margin-bottom: 20px;">
            <h2 style="color: ${primaryColor}; margin-bottom: 10px; font-size: 18px; border-bottom: 1px solid #eee; padding-bottom: 5px;">DOŚWIADCZENIE ZAWODOWE</h2>
            <p style="white-space: pre-line;">${data.experience}</p>
          </div>
        ` : ''}
        
        <!-- Education -->
        ${data.education ? `
          <div style="margin-bottom: 20px;">
            <h2 style="color: ${primaryColor}; margin-bottom: 10px; font-size: 18px; border-bottom: 1px solid #eee; padding-bottom: 5px;">WYKSZTAŁCENIE</h2>
            <p style="white-space: pre-line;">${data.education}</p>
          </div>
        ` : ''}
        
        <!-- Skills -->
        ${data.skills ? `
          <div style="margin-bottom: 20px;">
            <h2 style="color: ${primaryColor}; margin-bottom: 10px; font-size: 18px; border-bottom: 1px solid #eee; padding-bottom: 5px;">UMIEJĘTNOŚCI</h2>
            <p style="white-space: pre-line;">${data.skills}</p>
          </div>
        ` : ''}
        
        <!-- Languages -->
        ${data.languages ? `
          <div style="margin-bottom: 20px;">
            <h2 style="color: ${primaryColor}; margin-bottom: 10px; font-size: 18px; border-bottom: 1px solid #eee; padding-bottom: 5px;">JĘZYKI OBCE</h2>
            <p style="white-space: pre-line;">${data.languages}</p>
          </div>
        ` : ''}
        
        <!-- Hobbies -->
        ${data.hobbies ? `
          <div style="margin-bottom: 20px;">
            <h2 style="color: ${primaryColor}; margin-bottom: 10px; font-size: 18px; border-bottom: 1px solid #eee; padding-bottom: 5px;">ZAINTERESOWANIA</h2>
            <p style="white-space: pre-line;">${data.hobbies}</p>
          </div>
        ` : ''}
        
        <!-- Clause -->
        ${getClauseSection(data)}
      </div>
    </div>
  `;
};
