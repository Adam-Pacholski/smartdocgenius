
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

// A4 dimensions in mm
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

// A4 dimensions in pixels at 96 DPI
const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;

export const generatePdfFromHtml = async (elementRef: HTMLElement, fileName: string = 'document.pdf'): Promise<void> => {
  if (!elementRef) {
    console.error('Element reference is null');
    throw new Error("Element reference is null");
  }

  try {
    console.log("Starting PDF generation");
    
    // Create a new jsPDF instance
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Create a deep clone of the element to avoid modifying the original
    const clone = elementRef.cloneNode(true) as HTMLElement;
    
    // Create a temporary container with A4 dimensions
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '0';
    tempContainer.style.width = `${A4_WIDTH_PX}px`;
    tempContainer.style.height = 'auto';
    tempContainer.appendChild(clone);
    document.body.appendChild(tempContainer);
    
    // Calculate page count
    const totalHeight = clone.scrollHeight;
    const pageCount = Math.ceil(totalHeight / A4_HEIGHT_PX);
    console.log(`Document will span ${pageCount} pages. Total height: ${totalHeight}px`);
    
    // For multi-page PDFs, we need to create multiple canvases
    for (let i = 0; i < pageCount; i++) {
      console.log(`Processing page ${i + 1} of ${pageCount}`);
      
      // Set the clip area for this page
      const yStart = i * A4_HEIGHT_PX;
      const canvasHeight = Math.min(A4_HEIGHT_PX, totalHeight - yStart);
      
      if (canvasHeight <= 0) {
        console.log(`Skipping page ${i + 1} as it has no content`);
        continue;
      }
      
      // Create a canvas for this page
      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: true,
        backgroundColor: '#ffffff',
        y: yStart,
        height: canvasHeight,
        windowHeight: canvasHeight
      });
      
      // Add page for all but the first page
      if (i > 0) {
        pdf.addPage();
      }
      
      // Add this canvas to the PDF
      if (canvas.width > 0 && canvas.height > 0) {
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        pdf.addImage({
          imageData: imgData,
          x: 0,
          y: 0,
          width: A4_WIDTH_MM,
          height: A4_HEIGHT_MM,
          compression: 'MEDIUM'
        });
      } else {
        console.error(`Canvas for page ${i + 1} has zero dimensions`);
        throw new Error(`Canvas for page ${i + 1} has zero dimensions`);
      }
    }
    
    // Save PDF
    pdf.save(fileName);
    console.log("PDF generation complete");
    
    // Clean up
    document.body.removeChild(tempContainer);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

// Function to split content virtually for preview purposes
export const splitContentIntoPages = (elementRef: HTMLElement): HTMLElement[] => {
  if (!elementRef) return [];
  
  const clone = elementRef.cloneNode(true) as HTMLElement;
  const tempDiv = document.createElement('div');
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  tempDiv.style.width = `${A4_WIDTH_PX}px`;
  tempDiv.appendChild(clone);
  document.body.appendChild(tempDiv);
  
  const totalHeight = clone.scrollHeight;
  const pageCount = Math.ceil(totalHeight / A4_HEIGHT_PX);
  
  const pages: HTMLElement[] = [];
  
  for (let i = 0; i < pageCount; i++) {
    const pageDiv = document.createElement('div');
    pageDiv.style.position = 'relative';
    pageDiv.style.width = '100%';
    pageDiv.style.height = `${A4_HEIGHT_PX}px`;
    pageDiv.style.overflow = 'hidden';
    
    const contentClone = clone.cloneNode(true) as HTMLElement;
    contentClone.style.position = 'absolute';
    contentClone.style.top = `-${i * A4_HEIGHT_PX}px`;
    contentClone.style.width = '100%';
    
    pageDiv.appendChild(contentClone);
    pages.push(pageDiv);
  }
  
  document.body.removeChild(tempDiv);
  return pages;
};
