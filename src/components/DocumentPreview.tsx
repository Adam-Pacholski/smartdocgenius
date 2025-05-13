
import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DocumentTemplate } from '@/lib/templates';
import { generatePdfFromHtml, estimatePageCount } from '@/lib/utils/pdf-generator';
import { toast } from '@/components/ui/use-toast';

// Import our components
import DocumentRenderer from './document-preview/DocumentRenderer';
import NavigationOverlay from './document-preview/NavigationOverlay';
import PreviewPagination from './document-preview/PreviewPagination';
import PreviewHeader from './document-preview/PreviewHeader';

interface DocumentPreviewProps {
  template: DocumentTemplate;
  formData: Record<string, string>;
  config?: Record<string, any>;
  previewRef?: React.RefObject<HTMLDivElement>;
  onBack?: () => void;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ 
  template, 
  formData, 
  config,
  previewRef,
  onBack
}) => {
  const internalRef = React.useRef<HTMLDivElement>(null);
  const actualRef = previewRef || internalRef;
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [previewLoaded, setPreviewLoaded] = useState(false);
  const [scale, setScale] = useState(1);
  
  // Process form data to fix trailing spaces and new lines
  const processedFormData = React.useMemo(() => {
    const processed = {...formData};
    // Process all text fields to preserve trailing spaces and new lines
    Object.keys(processed).forEach(key => {
      if (typeof processed[key] === 'string') {
        // Replace multiple spaces with non-breaking spaces to preserve them in HTML
        processed[key] = processed[key].replace(/  +/g, (match) => {
          return ' ' + '\u00A0'.repeat(match.length - 1);
        });
        // Replace line breaks with <br> tags
        processed[key] = processed[key].replace(/\n/g, '<br>');
      }
    });
    return processed;
  }, [formData]);
  
  // Generate HTML content from the template and processed form data
  const htmlContent = template.template(processedFormData, config);
  
  // Handle resize to update scale when container size changes
  const updateScale = useCallback(() => {
    if (containerRef.current && actualRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      
      // A4 width is 21cm ≈ 794px at 96dpi
      const contentWidth = 794;
      
      // Calculate scale to fit container width with some padding
      const maxWidth = Math.max(300, containerWidth - 40);
      const newScale = maxWidth / contentWidth;
      
      setScale(newScale);
      console.log(`Setting scale to ${newScale} (container width: ${containerWidth}px)`);
    }
  }, [actualRef]);
  
  // Update page count and reset to page 1 when content changes
  useEffect(() => {
    setCurrentPage(1);
    setPreviewLoaded(false);
    
    // Using a timeout to ensure DOM has rendered
    const timer = setTimeout(() => {
      if (actualRef.current) {
        const count = estimatePageCount(actualRef.current);
        console.log(`Estimated page count: ${count}, content height: ${actualRef.current.scrollHeight}px`);
        setPageCount(Math.max(1, count));
        setPreviewLoaded(true);
        updateScale();
      }
    }, 250);
    
    return () => clearTimeout(timer);
  }, [htmlContent, actualRef, updateScale]);
  
  // Add resize listener to update scaling when window resizes
  useEffect(() => {
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [updateScale]);
  
  const handleExportPdf = async () => {
    if (!actualRef.current) {
      toast({
        title: "Błąd eksportu",
        description: "Nie znaleziono elementu do eksportu.",
        variant: "destructive",
      });
      return;
    }
    
    const fileName = `${formData.firstName || 'dokument'}_${formData.lastName || ''}_${new Date().toISOString().slice(0, 10)}.pdf`;
    
    setIsExporting(true);
    setExportError(null);
    
    try {
      console.log("Starting PDF export");
      await generatePdfFromHtml(actualRef.current, fileName);
      toast({
        title: "Eksport PDF",
        description: "Dokument został wygenerowany i pobrany.",
      });
    } catch (error) {
      console.error("PDF export error:", error);
      const errorMessage = error instanceof Error ? error.message : "Nieznany błąd";
      setExportError(errorMessage);
      toast({
        title: "Błąd eksportu",
        description: "Nie udało się wygenerować dokumentu PDF.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };
  
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pageCount) {
      setCurrentPage(page);
      
      if (actualRef.current) {
        // Scroll to the appropriate position in the preview
        const scrollPosition = (page - 1) * 1123; // A4 height in pixels for display
        actualRef.current.scrollTop = scrollPosition;
      }
    }
  };
  
  return (
    <Card className="shadow-subtle h-full">
      <CardHeader className="pb-2">
        <PreviewHeader 
          pageCount={pageCount} 
          currentPage={currentPage}
          isExporting={isExporting}
          onExport={handleExportPdf}
          onBack={onBack}
        />
      </CardHeader>
      <CardContent>
        {pageCount > 1 && (
          <Alert className="mb-4">
            <AlertDescription>
              Dokument zajmie {pageCount} strony. Przy eksporcie do PDF zawartość zostanie automatycznie podzielona na strony.
            </AlertDescription>
          </Alert>
        )}
        
        {exportError && (
          <Alert className="mb-4 bg-red-50 border-red-200 text-red-800">
            <AlertDescription>
              Wystąpił błąd podczas generowania PDF: {exportError}
            </AlertDescription>
          </Alert>
        )}
        
        <div 
          ref={containerRef} 
          className="bg-gray-100 rounded-md border overflow-hidden shadow-sm p-4 flex justify-center"
        >
          <div className="relative">
            <DocumentRenderer 
              htmlContent={htmlContent}
              pageCount={pageCount}
              scale={scale}
              previewLoaded={previewLoaded}
              previewRef={actualRef}
            />
            
            {/* Page navigation overlay */}
            <NavigationOverlay 
              currentPage={currentPage}
              pageCount={pageCount}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
        
        {/* Pagination controls below the preview */}
        <PreviewPagination 
          currentPage={currentPage}
          pageCount={pageCount}
          onPageChange={handlePageChange}
        />
      </CardContent>
    </Card>
  );
};

export default DocumentPreview;
