
import { DocumentType } from './types/document-types';
import { coverLetterTemplates } from './templates/cover-letter-templates';

const documentTypes: DocumentType[] = [
  {
    id: 'cover-letter',
    name: 'List motywacyjny',
    description: 'Profesjonalny list motywacyjny, który pomoże Ci zdobyć wymarzoną pracę',
    icon: 'file-text',
    templates: coverLetterTemplates,
  },
];

export * from './types/document-types';
export default documentTypes;
