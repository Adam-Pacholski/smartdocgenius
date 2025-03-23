
import { DocumentTemplate } from '../types/document-types';
import { allCoverLetterFields } from '../form-fields/cover-letter-fields';
import { currentDate } from '../utils/document-utils';

export const professionalTemplate: DocumentTemplate = {
  id: 'professional-1',
  name: 'Profesjonalny 1',
  description: 'Elegancki szablon w odcieniach burgundu i złota',
  thumbnail: 'lm-s1.png',
  fields: allCoverLetterFields,
  template: (data, config = {}) => {
    const fullName = `${data.firstName || ''} ${data.lastName || ''}`.trim();
    const city = data.address?.split(',')?.pop()?.trim() || 'Warszawa';
    const date = `${city}, ${data.date || currentDate()}`;
    
    const primaryColor = config?.primaryColor || '#993333';
    const fontFamily = config?.fontFamily || 'Arial, sans-serif';
    const fontSize = config?.fontSize || '14px';
    
    return `
      <div style="max-width: 21cm; margin: 0 auto; font-family: ${fontFamily}; font-size: ${fontSize}; line-height: 1.5; color: #333;">
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
          <div style="display: flex; flex-direction: column;">
            <h1 style="color: ${primaryColor}; margin: 0; font-size: 24px; text-transform: uppercase;">${fullName}</h1>
            <p style="margin: 0; color: #666; text-transform: uppercase;">${data.position || ''}</p>
          </div>
          ${data.photo ? `<div style="width: 120px; height: 150px; overflow: hidden; border: 1px solid #ddd;">
            <img src="${data.photo}" style="width: 100%; height: 100%; object-fit: cover;" alt="${fullName}" />
          </div>` : ''}
        </div>
        
        <!-- Contact Info -->
        <div style="display: flex; margin-bottom: 20px; color: #666;">
          ${data.email ? `<span style="margin-right: 15px;">${data.email}</span>` : ''}
          ${data.phone ? `<span style="margin-right: 15px;">${data.phone}</span>` : ''}
          ${data.birthDate ? `<span style="margin-right: 15px;">${data.birthDate}</span>` : ''}
          ${data.address ? `<span>${data.address}</span>` : ''}
        </div>
        
        <!-- Date -->
        <div style="margin-bottom: 20px;">
          <p>${date}</p>
        </div>
        
        <!-- Recipient -->
        <div style="margin-bottom: 30px;">
          ${data.recipientName ? `<p>${data.recipientName}</p>` : ''}
          ${data.recipientPosition ? `<p>${data.recipientPosition}</p>` : ''}
          ${data.recipientCompany ? `<p>${data.recipientCompany}</p>` : ''}
          ${data.recipientAddress ? `<p>${data.recipientAddress}</p>` : ''}
        </div>
        
        <!-- Opening -->
        <div style="margin-bottom: 20px;">
          <p>${data.opening || ''}</p>
        </div>
        
        <!-- Body -->
        <div style="margin-bottom: 30px; text-align: justify;">
          <p style="white-space: pre-line;">${data.body || ''}</p>
        </div>
        
        <!-- Closing -->
        <div style="margin-bottom: 40px;">
          <p>${data.closing || ''}</p>
          <p style="margin-top: 20px;">${fullName}</p>
        </div>
        
        <!-- Clause -->
        <div style="margin-top: 40px; font-size: 12px; color: #666;">
          <p style="white-space: pre-line;">${data.clause || ''}</p>
        </div>
      </div>
    `;
  },
};

export const modernSidebarTemplate: DocumentTemplate = {
  id: 'modern-sidebar',
  name: 'Nowoczesny z paskiem',
  description: 'Nowoczesny układ z kolorowym paskiem po lewej stronie',
  thumbnail: 'lm-s2.png',
  fields: allCoverLetterFields,
  template: (data, config = {}) => {
    const fullName = `${data.firstName || ''} ${data.lastName || ''}`.trim();
    const city = data.address?.split(',')?.pop()?.trim() || 'Warszawa';
    const date = `${city}, ${data.date || currentDate()}`;
    
    const primaryColor = config?.primaryColor || '#2c3e50';
    const fontFamily = config?.fontFamily || 'Arial, sans-serif';
    const fontSize = config?.fontSize || '14px';
    
    return `
      <div style="max-width: 21cm; margin: 0 auto; font-family: ${fontFamily}; font-size: ${fontSize}; line-height: 1.5; display: flex;">
        <!-- Left Sidebar -->
        <div style="width: 30%; background-color: ${primaryColor}; color: white; padding: 30px; box-sizing: border-box;">
          ${data.photo ? `
            <div style="width: 150px; height: 150px; border-radius: 50%; overflow: hidden; margin: 0 auto 20px;">
              <img src="${data.photo}" style="width: 100%; height: 100%; object-fit: cover;" alt="${fullName}" />
            </div>
          ` : ''}
          
          <h2 style="margin: 0 0 20px; text-align: center; font-size: 20px; text-transform: uppercase;">DANE OSOBOWE</h2>
          
          <div style="margin-bottom: 30px;">
            ${data.email ? `
              <p style="margin: 0 0 10px;">
                <strong>Email:</strong><br/>
                ${data.email}
              </p>
            ` : ''}
            
            ${data.phone ? `
              <p style="margin: 0 0 10px;">
                <strong>Telefon:</strong><br/>
                ${data.phone}
              </p>
            ` : ''}
            
            ${data.birthDate ? `
              <p style="margin: 0 0 10px;">
                <strong>Data urodzenia:</strong><br/>
                ${data.birthDate}
              </p>
            ` : ''}
            
            ${data.address ? `
              <p style="margin: 0 0 10px;">
                <strong>Adres:</strong><br/>
                ${data.address}
              </p>
            ` : ''}
          </div>
        </div>
        
        <!-- Main Content -->
        <div style="width: 70%; padding: 30px; box-sizing: border-box;">
          <!-- Header -->
          <div style="margin-bottom: 20px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 20px;">
            <h1 style="margin: 0; color: ${primaryColor}; font-size: 24px; text-transform: uppercase;">${fullName}</h1>
            <p style="margin: 0; color: #666; text-transform: uppercase;">${data.position || ''}</p>
            <p style="margin: 10px 0 0;">${date}</p>
          </div>
          
          <!-- Recipient -->
          <div style="margin-bottom: 30px;">
            ${data.recipientName ? `<p>${data.recipientName}</p>` : ''}
            ${data.recipientPosition ? `<p>${data.recipientPosition}</p>` : ''}
            ${data.recipientCompany ? `<p>${data.recipientCompany}</p>` : ''}
            ${data.recipientAddress ? `<p>${data.recipientAddress}</p>` : ''}
          </div>
          
          <!-- Letter Content -->
          <div>
            <p>${data.opening || ''}</p>
            <p style="text-align: justify; white-space: pre-line;">${data.body || ''}</p>
            <p style="margin-top: 30px;">${data.closing || ''}</p>
            <p style="margin-top: 20px;">${fullName}</p>
          </div>
          
          <!-- Clause -->
          <div style="margin-top: 40px; font-size: 12px; color: #666;">
            <p style="white-space: pre-line;">${data.clause || ''}</p>
          </div>
        </div>
      </div>
    `;
  },
};

export const elegantHeaderTemplate: DocumentTemplate = {
  id: 'elegant-header',
  name: 'Elegancki z nagłówkiem',
  description: 'Elegancki układ z wyróżnionym nagłówkiem i danymi po prawej',
  thumbnail: 'lm-s3.png',
  fields: allCoverLetterFields,
  template: (data, config = {}) => {
    const fullName = `${data.firstName || ''} ${data.lastName || ''}`.trim();
    const city = data.address?.split(',')?.pop()?.trim() || 'Warszawa';
    const date = `${city}, ${data.date || currentDate()}`;
    
    const primaryColor = config?.primaryColor || '#3498db';
    const fontFamily = config?.fontFamily || 'Arial, sans-serif';
    const fontSize = config?.fontSize || '14px';
    
    return `
      <div style="max-width: 21cm; margin: 0 auto; font-family: ${fontFamily}; font-size: ${fontSize}; line-height: 1.5;">
        <!-- Header -->
        <div style="display: flex; margin-bottom: 30px;">
          <div style="flex: 3; padding-right: 30px;">
            <h1 style="margin: 0; color: ${primaryColor}; font-size: 28px; text-transform: uppercase;">${fullName}</h1>
            <p style="margin: 5px 0 0; color: #666; text-transform: uppercase;">${data.position || ''}</p>
            <p style="margin: 20px 0 0;">${date}</p>
          </div>
          
          <div style="flex: 2; background-color: #f8f9fa; padding: 20px; border-left: 4px solid ${primaryColor};">
            ${data.photo ? `
              <div style="width: 100px; height: 130px; overflow: hidden; margin: 0 auto 15px;">
                <img src="${data.photo}" style="width: 100%; height: 100%; object-fit: cover;" alt="${fullName}" />
              </div>
            ` : ''}
            
            <div style="font-size: 13px;">
              ${data.email ? `<p style="margin: 0 0 5px;"><strong>Email:</strong> ${data.email}</p>` : ''}
              ${data.phone ? `<p style="margin: 0 0 5px;"><strong>Telefon:</strong> ${data.phone}</p>` : ''}
              ${data.birthDate ? `<p style="margin: 0 0 5px;"><strong>Data ur.:</strong> ${data.birthDate}</p>` : ''}
              ${data.address ? `<p style="margin: 0 0 5px;"><strong>Adres:</strong> ${data.address}</p>` : ''}
            </div>
          </div>
        </div>
        
        <!-- Recipient -->
        <div style="margin-bottom: 30px;">
          ${data.recipientName ? `<p>${data.recipientName}</p>` : ''}
          ${data.recipientPosition ? `<p>${data.recipientPosition}</p>` : ''}
          ${data.recipientCompany ? `<p>${data.recipientCompany}</p>` : ''}
          ${data.recipientAddress ? `<p>${data.recipientAddress}</p>` : ''}
        </div>
        
        <!-- Letter Content -->
        <div>
          <p>${data.opening || ''}</p>
          <p style="text-align: justify; white-space: pre-line;">${data.body || ''}</p>
          <p style="margin-top: 30px;">${data.closing || ''}</p>
          <p style="margin-top: 20px;">${fullName}</p>
        </div>
        
        <!-- Clause -->
        <div style="margin-top: 40px; font-size: 12px; color: #666; border-top: 1px solid #ddd; padding-top: 20px;">
          <p style="white-space: pre-line;">${data.clause || ''}</p>
        </div>
      </div>
    `;
  },
};

export const minimalistTemplate: DocumentTemplate = {
  id: 'minimalist',
  name: 'Minimalistyczny',
  description: 'Prosty, nowoczesny układ z subtelnym akcentem kolorystycznym',
  thumbnail: 'lm-s4.png',
  fields: allCoverLetterFields,
  template: (data, config = {}) => {
    const fullName = `${data.firstName || ''} ${data.lastName || ''}`.trim();
    const city = data.address?.split(',')?.pop()?.trim() || 'Warszawa';
    const date = `${city}, ${data.date || currentDate()}`;
    
    const primaryColor = config?.primaryColor || '#546e7a';
    const fontFamily = config?.fontFamily || 'Arial, sans-serif';
    const fontSize = config?.fontSize || '14px';
    
    return `
      <div style="max-width: 21cm; margin: 0 auto; font-family: ${fontFamily}; font-size: ${fontSize}; line-height: 1.5; color: #333; background-color: white;">
        <div style="display: flex; flex-direction: ${data.photo ? 'row' : 'column'};">
          <!-- Header -->
          <div style="flex: ${data.photo ? '3' : '1'};">
            <h1 style="margin: 0; color: ${primaryColor}; font-size: 24px; letter-spacing: 1px; text-transform: uppercase;">${fullName}</h1>
            <p style="margin: 5px 0 25px; color: #666; text-transform: uppercase;">${data.position || ''}</p>
            
            <div style="display: flex; flex-wrap: wrap; margin-bottom: 30px; font-size: 13px; color: #666;">
              ${data.email ? `<p style="margin: 0 20px 5px 0;"><span style="color: ${primaryColor};">✉</span> ${data.email}</p>` : ''}
              ${data.phone ? `<p style="margin: 0 20px 5px 0;"><span style="color: ${primaryColor};">✆</span> ${data.phone}</p>` : ''}
              ${data.birthDate ? `<p style="margin: 0 20px 5px 0;"><span style="color: ${primaryColor};">⌛</span> ${data.birthDate}</p>` : ''}
              ${data.address ? `<p style="margin: 0 20px 5px 0;"><span style="color: ${primaryColor};">⌂</span> ${data.address}</p>` : ''}
            </div>
          </div>
          
          ${data.photo ? `
          <div style="flex: 1; display: flex; justify-content: flex-end;">
            <div style="width: 130px; height: 160px; overflow: hidden;">
              <img src="${data.photo}" style="width: 100%; height: 100%; object-fit: cover;" alt="${fullName}" />
            </div>
          </div>
          ` : ''}
        </div>
        
        <div style="border-top: 2px solid ${primaryColor}; margin: 10px 0 30px;"></div>
        
        <!-- Date and Recipient -->
        <div style="display: flex; margin-bottom: 30px;">
          <div style="flex: 1;">
            <p>${date}</p>
          </div>
          <div style="flex: 1; text-align: right;">
            ${data.recipientName ? `<p>${data.recipientName}</p>` : ''}
            ${data.recipientPosition ? `<p>${data.recipientPosition}</p>` : ''}
            ${data.recipientCompany ? `<p>${data.recipientCompany}</p>` : ''}
            ${data.recipientAddress ? `<p>${data.recipientAddress}</p>` : ''}
          </div>
        </div>
        
        <!-- Letter Content -->
        <div>
          <p>${data.opening || ''}</p>
          <p style="text-align: justify; white-space: pre-line;">${data.body || ''}</p>
          <p style="margin-top: 30px;">${data.closing || ''}</p>
          <p style="margin-top: 20px;">${fullName}</p>
        </div>
        
        <!-- Clause -->
        <div style="margin-top: 40px; font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 20px;">
          <p style="white-space: pre-line;">${data.clause || ''}</p>
        </div>
      </div>
    `;
  },
};

export const coverLetterTemplates = [
  professionalTemplate,
  modernSidebarTemplate,
  elegantHeaderTemplate,
  minimalistTemplate
];
