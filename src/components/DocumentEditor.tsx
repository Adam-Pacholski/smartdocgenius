
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DocumentTemplate } from '@/lib/templates';
import { ArrowLeft, FileDown, ArrowRight, Upload } from 'lucide-react';

interface DocumentEditorProps {
  template: DocumentTemplate;
  formData: Record<string, string>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  onBack: () => void;
  onExport: () => void;
  onNext?: () => void;
  currentSection: string;
}

const DocumentEditor: React.FC<DocumentEditorProps> = ({
  template,
  formData,
  setFormData,
  onBack,
  onExport,
  onNext,
  currentSection,
}) => {
  const handleChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('photo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Filtruj pola formularza według sekcji
  const sectionFields = template.fields.filter(field => field.section === currentSection);
  
  // Mapowanie sekcji na tytuły
  const sectionTitles: Record<string, string> = {
    'dane_osobowe': 'Dane osobowe',
    'odbiorca': 'Odbiorca',
    'tresc_listu': 'Treść listu',
    'klauzula': 'Klauzula',
    'konfiguracja': 'Konfiguracja',
    'doswiadczenie': 'Doświadczenie zawodowe',
    'edukacja': 'Wykształcenie',
    'umiejetnosci': 'Umiejętności',
    'jezyki': 'Języki obce',
    'zainteresowania': 'Zainteresowania'
  };

  // Sekcja opis dla różnych typów sekcji
  const sectionDescriptions: Record<string, string> = {
    'dane_osobowe': 'Wprowadź swoje dane osobowe',
    'odbiorca': 'Wprowadź dane odbiorcy',
    'tresc_listu': 'Napisz treść swojego listu motywacyjnego',
    'klauzula': 'Dodaj klauzulę o przetwarzaniu danych osobowych',
    'konfiguracja': 'Dostosuj wygląd dokumentu',
    'doswiadczenie': 'Dodaj informacje o swoim doświadczeniu zawodowym',
    'edukacja': 'Uzupełnij dane o swoim wykształceniu',
    'umiejetnosci': 'Wymień swoje umiejętności',
    'jezyki': 'Podaj znane Ci języki obce i poziom ich znajomości',
    'zainteresowania': 'Opisz swoje zainteresowania i hobby'
  };

  const formatHelpers: Record<string, string> = {
    'doswiadczenie': `Format: 
Nazwa firmy | Stanowisko | Okres zatrudnienia
- Osiągnięcie 1
- Osiągnięcie 2
    `,
    'edukacja': `Format:
Nazwa uczelni | Kierunek | Okres
- Dodatkowe informacje`,
    'umiejetnosci': `Format:
- Umiejętność 1
- Umiejętność 2`,
    'jezyki': `Format:
- Język angielski - poziom B2
- Język niemiecki - poziom A2`,
    'zainteresowania': `Format:
- Zainteresowanie 1
- Zainteresowanie 2`
  };

  return (
    <Card className="shadow-subtle">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Button variant="ghost" size="sm" onClick={onBack} className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            <span>Wróć</span>
          </Button>
          <Button size="sm" onClick={onExport} className="flex items-center gap-1">
            <FileDown className="h-4 w-4" />
            <span>Eksportuj PDF</span>
          </Button>
        </div>
        <CardTitle>{sectionTitles[currentSection] || 'Edycja dokumentu'}</CardTitle>
        <CardDescription>
          {sectionDescriptions[currentSection] || ''}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {currentSection === 'dane_osobowe' && (
            <div className="mb-6 flex flex-col items-center">
              <div className="w-32 h-40 border rounded-md overflow-hidden mb-2 bg-gray-100 flex items-center justify-center">
                {formData.photo ? (
                  <img 
                    src={formData.photo} 
                    alt="Zdjęcie użytkownika" 
                    className="w-full h-full object-cover rounded" 
                  />
                ) : (
                  <div className="text-gray-400 flex flex-col items-center">
                    <Upload size={24} />
                    <span className="text-xs mt-1">Brak zdjęcia</span>
                  </div>
                )}
              </div>
              <label htmlFor="photo-upload" className="cursor-pointer">
                <div className="text-primary text-sm flex items-center">
                  <Upload size={14} className="mr-1" />
                  <span>Dodaj zdjęcie</span>
                </div>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
              </label>
            </div>
          )}

          {formatHelpers[currentSection] && (
            <div className="bg-slate-50 p-3 rounded-md text-sm text-slate-600 mb-4">
              <p className="font-semibold mb-1">Wskazówka:</p>
              <pre className="whitespace-pre-wrap text-xs">
                {formatHelpers[currentSection]}
              </pre>
            </div>
          )}

          {sectionFields.filter(field => field.type !== 'photo').map((field) => (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={field.id}>
                {field.label}
                {field.required && <span className="text-destructive ml-1">*</span>}
              </Label>
              {field.type === 'textarea' ? (
                <Textarea
                  id={field.id}
                  placeholder={field.placeholder}
                  value={formData[field.id] || field.defaultValue || ''}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  required={field.required}
                  className="min-h-[200px] font-mono text-sm"
                />
              ) : field.type === 'date' ? (
                <Input
                  id={field.id}
                  type="date"
                  value={formData[field.id] || field.defaultValue || ''}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  required={field.required}
                />
              ) : field.type === 'email' ? (
                <Input
                  id={field.id}
                  type="email"
                  placeholder={field.placeholder}
                  value={formData[field.id] || field.defaultValue || ''}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  required={field.required}
                />
              ) : field.type === 'tel' ? (
                <Input
                  id={field.id}
                  type="tel"
                  placeholder={field.placeholder}
                  value={formData[field.id] || field.defaultValue || ''}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  required={field.required}
                />
              ) : (
                <Input
                  id={field.id}
                  type="text"
                  placeholder={field.placeholder}
                  value={formData[field.id] || field.defaultValue || ''}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  required={field.required}
                />
              )}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" />
          Wróć
        </Button>
        {onNext ? (
          <Button onClick={onNext} className="flex items-center gap-1">
            Dalej
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={onExport} className="flex items-center gap-1">
            <FileDown className="h-4 w-4" />
            Eksportuj PDF
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default DocumentEditor;
