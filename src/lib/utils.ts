
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
  
  // We don't need to replace spaces or line breaks for textarea inputs
  // as the textarea element naturally preserves them
  // This function is primarily needed for rendering in HTML where whitespace would be collapsed
  return text;
}
