import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { toast } from '@/components/ui/use-toast';

// A4 dimensions in mm
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

// A4 dimensions in pixels at 300 DPI for better quality
const A4_WIDTH_PX = 2480;
export const A4_HEIGHT_PX = 3508;

// Function to check if document needs multiple pages
export const estimatePageCount = (elementRef: HTMLElement): number => {
  if (!elementRef) return 1;
  
  // Get the actual height of the content
  const contentHeight = elementRef.scrollHeight;
  
  // Calculate how many A4 pages this would require (using display height for preview)
  return Math.max(1, Math.ceil(contentHeight / 1123)); // Use display height for estimation
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
    const pageCount = Math.max(1, Math.ceil(contentHeight / 1123)); // Use display height for estimation
    
    console.log(`Document will span ${pageCount} pages. Total height: ${contentHeight}px`);
    
    // Clone the element to avoid modifying the original
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'fixed';
    tempContainer.style.top = '0';
    tempContainer.style.left = '-9999px';
    tempContainer.style.width = `${794}px`; // A4 width at 96 DPI for display
    
    // Create a deep clone of the element
    const clone = elementRef.cloneNode(true) as HTMLElement;
    clone.style.width = `${794}px`; // A4 width at 96 DPI for display
    clone.style.height = 'auto';
    clone.style.position = 'relative';
    clone.style.background = 'white';
    clone.style.transform = 'none'; // Remove any scaling that might be applied
    
    // Add padding to the bottom of the clone to ensure content isn't cut off
    clone.style.paddingBottom = '120px'; // Zwiększony dolny padding
    
    // Fix creative template scaling issue
    const creativeTemplates = clone.querySelectorAll('div[style*="padding: 200px"]');
    creativeTemplates.forEach(template => {
      if (template instanceof HTMLElement) {
        template.style.padding = '30px';
      }
    });
    
    // Ensure adequate spacing for content sections
    const contentDivs = clone.querySelectorAll('div[style*="flex:"]');
    contentDivs.forEach(div => {
      if (div instanceof HTMLElement) {
        // Check if this is a content column
        if (div.style.flex && !div.style.paddingBottom) {
          div.style.paddingBottom = '120px'; // Zwiększony padding dla elementów content
        }
      }
    });
    
    // Enhance page break handling with better spacing
    const pageBreakHeight = 1123; // A4 height in pixels at display resolution
    for (let i = 1; i < pageCount; i++) {
      const breakPosition = i * pageBreakHeight;
      
      // Add margin zones at page breaks
      const pageBreakMarkerTop = document.createElement('div');
      pageBreakMarkerTop.style.height = '60px'; // Increased safety zone above the break
      pageBreakMarkerTop.style.width = '100%';
      pageBreakMarkerTop.style.position = 'absolute';
      pageBreakMarkerTop.style.top = `${breakPosition - 60}px`;
      pageBreakMarkerTop.style.background = 'transparent';
      pageBreakMarkerTop.dataset.pageBreak = 'top';
      clone.appendChild(pageBreakMarkerTop);
      
      const pageBreakMarkerBottom = document.createElement('div');
      pageBreakMarkerBottom.style.height = '60px'; // Safety zone below the break
      pageBreakMarkerBottom.style.width = '100%';
      pageBreakMarkerBottom.style.position = 'absolute';
      pageBreakMarkerBottom.style.top = `${breakPosition}px`;
      pageBreakMarkerBottom.style.background = 'transparent';
      pageBreakMarkerBottom.dataset.pageBreak = 'bottom';
      clone.appendChild(pageBreakMarkerBottom);
    }
    
    // Ensure the clause has enough spacing
    const footers = clone.querySelectorAll('footer');
    footers.forEach(footer => {
      if (footer instanceof HTMLElement) {
        footer.style.paddingBottom = '120px'; // Increased footer padding
        footer.style.marginTop = '100px';   // Increased footer top margin
        footer.style.clear = 'both'; // Ensure footer doesn't overlap with content
      }
    });
    
    // Ensure clause elements have good spacing
    const clauses = clone.querySelectorAll('[data-clause]');
    clauses.forEach(clause => {
      if (clause instanceof HTMLElement) {
        clause.style.marginBottom = '100px'; // Increased bottom margin for clauses
        clause.style.paddingBottom = '120px';
      }
    });
    
    // Add proper spacing to all paragraphs near page breaks
    const paragraphs = clone.querySelectorAll('p');
    paragraphs.forEach(paragraph => {
      if (paragraph instanceof HTMLElement) {
        // Bottom margin for all paragraphs to prevent cutting at page breaks
        if (parseInt(paragraph.style.marginBottom || '0') < 20) {
          paragraph.style.marginBottom = '20px';
        }
      }
    });
    
    tempContainer.appendChild(clone);
    document.body.appendChild(tempContainer);
    
    // Process each page
    for (let i = 0; i < pageCount; i++) {
      try {
        console.log(`Processing page ${i + 1} of ${pageCount}`);
        
        // Calculate the portion of the document to capture for this page
        const yStart = i * 1123; // Use display height for capturing
        
        // Generate canvas for this page section
        const canvas = await html2canvas(clone, {
          scale: 3, // Higher scale for better quality
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          windowWidth: 794, // A4 width at 96 DPI for display
          windowHeight: 1123, // A4 height at 96 DPI for display
          x: 0,
          y: yStart,
          scrollY: -yStart,
          height: 1123, // A4 height at 96 DPI for display
          // Improved page break handling
          onclone: (document, element) => {
            // Add extra padding to sections near page breaks
            const pageBreakElements = element.querySelectorAll('[data-page-break]');
            pageBreakElements.forEach(pageBreak => {
              if (pageBreak instanceof HTMLElement) {
                const elementsNearBreak = document.elementsFromPoint(
                  pageBreak.offsetLeft + 100, 
                  pageBreak.offsetTop
                );
                
                elementsNearBreak.forEach(nearElement => {
                  if (nearElement instanceof HTMLElement && 
                      nearElement !== pageBreak && 
                      !nearElement.contains(pageBreak)) {
                    nearElement.style.pageBreakInside = 'avoid';
                    nearElement.style.pageBreakAfter = 'always';
                    // Increase bottom margin for elements near page breaks
                    if (parseInt(nearElement.style.marginBottom || '0') < 80) {
                      nearElement.style.marginBottom = '80px';
                    }
                  }
                });
              }
            });
            
            // Add proper spacing to all sections
            const sections = element.querySelectorAll('section');
            sections.forEach(section => {
              if (section instanceof HTMLElement) {
                section.style.pageBreakInside = 'avoid';
                section.style.marginBottom = '40px'; // Increased bottom margin
              }
            });
            
            // Add proper page margins to container
            const contentContainer = element.querySelector('.a4-preview');
            if (contentContainer instanceof HTMLElement) {
              contentContainer.style.paddingBottom = '120px'; // Large bottom padding for all pages
            }
          }
        });
        
        // Add a new page for each page after the first
        if (i > 0) {
          pdf.addPage();
        }
        
        // Add the canvas as an image to the PDF with adjusted margins
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        
        // Add image with proper margins (top, right, bottom, left)
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
  tempDiv.style.width = `${794}px`; // A4 width at 96 DPI for display
  tempDiv.appendChild(clone);
  document.body.appendChild(tempDiv);
  
  const totalHeight = clone.scrollHeight;
  const pageCount = Math.ceil(totalHeight / 1123); // Use display height
  
  const pages: HTMLElement[] = [];
  
  for (let i = 0; i < pageCount; i++) {
    const pageDiv = document.createElement('div');
    pageDiv.style.position = 'relative';
    pageDiv.style.width = '100%';
    pageDiv.style.height = `${1123}px`; // Use display height
    pageDiv.style.overflow = 'hidden';
    
    const contentClone = clone.cloneNode(true) as HTMLElement;
    contentClone.style.position = 'absolute';
    contentClone.style.top = `-${i * 1123}px`; // Use display height
    contentClone.style.width = '100%';
    
    pageDiv.appendChild(contentClone);
    pages.push(pageDiv);
  }
  
  document.body.removeChild(tempDiv);
  return pages;
};
