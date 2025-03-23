
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { toast } from '@/components/ui/use-toast';

// Function to check if document needs multiple pages
export const estimatePageCount = (elementRef: HTMLElement): number => {
  if (!elementRef) return 1;
  
  const computedStyle = window.getComputedStyle(elementRef);
  const elementHeight = parseInt(computedStyle.height);
  
  // A4 height in pixels at 96 DPI is approximately 1123px
  // We use 1000px as a conservative estimate accounting for margins
  const pageHeightInPixels = 1000;
  
  return Math.ceil(elementHeight / pageHeightInPixels);
};

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
    
    // Extract the clause element to add it on the last page only
    const clauseElement = clone.querySelector('[data-clause]') as HTMLElement;
    let clauseHeight = 0;
    if (clauseElement) {
      const clauseStyle = window.getComputedStyle(clauseElement);
      clauseHeight = parseInt(clauseStyle.height);
      clauseElement.style.display = 'none'; // Hide from main content
    }
    
    // Create canvas with higher resolution
    const canvas = await html2canvas(clone, {
      scale: 2, // Higher scale for better quality
      useCORS: true, // Allow loading cross-origin images
      logging: false,
      windowWidth: elementWidth,
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
    
    // Determine total pages needed
    const pageBottomMargin = 20; // 20mm margin at bottom of page
    const effectivePageHeight = a4Height - pageBottomMargin;
    const totalPages = Math.ceil(imgHeight / effectivePageHeight);
    
    for (let pageNum = 0; pageNum < totalPages; pageNum++) {
      // Add a new page if this isn't the first page
      if (pageNum > 0) {
        pdf.addPage();
      }
      
      // Calculate source and destination dimensions
      const sourceY = pageNum * (canvas.height * effectivePageHeight / imgHeight);
      const sourceHeight = Math.min(
        canvas.height - sourceY,
        canvas.height * effectivePageHeight / imgHeight
      );
      
      // Create a temporary canvas for the current page slice
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = sourceHeight;
      const tempCtx = tempCanvas.getContext('2d');
      
      if (tempCtx) {
        // Draw the slice of the original canvas
        tempCtx.drawImage(
          canvas,
          0, sourceY, canvas.width, sourceHeight,
          0, 0, tempCanvas.width, tempCanvas.height
        );
        
        // Add the image to the PDF
        pdf.addImage(
          tempCanvas.toDataURL('image/jpeg', 0.95),
          'JPEG',
          0, 0, 
          imgWidth, 
          (sourceHeight * imgWidth) / canvas.width
        );
      }
    }
    
    // Add the clause to the last page if it exists
    if (clauseElement) {
      // Reset the display property to make it visible again
      clauseElement.style.display = 'block';
      
      // Create a separate canvas just for the clause
      const clauseCanvas = await html2canvas(clauseElement, {
        scale: 2,
        useCORS: true,
        logging: false
      });
      
      // Add the clause to the bottom of the last page
      const clauseWidth = a4Width;
      const clauseImgHeight = (clauseCanvas.height * clauseWidth) / clauseCanvas.width;
      
      pdf.setPage(totalPages); // Go to last page
      pdf.addImage(
        clauseCanvas.toDataURL('image/jpeg', 0.95),
        'JPEG',
        0, // x position
        a4Height - clauseImgHeight - 10, // y position (10mm from bottom)
        clauseWidth,
        clauseImgHeight
      );
    }
    
    // Save the PDF
    pdf.save(fileName);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};
