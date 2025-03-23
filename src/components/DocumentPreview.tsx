
import React, { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DocumentTemplate } from '@/lib/templates';

interface DocumentPreviewProps {
  template: DocumentTemplate;
  formData: Record<string, string>;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ template, formData }) => {
  const previewRef = useRef<HTMLDivElement>(null);
  
  const htmlContent = template.template(formData);
  
  return (
    <Card className="shadow-subtle h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Podgląd</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-white rounded-md border overflow-hidden shadow-sm">
          <div 
            ref={previewRef}
            className="w-full h-[800px] overflow-auto"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentPreview;
