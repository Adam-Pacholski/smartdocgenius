
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileDown, ArrowLeft } from 'lucide-react';
import { DocumentTemplate } from '@/lib/templates';
import { generatePdfFromHtml } from '@/lib/utils/pdf-generator';
import { toast } from '@/components/ui/use-toast';
import { ScrollArea } from "@/components/ui/scroll-area";

// Import our new components
import PaginationControls from './document-preview/PaginationControls';
import FloatingPageControls from './document-preview/FloatingPageControls';
import DocumentContent from './document-preview/DocumentContent';
import PreviewAlerts from './document-preview/PreviewAlerts';

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
        <PreviewAlerts 
          pageCount={pageCount} 
          exportError={exportError} 
        />
        
        <div className="preview-container bg-gray-100 rounded-md border overflow-hidden shadow-sm relative h-[700px]">
          <ScrollArea 
            className="w-full h-full"
            scrollHideDelay={0}
          >
            <DocumentContent 
              htmlContent={htmlContent}
              contentRef={actualRef}
              currentPage={currentPage}
              onPageCountChange={setPageCount}
              onLoadComplete={() => setPreviewLoaded(true)}
            />
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

export default DocumentPreview;
