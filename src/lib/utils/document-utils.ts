
import { format } from "date-fns";
import { pl, enUS, de } from "date-fns/locale";

// Mapping of language codes to date-fns locales
const locales = {
  pl: pl,
  en: enUS,
  de: de
};

// Get formatted date based on the language
export const formatDateByLanguage = (date: Date, language: string = 'pl'): string => {
  const locale = locales[language as keyof typeof locales] || pl;
  
  // Different date formats for different languages
  if (language === 'en') {
    return format(date, 'MMMM d, yyyy', { locale });
  } else if (language === 'de') {
    return format(date, 'd. MMMM yyyy', { locale });
  } else {
    // Default (Polish) format
    return format(date, 'd MMMM yyyy', { locale });
  }
};

// Helpers to format date and other document utilities
export const currentDate = (): string => {
  const now = new Date();
  return `${now.getDate().toString().padStart(2, '0')}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getFullYear()}`;
};
