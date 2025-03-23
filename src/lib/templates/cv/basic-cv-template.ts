
// Basic CV template
export const basicCVTemplate = (data: Record<string, string>, config?: Record<string, any>): string => {
  const { primaryColor = '#3498db', fontFamily = 'Arial, sans-serif', fontSize = '12px' } = config || {};

  return `
    <div style="font-family: ${fontFamily}; font-size: ${fontSize}; color: #333; line-height: 1.6; max-width: 210mm; margin: 0 auto;">
      <div style="display: flex; flex-direction: column; width: 100%;">
        <!-- Header -->
        <header style="text-align: center; margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #eee;">
          <h1 style="margin: 0; color: ${primaryColor}; font-size: 28px; font-weight: bold;">
            ${data.firstName || ''} ${data.lastName || ''}
          </h1>
          <p style="margin: 5px 0; font-size: 18px;">${data.position || ''}</p>
          
          <!-- Contact Info -->
          <div style="margin-top: 10px; font-size: 14px;">
            ${data.email ? `<div>Email: ${data.email}</div>` : ''}
            ${data.phone ? `<div>Telefon: ${data.phone}</div>` : ''}
            ${data.address ? `<div>Adres: ${data.address}</div>` : ''}
          </div>
        </header>
        
        <!-- Main content -->
        <main>
          <!-- Summary if available -->
          ${data.summary ? `
          <section style="margin-bottom: 20px;">
            <h2 style="color: ${primaryColor}; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 10px;">Podsumowanie zawodowe</h2>
            <p>${data.summary.replace(/\n/g, '<br>')}</p>
          </section>
          ` : ''}
          
          <!-- Experience section -->
          ${data.experience ? `
          <section style="margin-bottom: 20px;">
            <h2 style="color: ${primaryColor}; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 10px;">Doświadczenie zawodowe</h2>
            <div>${data.experience.replace(/\n/g, '<br>')}</div>
          </section>
          ` : ''}
          
          <!-- Education section -->
          ${data.education ? `
          <section style="margin-bottom: 20px;">
            <h2 style="color: ${primaryColor}; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 10px;">Wykształcenie</h2>
            <div>${data.education.replace(/\n/g, '<br>')}</div>
          </section>
          ` : ''}
          
          <!-- Skills section -->
          ${data.skills ? `
          <section style="margin-bottom: 20px;">
            <h2 style="color: ${primaryColor}; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 10px;">Umiejętności</h2>
            <div>${data.skills.replace(/\n/g, '<br>')}</div>
          </section>
          ` : ''}
          
          <!-- Languages section -->
          ${data.languages ? `
          <section style="margin-bottom: 20px;">
            <h2 style="color: ${primaryColor}; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 10px;">Języki obce</h2>
            <div>${data.languages.replace(/\n/g, '<br>')}</div>
          </section>
          ` : ''}
          
          <!-- Interests section -->
          ${data.interests ? `
          <section style="margin-bottom: 20px;">
            <h2 style="color: ${primaryColor}; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 10px;">Zainteresowania</h2>
            <div>${data.interests.replace(/\n/g, '<br>')}</div>
          </section>
          ` : ''}
        </main>
        
        <!-- Footer with clause -->
        <footer style="margin-top: 30px; font-size: 10px; color: #777; text-align: justify;">
          ${data.clause || ''}
        </footer>
      </div>
    </div>
  `;
};
