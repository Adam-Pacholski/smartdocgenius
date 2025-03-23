
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PreviewAlertsProps {
  pageCount: number;
  exportError: string | null;
}

const PreviewAlerts: React.FC<PreviewAlertsProps> = ({ 
  pageCount, 
  exportError 
}) => {
  return (
    <>
      {pageCount > 1 && (
        <Alert className="mb-4">
          <AlertDescription>
            Dokument zajmie {pageCount} strony. Przy eksporcie do PDF zawartość zostanie automatycznie podzielona na strony.
          </AlertDescription>
        </Alert>
      )}
      
      {exportError && (
        <Alert className="mb-4 bg-red-50 border-red-200 text-red-800">
          <AlertDescription>
            Wystąpił błąd podczas generowania PDF: {exportError}
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default PreviewAlerts;
