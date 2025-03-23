
/**
 * Utility functions and constants for document templates
 */
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
