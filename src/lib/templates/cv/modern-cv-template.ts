

import { formatExperienceSection, formatEducationSection, formatSkillsSection, formatLanguagesSection, formatInterestsSection, formatPortfolioSection } from '../template-utils';

export const modernCVTemplate = (data: Record<string, string>, config: Record<string, any> = {}) => {
  // Default config values
  const primaryColor = config.primaryColor || '#3498db';
  const fontFamily = config.fontFamily || 'Arial, sans-serif';
  const fontSize = config.fontSize || '12px';
  
  // Format data
  const firstName = data.firstName || '';
  const lastName = data.lastName || '';
  const fullName = `${firstName} ${lastName}`.trim();
  const position = data.position || '';
  const dateOfBirth = data.dateOfBirth || data.birthDate || '';
  const summary = data.summary || '';
  
  console.log('Modern CV data being rendered:', data);
  
  return `
    <div style="font-family: ${fontFamily}; font-size: ${fontSize}; line-height: 1.5; color: #333; max-width: 21cm; margin: 0 auto; padding: 0;">
      <!-- Header Section with Background Color -->
      <div style="background-color: ${primaryColor}; color: white; padding: 40px; text-align: center;">
        <h1 style="margin: 0; font-size: 32px; text-transform: uppercase;">${fullName}</h1>
        <p style="margin: 10px 0 0; font-size: 18px;">${position}</p>
      </div>
      
      <!-- Two Column Layout -->
      <div style="display: flex;">
        <!-- Left Sidebar -->
        <div style="flex: 1; background-color: #f5f5f5; padding: 30px 30px 70px 30px; page-break-inside: avoid;">
          ${data.photo ? `
            <div style="width: 150px; height: 150px; border-radius: 50%; overflow: hidden; margin: 0 auto 20px;">
              <img src="${data.photo}" alt="${fullName}" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
          ` : ''}
          
          <!-- Contact Information -->
          <section style="margin-bottom: 30px;">
            <h2 style="font-size: 18px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 10px; margin-bottom: 15px;">Kontakt</h2>
            ${data.email ? `<p style="margin: 5px 0;"><strong>Email:</strong> ${data.email}</p>` : ''}
            ${data.phone ? `<p style="margin: 5px 0;"><strong>Telefon:</strong> ${data.phone}</p>` : ''}
            ${data.address ? `<p style="margin: 5px 0;"><strong>Adres:</strong> ${data.address}</p>` : ''}
            ${dateOfBirth ? `<p style="margin: 5px 0;"><strong>Data urodzenia:</strong> ${dateOfBirth}</p>` : ''}
          </section>
          
          <!-- Skills Section -->
          ${data.umiejetnosci ? `
            <section style="margin-bottom: 30px;">
              <h2 style="font-size: 18px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 10px; margin-bottom: 15px;">Umiejętności</h2>
              ${formatSkillsSection(data.umiejetnosci, config.skillsProgressColor || primaryColor)}
            </section>
          ` : ''}
          
          <!-- Languages Section -->
          ${data.jezyki ? `
            <section style="margin-bottom: 30px;">
              <h2 style="font-size: 18px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 10px; margin-bottom: 15px;">Języki obce</h2>
              ${formatLanguagesSection(data.jezyki)}
            </section>
          ` : ''}
          
          <!-- Links Section -->
          ${data.linki ? `
            <section style="margin-bottom: 30px;">
              <h2 style="font-size: 18px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 10px; margin-bottom: 15px;">Portfolio & Linki</h2>
              ${formatPortfolioSection(data.linki)}
            </section>
          ` : ''}
          
          <!-- Interests Section -->
          ${data.zainteresowania ? `
            <section style="margin-bottom: 30px; page-break-inside: avoid;">
              <h2 style="font-size: 18px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 10px; margin-bottom: 15px;">Zainteresowania</h2>
              ${formatInterestsSection(data.zainteresowania)}
            </section>
          ` : ''}
        </div>
        
        <!-- Right Content Area -->
        <div style="flex: 2; padding: 30px 30px 70px 30px;">
          <!-- Summary Section -->
          ${summary ? `
            <section style="margin-bottom: 30px;">
              <h2 style="font-size: 22px; color: ${primaryColor}; border-bottom: 2px solid ${primaryColor}; padding-bottom: 10px; margin-bottom: 20px;">Podsumowanie zawodowe</h2>
              <p>${summary}</p>
            </section>
          ` : ''}
          
          <!-- Experience Section -->
          ${data.doswiadczenie ? `
            <section style="margin-bottom: 30px; page-break-inside: avoid;">
              <h2 style="font-size: 22px; color: ${primaryColor}; border-bottom: 2px solid ${primaryColor}; padding-bottom: 10px; margin-bottom: 20px;">Doświadczenie zawodowe</h2>
              ${formatExperienceSection(data.doswiadczenie)}
            </section>
          ` : ''}
          
          <!-- Education Section -->
          ${data.edukacja ? `
            <section style="margin-bottom: 30px; page-break-inside: avoid;">
              <h2 style="font-size: 22px; color: ${primaryColor}; border-bottom: 2px solid ${primaryColor}; padding-bottom: 10px; margin-bottom: 20px;">Wykształcenie</h2>
              ${formatEducationSection(data.edukacja)}
            </section>
          ` : ''}
        </div>
      </div>
      
      <!-- Footer with Clause -->
      ${data.clause ? `
        <footer style="padding: 20px 30px 60px; border-top: 1px solid #eee; font-size: 10px; color: #777; background-color: #f9f9f9; clear: both; page-break-inside: avoid;">
          ${data.clause}
        </footer>
      ` : ''}
    </div>
  `;
};

