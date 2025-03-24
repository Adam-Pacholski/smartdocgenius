
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import documentTypes from '@/lib/templates';
import type { DocumentTemplate } from '@/lib/templates';

interface TemplateSelectorProps {
  typeId: string;
  selectedTemplate: string | null;
  onSelectTemplate: (template: DocumentTemplate) => void;
  onBack: () => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  typeId,
  selectedTemplate,
  onSelectTemplate,
  onBack,
}) => {
  const docType = documentTypes.find(dt => dt.id === typeId);
  
  if (!docType) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium">Wybierz szablon</h2>
        <Button variant="ghost" onClick={onBack}>Wróć</Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {docType.templates.map((template) => (
          <Card 
            key={template.id} 
            className={cn(
              "overflow-hidden cursor-pointer transition-all duration-300 transform hover:-translate-y-1",
              selectedTemplate === template.id 
                ? "ring-2 ring-primary shadow-elegant" 
                : "shadow-subtle hover:shadow-elegant"
            )}
            onClick={() => onSelectTemplate(template)}
          >
            <div className="aspect-[4/5] bg-muted relative">
              <img 
                src={template.thumbnail} 
                alt={template.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 flex items-center justify-center text-white text-lg font-medium">
                {template.name}
              </div>
              {selectedTemplate === template.id && (
                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                  <div className="bg-primary text-primary-foreground h-10 w-10 rounded-full flex items-center justify-center">
                    <Check className="h-5 w-5" />
                  </div>
                </div>
              )}
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{template.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{template.description}</p>
            </CardContent>
            <CardFooter>
              <Button 
                variant={selectedTemplate === template.id ? "default" : "outline"} 
                className="w-full"
                onClick={() => onSelectTemplate(template)}
              >
                {selectedTemplate === template.id ? "Wybrany" : "Wybierz"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
