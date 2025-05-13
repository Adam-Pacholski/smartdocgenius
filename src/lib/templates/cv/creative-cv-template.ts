
import { formatExperienceSection, formatEducationSection, formatSkillsSection, formatLanguagesSection, formatInterestsSection, formatPortfolioSection } from '../template-utils';

export const creativeCVTemplate = (data: Record<string, string>, config: Record<string, any> = {}) => {
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
  
  console.log('Creative CV data being rendered:', data);
  
  return `
    <div style="font-family: ${fontFamily}; font-size: ${fontSize}; line-height: 1.5; color: #333; max-width: 21cm; margin: 0 auto; padding: 30px;">
      <!-- Creative Header with Circular Photo -->
      <div style="background: linear-gradient(135deg, ${primaryColor}, #34495e); color: white; padding: 40px; text-align: center; border-radius: 0 0 50% 50% / 20%;">
        ${data.photo ? `
          <div style="width: 150px; height: 150px; border-radius: 50%; overflow: hidden; margin: 0 auto 20px; border: 5px solid white; box-shadow: 0 5px 15px rgba(0,0,0,0.2);">
            <img src="${data.photo}" alt="${fullName}" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>
        ` : ''}
        <h1 style="margin: 10px 0 0; font-size: 38px; text-transform: uppercase; letter-spacing: 2px;">${fullName}</h1>
        <p style="margin: 10px 0 20px; font-size: 20px; opacity: 0.9;">${position}</p>
        
        <!-- Contact Icons Row -->
        <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 20px; margin-top: 20px;">
          ${data.email ? `<div style="display: flex; align-items: center; gap: 5px;"><span>✉</span> ${data.email}</div>` : ''}
          ${data.phone ? `<div style="display: flex; align-items: center; gap: 5px;"><span>✆</span> ${data.phone}</div>` : ''}
          ${data.address ? `<div style="display: flex; align-items: center; gap: 5px;"><span>📍</span> ${data.address}</div>` : ''}
          ${dateOfBirth ? `<div style="display: flex; align-items: center; gap: 5px;"><span>🎂</span> ${dateOfBirth}</div>` : ''}
        </div>
      </div>
      
      <!-- Main Content in Creative Layout -->
      <div style="padding: 40px 0 80px;">
        <!-- Two Column Layout for Skills and Languages -->
        <div style="display: flex; gap: 30px; margin-bottom: 40px;">
          <!-- Skills Section -->
          ${data.umiejetnosci ? `
            <div style="flex: 1;">
              <h2 style="font-size: 22px; color: ${primaryColor}; margin-bottom: 15px; position: relative; padding-bottom: 10px;">
                Umiejętności
                <span style="position: absolute; bottom: 0; left: 0; width: 50px; height: 3px; background-color: ${primaryColor};"></span>
              </h2>
              ${formatSkillsSection(data.umiejetnosci, config.skillsProgressColor || primaryColor)}
            </div>
          ` : ''}
          
          <!-- Languages Section -->
          ${data.jezyki ? `
            <div style="flex: 1;">
              <h2 style="font-size: 22px; color: ${primaryColor}; margin-bottom: 15px; position: relative; padding-bottom: 10px;">
                Języki obce
                <span style="position: absolute; bottom: 0; left: 0; width: 50px; height: 3px; background-color: ${primaryColor};"></span>
              </h2>
              ${formatLanguagesSection(data.jezyki)}
            </div>
          ` : ''}
        </div>
        
        <!-- Portfolio/Links Section -->
        ${data.portfolio ? `
          <section style="margin-bottom: 40px; page-break-inside: avoid;">
            <h2 style="font-size: 22px; color: ${primaryColor}; margin-bottom: 15px; position: relative; padding-bottom: 10px;">
              Portfolio & Linki
              <span style="position: absolute; bottom: 0; left: 0; width: 50px; height: 3px; background-color: ${primaryColor};"></span>
            </h2>
            ${formatPortfolioSection(data.portfolio)}
          </section>
        ` : ''}
        
        <!-- Experience Section with Timeline Style -->
        ${data.doswiadczenie ? `
          <section style="margin-bottom: 40px; page-break-inside: avoid;">
            <h2 style="font-size: 22px; color: ${primaryColor}; margin-bottom: 20px; position: relative; padding-bottom: 10px;">
              Doświadczenie zawodowe
              <span style="position: absolute; bottom: 0; left: 0; width: 50px; height: 3px; background-color: ${primaryColor};"></span>
            </h2>
            ${formatExperienceSection(data.doswiadczenie)}
          </section>
        ` : ''}
        
        <!-- Education Section -->
        ${data.edukacja ? `
          <section style="margin-bottom: 40px; page-break-inside: avoid;">
            <h2 style="font-size: 22px; color: ${primaryColor}; margin-bottom: 20px; position: relative; padding-bottom: 10px;">
              Wykształcenie
              <span style="position: absolute; bottom: 0; left: 0; width: 50px; height: 3px; background-color: ${primaryColor};"></span>
            </h2>
            ${formatEducationSection(data.edukacja)}
          </section>
        ` : ''}
        
        <!-- Interests Section -->
        ${data.zainteresowania ? `
          <section style="page-break-inside: avoid;">
            <h2 style="font-size: 22px; color: ${primaryColor}; margin-bottom: 15px; position: relative; padding-bottom: 10px;">
              Zainteresowania
              <span style="position: absolute; bottom: 0; left: 0; width: 50px; height: 3px; background-color: ${primaryColor};"></span>
            </h2>
            ${formatInterestsSection(data.zainteresowania)}
          </section>
        ` : ''}
      </div>
      
      <!-- Footer with Clause -->
      ${data.clause ? `
        <footer style="padding: 20px 30px 60px; font-size: 10px; color: #777; background-color: #f5f5f5; border-top: 2px solid ${primaryColor}; clear: both; margin-top: 60px;">
          ${data.clause}
        </footer>
      ` : ''}
    </div>
  `;
};
