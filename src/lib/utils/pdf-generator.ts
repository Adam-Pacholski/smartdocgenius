
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
    
    // Find the clause element in the clone
    const clauseElement = clone.querySelector('[data-clause]') as HTMLElement;
    let clauseHtml = '';
    
    // Extract clause content if it exists
    if (clauseElement) {
      clauseHtml = clauseElement.outerHTML;
      clauseElement.style.display = 'none'; // Hide clause for main content
    }
    
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
          height: pdfHeight * 0.9, // Leave space for clause
          compression: 'MEDIUM'
        });
      } else {
        console.error('Main canvas has zero dimensions:', mainCanvas.width, mainCanvas.height);
        throw new Error('Main canvas has no dimensions');
      }
      
      // Add clause if it exists
      if (clauseHtml) {
        // Create a separate element for the clause
        const clauseContainer = document.createElement('div');
        clauseContainer.innerHTML = clauseHtml;
        clauseContainer.style.position = 'absolute';
        clauseContainer.style.left = '-9999px';
        clauseContainer.style.width = '794px';
        clauseContainer.style.padding = '0 30px';
        document.body.appendChild(clauseContainer);
        
        try {
          // Generate canvas for clause
          const clauseCanvas = await html2canvas(clauseContainer, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff'
          });
          
          // Check if clause canvas has dimensions
          if (clauseCanvas.width > 0 && clauseCanvas.height > 0) {
            // Add clause to bottom of page
            pdf.addImage({
              imageData: clauseCanvas,
              format: 'JPEG',
              x: 0,
              y: pdfHeight * 0.9, // Position at bottom
              width: pdfWidth,
              height: pdfHeight * 0.1,
              compression: 'MEDIUM'
            });
          } else {
            console.error('Clause canvas has zero dimensions:', clauseCanvas.width, clauseCanvas.height);
          }
          
          // Clean up
          document.body.removeChild(clauseContainer);
        } catch (clauseError) {
          console.error('Error rendering clause:', clauseError);
        }
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
