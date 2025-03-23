
import { DocumentTemplate } from '../types/document-types';
import { blueHeaderCvTemplate } from './blue-header-cv-template';
import { tealSidebarCvTemplate } from './teal-sidebar-cv-template';
import { minimalistIconsCvTemplate } from './minimalist-icons-cv-template';
import { whiteWithPhotoCvTemplate } from './white-with-photo-cv-template';
import { allCVFields } from '../form-fields/cv-fields';

export const cvTemplates: DocumentTemplate[] = [
  {
    id: 'cv-blue-header',
    name: 'CV z niebieskim nagłówkiem',
    description: 'Profesjonalne CV z niebieskim nagłówkiem i zdjęciem',
    thumbnail: '/lm-blue-header.png',
    fields: allCVFields,
    template: blueHeaderCvTemplate,
  },
  {
    id: 'cv-teal-sidebar',
    name: 'CV z turkusowym paskiem',
    description: 'Eleganckie CV z turkusowym paskiem bocznym i paskami postępu umiejętności',
    thumbnail: '/lm-teal-sidebar.png',
    fields: allCVFields,
    template: tealSidebarCvTemplate,
  },
  {
    id: 'cv-minimalist-icons',
    name: 'CV minimalistyczne z ikonami',
    description: 'Minimalistyczne CV z nowoczesnymi ikonami',
    thumbnail: '/lm-minimalist-icons.png',
    fields: allCVFields,
    template: minimalistIconsCvTemplate,
  },
  {
    id: 'cv-white-photo',
    name: 'CV białe ze zdjęciem',
    description: 'Czyste, białe CV ze zdjęciem',
    thumbnail: '/lm-white-photo.png',
    fields: allCVFields,
    template: whiteWithPhotoCvTemplate,
  },
];
