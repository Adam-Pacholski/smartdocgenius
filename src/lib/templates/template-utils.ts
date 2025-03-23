import { DocumentTemplate } from '../types/document-types';

// Helper function to create HTML progress bars from skills
const createSkillsProgressBars = (skillsText: string, primaryColor: string) => {
  if (!skillsText) return '';
  
  const skillLines = skillsText.split('\n').filter(line => line.trim());
  let skillsHtml = '';
  
  for (const line of skillLines) {
    const parts = line.split(':');
    if (parts.length < 2) continue;
    
    const skillName = parts[0].trim();
    const skillLevelText = parts[1].trim();
    const skillLevel = parseInt(skillLevelText) || 3; // Default to 3 if parsing fails
    const percentage = Math.min(Math.max(skillLevel, 0), 5) * 20; // Convert 0-5 to 0-100%
    
    skillsHtml += `
      <div class="skill-item" style="margin-bottom: 8px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
          <span style="font-size: 12px;">${skillName}</span>
          <span style="font-size: 12px;">${skillLevel}/5</span>
        </div>
        <div style="height: 6px; background-color: rgba(255,255,255,0.2); border-radius: 3px; overflow: hidden;">
          <div style="height: 100%; width: ${percentage}%; background-color: ${primaryColor === '#1e88e5' ? 'white' : primaryColor}; border-radius: 3px;"></div>
        </div>
      </div>
    `;
  }
  
  return skillsHtml;
};

// Helper function to format languages
const formatLanguages = (languagesText: string) => {
  if (!languagesText) return '';
  
  const languageLines = languagesText.split('\n').filter(line => line.trim());
  let languagesHtml = '';
  
  for (const line of languageLines) {
    languagesHtml += `<div style="margin-bottom: 4px;">${line}</div>`;
  }
  
  return languagesHtml;
};

// Helper function to format education and experience sections
const formatSectionContent = (content: string) => {
  if (!content) return '';
  
  const lines = content.split('\n\n').filter(line => line.trim());
  let html = '';
  
  for (const line of lines) {
    html += `<div style="margin-bottom: 12px;">${line.replace(/\n/g, '<br>')}</div>`;
  }
  
  return html;
};

// Common data preparation for templates
export const prepareTemplateData = (data: Record<string, string>, config: Record<string, any> = {}) => {
  const firstName = data.firstName || '';
  const lastName = data.lastName || '';
  const fullName = `${firstName} ${lastName}`;
  const fullNameUpper = fullName.toUpperCase();
  const position = data.position || '';
  const date = new Date().toLocaleDateString('pl-PL');
  
  // Apply custom configurations or use defaults
  const primaryColor = config.primaryColor || '#1e88e5';
  const fontFamily = config.fontFamily || 'Arial, sans-serif';
  const fontSize = config.fontSize || '12px';
  
  return {
    firstName,
    lastName,
    fullName,
    fullNameUpper,
    position,
    date,
    primaryColor,
    fontFamily,
    fontSize
  };
};

// Helper functions for common sections
export const getRecipientSection = (data: Record<string, string>) => {
  return `
    <div style="margin-bottom: 20px;">
      ${data.recipientName ? `<p style="margin: 0 0 3px;">${data.recipientName}</p>` : ''}
      ${data.recipientCompany ? `<p style="margin: 0 0 3px;">${data.recipientCompany}</p>` : ''}
      ${data.recipientAddress ? `<p style="margin: 0 0 3px;">${data.recipientAddress}</p>` : ''}
    </div>
  `;
};

export const getClauseSection = (data: Record<string, string>) => {
  return `
    <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #eee;">
      <p data-clause style="margin: 0; font-size: 10px; color: #666; text-align: justify;">
        ${data.clause || 'Wyrażam zgodę na przetwarzanie moich danych osobowych w celu prowadzenia rekrutacji na aplikowane przeze mnie stanowisko.'}
      </p>
    </div>
  `;
};

// CV Template with blue header
export const blueHeaderCvTemplate = (data: Record<string, string>, config: Record<string, any> = {}) => {
  const {
    fullName,
    position,
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
            ${data.birthDate ? `<p style="margin: 0 0 5px; word-break: break-word;"><span>📅</span> ${data.birthDate}</p>` : ''}
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
        <!-- Summary Section -->
        ${data.summary ? `
          <div style="margin-bottom: 25px;">
            <h2 style="font-size: 16px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 5px; margin-bottom: 10px; color: ${primaryColor};">PODSUMOWANIE ZAWODOWE</h2>
            <p style="text-align: justify;">${data.summary}</p>
          </div>
        ` : ''}
        
        <!-- Experience Section -->
        ${data.experience ? `
          <div style="margin-bottom: 25px;">
            <h2 style="font-size: 16px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 5px; margin-bottom: 10px; color: ${primaryColor};">DOŚWIADCZENIE ZAWODOWE</h2>
            <div style="text-align: justify;">${formatSectionContent(data.experience)}</div>
          </div>
        ` : ''}
        
        <!-- Education Section -->
        ${data.education ? `
          <div style="margin-bottom: 25px;">
            <h2 style="font-size: 16px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 5px; margin-bottom: 10px; color: ${primaryColor};">WYKSZTAŁCENIE</h2>
            <div style="text-align: justify;">${formatSectionContent(data.education)}</div>
          </div>
        ` : ''}
        
        <!-- Skills and Additional Info in two columns -->
        <div style="display: flex; flex-wrap: wrap; margin: 0 -10px;">
          <!-- Skills Column -->
          <div style="flex: 1; min-width: 45%; padding: 0 10px; box-sizing: border-box;">
            ${data.skills ? `
              <div style="margin-bottom: 25px;">
                <h2 style="font-size: 16px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 5px; margin-bottom: 10px; color: ${primaryColor};">UMIEJĘTNOŚCI</h2>
                <div>${data.skills.replace(/\n/g, '<br>')}</div>
              </div>
            ` : ''}
          </div>
          
          <!-- Languages and Hobbies Column -->
          <div style="flex: 1; min-width: 45%; padding: 0 10px; box-sizing: border-box;">
            ${data.languages ? `
              <div style="margin-bottom: 25px;">
                <h2 style="font-size: 16px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 5px; margin-bottom: 10px; color: ${primaryColor};">JĘZYKI OBCE</h2>
                <div>${formatLanguages(data.languages)}</div>
              </div>
            ` : ''}
            
            ${data.hobbies ? `
              <div style="margin-bottom: 25px;">
                <h2 style="font-size: 16px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 5px; margin-bottom: 10px; color: ${primaryColor};">ZAINTERESOWANIA</h2>
                <p>${data.hobbies}</p>
              </div>
            ` : ''}
          </div>
        </div>
        
        <!-- Clause -->
        <div style="margin-top: 40px; padding-top: 20px;">
          <p data-clause style="font-size: 10px; color: #666; text-align: justify;">
            ${data.clause || 'Wyrażam zgodę na przetwarzanie moich danych osobowych dla potrzeb niezbędnych do realizacji procesu rekrutacji zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (RODO).'}
          </p>
        </div>
      </div>
    </div>
  `;
};

// CV Template with teal sidebar (includes progress bars for skills)
export const tealSidebarCvTemplate = (data: Record<string, string>, config: Record<string, any> = {}) => {
  // Prepare data and styles
  const {
    firstName,
    lastName,
    fullNameUpper,
    position,
    primaryColor,
    fontFamily,
    fontSize
  } = prepareTemplateData(data, {
    ...config,
    primaryColor: config.primaryColor || '#1e88e5'
  });
  
  return `
    <div style="width: 100%; max-width: 21cm; margin: 0 auto; padding: 0; font-family: ${fontFamily}; font-size: ${fontSize}; line-height: 1.5; color: #333; position: relative; box-sizing: border-box;">
      <!-- Two-column layout with fixed heights -->
      <div style="display: flex; min-height: 1123px; overflow: hidden; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        <!-- Left Sidebar - must extend to the full height -->
        <div style="width: 35%; background-color: ${primaryColor}; color: white; padding: 25px 16px; box-sizing: border-box; min-height: 1123px; border-radius: 6px 0 0 6px;">
          ${data.photo ? `
            <div style="width: 130px; height: 160px; overflow: hidden; margin: 10px auto 30px; display: block; text-align: center;">
              <img src="${data.photo}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px; box-shadow: 0 3px 6px rgba(0,0,0,0.2);" alt="${fullNameUpper}" />
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
          
          <!-- Skills with progress bars -->
          ${data.skills ? `
            <div style="margin-bottom: 30px;">
              <h2 style="margin: 0 0 20px; text-align: center; font-size: 16px; text-transform: uppercase;">UMIEJĘTNOŚCI</h2>
              <div style="padding: 0 16px;">
                ${createSkillsProgressBars(data.skills, primaryColor)}
              </div>
            </div>
          ` : ''}
          
          <!-- Languages -->
          ${data.languages ? `
            <div style="margin-bottom: 30px;">
              <h2 style="margin: 0 0 20px; text-align: center; font-size: 16px; text-transform: uppercase;">JĘZYKI OBCE</h2>
              <div style="padding: 0 16px; font-size: 13px;">
                ${formatLanguages(data.languages)}
              </div>
            </div>
          ` : ''}
          
          <!-- Hobbies -->
          ${data.hobbies ? `
            <div style="margin-bottom: 30px;">
              <h2 style="margin: 0 0 20px; text-align: center; font-size: 16px; text-transform: uppercase;">ZAINTERESOWANIA</h2>
              <div style="padding: 0 16px; font-size: 13px;">
                ${data.hobbies.replace(/\n/g, '<br>')}
              </div>
            </div>
          ` : ''}
        </div>
        
        <!-- Main Content -->
        <div style="width: 65%; padding: 25px 25px; box-sizing: border-box; background-color: white; position: relative; display: flex; flex-direction: column; min-height: 1123px; border-radius: 0 6px 6px 0;">
          <!-- Header -->
          <div style="margin-bottom: 30px;">
            <h1 style="margin: 0; color: ${primaryColor}; font-size: 26px;">${fullNameUpper}</h1>
            <p style="margin: 5px 0 0; color: #666; text-transform: uppercase;">${position}</p>
          </div>
          
          <!-- Summary -->
          ${data.summary ? `
            <div style="margin-bottom: 25px;">
              <h2 style="font-size: 16px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 5px; margin-bottom: 10px; color: ${primaryColor};">PODSUMOWANIE ZAWODOWE</h2>
              <p style="text-align: justify;">${data.summary}</p>
            </div>
          ` : ''}
          
          <!-- Experience Section -->
          ${data.experience ? `
            <div style="margin-bottom: 25px;">
              <h2 style="font-size: 16px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 5px; margin-bottom: 10px; color: ${primaryColor};">DOŚWIADCZENIE ZAWODOWE</h2>
              <div style="text-align: justify;">${formatSectionContent(data.experience)}</div>
            </div>
          ` : ''}
          
          <!-- Education Section -->
          ${data.education ? `
            <div style="margin-bottom: 25px;">
              <h2 style="font-size: 16px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 5px; margin-bottom: 10px; color: ${primaryColor};">WYKSZTAŁCENIE</h2>
              <div style="text-align: justify;">${formatSectionContent(data.education)}</div>
            </div>
          ` : ''}
          
          <!-- Clause - Bottom positioned -->
          <div style="margin-top: auto; border-top: 1px solid #eee; padding-top: 15px;">
            <p data-clause style="margin: 0; font-size: 10px; color: #666; text-align: justify;">
              ${data.clause || 'Wyrażam zgodę na przetwarzanie moich danych osobowych dla potrzeb niezbędnych do realizacji procesu rekrutacji zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (RODO).'}
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
};

// CV Template with minimalist icons
export const minimalistIconsCvTemplate = (data: Record<string, string>, config: Record<string, any> = {}) => {
  // Prepare data and styles
  const {
    firstName,
    lastName,
    fullNameUpper,
    position,
    primaryColor,
    fontFamily,
    fontSize
  } = prepareTemplateData(data, {
    ...config,
    primaryColor: config.primaryColor || '#c0392b'
  });
  
  return `
    <div style="max-width: 21cm; margin: 0; padding: 0; font-family: ${fontFamily}; font-size: ${fontSize}; line-height: 1.5; color: #333;">
      <div style="padding: 30px 30px 80px 30px; min-height: 1000px; position: relative;">
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
          ${data.birthDate ? `<span style="margin-left: 15px; margin-bottom: 5px; word-break: break-all;"><span style="color: ${primaryColor}; font-size: 16px;">📅</span> ${data.birthDate}</span>` : ''}
          ${data.address ? `<span style="margin-left: 15px; margin-bottom: 5px; word-break: break-all;"><span style="color: ${primaryColor}; font-size: 16px;">📍</span> ${data.address}</span>` : ''}
        </div>
        
        <!-- Summary -->
        ${data.summary ? `
          <div style="margin-bottom: 25px;">
            <h2 style="font-size: 16px; border-bottom: 1px solid ${primaryColor}; padding-bottom: 5px; margin-bottom: 10px; color: ${primaryColor};">PODSUMOWANIE ZAWODOWE</h2>
            <p style="text-align: justify;">${data.summary}</p>
          </div>
        ` : ''}
        
        <!-- Main content in two columns -->
        <div style="display: flex; margin: 0 -15px;">
          <!-- Left column -->
          <div style="flex: 3; padding: 0 15px;">
            <!-- Experience Section -->
            ${data.experience ? `
              <div style="margin-bottom: 25px;">
                <h2 style="font-size: 16px; border-bottom: 1px solid ${primaryColor}; padding-bottom: 5px; margin-bottom: 10px; color: ${primaryColor};">DOŚWIADCZENIE ZAWODOWE</h2>
                <div style="text-align: justify;">${formatSectionContent(data.experience)}</div>
              </div>
            ` : ''}
            
            <!-- Education Section -->
            ${data.education ? `
              <div style="margin-bottom: 25px;">
                <h2 style="font-size: 16px; border-bottom: 1px solid ${primaryColor}; padding-bottom: 5px; margin-bottom: 10px; color: ${primaryColor};">WYKSZTAŁCENIE</h2>
                <div style="text-align: justify;">${formatSectionContent(data.education)}</div>
              </div>
            ` : ''}
          </div>
          
          <!-- Right column -->
          <div style="flex: 2; padding: 0 15px;">
            <!-- Skills Section -->
            ${data.skills ? `
              <div style="margin-bottom: 25px;">
                <h2 style="font-size: 16px; border-bottom: 1px solid ${primaryColor}; padding-bottom: 5px; margin-bottom: 10px; color: ${primaryColor};">UMIEJĘTNOŚCI</h2>
                <div style="text-align: justify;">${data.skills.replace(/\n/g, '<br>')}</div>
              </div>
            ` : ''}
            
            <!-- Languages Section -->
            ${data.languages ? `
              <div style="margin-bottom: 25px;">
                <h2 style="font-size: 16px; border-bottom: 1px solid ${primaryColor}; padding-bottom: 5px; margin-bottom: 10px; color: ${primaryColor};">JĘZYKI OBCE</h2>
                <div style="text-align: justify;">${formatLanguages(data.languages)}</div>
              </div>
            ` : ''}
            
            <!-- Hobbies Section -->
            ${data.hobbies ? `
              <div style="margin-bottom: 25px;">
                <h2 style="font-size: 16px; border-bottom: 1px solid ${primaryColor}; padding-bottom: 5px; margin-bottom: 10px; color: ${primaryColor};">ZAINTERESOWANIA</h2>
                <div style="text-align: justify;">${data.hobbies.replace(/\n/g, '<br>')}</div>
              </div>
            ` : ''}
          </div>
        </div>
        
        <!-- Clause -->
        <div style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 15px;">
          <p data-clause style="margin: 0; font-size: 10px; color: #666; text-align: justify;">
            ${data.clause || 'Wyrażam zgodę na przetwarzanie moich danych osobowych dla potrzeb niezbędnych do realizacji procesu rekrutacji zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (RODO).'}
          </p>
        </div>
      </div>
    </div>
  `;
};

// CV Template with white background and photo
export const whiteWithPhotoCvTemplate = (data: Record<string, string>, config: Record<string, any> = {}) => {
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
      <div style="padding: 30px 30px 80px 30px; min-height: 1000px; position: relative;">
        <!-- Header section -->
        <div style="display: flex; justify-content: space-between; padding-bottom: 20px;">
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
        
        <!-- Contact info section -->
        <div style="display: flex; flex-wrap: wrap; margin-bottom: 20px; border-top: 1px solid #eee; border-bottom: 1px solid #eee; padding: 10px 0;">
          ${data.email ? `<div style="flex: 1; min-width: 200px; margin-right: 20px; margin-bottom: 5px;"><strong>Email:</strong> ${data.email}</div>` : ''}
          ${data.phone ? `<div style="flex: 1; min-width: 200px; margin-right: 20px; margin-bottom: 5px;"><strong>Telefon:</strong> ${data.phone}</div>` : ''}
          ${data.birthDate ? `<div style="flex: 1; min-width: 200px; margin-right: 20px; margin-bottom: 5px;"><strong>Data urodzenia:</strong> ${data.birthDate}</div>` : ''}
          ${data.address ? `<div style="flex: 1; min-width: 200px; margin-right: 20px; margin-bottom: 5px;"><strong>Adres:</strong> ${data.address}</div>` : ''}
        </div>
        
        <!-- Summary -->
        ${data.summary ? `
          <div style="margin-bottom: 25px;">
            <h2 style="font-size: 16px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 5px; margin-bottom: 10px; color: ${primaryColor};">PODSUMOWANIE ZAWODOWE</h2>
            <p style="text-align: justify;">${data.summary}</p>
          </div>
        ` : ''}
        
        <!-- Experience Section -->
        ${data.experience ? `
          <div style="margin-bottom: 25px;">
            <h2 style="font-size: 16px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 5px; margin-bottom: 10px; color: ${primaryColor};">DOŚWIADCZENIE ZAWODOWE</h2>
            <div style="text-align: justify;">${formatSectionContent(data.experience)}</div>
          </div>
        ` : ''}
        
        <!-- Education Section -->
        ${data.education ? `
          <div style="margin-bottom: 25px;">
            <h2 style="font-size: 16px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 5px; margin-bottom: 10px; color: ${primaryColor};">WYKSZTAŁCENIE</h2>
            <div style="text-align: justify;">${formatSectionContent(data.education)}</div>
          </div>
        ` : ''}
        
        <!-- Skills and Additional Info in two columns -->
        <div style="display: flex; flex-wrap: wrap; margin: 0 -10px;">
          <!-- Skills Column -->
          <div style="flex: 1; min-width: 45%; padding: 0 10px; box-sizing: border-box;">
            ${data.skills ? `
              <div style="margin-bottom: 25px;">
                <h2 style="font-size: 16px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 5px; margin-bottom: 10px; color: ${primaryColor};">UMIEJĘTNOŚCI</h2>
                <div>${data.skills.replace(/\n/g, '<br>')}</div>
              </div>
            ` : ''}
          </div>
          
          <!-- Languages and Hobbies Column -->
          <div style="flex: 1; min-width: 45%; padding: 0 10px; box-sizing: border-box;">
            ${data.languages ? `
              <div style="margin-bottom: 25px;">
                <h2 style="font-size: 16px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 5px; margin-bottom: 10px; color: ${primaryColor};">JĘZYKI OBCE</h2>
                <div>${formatLanguages(data.languages)}</div>
              </div>
            ` : ''}
            
            ${data.hobbies ? `
              <div style="margin-bottom: 25px;">
                <h2 style="font-size: 16px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 5px; margin-bottom: 10px; color: ${primaryColor};">ZAINTERESOWANIA</h2>
                <p>${data.hobbies}</p>
              </div>
            ` : ''}
          </div>
        </div>
        
        <!--
