
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
    <div style="font-family: ${fontFamily}; font-size: ${fontSize}; line-height: 1.5; color: #333; max-width: 21cm; margin: 0 auto; padding: 0;">
      <!-- Header Section with Dark Background -->
      <div style="display: flex; align-items: center; padding: 30px; background-color: #2c3e50; color: white;">
        <div style="flex: 1;">
          <h1 style="margin: 0; font-size: 28px; color: white;">${fullName}</h1>
          <p style="margin: 5px 0 0; font-size: 18px; color: #e9e9e9;">${position}</p>
        </div>
        ${data.photo ? `
          <div style="width: 120px; height: 150px; overflow: hidden; border: 2px solid white;">
            <img src="${data.photo}" alt="${fullName}" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>
        ` : ''}
      </div>
      
      <!-- Contact Information Bar -->
      <div style="background-color: ${primaryColor}; padding: 15px 30px; display: flex; flex-wrap: wrap; color: white;">
        ${data.email ? `<div style="margin-right: 30px;"><strong>Email:</strong> ${data.email}</div>` : ''}
        ${data.phone ? `<div style="margin-right: 30px;"><strong>Telefon:</strong> ${data.phone}</div>` : ''}
        ${data.address ? `<div style="margin-right: 30px;"><strong>Adres:</strong> ${data.address}</div>` : ''}
        ${dateOfBirth ? `<div><strong>Data urodzenia:</strong> ${dateOfBirth}</div>` : ''}
      </div>
      
      <!-- Main Content -->
      <div style="display: flex; padding: 0;">
        <!-- Left Column -->
        <div style="flex: 2; padding: 25px 30px 50px 30px; border-right: 1px solid #eee;">
          <!-- Profile Summary -->
          ${data.summary ? `
            <section style="margin-bottom: 30px;">
              <h2 style="color: #2c3e50; font-size: 22px; margin-top: 0; border-bottom: 2px solid ${primaryColor}; padding-bottom: 10px;">
                PROFIL ZAWODOWY
              </h2>
              <p style="text-align: justify;">${data.summary}</p>
            </section>
          ` : ''}
          
          <!-- Experience Section -->
          ${data.doswiadczenie ? `
            <section style="margin-bottom: 30px;">
              <h2 style="color: #2c3e50; font-size: 22px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 10px;">
                DOŚWIADCZENIE ZAWODOWE
              </h2>
              ${formatExperienceSection(data.doswiadczenie)}
            </section>
          ` : ''}
          
          <!-- Education Section -->
          ${data.edukacja ? `
            <section>
              <h2 style="color: #2c3e50; font-size: 22px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 10px;">
                WYKSZTAŁCENIE
              </h2>
              ${formatEducationSection(data.edukacja)}
            </section>
          ` : ''}
        </div>
        
        <!-- Right Column -->
        <div style="flex: 1; padding: 25px 30px 50px 30px; background-color: #f8f9fa;">
          <!-- Skills Section -->
          ${data.umiejetnosci ? `
            <section style="margin-bottom: 30px;">
              <h2 style="color: #2c3e50; font-size: 22px; margin-top: 0; border-bottom: 2px solid ${primaryColor}; padding-bottom: 10px;">
                UMIEJĘTNOŚCI
              </h2>
              ${formatSkillsSection(data.umiejetnosci, config.skillsProgressColor || primaryColor)}
            </section>
          ` : ''}
          
          <!-- Languages Section -->
          ${data.jezyki ? `
            <section style="margin-bottom: 30px;">
              <h2 style="color: #2c3e50; font-size: 22px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 10px;">
                JĘZYKI OBCE
              </h2>
              ${formatLanguagesSection(data.jezyki)}
            </section>
          ` : ''}
          
          <!-- Interests Section -->
          ${data.zainteresowania ? `
            <section>
              <h2 style="color: #2c3e50; font-size: 22px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 10px;">
                ZAINTERESOWANIA
              </h2>
              ${formatInterestsSection(data.zainteresowania)}
            </section>
          ` : ''}
        </div>
      </div>
      
      <!-- Footer with Clause -->
      ${data.clause ? `
        <footer style="padding: 20px 30px 40px; font-size: 10px; color: #777; background-color: #f1f1f1; border-top: 2px solid ${primaryColor};">
          ${data.clause}
        </footer>
      ` : ''}
    </div>
  `;
};
