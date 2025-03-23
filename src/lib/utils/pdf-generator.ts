
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePdfFromHtml = async (elementRef: HTMLElement, fileName: string = 'document.pdf'): Promise<void> => {
  if (!elementRef) {
    console.error('Element reference is null');
    return;
  }

  try {
    // Create a canvas from the HTML element
    const canvas = await html2canvas(elementRef, {
      scale: 2, // Higher scale for better quality
      useCORS: true, // Allow loading cross-origin images
      logging: false,
    });

    // Calculate PDF dimensions (A4 format)
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Create PDF instance
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Handle multi-page content
    let heightLeft = imgHeight;
    let position = 0;
    
    // Add first page
    pdf.addImage(
      canvas.toDataURL('image/jpeg', 1.0), 
      'JPEG', 
      0, 
      position, 
      imgWidth, 
      imgHeight
    );
    
    heightLeft -= pageHeight;
    
    // Add additional pages if content overflows
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(
        canvas.toDataURL('image/jpeg', 1.0),
        'JPEG',
        0,
        position,
        imgWidth,
        imgHeight
      );
      heightLeft -= pageHeight;
    }
    
    // Save PDF
    pdf.save(fileName);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};
