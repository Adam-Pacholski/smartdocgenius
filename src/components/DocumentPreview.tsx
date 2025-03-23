
import React, { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DocumentTemplate } from '@/lib/templates';

interface DocumentPreviewProps {
  template: DocumentTemplate;
  formData: Record<string, string>;
  config?: Record<string, any>;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ template, formData, config }) => {
  const previewRef = useRef<HTMLDivElement>(null);
  
  const htmlContent = template.template(formData, config);
  
  return (
    <Card className="shadow-subtle h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Podgląd</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-white rounded-md border overflow-hidden shadow-sm">
          <div 
            ref={previewRef}
            className="w-full h-[800px] overflow-auto p-6"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentPreview;
