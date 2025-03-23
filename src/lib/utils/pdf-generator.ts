
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePdfFromHtml = async (elementRef: HTMLElement, fileName: string = 'document.pdf'): Promise<void> => {
  if (!elementRef) {
    console.error('Element reference is null');
    return;
  }

  try {
    // Get the computed style of the element to determine its width and content
    const computedStyle = window.getComputedStyle(elementRef);
    const elementWidth = parseInt(computedStyle.width);
    
    // Create a clone of the element for capturing to avoid modifying the displayed element
    const clone = elementRef.cloneNode(true) as HTMLElement;
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    clone.style.top = '0';
    clone.style.width = `${elementWidth}px`;
    clone.style.height = 'auto';
    clone.style.overflow = 'visible';
    
    // Add to document to calculate proper layout
    document.body.appendChild(clone);
    
    // Create canvas with higher resolution
    const canvas = await html2canvas(clone, {
      scale: 2, // Higher scale for better quality
      useCORS: true, // Allow loading cross-origin images
      logging: false,
      windowWidth: elementWidth,
      onclone: (doc) => {
        // Further processing can be done here if needed
        const clonedElement = doc.body.querySelector('#cloned-element') as HTMLElement;
        if (clonedElement) {
          clonedElement.style.height = 'auto';
        }
      }
    });
    
    // Remove clone from document
    document.body.removeChild(clone);
    
    // A4 dimensions in mm
    const a4Width = 210; // A4 width in mm
    const a4Height = 297; // A4 height in mm
    
    // Calculate PDF dimensions
    const imgWidth = a4Width;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Create PDF instance - portrait, mm, A4
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    let position = 0;
    let remainingHeight = imgHeight;
    let pageCount = 0;
    
    // Add pages as needed to fit content
    while (remainingHeight > 0) {
      // Add a new page if this isn't the first page
      if (pageCount > 0) {
        pdf.addPage();
      }
      
      // Calculate how much of the image to render on this page
      const pageHeight = Math.min(a4Height, remainingHeight);
      
      // Calculate source coordinates for slicing the canvas
      // These are in canvas pixels
      const sourceY = pageCount * (canvas.height * a4Height / imgHeight);
      const sourceHeight = canvas.height * pageHeight / imgHeight;
      
      // For the first page, we use standard positioning
      // For subsequent pages, we position at the top of the page
      
      // Fix: The addImage method in jsPDF v3 accepts fewer parameters
      // Create a separate canvas for each page slice
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      tempCanvas.width = canvas.width;
      tempCanvas.height = sourceHeight;
      
      if (tempCtx) {
        tempCtx.drawImage(
          canvas, 
          0, // sx
          sourceY, // sy
          canvas.width, // sWidth
          sourceHeight, // sHeight
          0, // dx
          0, // dy
          tempCanvas.width, // dWidth
          tempCanvas.height // dHeight
        );
      }
      
      // Add the sliced image to the PDF
      pdf.addImage(
        tempCanvas.toDataURL('image/jpeg', 0.95), // Use data URL instead of canvas
        'JPEG', 
        0, // x position - no margin
        0, // y position - no margin
        a4Width, // width
        pageHeight // height for this page slice
      );
      
      remainingHeight -= a4Height;
      pageCount++;
    }
    
    // Save the PDF
    pdf.save(fileName);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};
