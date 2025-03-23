
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import { DocumentTemplate } from '@/lib/templates';
import { generatePdfFromHtml } from '@/lib/utils/pdf-generator';
import { toast } from '@/components/ui/use-toast';

interface DocumentPreviewProps {
  template: DocumentTemplate;
  formData: Record<string, string>;
  config?: Record<string, any>;
  previewRef?: React.RefObject<HTMLDivElement>;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ 
  template, 
  formData, 
  config,
  previewRef
}) => {
  const internalRef = React.useRef<HTMLDivElement>(null);
  const actualRef = previewRef || internalRef;
  
  const htmlContent = template.template(formData, config);
  
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
        <CardTitle className="text-lg">Podgląd</CardTitle>
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
