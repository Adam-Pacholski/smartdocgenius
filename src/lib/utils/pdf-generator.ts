
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { toast } from '@/components/ui/use-toast';

// A4 dimensions in mm
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

// A4 dimensions in pixels at 96 DPI (approximate)
const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;

// Function to check if document needs multiple pages
export const estimatePageCount = (elementRef: HTMLElement): number => {
  if (!elementRef) return 1;
  
  // Get the actual height of the content
  const contentHeight = elementRef.scrollHeight;
  
  // Calculate how many A4 pages this would require
  return Math.max(1, Math.ceil(contentHeight / A4_HEIGHT_PX));
};

// Main PDF generation function
export const generatePdfFromHtml = async (elementRef: HTMLElement, fileName: string = 'document.pdf'): Promise<void> => {
  if (!elementRef) {
    console.error('Element reference is null');
    throw new Error("Element reference is null");
  }

  try {
    console.log("Starting PDF generation");
    
    // Create a new jsPDF instance
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Get the full content height to determine number of pages
    const contentHeight = elementRef.scrollHeight;
    const pageCount = Math.max(1, Math.ceil(contentHeight / A4_HEIGHT_PX));
    
    console.log(`Document will span ${pageCount} pages. Total height: ${contentHeight}px`);
    
    // Clone the element to avoid modifying the original
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'fixed';
    tempContainer.style.top = '0';
    tempContainer.style.left = '-9999px';
    tempContainer.style.width = `${A4_WIDTH_PX}px`;
    
    // Create a deep clone of the element
    const clone = elementRef.cloneNode(true) as HTMLElement;
    clone.style.width = `${A4_WIDTH_PX}px`;
    clone.style.height = 'auto';
    clone.style.position = 'relative';
    clone.style.background = 'white';
    
    tempContainer.appendChild(clone);
    document.body.appendChild(tempContainer);
    
    // Process each page
    for (let i = 0; i < pageCount; i++) {
      try {
        console.log(`Processing page ${i + 1} of ${pageCount}`);
        
        // Calculate the portion of the document to capture for this page
        const yStart = i * A4_HEIGHT_PX;
        
        // Generate canvas for this page section
        const canvas = await html2canvas(clone, {
          scale: 2, // Higher scale for better quality
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          windowWidth: A4_WIDTH_PX,
          windowHeight: A4_HEIGHT_PX,
          x: 0,
          y: yStart,
          scrollY: -yStart,
          height: A4_HEIGHT_PX
        });
        
        // Add a new page for each page after the first
        if (i > 0) {
          pdf.addPage();
        }
        
        // Add the canvas as an image to the PDF
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        pdf.addImage(imgData, 'JPEG', 0, 0, A4_WIDTH_MM, A4_HEIGHT_MM, '', 'FAST');
        
      } catch (pageError) {
        console.error(`Error rendering page ${i + 1}:`, pageError);
        throw new Error(`Failed to render page ${i + 1}: ${pageError instanceof Error ? pageError.message : String(pageError)}`);
      }
    }
    
    // Save the PDF
    pdf.save(fileName);
    console.log("PDF generation complete");
    
    // Clean up
    document.body.removeChild(tempContainer);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    toast({
      title: "Błąd generowania PDF",
      description: error instanceof Error ? error.message : "Nieznany błąd podczas generowania PDF",
      variant: "destructive",
    });
    throw error;
  }
};

// Function to split content into pages for preview purposes
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
