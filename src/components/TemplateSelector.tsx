
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
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {docType.templates.map((template) => (
          <Card 
            key={template.id} 
            className={cn(
              "overflow-hidden cursor-pointer transition-all duration-300 transform hover:-translate-y-1 h-auto",
              selectedTemplate === template.id 
                ? "ring-2 ring-primary shadow-elegant" 
                : "shadow-subtle hover:shadow-elegant"
            )}
            onClick={() => onSelectTemplate(template)}
          >
            <div className="aspect-[3/4] relative overflow-hidden">
              <img 
                src={template.thumbnail} 
                alt={template.name}
                className="w-full h-full object-contain bg-muted"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 flex items-end justify-center pb-2">
                <span className="text-white text-sm font-medium px-2 py-1 bg-black/40 rounded backdrop-blur-sm">
                  {template.name}
                </span>
              </div>
              {selectedTemplate === template.id && (
                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                  <div className="bg-primary text-primary-foreground h-8 w-8 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4" />
                  </div>
                </div>
              )}
            </div>
            <CardHeader className="pb-1 pt-2 px-3">
              <CardTitle className="text-base">{template.name}</CardTitle>
            </CardHeader>
            <CardContent className="px-3 py-1">
              <p className="text-xs text-muted-foreground line-clamp-2">{template.description}</p>
            </CardContent>
            <CardFooter className="px-3 py-2">
              <Button 
                variant={selectedTemplate === template.id ? "default" : "outline"} 
                size="sm"
                className="w-full text-xs"
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
