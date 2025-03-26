
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { FileText, User, MessageSquare, PlusCircle } from 'lucide-react';
import documentTypes from '@/lib/templates';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

interface DocumentTypeSelectorProps {
  selectedType: string | null;
  onSelectType: (typeId: string) => void;
}

const DocumentTypeSelector: React.FC<DocumentTypeSelectorProps> = ({
  selectedType,
  onSelectType,
}) => {
  const navigate = useNavigate();

  const handleTypeSelect = (typeId: string) => {
    const docType = documentTypes.find(dt => dt.id === typeId);
    
    if (docType?.redirectTo) {
      navigate(docType.redirectTo);
      return;
    }
    
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {documentTypes.map((type) => (
        <Card 
          key={type.id} 
          className={cn(
            "cursor-pointer transition-all duration-300 transform hover:scale-102 hover:-translate-y-1 border",
            selectedType === type.id 
              ? "ring-2 ring-primary shadow-elegant border-primary/30" 
              : "shadow-subtle hover:shadow-elegant",
            type.comingSoon ? "opacity-80" : "",
            type.id === 'cv' ? "bg-section-bg-accent" : 
            type.id === 'cover-letter' ? "bg-section-bg-primary" : 
            "bg-section-bg-secondary"
          )}
          onClick={() => handleTypeSelect(type.id)}
        >
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">
                  {type.name}
                  {type.id === 'cv' && type.displayComingSoon && (
                    <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                      W trakcie testów
                    </span>
                  )}
                </CardTitle>
                <CardDescription className="mt-1.5">{type.description}</CardDescription>
              </div>
              <div className="bg-primary/10 p-2 rounded-full">
                {type.icon === 'file-text' && <FileText className="h-5 w-5 text-primary" />}
                {type.icon === 'user' && <User className="h-5 w-5 text-primary" />}
                {type.icon === 'plus-circle' && <PlusCircle className="h-5 w-5 text-primary" />}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-sm text-muted-foreground">
              {type.redirectTo 
                ? "Skontaktuj się z nami" 
                : `${type.templates.length} ${type.templates.length === 1 ? 'szablon' : 
                  type.templates.length < 5 ? 'szablony' : 'szablonów'}`
              }
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DocumentTypeSelector;
