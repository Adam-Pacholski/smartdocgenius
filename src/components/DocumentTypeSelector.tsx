
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { FileText } from 'lucide-react';
import documentTypes from '@/lib/templates';

interface DocumentTypeSelectorProps {
  selectedType: string | null;
  onSelectType: (typeId: string) => void;
}

const DocumentTypeSelector: React.FC<DocumentTypeSelectorProps> = ({
  selectedType,
  onSelectType,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {documentTypes.map((type) => (
        <Card 
          key={type.id} 
          className={cn(
            "cursor-pointer transition-all duration-300 transform hover:scale-102 hover:-translate-y-1",
            selectedType === type.id 
              ? "ring-2 ring-primary shadow-elegant" 
              : "shadow-subtle hover:shadow-elegant"
          )}
          onClick={() => onSelectType(type.id)}
        >
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">{type.name}</CardTitle>
                <CardDescription className="mt-1.5">{type.description}</CardDescription>
              </div>
              <div className="bg-primary/10 p-2 rounded-full">
                <FileText className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-sm text-muted-foreground">
              {type.templates.length} {type.templates.length === 1 ? 'szablon' : 
                type.templates.length < 5 ? 'szablony' : 'szablonów'}
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DocumentTypeSelector;
