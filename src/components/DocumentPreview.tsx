
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileDown, ArrowLeft } from 'lucide-react';
import { DocumentTemplate } from '@/lib/templates';
import { generatePdfFromHtml, estimatePageCount } from '@/lib/utils/pdf-generator';
import { toast } from '@/components/ui/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
  const [pageBreaks, setPageBreaks] = useState<number[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  
  const htmlContent = template.template(formData, config);
  
  useEffect(() => {
    // Check page count after the content renders
    const timer = setTimeout(() => {
      if (actualRef.current) {
        const count = estimatePageCount(actualRef.current);
        setPageCount(count);
        
        // Calculate page break positions for visualization
        if (count > 1) {
          const computedStyle = window.getComputedStyle(actualRef.current);
          const elementHeight = parseInt(computedStyle.height);
          const pageHeight = elementHeight / count;
          
          const breaks = [];
          for (let i = 1; i < count; i++) {
            breaks.push(pageHeight * i);
          }
          setPageBreaks(breaks);
        } else {
          setPageBreaks([]);
        }
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
    
    try {
      console.log("Starting PDF export");
      await generatePdfFromHtml(actualRef.current, fileName);
      toast({
        title: "Eksport PDF",
        description: "Dokument został wygenerowany i pobrany.",
      });
    } catch (error) {
      console.error("PDF export error:", error);
      toast({
        title: "Błąd eksportu",
        description: "Nie udało się wygenerować dokumentu PDF. Spróbuj ponownie za chwilę.",
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
              Dokument zajmie {pageCount} strony. Dostosuj treść, aby zmieścić się na jednej stronie lub upewnij się, że podział na strony jest prawidłowy.
            </AlertDescription>
          </Alert>
        )}
        <div className="bg-white rounded-md border overflow-hidden shadow-sm">
          <div className="relative">
            <div 
              ref={actualRef}
              className="w-full h-[800px] overflow-auto"
              style={{ padding: 0 }}
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
            
            {/* Visual page break indicators */}
            {pageBreaks.map((breakPoint, index) => (
              <div 
                key={index}
                className="absolute left-0 right-0 border-b-2 border-red-400 border-dashed pointer-events-none"
                style={{ 
                  top: `${breakPoint}px`,
                  zIndex: 10
                }}
              >
                <div className="absolute right-0 bg-red-100 text-red-800 px-2 py-0.5 text-xs rounded-tl-md">
                  Podział strony
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentPreview;
