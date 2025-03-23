
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileDown, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { DocumentTemplate } from '@/lib/templates';
import { generatePdfFromHtml, estimatePageCount } from '@/lib/utils/pdf-generator';
import { toast } from '@/components/ui/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

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
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [previewLoaded, setPreviewLoaded] = useState(false);
  
  const htmlContent = template.template(formData, config);
  
  // Update page count and reset to page 1 when content changes
  useEffect(() => {
    setCurrentPage(1);
    setPreviewLoaded(false);
    
    // Using a timeout to ensure DOM has rendered
    const timer = setTimeout(() => {
      if (actualRef.current) {
        const count = estimatePageCount(actualRef.current);
        console.log(`Estimated page count: ${count}, content height: ${actualRef.current.scrollHeight}px`);
        setPageCount(count);
        setPreviewLoaded(true);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [htmlContent, actualRef]);
  
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
        const scrollPosition = (page - 1) * 1123; // A4 height in pixels
        actualRef.current.scrollTop = scrollPosition;
      }
    }
  };
  
  // Render page break indicators
  const renderPageBreaks = () => {
    if (pageCount <= 1) return null;
    
    return Array.from({ length: pageCount - 1 }).map((_, index) => (
      <div 
        key={index}
        className="absolute left-0 right-0 border-b-2 border-red-400 border-dashed pointer-events-none z-10"
        style={{ top: `${(index + 1) * 1123}px` }}
      >
        <div className="absolute right-0 bg-red-100 text-red-800 px-2 py-0.5 text-xs rounded-tl-md">
          Podział strony
        </div>
      </div>
    ));
  };
  
  // Render pagination controls
  const renderPagination = () => {
    if (pageCount <= 1) return null;
    
    return (
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => handlePageChange(currentPage - 1)}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
          
          {Array.from({ length: Math.min(pageCount, 5) }).map((_, index) => {
            const pageNumber = index + 1;
            
            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink 
                  onClick={() => handlePageChange(pageNumber)}
                  isActive={currentPage === pageNumber}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          
          {pageCount > 5 && currentPage < pageCount - 2 && (
            <PaginationItem>
              <PaginationLink disabled>...</PaginationLink>
            </PaginationItem>
          )}
          
          {pageCount > 5 && (
            <PaginationItem>
              <PaginationLink 
                onClick={() => handlePageChange(pageCount)}
                isActive={currentPage === pageCount}
              >
                {pageCount}
              </PaginationLink>
            </PaginationItem>
          )}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => handlePageChange(currentPage + 1)}
              className={currentPage === pageCount ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };
  
  return (
    <Card className="shadow-subtle h-full">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          {onBack && (
            <Button 
              onClick={onBack} 
              variant="ghost" 
              size="sm" 
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Zmień szablon
            </Button>
          )}
          <CardTitle className="text-lg">Podgląd</CardTitle>
          {pageCount > 1 && (
            <span className="text-sm text-muted-foreground ml-2">
              Strona {currentPage} z {pageCount}
            </span>
          )}
        </div>
        <Button 
          onClick={handleExportPdf} 
          variant="outline" 
          className="flex items-center gap-1"
          disabled={isExporting}
        >
          <FileDown className="h-4 w-4" />
          {isExporting ? 'Eksportowanie...' : 'Eksportuj PDF'}
        </Button>
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
        
        <div className="bg-white rounded-md border overflow-hidden shadow-sm">
          <div className="relative">
            <div 
              ref={actualRef}
              className="w-full h-[800px] overflow-auto"
              style={{ 
                padding: 0,
                scrollbarGutter: 'stable',
                scrollbarWidth: 'thin'
              }}
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
            
            {/* Page break indicators */}
            {previewLoaded && renderPageBreaks()}
            
            {/* Page navigation overlay */}
            {pageCount > 1 && (
              <div className="absolute top-2 right-2 bg-white shadow-md rounded-md px-2 py-1 text-sm flex items-center">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span>{currentPage} / {pageCount}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  disabled={currentPage === pageCount}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {/* Pagination controls below the preview */}
        {renderPagination()}
      </CardContent>
    </Card>
  );
};

export default DocumentPreview;
