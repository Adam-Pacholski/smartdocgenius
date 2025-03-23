
import { DocumentType } from './types/document-types';
import { coverLetterTemplates } from './templates/cover-letter-templates';
import { cvTemplates } from './templates/cv-templates';

const documentTypes: DocumentType[] = [
  {
    id: 'cover-letter',
    name: 'List motywacyjny',
    description: 'Profesjonalny list motywacyjny, który pomoże Ci zdobyć wymarzoną pracę',
    icon: 'file-text',
    templates: coverLetterTemplates,
  },
  {
    id: 'cv',
    name: 'Curriculum Vitae (CV)',
    description: 'Nowoczesne CV, które wyróżni Cię na tle innych kandydatów',
    icon: 'file-text',
    templates: cvTemplates,
  },
  {
    id: 'invoice',
    name: 'Faktury i umowy',
    description: 'Wkrótce dostępne - profesjonalne szablony faktur i umów dla Twojej firmy',
    icon: 'file-text',
    templates: [],
  }
];

export * from './types/document-types';
export default documentTypes;
