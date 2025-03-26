
import React from 'react';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { ArrowLeft, FileDown } from 'lucide-react';

interface PreviewHeaderProps {
  pageCount: number;
  currentPage: number;
  isExporting: boolean;
  onExport: () => void;
  onBack?: () => void;
}

const PreviewHeader: React.FC<PreviewHeaderProps> = ({
  pageCount,
  currentPage,
  isExporting,
  onExport,
  onBack
}) => {
  return (
    <div className="pb-2 flex flex-row items-center justify-between">
      <div className="flex items-center gap-2">
        {onBack && (
          <Button 
            onClick={onBack} 
            variant="ghost" 
            size="sm" 
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Zmień szablon
          </Button>
        )}
        <CardTitle className="text-lg">Podgląd</CardTitle>
        {pageCount > 1 && (
          <span className="text-sm text-muted-foreground ml-2">
            Strona {currentPage} z {pageCount}
          </span>
        )}
      </div>
      <Button 
        onClick={onExport} 
        variant="outline" 
        className="flex items-center gap-1"
        disabled={isExporting}
      >
        <FileDown className="h-4 w-4" />
        {isExporting ? 'Eksportowanie...' : 'Eksportuj PDF'}
      </Button>
    </div>
  );
};

export default PreviewHeader;
