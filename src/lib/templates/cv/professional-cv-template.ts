
import { formatExperienceSection, formatEducationSection, formatSkillsSection, formatLanguagesSection, formatInterestsSection } from '../template-utils';

export const professionalCVTemplate = (data: Record<string, string>, config: Record<string, any> = {}) => {
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
  
  console.log('Professional CV data being rendered:', data);
  
  return `
    <div style="font-family: ${fontFamily}; font-size: ${fontSize}; line-height: 1.5; color: #333; max-width: 21cm; margin: 0 auto; padding: 0; border: 1px solid #ddd;">
      <!-- Professional Header -->
      <div style="display: flex; align-items: center; padding: 30px; border-bottom: 3px solid ${primaryColor}; background-color: #fff;">
        ${data.photo ? `
          <div style="width: 120px; height: 150px; overflow: hidden; margin-right: 30px; border: 1px solid #eee;">
            <img src="${data.photo}" alt="${fullName}" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>
        ` : ''}
        <div>
          <h1 style="margin: 0; font-size: 28px; color: #333;">${fullName}</h1>
          <p style="margin: 5px 0 15px; font-size: 18px; color: ${primaryColor};">${position}</p>
          
          <div style="display: flex; flex-wrap: wrap; gap: 15px; font-size: 14px;">
            ${data.email ? `<div><strong>Email:</strong> ${data.email}</div>` : ''}
            ${data.phone ? `<div><strong>Telefon:</strong> ${data.phone}</div>` : ''}
            ${data.address ? `<div><strong>Adres:</strong> ${data.address}</div>` : ''}
            ${dateOfBirth ? `<div><strong>Data urodzenia:</strong> ${dateOfBirth}</div>` : ''}
          </div>
        </div>
      </div>
      
      <!-- Main Content in Professional Layout -->
      <div style="display: flex;">
        <!-- Main Column -->
        <div style="flex: 2; padding: 30px; border-right: 1px solid #eee;">
          <!-- Experience Section -->
          ${data.doswiadczenie ? `
            <section style="margin-bottom: 30px;">
              <h2 style="color: ${primaryColor}; font-size: 20px; margin-top: 0; padding-bottom: 10px; border-bottom: 1px solid #eee;">
                DOŚWIADCZENIE ZAWODOWE
              </h2>
              ${formatExperienceSection(data.doswiadczenie)}
            </section>
          ` : ''}
          
          <!-- Education Section -->
          ${data.edukacja ? `
            <section>
              <h2 style="color: ${primaryColor}; font-size: 20px; padding-bottom: 10px; border-bottom: 1px solid #eee;">
                WYKSZTAŁCENIE
              </h2>
              ${formatEducationSection(data.edukacja)}
            </section>
          ` : ''}
        </div>
        
        <!-- Sidebar -->
        <div style="flex: 1; padding: 30px; background-color: #fcfcfc;">
          <!-- Skills Section -->
          ${data.umiejetnosci ? `
            <section style="margin-bottom: 30px;">
              <h2 style="color: ${primaryColor}; font-size: 20px; margin-top: 0; padding-bottom: 10px; border-bottom: 1px solid #eee;">
                UMIEJĘTNOŚCI
              </h2>
              ${formatSkillsSection(data.umiejetnosci, config.skillsProgressColor || primaryColor)}
            </section>
          ` : ''}
          
          <!-- Languages Section -->
          ${data.jezyki ? `
            <section style="margin-bottom: 30px;">
              <h2 style="color: ${primaryColor}; font-size: 20px; padding-bottom: 10px; border-bottom: 1px solid #eee;">
                JĘZYKI OBCE
              </h2>
              ${formatLanguagesSection(data.jezyki)}
            </section>
          ` : ''}
          
          <!-- Interests Section -->
          ${data.zainteresowania ? `
            <section>
              <h2 style="color: ${primaryColor}; font-size: 20px; padding-bottom: 10px; border-bottom: 1px solid #eee;">
                ZAINTERESOWANIA
              </h2>
              ${formatInterestsSection(data.zainteresowania)}
            </section>
          ` : ''}
        </div>
      </div>
      
      <!-- Footer with Clause -->
      ${data.clause ? `
        <footer style="padding: 20px 30px; font-size: 10px; color: #777; background-color: #f9f9f9; border-top: 1px solid #eee;">
          ${data.clause}
        </footer>
      ` : ''}
    </div>
  `;
};
