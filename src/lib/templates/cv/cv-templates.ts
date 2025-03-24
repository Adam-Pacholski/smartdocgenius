
import { DocumentTemplate } from '../../types/document-types';
import { basicCVTemplate } from './basic-cv-template';
import { modernCVTemplate } from './modern-cv-template';
import { creativeCVTemplate } from './creative-cv-template';
import { professionalCVTemplate } from './professional-cv-template';
import { getCVFieldsForTemplate } from '../../form-fields/cv-fields';

// CV template thumbnails
const cv_basic = '/cv-basic.jpg';
const cv_modern = '/cv-modern.jpg';
const cv_creative = '/cv-creative.jpg';
const cv_professional = '/cv-professional.jpg';

export const cvTemplates: DocumentTemplate[] = [
  {
    id: 'cv-basic',
    name: 'Podstawowe CV',
    description: 'Prosty, czytelny szablon CV odpowiedni dla większości branż',
    thumbnail: cv_basic,
    fields: getCVFieldsForTemplate('cv-basic'),
    template: basicCVTemplate,
  },
  {
    id: 'cv-modern',
    name: 'Nowoczesne CV',
    description: 'Nowoczesny szablon CV z eleganckim układem i akcentami kolorystycznymi',
    thumbnail: cv_modern,
    fields: getCVFieldsForTemplate('cv-modern'),
    template: modernCVTemplate,
  },
  {
    id: 'cv-creative',
    name: 'Kreatywne CV',
    description: 'Wyróżniający się szablon dla kreatywnych branż',
    thumbnail: cv_creative,
    fields: getCVFieldsForTemplate('cv-creative'),
    template: creativeCVTemplate,
  },
  {
    id: 'cv-professional',
    name: 'Profesjonalne CV',
    description: 'Elegancki i profesjonalny szablon dla doświadczonych specjalistów',
    thumbnail: cv_professional,
    fields: getCVFieldsForTemplate('cv-professional'),
    template: professionalCVTemplate,
  },
];
