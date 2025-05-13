
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Preserves multiple spaces in text by converting them to non-breaking spaces
 */
export function preserveSpaces(text: string): string {
  if (!text) return '';
  return text.replace(/  +/g, (match) => {
    return ' ' + '\u00A0'.repeat(match.length - 1);
  });
}

/**
 * Preserves line breaks in text by converting them to <br> tags
 */
export function preserveLineBreaks(text: string): string {
  if (!text) return '';
  return text.replace(/\n/g, '<br>');
}

/**
 * Process text to preserve formatting in HTML
 */
export function processTextForHtml(text: string): string {
  if (!text) return '';
  return preserveLineBreaks(preserveSpaces(text));
}
