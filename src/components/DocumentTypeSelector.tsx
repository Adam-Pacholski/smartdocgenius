
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { FileText, User, Clock } from 'lucide-react';
import documentTypes from '@/lib/templates';
import { toast } from '@/components/ui/use-toast';

interface DocumentTypeSelectorProps {
  selectedType: string | null;
  onSelectType: (typeId: string) => void;
}

const DocumentTypeSelector: React.FC<DocumentTypeSelectorProps> = ({
  selectedType,
  onSelectType,
}) => {
  const handleTypeSelect = (typeId: string) => {
    const docType = documentTypes.find(dt => dt.id === typeId);
    
    if (docType?.comingSoon) {
      toast({
        title: "Już wkrótce!",
        description: `${docType.name} będzie dostępne wkrótce. Pracujemy nad tym!`,
        duration: 3000,
      });
      return;
    }
    
    onSelectType(typeId);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {documentTypes.map((type) => (
        <Card 
          key={type.id} 
          className={cn(
            "cursor-pointer transition-all duration-300 transform hover:scale-102 hover:-translate-y-1",
            selectedType === type.id 
              ? "ring-2 ring-primary shadow-elegant" 
              : "shadow-subtle hover:shadow-elegant",
            type.comingSoon ? "opacity-80" : ""
          )}
          onClick={() => handleTypeSelect(type.id)}
        >
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">
                  {type.name}
                  {type.displayComingSoon && (
                    <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                      Wkrótce
                    </span>
                  )}
                </CardTitle>
                <CardDescription className="mt-1.5">{type.description}</CardDescription>
              </div>
              <div className="bg-primary/10 p-2 rounded-full">
                {type.icon === 'file-text' && <FileText className="h-5 w-5 text-primary" />}
                {type.icon === 'user' && <User className="h-5 w-5 text-primary" />}
                {type.displayComingSoon && (
                  <div className="absolute top-2 right-2">
                    <Clock className="h-4 w-4 text-yellow-600" />
                  </div>
                )}
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
