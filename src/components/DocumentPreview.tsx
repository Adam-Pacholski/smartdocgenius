
import React from 'react';
import { DocumentTemplate } from '@/lib/templates';
import CoverLetterPreview from './document-preview/CoverLetterPreview';
import CvPreview from './document-preview/CvPreview';

interface DocumentPreviewProps {
  template: DocumentTemplate;
  formData: Record<string, string>;
  config?: Record<string, any>;
  previewRef?: React.RefObject<HTMLDivElement>;
  onBack?: () => void;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = (props) => {
  // Określamy typ dokumentu na podstawie ID szablonu
  const isCv = props.template.id.startsWith('cv-');
  
  // Renderujemy odpowiedni komponent podglądu
  return isCv 
    ? <CvPreview {...props} />
    : <CoverLetterPreview {...props} />;
};

export default DocumentPreview;
