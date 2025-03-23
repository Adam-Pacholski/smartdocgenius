
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

import { blueHeaderTemplate } from './blue-header-template';
import { whiteWithPhotoTemplate } from './white-with-photo-template';
import { tealSidebarTemplate } from './teal-sidebar-template';
import { minimalistIconsTemplate } from './minimalist-icons-template';

// Export all templates as a collection
export const coverLetterTemplates = [
  blueHeaderTemplate,
  whiteWithPhotoTemplate,
  tealSidebarTemplate,
  minimalistIconsTemplate
];
