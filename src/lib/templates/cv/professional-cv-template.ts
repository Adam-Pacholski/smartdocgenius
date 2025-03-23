
// Professional CV template
export const professionalCVTemplate = (data: Record<string, string>, config?: Record<string, any>): string => {
  const { primaryColor = '#3498db', fontFamily = 'Arial, sans-serif', fontSize = '12px' } = config || {};

  return `
    <div style="font-family: ${fontFamily}; font-size: ${fontSize}; color: #333; line-height: 1.6; max-width: 210mm; margin: 0 auto; background-color: #fff; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
      <!-- Header with name and title -->
      <header style="padding: 40px 40px 30px; text-align: center; border-bottom: 1px solid #eee;">
        <h1 style="margin: 0; color: #333; font-size: 32px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">
          ${data.firstName || ''} ${data.lastName || ''}
        </h1>
        <p style="margin: 8px 0 0; font-size: 18px; color: ${primaryColor}; font-weight: 400; letter-spacing: 1px;">
          ${data.position || ''}
        </p>
      </header>
      
      <!-- Contact and photo row -->
      <div style="display: flex; flex-wrap: wrap; align-items: center; padding: 20px 40px; background-color: #f9f9f9; border-bottom: 1px solid #eee;">
        <!-- Contact info -->
        <div style="flex: 1; min-width: 250px; font-size: 14px;">
          <div style="display: flex; flex-wrap: wrap;">
            ${data.email ? `
              <div style="margin-right: 20px; margin-bottom: 10px;">
                <strong style="color: ${primaryColor};">Email:</strong> ${data.email}
              </div>
            ` : ''}
            ${data.phone ? `
              <div style="margin-right: 20px; margin-bottom: 10px;">
                <strong style="color: ${primaryColor};">Telefon:</strong> ${data.phone}
              </div>
            ` : ''}
            ${data.address ? `
              <div style="margin-bottom: 10px;">
                <strong style="color: ${primaryColor};">Adres:</strong> ${data.address}
              </div>
            ` : ''}
          </div>
        </div>
        
        <!-- Photo if available -->
        ${data.photo ? `
          <div style="flex: 0 0 auto; margin-left: 20px;">
            <div style="width: 100px; height: 100px; border: 2px solid ${primaryColor}; border-radius: 5px; overflow: hidden;">
              <img src="${data.photo}" alt="Profile photo" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
          </div>
        ` : ''}
      </div>
      
      <!-- Main content -->
      <main style="padding: 30px 40px;">
        <!-- Professional summary -->
        ${data.summary ? `
          <section style="margin-bottom: 30px;">
            <h2 style="color: #333; font-size: 20px; margin: 0 0 15px; padding-bottom: 10px; border-bottom: 2px solid ${primaryColor}; text-transform: uppercase; font-weight: 600; letter-spacing: 1px;">
              Podsumowanie zawodowe
            </h2>
            <p style="margin: 0; text-align: justify;">${data.summary.replace(/\n/g, '<br>')}</p>
          </section>
        ` : ''}
        
        <!-- Two column layout for main content -->
        <div style="display: flex; flex-wrap: wrap; margin: 0 -20px;">
          <!-- Left column -->
          <div style="flex: 1 1 60%; padding: 0 20px; min-width: 300px;">
            <!-- Experience section -->
            ${data.experience ? `
              <section style="margin-bottom: 30px;">
                <h2 style="color: #333; font-size: 20px; margin: 0 0 15px; padding-bottom: 10px; border-bottom: 2px solid ${primaryColor}; text-transform: uppercase; font-weight: 600; letter-spacing: 1px;">
                  Doświadczenie zawodowe
                </h2>
                <div style="text-align: justify;">${data.experience.replace(/\n/g, '<br>')}</div>
              </section>
            ` : ''}
            
            <!-- Education section -->
            ${data.education ? `
              <section style="margin-bottom: 30px;">
                <h2 style="color: #333; font-size: 20px; margin: 0 0 15px; padding-bottom: 10px; border-bottom: 2px solid ${primaryColor}; text-transform: uppercase; font-weight: 600; letter-spacing: 1px;">
                  Wykształcenie
                </h2>
                <div style="text-align: justify;">${data.education.replace(/\n/g, '<br>')}</div>
              </section>
            ` : ''}
          </div>
          
          <!-- Right column -->
          <div style="flex: 1 1 40%; padding: 0 20px; min-width: 250px;">
            <!-- Skills section -->
            ${data.skills ? `
              <section style="margin-bottom: 30px;">
                <h2 style="color: #333; font-size: 20px; margin: 0 0 15px; padding-bottom: 10px; border-bottom: 2px solid ${primaryColor}; text-transform: uppercase; font-weight: 600; letter-spacing: 1px;">
                  Umiejętności
                </h2>
                <div>${data.skills.replace(/\n/g, '<br>')}</div>
              </section>
            ` : ''}
            
            <!-- Languages section -->
            ${data.languages ? `
              <section style="margin-bottom: 30px;">
                <h2 style="color: #333; font-size: 20px; margin: 0 0 15px; padding-bottom: 10px; border-bottom: 2px solid ${primaryColor}; text-transform: uppercase; font-weight: 600; letter-spacing: 1px;">
                  Języki obce
                </h2>
                <div>${data.languages.replace(/\n/g, '<br>')}</div>
              </section>
            ` : ''}
            
            <!-- Interests section -->
            ${data.interests ? `
              <section style="margin-bottom: 30px;">
                <h2 style="color: #333; font-size: 20px; margin: 0 0 15px; padding-bottom: 10px; border-bottom: 2px solid ${primaryColor}; text-transform: uppercase; font-weight: 600; letter-spacing: 1px;">
                  Zainteresowania
                </h2>
                <div>${data.interests.replace(/\n/g, '<br>')}</div>
              </section>
            ` : ''}
          </div>
        </div>
      </main>
      
      <!-- Footer with clause -->
      <footer style="margin-top: 30px; padding: 20px 40px; font-size: 10px; color: #777; border-top: 1px solid #eee; text-align: justify;">
        ${data.clause || ''}
      </footer>
    </div>
  `;
};
