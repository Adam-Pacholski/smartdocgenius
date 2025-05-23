
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
  
  // This function is only needed for rendering in HTML contexts
  // where whitespace would normally be collapsed
  return text
    .replace(/ /g, '\u00A0')
    .replace(/\n/g, '<br />');
}
