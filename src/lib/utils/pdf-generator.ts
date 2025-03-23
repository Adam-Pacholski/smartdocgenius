
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
    
    // Create a new div to hold the content
    const container = document.createElement('div');
    container.innerHTML = elementRef.innerHTML;
    container.style.position = 'fixed';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.style.width = '794px'; // A4 width in pixels at 96 DPI
    container.style.height = 'auto';
    
    // Append to document body
    document.body.appendChild(container);
    
    // Find the clause element
    const clauseElement = container.querySelector('[data-clause]') as HTMLElement;
    let clauseHtml = '';
    
    if (clauseElement) {
      clauseHtml = clauseElement.outerHTML;
      clauseElement.style.display = 'none'; // Hide clause for main content
    }
    
    console.log("Creating canvas for document");
    
    // Create canvas for the document
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: true,
      backgroundColor: '#ffffff'
    });
    
    document.body.removeChild(container);
    
    // Initialize PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Get PDF dimensions
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    // Calculate scaling
    const ratio = canvas.width / canvas.height;
    const width = pdfWidth;
    const height = width / ratio;
    
    // If content fills multiple pages
    const pageCount = Math.ceil(height / pdfHeight);
    
    console.log(`Document will use ${pageCount} pages`);
    
    // Add clause to a separate div for rendering
    if (clauseHtml && pageCount > 0) {
      const clauseContainer = document.createElement('div');
      clauseContainer.innerHTML = clauseHtml;
      clauseContainer.style.position = 'fixed';
      clauseContainer.style.left = '-9999px';
      clauseContainer.style.padding = '0 30px'; // Add padding to match the template
      document.body.appendChild(clauseContainer);
      
      const clauseCanvas = await html2canvas(clauseContainer, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });
      
      document.body.removeChild(clauseContainer);
      
      // Add content page by page
      for (let i = 0; i < pageCount; i++) {
        if (i > 0) {
          pdf.addPage();
        }
        
        // Source height and position
        const sourceY = i * canvas.height / pageCount;
        const sourceHeight = canvas.height / pageCount;
        
        // Add image slice to PDF
        // Fix: Use correct syntax for addImage with properly defined sourceX, sourceY, etc.
        pdf.addImage({
          imageData: canvas,
          format: 'JPEG',
          x: 0,
          y: 0,
          width: pdfWidth,
          height: pdfHeight,
          alias: `p${i}`,
          compression: 'FAST',
          rotation: 0
        });
        
        // Add clause to last page
        if (i === pageCount - 1) {
          const clauseRatio = clauseCanvas.width / clauseCanvas.height;
          const clauseWidth = pdfWidth;
          const clauseHeight = clauseWidth / clauseRatio;
          
          // Position at bottom of page with proper margin
          pdf.addImage(
            clauseCanvas,
            'JPEG',
            0,
            pdfHeight - clauseHeight - 5, // 5mm from bottom
            clauseWidth,
            clauseHeight
          );
        }
      }
    } else {
      // For single page documents, add the whole canvas
      pdf.addImage(
        canvas,
        'JPEG',
        0,
        0,
        pdfWidth,
        height < pdfHeight ? height : pdfHeight
      );
    }
    
    // Save PDF
    pdf.save(fileName);
    console.log("PDF generation complete");
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};
