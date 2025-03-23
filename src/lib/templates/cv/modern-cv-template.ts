
// Modern CV template
export const modernCVTemplate = (data: Record<string, string>, config?: Record<string, any>): string => {
  const { primaryColor = '#3498db', fontFamily = 'Arial, sans-serif', fontSize = '12px' } = config || {};

  return `
    <div style="font-family: ${fontFamily}; font-size: ${fontSize}; color: #333; line-height: 1.6; max-width: 210mm; margin: 0 auto; background-color: #fff;">
      <!-- Header with colored background -->
      <header style="background-color: ${primaryColor}; color: white; padding: 30px; display: flex; align-items: center; justify-content: space-between;">
        <div>
          <h1 style="margin: 0; font-size: 32px; font-weight: 300;">
            ${data.firstName || ''} ${data.lastName || ''}
          </h1>
          <p style="margin: 5px 0; font-size: 18px; opacity: 0.9;">${data.position || ''}</p>
        </div>
        ${data.photo ? `
          <div style="width: 120px; height: 120px; border-radius: 50%; overflow: hidden; border: 3px solid white;">
            <img src="${data.photo}" alt="Profile photo" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
        ` : ''}
      </header>
      
      <!-- Contact info bar -->
      <div style="background-color: #f5f5f5; padding: 10px 30px; display: flex; flex-wrap: wrap; justify-content: space-between; font-size: 14px;">
        ${data.email ? `<div style="margin: 5px 0;"><strong>Email:</strong> ${data.email}</div>` : ''}
        ${data.phone ? `<div style="margin: 5px 0;"><strong>Telefon:</strong> ${data.phone}</div>` : ''}
        ${data.address ? `<div style="margin: 5px 0;"><strong>Adres:</strong> ${data.address}</div>` : ''}
      </div>
      
      <!-- Main content with padding -->
      <main style="padding: 20px 30px;">
        <!-- Summary section -->
        ${data.summary ? `
        <section style="margin-bottom: 25px;">
          <h2 style="color: ${primaryColor}; font-size: 22px; font-weight: 400; margin-bottom: 15px; position: relative; padding-bottom: 10px;">
            Podsumowanie zawodowe
            <span style="position: absolute; bottom: 0; left: 0; width: 50px; height: 3px; background-color: ${primaryColor};"></span>
          </h2>
          <p style="margin-top: 0;">${data.summary.replace(/\n/g, '<br>')}</p>
        </section>
        ` : ''}
        
        <!-- Two column layout for the rest -->
        <div style="display: flex; flex-wrap: wrap; margin: 0 -15px;">
          <!-- Left column -->
          <div style="flex: 1 1 60%; padding: 0 15px; min-width: 300px;">
            <!-- Experience section -->
            ${data.experience ? `
            <section style="margin-bottom: 25px;">
              <h2 style="color: ${primaryColor}; font-size: 22px; font-weight: 400; margin-bottom: 15px; position: relative; padding-bottom: 10px;">
                Doświadczenie zawodowe
                <span style="position: absolute; bottom: 0; left: 0; width: 50px; height: 3px; background-color: ${primaryColor};"></span>
              </h2>
              <div>${data.experience.replace(/\n/g, '<br>')}</div>
            </section>
            ` : ''}
            
            <!-- Education section -->
            ${data.education ? `
            <section style="margin-bottom: 25px;">
              <h2 style="color: ${primaryColor}; font-size: 22px; font-weight: 400; margin-bottom: 15px; position: relative; padding-bottom: 10px;">
                Wykształcenie
                <span style="position: absolute; bottom: 0; left: 0; width: 50px; height: 3px; background-color: ${primaryColor};"></span>
              </h2>
              <div>${data.education.replace(/\n/g, '<br>')}</div>
            </section>
            ` : ''}
          </div>
          
          <!-- Right column -->
          <div style="flex: 1 1 40%; padding: 0 15px; min-width: 250px;">
            <!-- Skills section -->
            ${data.skills ? `
            <section style="margin-bottom: 25px;">
              <h2 style="color: ${primaryColor}; font-size: 22px; font-weight: 400; margin-bottom: 15px; position: relative; padding-bottom: 10px;">
                Umiejętności
                <span style="position: absolute; bottom: 0; left: 0; width: 50px; height: 3px; background-color: ${primaryColor};"></span>
              </h2>
              <div>${data.skills.replace(/\n/g, '<br>')}</div>
            </section>
            ` : ''}
            
            <!-- Languages section -->
            ${data.languages ? `
            <section style="margin-bottom: 25px;">
              <h2 style="color: ${primaryColor}; font-size: 22px; font-weight: 400; margin-bottom: 15px; position: relative; padding-bottom: 10px;">
                Języki obce
                <span style="position: absolute; bottom: 0; left: 0; width: 50px; height: 3px; background-color: ${primaryColor};"></span>
              </h2>
              <div>${data.languages.replace(/\n/g, '<br>')}</div>
            </section>
            ` : ''}
            
            <!-- Interests section -->
            ${data.interests ? `
            <section style="margin-bottom: 25px;">
              <h2 style="color: ${primaryColor}; font-size: 22px; font-weight: 400; margin-bottom: 15px; position: relative; padding-bottom: 10px;">
                Zainteresowania
                <span style="position: absolute; bottom: 0; left: 0; width: 50px; height: 3px; background-color: ${primaryColor};"></span>
              </h2>
              <div>${data.interests.replace(/\n/g, '<br>')}</div>
            </section>
            ` : ''}
          </div>
        </div>
      </main>
      
      <!-- Footer with clause -->
      <footer style="margin-top: 30px; padding: 20px 30px; font-size: 10px; color: #777; border-top: 1px solid #eee;">
        ${data.clause || ''}
      </footer>
    </div>
  `;
};
