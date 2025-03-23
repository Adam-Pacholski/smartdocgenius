
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { FileText, AlertCircle } from 'lucide-react';
import documentTypes from '@/lib/templates';
import { Badge } from '@/components/ui/badge';

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
      {documentTypes.map((type) => {
        const isComingSoon = type.templates.length === 0;
        
        return (
          <Card 
            key={type.id} 
            className={cn(
              "cursor-pointer transition-all duration-300 transform hover:scale-102 hover:-translate-y-1",
              selectedType === type.id 
                ? "ring-2 ring-primary shadow-elegant" 
                : "shadow-subtle hover:shadow-elegant",
              isComingSoon && "opacity-80"
            )}
            onClick={() => !isComingSoon && onSelectType(type.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{type.name}</CardTitle>
                    {isComingSoon && (
                      <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                        Wkrótce
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="mt-1.5">{type.description}</CardDescription>
                </div>
                <div className="bg-primary/10 p-2 rounded-full">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isComingSoon ? (
                <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  Już wkrótce dostępne
                </span>
              ) : (
                <span className="text-sm text-muted-foreground">
                  {type.templates.length} {type.templates.length === 1 ? 'szablon' : 
                    type.templates.length < 5 ? 'szablony' : 'szablonów'}
                </span>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DocumentTypeSelector;
