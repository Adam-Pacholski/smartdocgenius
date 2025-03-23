
// Creative CV template
export const creativeCVTemplate = (data: Record<string, string>, config?: Record<string, any>): string => {
  const { primaryColor = '#3498db', fontFamily = 'Arial, sans-serif', fontSize = '12px' } = config || {};
  
  // Lighter shade of primary color for backgrounds
  const lightColor = `${primaryColor}22`; // 22 is hex for ~13% opacity

  return `
    <div style="font-family: ${fontFamily}; font-size: ${fontSize}; color: #333; line-height: 1.6; max-width: 210mm; margin: 0 auto; background-color: #fff; position: relative; overflow: hidden;">
      <!-- Decorative element -->
      <div style="position: absolute; top: -100px; right: -100px; width: 300px; height: 300px; border-radius: 50%; background-color: ${lightColor}; z-index: 0;"></div>
      <div style="position: absolute; bottom: -150px; left: -150px; width: 400px; height: 400px; border-radius: 50%; background-color: ${lightColor}; z-index: 0;"></div>
      
      <!-- Content wrapper with relative positioning -->
      <div style="position: relative; z-index: 1;">
        <!-- Header with asymmetric design -->
        <header style="padding: 40px 30px 30px; display: flex; align-items: flex-start; flex-wrap: wrap;">
          <!-- Photo column -->
          ${data.photo ? `
            <div style="flex: 0 0 150px; margin-right: 30px; margin-bottom: 20px;">
              <div style="width: 150px; height: 150px; border-radius: 15px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                <img src="${data.photo}" alt="Profile photo" style="width: 100%; height: 100%; object-fit: cover;">
              </div>
            </div>
          ` : ''}
          
          <!-- Name and title column -->
          <div style="flex: 1; min-width: 200px;">
            <h1 style="margin: 0; font-size: 36px; font-weight: 700; color: #333;">
              <span style="color: ${primaryColor};">${data.firstName || ''}</span> ${data.lastName || ''}
            </h1>
            <p style="margin: 5px 0 15px; font-size: 20px; color: #555; font-weight: 300;">${data.position || ''}</p>
            
            <!-- Contact info with icons (represented by emoji) -->
            <div style="display: flex; flex-wrap: wrap; font-size: 14px; margin-top: 20px;">
              ${data.email ? `<div style="margin-right: 20px; margin-bottom: 10px;">✉️ ${data.email}</div>` : ''}
              ${data.phone ? `<div style="margin-right: 20px; margin-bottom: 10px;">📱 ${data.phone}</div>` : ''}
              ${data.address ? `<div style="margin-right: 20px; margin-bottom: 10px;">📍 ${data.address}</div>` : ''}
            </div>
          </div>
        </header>
        
        <!-- Main content with creative sections -->
        <main style="padding: 0 30px 30px;">
          <!-- Summary with distinctive styling -->
          ${data.summary ? `
            <section style="margin-bottom: 35px; background-color: ${lightColor}; padding: 20px; border-radius: 10px;">
              <h2 style="color: ${primaryColor}; font-size: 22px; margin-top: 0; margin-bottom: 15px; font-weight: 600;">O mnie</h2>
              <p style="margin: 0;">${data.summary.replace(/\n/g, '<br>')}</p>
            </section>
          ` : ''}
          
          <!-- Main columns container -->
          <div style="display: flex; flex-wrap: wrap; margin: 0 -15px;">
            <!-- Left column -->
            <div style="flex: 1 1 60%; padding: 0 15px; min-width: 300px;">
              <!-- Experience section -->
              ${data.experience ? `
                <section style="margin-bottom: 35px;">
                  <h2 style="color: ${primaryColor}; font-size: 22px; margin-bottom: 15px; font-weight: 600; padding-bottom: 5px; border-bottom: 2px dashed ${primaryColor};">
                    Doświadczenie zawodowe
                  </h2>
                  <div>${data.experience.replace(/\n/g, '<br>')}</div>
                </section>
              ` : ''}
              
              <!-- Education section -->
              ${data.education ? `
                <section style="margin-bottom: 35px;">
                  <h2 style="color: ${primaryColor}; font-size: 22px; margin-bottom: 15px; font-weight: 600; padding-bottom: 5px; border-bottom: 2px dashed ${primaryColor};">
                    Wykształcenie
                  </h2>
                  <div>${data.education.replace(/\n/g, '<br>')}</div>
                </section>
              ` : ''}
            </div>
            
            <!-- Right column -->
            <div style="flex: 1 1 40%; padding: 0 15px; min-width: 250px;">
              <!-- Skills in a colorful box -->
              ${data.skills ? `
                <section style="margin-bottom: 35px; background-color: #fff; border-radius: 10px; padding: 20px; box-shadow: 0 5px 15px rgba(0,0,0,0.05);">
                  <h2 style="color: ${primaryColor}; font-size: 22px; margin-top: 0; margin-bottom: 15px; font-weight: 600;">
                    Umiejętności
                  </h2>
                  <div>${data.skills.replace(/\n/g, '<br>')}</div>
                </section>
              ` : ''}
              
              <!-- Languages -->
              ${data.languages ? `
                <section style="margin-bottom: 35px;">
                  <h2 style="color: ${primaryColor}; font-size: 22px; margin-bottom: 15px; font-weight: 600; padding-bottom: 5px; border-bottom: 2px dashed ${primaryColor};">
                    Języki obce
                  </h2>
                  <div>${data.languages.replace(/\n/g, '<br>')}</div>
                </section>
              ` : ''}
              
              <!-- Interests section -->
              ${data.interests ? `
                <section style="margin-bottom: 35px;">
                  <h2 style="color: ${primaryColor}; font-size: 22px; margin-bottom: 15px; font-weight: 600; padding-bottom: 5px; border-bottom: 2px dashed ${primaryColor};">
                    Zainteresowania
                  </h2>
                  <div>${data.interests.replace(/\n/g, '<br>')}</div>
                </section>
              ` : ''}
            </div>
          </div>
        </main>
      </div>
      
      <!-- Footer with clause -->
      <footer style="background-color: #f8f8f8; padding: 20px 30px; font-size: 10px; color: #777; position: relative; z-index: 1;">
        ${data.clause || ''}
      </footer>
    </div>
  `;
};
