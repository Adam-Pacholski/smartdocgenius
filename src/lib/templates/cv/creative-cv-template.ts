
import { formatExperienceSection, formatEducationSection, formatSkillsSection, formatLanguagesSection, formatInterestsSection, formatPortfolioSection } from '../template-utils';

export const creativeCVTemplate = (data: Record<string, string>, config: Record<string, any> = {}) => {
  // Default config values
  const primaryColor = config.primaryColor || '#6c5ce7';
  const fontFamily = config.fontFamily || 'Arial, sans-serif';
  const fontSize = config.fontSize || '12px';
  
  // Format data
  const firstName = data.firstName || '';
  const lastName = data.lastName || '';
  const fullName = `${firstName} ${lastName}`.trim();
  const position = data.position || '';
  const dateOfBirth = data.dateOfBirth || '';
  
  return `
    <div style="font-family: ${fontFamily}; font-size: ${fontSize}; line-height: 1.5; color: #333; max-width: 21cm; margin: 0 auto; padding: 0;">
      <!-- Header Section with Name, Title, and Contact Info -->
      <header style="display: flex; align-items: stretch; margin-bottom: 30px; background: linear-gradient(to right, ${primaryColor}, #8c7ae6); color: white; page-break-inside: avoid;">
        <!-- Photo and Name Column -->
        <div style="flex: 1; padding: 30px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
          ${data.photo ? `
            <div style="width: 150px; height: 150px; overflow: hidden; border: 3px solid white; margin-bottom: 20px; box-shadow: 0 5px 15px rgba(0,0,0,0.2);">
              <img src="${data.photo}" alt="${fullName}" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
          ` : ''}
          <h1 style="margin: 10px 0 5px; font-size: 28px; text-transform: uppercase; letter-spacing: 2px;">${fullName}</h1>
          <p style="margin: 0; font-size: 18px; letter-spacing: 1px;">${position}</p>
        </div>
        
        <!-- Contact Information Column -->
        <div style="flex: 1; padding: 30px; background-color: rgba(255,255,255,0.1); display: flex; flex-direction: column; justify-content: center;">
          <div style="margin-bottom: 10px;">
            ${data.phone ? `<p style="margin: 5px 0;"><strong>Telefon:</strong> ${data.phone}</p>` : ''}
            ${data.email ? `<p style="margin: 5px 0;"><strong>Email:</strong> ${data.email}</p>` : ''}
            ${data.address ? `<p style="margin: 5px 0;"><strong>Adres:</strong> ${data.address}</p>` : ''}
            ${dateOfBirth ? `<p style="margin: 5px 0;"><strong>Data urodzenia:</strong> ${dateOfBirth}</p>` : ''}
          </div>
          
          ${data.portfolio ? `
            <div style="margin-top: 15px;">
              <h3 style="margin: 0 0 10px; font-size: 16px; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 5px;">PORTFOLIO & LINKI</h3>
              <div style="font-size: 14px;">
                ${formatPortfolioSection(data.portfolio).replace(/<ul[^>]*>/g, '<ul style="list-style: none; padding: 0; margin: 0;">').replace(/<li[^>]*>/g, '<li style="margin-bottom: 5px;">')}
              </div>
            </div>
          ` : ''}
        </div>
      </header>
      
      <!-- Main Content Grid -->
      <div style="display: flex; gap: 30px;">
        <!-- Left Column -->
        <div style="flex: 1.7; page-break-inside: avoid;">
          <!-- Profile Summary -->
          ${data.summary ? `
            <section style="margin-bottom: 30px; page-break-inside: avoid;">
              <h2 style="color: ${primaryColor}; margin: 0 0 15px; font-size: 18px; text-transform: uppercase; letter-spacing: 1px; position: relative; padding-bottom: 10px;">
                PODSUMOWANIE ZAWODOWE
                <span style="position: absolute; bottom: 0; left: 0; width: 50px; height: 3px; background-color: ${primaryColor};"></span>
              </h2>
              <p style="margin: 0; line-height: 1.6;">${data.summary}</p>
            </section>
          ` : ''}
          
          <!-- Experience Section -->
          ${data.doswiadczenie ? `
            <section style="margin-bottom: 30px; page-break-inside: avoid;">
              <h2 style="color: ${primaryColor}; margin: 0 0 15px; font-size: 18px; text-transform: uppercase; letter-spacing: 1px; position: relative; padding-bottom: 10px;">
                DOŚWIADCZENIE ZAWODOWE
                <span style="position: absolute; bottom: 0; left: 0; width: 50px; height: 3px; background-color: ${primaryColor};"></span>
              </h2>
              ${formatExperienceSection(data.doswiadczenie)}
            </section>
          ` : ''}
          
          <!-- Education Section -->
          ${data.edukacja ? `
            <section style="margin-bottom: 30px; page-break-inside: avoid;">
              <h2 style="color: ${primaryColor}; margin: 0 0 15px; font-size: 18px; text-transform: uppercase; letter-spacing: 1px; position: relative; padding-bottom: 10px;">
                WYKSZTAŁCENIE
                <span style="position: absolute; bottom: 0; left: 0; width: 50px; height: 3px; background-color: ${primaryColor};"></span>
              </h2>
              ${formatEducationSection(data.edukacja)}
            </section>
          ` : ''}
        </div>
        
        <!-- Right Column -->
        <div style="flex: 1; page-break-inside: avoid;">
          <!-- Skills Section -->
          ${data.umiejetnosci ? `
            <section style="margin-bottom: 30px; padding: 20px; background-color: #f9f9f9; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); page-break-inside: avoid;">
              <h2 style="color: ${primaryColor}; margin: 0 0 15px; font-size: 18px; text-transform: uppercase; letter-spacing: 1px; position: relative; padding-bottom: 10px;">
                UMIEJĘTNOŚCI
                <span style="position: absolute; bottom: 0; left: 0; width: 50px; height: 3px; background-color: ${primaryColor};"></span>
              </h2>
              ${formatSkillsSection(data.umiejetnosci, config.skillsProgressColor || primaryColor)}
            </section>
          ` : ''}
          
          <!-- Languages Section -->
          ${data.jezyki ? `
            <section style="margin-bottom: 30px; padding: 20px; background-color: #f9f9f9; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); page-break-inside: avoid;">
              <h2 style="color: ${primaryColor}; margin: 0 0 15px; font-size: 18px; text-transform: uppercase; letter-spacing: 1px; position: relative; padding-bottom: 10px;">
                JĘZYKI OBCE
                <span style="position: absolute; bottom: 0; left: 0; width: 50px; height: 3px; background-color: ${primaryColor};"></span>
              </h2>
              ${formatLanguagesSection(data.jezyki)}
            </section>
          ` : ''}
          
          <!-- Interests Section -->
          ${data.zainteresowania ? `
            <section style="margin-bottom: 30px; padding: 20px; background-color: #f9f9f9; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); page-break-inside: avoid;">
              <h2 style="color: ${primaryColor}; margin: 0 0 15px; font-size: 18px; text-transform: uppercase; letter-spacing: 1px; position: relative; padding-bottom: 10px;">
                ZAINTERESOWANIA
                <span style="position: absolute; bottom: 0; left: 0; width: 50px; height: 3px; background-color: ${primaryColor};"></span>
              </h2>
              ${formatInterestsSection(data.zainteresowania)}
            </section>
          ` : ''}
        </div>
      </div>
      
      <!-- Footer with Clause -->
      ${data.clause ? `
        <footer style="margin-top: 40px; padding: 15px; border-top: 1px solid #eee; font-size: 10px; color: #777; clear: both; page-break-inside: avoid;">
          ${data.clause}
        </footer>
      ` : ''}
    </div>
  `;
};
