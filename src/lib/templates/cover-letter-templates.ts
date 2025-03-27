
/**
 * Cover Letter Templates collection
 * 
 * This file imports all available cover letter templates from their individual files
 * and exports them as a collection.
 * 
 * Each template is designed to display properly on A4 paper and in the preview window.
 * Templates can be customized via the config object, with common parameters being:
 * - primaryColor: The main accent color
 * - fontFamily: The font family used
 * - fontSize: The base font size
 */

import { DocumentTemplate } from '../types/document-types';
import { blueHeaderTemplate } from './blue-header-template';
import { whiteWithPhotoTemplate } from './white-with-photo-template';
import { tealSidebarTemplate } from './teal-sidebar-template';
import { minimalistIconsTemplate } from './minimalist-icons-template';

// Cover letter template thumbnails - these files should be placed in the public directory
const lm_blue_header = '/lm-blue-header.png';
const lm_white_photo = '/lm-white-photo.png';
const lm_teal_sidebar = '/lm-teal-sidebar.png';
const lm_minimalist_icons = '/lm-minimalist-icons.png';

// Export all templates as a collection
export const coverLetterTemplates: DocumentTemplate[] = [
  {
    id: blueHeaderTemplate.id,
    name: blueHeaderTemplate.name,
    description: blueHeaderTemplate.description,
    thumbnail: lm_blue_header,
    fields: blueHeaderTemplate.fields,
    template: blueHeaderTemplate.template,
  },
  {
    id: whiteWithPhotoTemplate.id,
    name: whiteWithPhotoTemplate.name,
    description: whiteWithPhotoTemplate.description,
    thumbnail: lm_white_photo,
    fields: whiteWithPhotoTemplate.fields,
    template: whiteWithPhotoTemplate.template,
  },
  {
    id: tealSidebarTemplate.id,
    name: tealSidebarTemplate.name,
    description: tealSidebarTemplate.description,
    thumbnail: lm_teal_sidebar,
    fields: tealSidebarTemplate.fields,
    template: tealSidebarTemplate.template,
  },
  {
    id: minimalistIconsTemplate.id,
    name: minimalistIconsTemplate.name,
    description: minimalistIconsTemplate.description,
    thumbnail: lm_minimalist_icons,
    fields: minimalistIconsTemplate.fields,
    template: minimalistIconsTemplate.template,
  },
];
