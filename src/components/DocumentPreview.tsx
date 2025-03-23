
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
  
  const htmlContent = template.template(formData, config);
  
  useEffect(() => {
    // Check page count after the content renders
    const timer = setTimeout(() => {
      if (actualRef.current) {
        const count = estimatePageCount(actualRef.current);
        setPageCount(count);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [htmlContent, actualRef]);
  
  const handleExportPdf = async () => {
    if (actualRef.current) {
      const fileName = `${formData.firstName || 'dokument'}_${formData.lastName || ''}_${new Date().toISOString().slice(0, 10)}.pdf`;
      
      try {
        await generatePdfFromHtml(actualRef.current, fileName);
        toast({
          title: "Eksport PDF",
          description: "Dokument został wygenerowany i pobrany.",
        });
      } catch (error) {
        toast({
          title: "Błąd eksportu",
          description: "Nie udało się wygenerować dokumentu PDF.",
          variant: "destructive",
        });
      }
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
        >
          <FileDown className="h-4 w-4" />
          Eksportuj PDF
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
          <div 
            ref={actualRef}
            className="w-full h-[800px] overflow-auto"
            style={{ padding: 0 }}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentPreview;
