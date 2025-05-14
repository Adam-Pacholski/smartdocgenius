
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileDown, ArrowRight } from 'lucide-react';

interface EditorFooterProps {
  onBack: () => void;
  onNext?: () => void;
  onExport: () => void;
}

const EditorFooter: React.FC<EditorFooterProps> = ({
  onBack,
  onNext,
  onExport
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 border-t pt-6">
      <Button 
        type="button" 
        variant="outline" 
        className="w-full sm:w-auto" 
        onClick={onBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Wstecz
      </Button>
      <div className="flex-1 flex justify-end gap-2">
        {onNext && (
          <Button 
            type="button" 
            className="w-full sm:w-auto" 
            onClick={onNext}
          >
            Dalej
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
        {!onNext && (
          <Button 
            type="button" 
            className="w-full sm:w-auto" 
            onClick={onExport}
          >
            Pobierz PDF
            <FileDown className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default EditorFooter;
