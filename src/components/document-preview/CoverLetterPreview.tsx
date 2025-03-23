
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileDown, ArrowLeft } from 'lucide-react';
import { DocumentTemplate } from '@/lib/templates';
import { generatePdfFromHtml } from '@/lib/utils/pdf-generator';
import { toast } from '@/components/ui/use-toast';
import { ScrollArea } from "@/components/ui/scroll-area";
import PreviewAlerts from './PreviewAlerts';
import FloatingPageControls from './FloatingPageControls';
import PaginationControls from './PaginationControls';

interface CoverLetterPreviewProps {
  template: DocumentTemplate;
  formData: Record<string, string>;
  config?: Record<string, any>;
  previewRef?: React.RefObject<HTMLDivElement>;
  onBack?: () => void;
}

const CoverLetterPreview: React.FC<CoverLetterPreviewProps> = ({ 
  template, 
  formData, 
  config,
  previewRef,
  onBack
}) => {
  const internalRef = useRef<HTMLDivElement>(null);
  const actualRef = previewRef || internalRef;
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [previewLoaded, setPreviewLoaded] = useState(false);

  const sanitizeFormData = () => {
    const sanitized = { ...formData };
    
    Object.keys(sanitized).forEach(key => {
      if (typeof sanitized[key] === 'string' && 
          (sanitized[key].startsWith('[{') || sanitized[key].startsWith('{"'))) {
        try {
          JSON.parse(sanitized[key]);
        } catch (e) {
          console.error(`Failed to parse JSON for ${key}:`, e);
        }
      }
    });
    
    return sanitized;
  };

  const sanitizedFormData = sanitizeFormData();
  const htmlContent = template.template(sanitizedFormData, config);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pageCount) {
      setCurrentPage(page);
    }
  };
  
  const handleExportPdf = async () => {
    if (!actualRef.current) {
      toast({
        title: "Błąd eksportu",
        description: "Nie znaleziono elementu do eksportu.",
        variant: "destructive",
      });
      return;
    }
    
    const fileName = `list_${formData.firstName || 'dokument'}_${formData.lastName || ''}_${new Date().toISOString().slice(0, 10)}.pdf`;
    
    setIsExporting(true);
    setExportError(null);
    
    try {
      console.log("Starting PDF export");
      await generatePdfFromHtml(actualRef.current, fileName);
      toast({
        title: "Eksport PDF",
        description: "List motywacyjny został wygenerowany i pobrany.",
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
          <CardTitle className="text-lg">Podgląd listu</CardTitle>
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
        <PreviewAlerts 
          pageCount={pageCount} 
          exportError={exportError} 
        />
        
        <div className="preview-container bg-gray-100 rounded-md border overflow-hidden shadow-sm relative h-[700px]">
          <ScrollArea 
            className="w-full h-full"
            scrollHideDelay={0}
          >
            <div className="flex justify-center py-8 px-2">
              <div 
                ref={actualRef}
                className="a4-preview bg-white shadow-md"
                style={{ 
                  width: '21cm',
                  transform: `scale(0.85)`,
                  transformOrigin: 'top center',
                  minHeight: '29.7cm',
                  padding: '1cm',
                  margin: '0 auto'
                }}
                dangerouslySetInnerHTML={{ __html: htmlContent }}
                onLoad={() => {
                  setTimeout(() => {
                    if (actualRef.current) {
                      const count = Math.ceil(actualRef.current.scrollHeight / 1123);
                      setPageCount(Math.max(1, count));
                      setPreviewLoaded(true);
                    }
                  }, 500);
                }}
              />
              {pageCount > 1 && Array.from({ length: pageCount - 1 }).map((_, index) => (
                <div 
                  key={index}
                  className="absolute left-0 right-0 border-b-2 border-red-400 border-dashed pointer-events-none z-10"
                  style={{ top: `${(index + 1) * 1123}px` }}
                >
                  <div className="absolute right-0 bg-red-100 text-red-800 px-2 py-0.5 text-xs rounded-tl-md">
                    Podział strony
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <FloatingPageControls 
            currentPage={currentPage}
            pageCount={pageCount}
            onPageChange={handlePageChange}
          />
        </div>
        
        <PaginationControls 
          currentPage={currentPage}
          pageCount={pageCount}
          onPageChange={handlePageChange}
        />
      </CardContent>
    </Card>
  );
};

export default CoverLetterPreview;
