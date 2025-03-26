
import { DocumentType } from './types/document-types';
import { coverLetterTemplates } from './templates/cover-letter-templates';
import { cvTemplates } from './templates/cv/cv-templates';

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
    name: 'CV / Życiorys',
    description: 'Profesjonalne CV, które wyróżni Cię na tle innych kandydatów',
    icon: 'user',
    templates: cvTemplates,
    // Showing "W trakcie testów" but allowing selection
    displayComingSoon: true
  },
  {
    id: 'other',
    name: 'Inny dokument',
    description: 'Masz pomysł na dokument? Napisz do nas!',
    icon: 'plus-circle',
    templates: [],
    redirectTo: '/kontakt',
    displayComingSoon: false
  }
];

export * from './types/document-types';
export default documentTypes;
