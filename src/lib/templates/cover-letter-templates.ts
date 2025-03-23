
import { DocumentTemplate } from '../types/document-types';
import { allCoverLetterFields } from '../form-fields/cover-letter-fields';
import { currentDate } from '../utils/document-utils';

export const blueHeaderTemplate: DocumentTemplate = {
  id: 'blue-header',
  name: 'Niebieski nagłówek',
  description: 'Profesjonalny szablon z niebieskim nagłówkiem i zdjęciem',
  thumbnail: 'lm-blue-header.png',
  fields: allCoverLetterFields,
  template: (data, config = {}) => {
    const fullName = `${data.firstName || ''} ${data.lastName || ''}`.trim();
    const position = data.position || 'PRZEDSTAWICIEL HANDLOWY';
    const city = data.address?.split(',')?.pop()?.trim() || 'Warszawa';
    const date = `${data.date || currentDate()}, ${city}`;
    
    const primaryColor = config?.primaryColor || '#2c3e50';
    const fontFamily = config?.fontFamily || 'Arial, sans-serif';
    const fontSize = config?.fontSize || '12px';
    
    return `
      <div style="max-width: 21cm; margin: 0; padding: 0; font-family: ${fontFamily}; font-size: ${fontSize}; line-height: 1.5; color: #333;">
        <!-- Header -->
        <div style="display: flex; background-color: ${primaryColor}; color: white; padding: 20px; margin: 0;">
          <div style="flex: 1; padding: 0 16px;">
            <h1 style="margin: 0; font-size: 24px; text-transform: uppercase;">${fullName}</h1>
            <p style="margin: 0; text-transform: uppercase; font-size: 14px;">${position}</p>
            <div style="margin-top: 15px; font-size: 13px;">
              ${data.email ? `<p style="margin: 0 0 5px; word-break: break-word;"><span>✉</span> ${data.email}</p>` : ''}
              ${data.phone ? `<p style="margin: 0 0 5px; word-break: break-word;"><span>✆</span> ${data.phone}</p>` : ''}
              ${data.birthDate ? `<p style="margin: 0 0 5px; word-break: break-word;"><span>📅</span> ${data.birthDate}</p>` : ''}
              ${data.address ? `<p style="margin: 0 0 5px; word-break: break-word;"><span>📍</span> ${data.address}</p>` : ''}
            </div>
          </div>
          ${data.photo ? `
            <div style="width: 120px; height: 150px; overflow: hidden; margin-right: 20px;">
              <img src="${data.photo}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;" alt="${fullName}" />
            </div>
          ` : ''}
        </div>
        
        <!-- Document Body -->
        <div style="padding: 20px 30px 80px 30px; background-color: #f9f9f9; position: relative; min-height: 800px;">
          <!-- Date -->
          <p style="margin-bottom: 15px;">${date}</p>
          
          <!-- Recipient -->
          <div style="margin-bottom: 20px;">
            ${data.recipientName ? `<p style="margin: 0 0 3px;">${data.recipientName}</p>` : ''}
            ${data.recipientCompany ? `<p style="margin: 0 0 3px;">${data.recipientCompany}</p>` : ''}
            ${data.recipientAddress ? `<p style="margin: 0 0 3px;">${data.recipientAddress}</p>` : ''}
          </div>
          
          <!-- Greeting -->
          <p style="margin-bottom: 15px;">${data.opening || 'Szanowni Państwo,'}</p>
          
          <!-- Content -->
          <div style="text-align: justify;">
            <p style="white-space: pre-line; margin-bottom: 20px;">${data.body || ''}</p>
          </div>
          
          <!-- Closing -->
          <p style="margin-top: 20px;">${data.closing || 'Z wyrazami szacunku,'}</p>
          <p style="margin-top: 5px; font-weight: bold;">${fullName}</p>
          
          <!-- Clause -->
          <p data-clause style="margin-top: 40px; font-size: 10px; color: #666; position: absolute; bottom: 20px; left: 30px; right: 30px; text-align: justify;">
            ${data.clause || 'Wyrażam zgodę na przetwarzanie moich danych osobowych w celu prowadzenia rekrutacji na aplikowane przeze mnie stanowisko.'}
          </p>
        </div>
      </div>
    `;
  },
};

export const whiteWithPhotoTemplate: DocumentTemplate = {
  id: 'white-with-photo',
  name: 'Klasyczny ze zdjęciem',
  description: 'Elegancki biały układ ze zdjęciem po prawej stronie',
  thumbnail: 'lm-white-photo.png',
  fields: allCoverLetterFields,
  template: (data, config = {}) => {
    const fullName = `${data.firstName || ''} ${data.lastName || ''}`.trim().toUpperCase();
    const position = data.position || 'PRZEDSTAWICIEL HANDLOWY';
    const city = data.address?.split(',')?.pop()?.trim() || 'Warszawa';
    const date = `${data.date || currentDate()}, ${city}`;
    
    const primaryColor = config?.primaryColor || '#333333';
    const fontFamily = config?.fontFamily || 'Arial, sans-serif';
    const fontSize = config?.fontSize || '12px';
    
    return `
      <div style="max-width: 21cm; margin: 0; padding: 0; font-family: ${fontFamily}; font-size: ${fontSize}; line-height: 1.5; color: #333;">
        <!-- Main content with padding -->
        <div style="padding: 30px 30px 80px 30px; min-height: 800px; position: relative;">
          <!-- Header section -->
          <div style="display: flex; justify-content: space-between; padding-bottom: 20px;">
            <div>
              <h1 style="margin: 0; color: ${primaryColor}; font-size: 26px;">${fullName}</h1>
              <p style="margin: 5px 0 0; color: #666; text-transform: uppercase;">${position}</p>
              <p style="margin: 10px 0 0;">${date}</p>
            </div>
            
            ${data.photo ? `
              <div style="width: 150px; height: 170px; border: 1px solid #ddd; overflow: hidden;">
                <img src="${data.photo}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;" alt="${fullName}" />
              </div>
            ` : ''}
          </div>
          
          <!-- Recipient -->
          <div style="margin-bottom: 20px;">
            ${data.recipientName ? `<p style="margin: 0 0 3px;">${data.recipientName}</p>` : ''}
            ${data.recipientCompany ? `<p style="margin: 0 0 3px;">${data.recipientCompany}</p>` : ''}
            ${data.recipientAddress ? `<p style="margin: 0 0 3px;">${data.recipientAddress}</p>` : ''}
          </div>
          
          <!-- Greeting -->
          <p style="margin-bottom: 15px;">${data.opening || 'Szanowni Państwo,'}</p>
          
          <!-- Content -->
          <div style="text-align: justify;">
            <p style="white-space: pre-line; margin-bottom: 20px;">${data.body || ''}</p>
          </div>
          
          <!-- Closing -->
          <p style="margin-top: 20px;">${data.closing || 'Z wyrazami szacunku,'}</p>
          <p style="margin-top: 5px;">${data.firstName} ${data.lastName}</p>
          
          <!-- Clause -->
          <p data-clause style="margin-top: 40px; font-size: 10px; color: #666; position: absolute; bottom: 20px; left: 30px; right: 30px; text-align: justify;">
            ${data.clause || 'Wyrażam zgodę na przetwarzanie moich danych osobowych w celu prowadzenia rekrutacji na aplikowane przeze mnie stanowisko.'}
          </p>
        </div>
      </div>
    `;
  },
};

export const tealSidebarTemplate: DocumentTemplate = {
  id: 'teal-sidebar',
  name: 'Morski z paskiem',
  description: 'Nowoczesny układ z morskim paskiem po lewej stronie',
  thumbnail: 'lm-teal-sidebar.png',
  fields: allCoverLetterFields,
  template: (data, config = {}) => {
    const fullName = `${data.firstName || ''} ${data.lastName || ''}`.trim().toUpperCase();
    const position = data.position || 'PRZEDSTAWICIEL HANDLOWY';
    const city = data.address?.split(',')?.pop()?.trim() || 'Warszawa';
    const date = `${data.date || currentDate()}, ${city}`;
    
    const primaryColor = config?.primaryColor || '#1e88e5';
    const fontFamily = config?.fontFamily || 'Arial, sans-serif';
    const fontSize = config?.fontSize || '12px';
    
    return `
      <div style="max-width: 21cm; margin: 0; padding: 0; font-family: ${fontFamily}; font-size: ${fontSize}; line-height: 1.5; display: flex; min-height: 100vh;">
        <!-- Left Sidebar -->
        <div style="width: 35%; background-color: ${primaryColor}; color: white; padding: 25px 16px; box-sizing: border-box; min-height: 100%; margin: 0;">
          ${data.photo ? `
            <div style="width: 130px; height: 160px; overflow: hidden; margin: 0 auto 20px; display: block; text-align: center;">
              <img src="${data.photo}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;" alt="${fullName}" />
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
        <div style="width: 65%; padding: 25px 25px 80px 25px; box-sizing: border-box; background-color: white; position: relative; min-height: 100%;">
          <!-- Header -->
          <div style="margin-bottom: 30px;">
            <h1 style="margin: 0; color: ${primaryColor}; font-size: 26px;">${fullName}</h1>
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
          <p style="margin-top: 5px;">${data.firstName} ${data.lastName}</p>
          
          <!-- Clause -->
          <p data-clause style="margin-top: 40px; font-size: 10px; color: #666; position: absolute; bottom: 20px; left: 25px; right: 25px; text-align: justify;">
            ${data.clause || 'Wyrażam zgodę na przetwarzanie moich danych osobowych w celu prowadzenia rekrutacji na aplikowane przeze mnie stanowisko.'}
          </p>
        </div>
      </div>
    `;
  },
};

export const minimalistIconsTemplate: DocumentTemplate = {
  id: 'minimalist-icons',
  name: 'Minimalistyczny z ikonami',
  description: 'Prosty układ z ikonami kontaktowymi w nagłówku',
  thumbnail: 'lm-minimalist-icons.png',
  fields: allCoverLetterFields,
  template: (data, config = {}) => {
    const fullName = `${data.firstName || ''} ${data.lastName || ''}`.trim().toUpperCase();
    const position = data.position || 'PRZEDSTAWICIEL HANDLOWY';
    const city = data.address?.split(',')?.pop()?.trim() || 'Warszawa';
    const date = `${data.date || currentDate()}, ${city}`;
    
    const primaryColor = config?.primaryColor || '#c0392b';
    const fontFamily = config?.fontFamily || 'Arial, sans-serif';
    const fontSize = config?.fontSize || '12px';
    
    return `
      <div style="max-width: 21cm; margin: 0; padding: 0; font-family: ${fontFamily}; font-size: ${fontSize}; line-height: 1.5; color: #333;">
        <div style="padding: 30px 30px 80px 30px; min-height: 800px; position: relative;">
          <!-- Header -->
          <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid ${primaryColor}; padding-bottom: 10px; margin-bottom: 15px;">
            <div>
              <h1 style="margin: 0; color: ${primaryColor}; font-size: 28px;">${fullName}</h1>
              <p style="margin: 5px 0 0; color: #666; text-transform: uppercase;">${position}</p>
            </div>
            
            ${data.photo ? `
              <div style="width: 120px; height: 150px; overflow: hidden;">
                <img src="${data.photo}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;" alt="${fullName}" />
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
          <div style="margin-bottom: 20px;">
            ${data.recipientName ? `<p style="margin: 0 0 3px;">${data.recipientName}</p>` : ''}
            ${data.recipientCompany ? `<p style="margin: 0 0 3px;">${data.recipientCompany}</p>` : ''}
            ${data.recipientAddress ? `<p style="margin: 0 0 3px;">${data.recipientAddress}</p>` : ''}
          </div>
          
          <!-- Greeting -->
          <p style="margin-bottom: 15px;">${data.opening || 'Szanowni Państwo,'}</p>
          
          <!-- Content -->
          <div style="text-align: justify;">
            <p style="white-space: pre-line; margin-bottom: 20px;">${data.body || ''}</p>
          </div>
          
          <!-- Closing -->
          <p style="margin-top: 20px;">${data.closing || 'Z wyrazami szacunku,'}</p>
          <p style="margin-top: 5px;">${data.firstName} ${data.lastName}</p>
          
          <!-- Clause -->
          <p data-clause style="margin-top: 40px; font-size: 10px; color: #666; position: absolute; bottom: 20px; left: 30px; right: 30px; text-align: justify;">
            ${data.clause || 'Wyrażam zgodę na przetwarzanie moich danych osobowych w celu prowadzenia rekrutacji na aplikowane przeze mnie stanowisko.'}
          </p>
        </div>
      </div>
    `;
  },
};

export const coverLetterTemplates = [
  blueHeaderTemplate,
  whiteWithPhotoTemplate,
  tealSidebarTemplate,
  minimalistIconsTemplate
];
