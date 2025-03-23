
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
    throw new Error("Element reference is null");
  }

  try {
    console.log("Starting PDF generation");
    
    // Create a new jsPDF instance
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    // Create a deep clone of the element to avoid modifying the original
    const clone = elementRef.cloneNode(true) as HTMLElement;
    
    // Create a temporary container
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '0';
    tempContainer.style.width = '794px'; // A4 width in pixels at 96 DPI
    tempContainer.style.height = 'auto';
    tempContainer.appendChild(clone);
    document.body.appendChild(tempContainer);
    
    console.log("Creating canvas for document");
    
    try {
      // Generate canvas for main content
      const mainCanvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: true,
        backgroundColor: '#ffffff'
      });
      
      // Add main content to PDF
      if (mainCanvas.width > 0 && mainCanvas.height > 0) {
        pdf.addImage({
          imageData: mainCanvas,
          format: 'JPEG',
          x: 0,
          y: 0,
          width: pdfWidth,
          height: pdfHeight,
          compression: 'MEDIUM'
        });
      } else {
        console.error('Main canvas has zero dimensions:', mainCanvas.width, mainCanvas.height);
        throw new Error('Main canvas has no dimensions');
      }
      
      // Save PDF
      pdf.save(fileName);
      console.log("PDF generation complete");
    } catch (canvasError) {
      console.error('Error creating canvas:', canvasError);
      throw canvasError;
    } finally {
      // Clean up
      document.body.removeChild(tempContainer);
    }
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};
