
import { formatExperienceSection, formatEducationSection, formatSkillsSection, formatLanguagesSection, formatInterestsSection } from '../template-utils';

export const basicCVTemplate = (data: Record<string, string>, config: Record<string, any> = {}) => {
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
  
  console.log('CV data being rendered:', data);
  
  return `
    <div style="font-family: ${fontFamily}; font-size: ${fontSize}; line-height: 1.5; color: #333; max-width: 21cm; margin: 0 auto; padding: 0;">
      <!-- Header Section -->
      <div style="display: flex; align-items: center; padding: 20px 30px; border-bottom: 2px solid ${primaryColor};">
        <div style="flex: 1;">
          <h1 style="margin: 0; font-size: 28px; color: ${primaryColor};">${fullName}</h1>
          <p style="margin: 5px 0 0; font-size: 18px; color: #555;">${position}</p>
        </div>
        ${data.photo ? `
          <div style="width: 120px; height: 150px; overflow: hidden; border: 1px solid #ddd;">
            <img src="${data.photo}" alt="${fullName}" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>
        ` : ''}
      </div>
      
      <!-- Contact Information -->
      <div style="background-color: #f9f9f9; padding: 15px 30px; display: flex; flex-wrap: wrap;">
        ${data.email ? `<div style="margin-right: 30px;"><strong>Email:</strong> ${data.email}</div>` : ''}
        ${data.phone ? `<div style="margin-right: 30px;"><strong>Telefon:</strong> ${data.phone}</div>` : ''}
        ${data.address ? `<div style="margin-right: 30px;"><strong>Adres:</strong> ${data.address}</div>` : ''}
        ${dateOfBirth ? `<div><strong>Data urodzenia:</strong> ${dateOfBirth}</div>` : ''}
      </div>
      
      <!-- Main Content -->
      <div style="display: flex; padding: 0 0 30px;">
        <!-- Left Column -->
        <div style="flex: 2; padding: 20px 30px 60px 30px;">
          <!-- Experience Section -->
          ${data.doswiadczenie ? `
            <section>
              <h2 style="color: ${primaryColor}; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 25px;">Doświadczenie zawodowe</h2>
              ${formatExperienceSection(data.doswiadczenie)}
            </section>
          ` : ''}
          
          <!-- Education Section -->
          ${data.edukacja ? `
            <section>
              <h2 style="color: ${primaryColor}; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 25px;">Wykształcenie</h2>
              ${formatEducationSection(data.edukacja)}
            </section>
          ` : ''}
        </div>
        
        <!-- Right Column -->
        <div style="flex: 1; padding: 20px 30px 60px 30px; background-color: #f9f9f9;">
          <!-- Skills Section -->
          ${data.umiejetnosci ? `
            <section>
              <h2 style="color: ${primaryColor}; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 0;">Umiejętności</h2>
              ${formatSkillsSection(data.umiejetnosci, config.skillsProgressColor || primaryColor)}
            </section>
          ` : ''}
          
          <!-- Languages Section -->
          ${data.jezyki ? `
            <section>
              <h2 style="color: ${primaryColor}; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 25px;">Języki obce</h2>
              ${formatLanguagesSection(data.jezyki)}
            </section>
          ` : ''}
          
          <!-- Interests Section -->
          ${data.zainteresowania ? `
            <section>
              <h2 style="color: ${primaryColor}; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 25px;">Zainteresowania</h2>
              ${formatInterestsSection(data.zainteresowania)}
            </section>
          ` : ''}
        </div>
      </div>
      
      <!-- Footer with Clause -->
      ${data.clause ? `
        <footer style="padding: 20px 30px 60px; border-top: 1px solid #eee; font-size: 10px; color: #777; clear: both; background-color: #f9f9f9;">
          ${data.clause}
        </footer>
      ` : ''}
    </div>
  `;
};
