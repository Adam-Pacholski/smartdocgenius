
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Preserves whitespace in text, including trailing spaces and line breaks
 * This is useful when rendering text in HTML where whitespace is normally collapsed
 * @param text - The text to preserve whitespace in
 * @returns A string with preserved whitespace
 */
export function preserveWhitespace(text: string): string {
  if (!text) return '';
  
  // Replace spaces with non-breaking spaces to preserve them
  // Replace line breaks with <br> tags for HTML rendering
  return text
    .replace(/ /g, '\u00A0')
    .replace(/\n/g, '<br />');
}
