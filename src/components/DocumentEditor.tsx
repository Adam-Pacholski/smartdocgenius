
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DocumentTemplate } from '@/lib/templates';
import { ArrowLeft, FileDown, ArrowRight, Upload, Plus, Trash2, GripVertical } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { CSS } from '@dnd-kit/utilities';

interface DocumentEditorProps {
  template: DocumentTemplate;
  formData: Record<string, string>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  onBack: () => void;
  onExport: () => void;
  onNext?: () => void;
  currentSection: string;
}

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          className="cursor-grab mr-2 h-8 w-8 p-0 text-muted-foreground"
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </Button>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

const DocumentEditor: React.FC<DocumentEditorProps> = ({
  template,
  formData,
  setFormData,
  onBack,
  onExport,
  onNext,
  currentSection,
}) => {
  const [multiEntries, setMultiEntries] = useState<Record<string, Array<Record<string, string | number>>>>({
    doswiadczenie: parseExistingEntries('doswiadczenie'),
    edukacja: parseExistingEntries('edukacja'),
    umiejetnosci: parseExistingEntries('umiejetnosci'),
    jezyki: parseExistingEntries('jezyki'),
    zainteresowania: parseExistingEntries('zainteresowania'),
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent, section: string) {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setMultiEntries(prev => {
        const oldIndex = parseInt(active.id.toString().split('-')[1]);
        const newIndex = parseInt(over.id.toString().split('-')[1]);
        
        const items = [...prev[section]];
        const [movedItem] = items.splice(oldIndex, 1);
        items.splice(newIndex, 0, movedItem);
        
        // Update formData with the new sorted entries
        const formattedString = formatEntriesToString(section, items);
        handleChange(section, formattedString);
        
        return {
          ...prev,
          [section]: items
        };
      });
    }
  }

  // Parse existing entries from formData string into array of objects
  function parseExistingEntries(fieldName: string): Array<Record<string, string | number>> {
    if (!formData[fieldName]) return [];
    
    try {
      const lines = formData[fieldName].split('\n').filter(line => line.trim() !== '');
      const entries = [];
      let currentEntry: Record<string, string | number> = {};
      let currentLines: string[] = [];
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // New entry starts
        if (line.includes('|') && !line.startsWith('-')) {
          // Save previous entry if exists
          if (Object.keys(currentEntry).length > 0 || currentLines.length > 0) {
            if (currentLines.length > 0) {
              currentEntry.details = currentLines.join('\n');
            }
            entries.push(currentEntry);
            currentEntry = {};
            currentLines = [];
          }
          
          // Parse header line with pipe separators
          const parts = line.split('|').map(part => part.trim());
          
          if (fieldName === 'doswiadczenie') {
            currentEntry.company = parts[0] || '';
            currentEntry.position = parts[1] || '';
            currentEntry.period = parts[2] || '';
          } else if (fieldName === 'edukacja') {
            currentEntry.school = parts[0] || '';
            currentEntry.degree = parts[1] || '';
            currentEntry.period = parts[2] || '';
          }
        } 
        // Detail lines
        else if (line.startsWith('-')) {
          currentLines.push(line);
        }
        // Simple entries (skills, languages, interests) without pipe separation
        else if (fieldName === 'umiejetnosci' && !line.includes('|') && !line.startsWith('-')) {
          currentEntry = { 
            skill: line.replace(/^-\s*/, ''),
            proficiency: 3 // Default proficiency level (1-5)
          };
          entries.push(currentEntry);
          currentEntry = {};
        } else if (fieldName === 'jezyki' && !line.includes('|') && !line.startsWith('-')) {
          const parts = line.replace(/^-\s*/, '').split('-').map(part => part.trim());
          currentEntry = {
            language: parts[0] || '',
            level: parts[1] || ''
          };
          entries.push(currentEntry);
          currentEntry = {};
        } else if (fieldName === 'zainteresowania' && !line.includes('|') && !line.startsWith('-')) {
          currentEntry = { 
            interest: line.replace(/^-\s*/, '')
          };
          entries.push(currentEntry);
          currentEntry = {};
        }
      }
      
      // Add the last entry
      if (Object.keys(currentEntry).length > 0 || currentLines.length > 0) {
        if (currentLines.length > 0) {
          currentEntry.details = currentLines.join('\n');
        }
        entries.push(currentEntry);
      }
      
      return entries;
    } catch (e) {
      console.error("Error parsing entries:", e);
      return [];
    }
  }

  // Format entries back into string for formData
  function formatEntriesToString(fieldName: string, entries: Array<Record<string, string | number>>): string {
    let result = '';
    
    entries.forEach(entry => {
      if (fieldName === 'doswiadczenie') {
        result += `${entry.company || ''} | ${entry.position || ''} | ${entry.period || ''}\n`;
        if (entry.details) {
          result += `${entry.details}\n`;
        }
      } else if (fieldName === 'edukacja') {
        result += `${entry.school || ''} | ${entry.degree || ''} | ${entry.period || ''}\n`;
        if (entry.details) {
          result += `${entry.details}\n`;
        }
      } else if (fieldName === 'umiejetnosci') {
        result += `- ${entry.skill || ''} | ${entry.proficiency || 3}\n`;
      } else if (fieldName === 'jezyki') {
        result += `- ${entry.language || ''} - ${entry.level || ''}\n`;
      } else if (fieldName === 'zainteresowania') {
        result += `- ${entry.interest || ''}\n`;
      }
      
      result += '\n';
    });
    
    return result.trim();
  }

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

  const addEntry = (section: string) => {
    setMultiEntries(prev => {
      const newEntries = [...prev[section], {}];
      
      // Update formData with formatted string
      const formattedString = formatEntriesToString(section, newEntries);
      handleChange(section, formattedString);
      
      return {
        ...prev,
        [section]: newEntries
      };
    });
  };

  const removeEntry = (section: string, index: number) => {
    setMultiEntries(prev => {
      const newEntries = prev[section].filter((_, i) => i !== index);
      
      // Update formData with formatted string
      const formattedString = formatEntriesToString(section, newEntries);
      handleChange(section, formattedString);
      
      return {
        ...prev,
        [section]: newEntries
      };
    });
  };

  const updateEntry = (section: string, index: number, field: string, value: string | number) => {
    setMultiEntries(prev => {
      const newEntries = [...prev[section]];
      if (!newEntries[index]) {
        newEntries[index] = {};
      }
      newEntries[index][field] = value;
      
      // Update formData with formatted string
      const formattedString = formatEntriesToString(section, newEntries);
      handleChange(section, formattedString);
      
      return {
        ...prev,
        [section]: newEntries
      };
    });
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

  // Renderowanie specjalnego formularza dla sekcji CV
  const renderCVSectionForm = () => {
    switch (currentSection) {
      case 'doswiadczenie':
        return (
          <div className="space-y-4">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={(event) => handleDragEnd(event, 'doswiadczenie')}
              modifiers={[restrictToVerticalAxis]}
            >
              <SortableContext
                items={multiEntries.doswiadczenie.map((_, index) => `exp-${index}`)}
                strategy={verticalListSortingStrategy}
              >
                {multiEntries.doswiadczenie.map((entry, index) => (
                  <SortableItem key={`exp-${index}`} id={`exp-${index}`}>
                    <div className="p-4 border rounded-md bg-gray-50 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Pozycja {index + 1}</h4>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeEntry('doswiadczenie', index)}
                          className="h-8 text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Usuń
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div className="space-y-2">
                          <Label htmlFor={`company-${index}`}>Nazwa firmy</Label>
                          <Input
                            id={`company-${index}`}
                            value={entry.company || ''}
                            onChange={(e) => updateEntry('doswiadczenie', index, 'company', e.target.value)}
                            placeholder="np. ABC Sp. z o.o."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`position-${index}`}>Stanowisko</Label>
                          <Input
                            id={`position-${index}`}
                            value={entry.position || ''}
                            onChange={(e) => updateEntry('doswiadczenie', index, 'position', e.target.value)}
                            placeholder="np. Specjalista ds. marketingu"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`period-${index}`}>Okres zatrudnienia</Label>
                          <Input
                            id={`period-${index}`}
                            value={entry.period || ''}
                            onChange={(e) => updateEntry('doswiadczenie', index, 'period', e.target.value)}
                            placeholder="np. 01.2020 - 06.2022"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`details-${index}`}>Osiągnięcia i zadania</Label>
                        <Textarea
                          id={`details-${index}`}
                          value={entry.details?.toString() || ''}
                          onChange={(e) => updateEntry('doswiadczenie', index, 'details', e.target.value)}
                          placeholder="- Osiągnięcie 1&#10;- Osiągnięcie 2"
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>
                  </SortableItem>
                ))}
              </SortableContext>
            </DndContext>
            
            <Button 
              type="button" 
              variant="outline" 
              className="w-full mt-2" 
              onClick={() => addEntry('doswiadczenie')}
            >
              <Plus className="h-4 w-4 mr-1" />
              Dodaj doświadczenie
            </Button>
          </div>
        );
        
      case 'edukacja':
        return (
          <div className="space-y-4">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={(event) => handleDragEnd(event, 'edukacja')}
              modifiers={[restrictToVerticalAxis]}
            >
              <SortableContext
                items={multiEntries.edukacja.map((_, index) => `edu-${index}`)}
                strategy={verticalListSortingStrategy}
              >
                {multiEntries.edukacja.map((entry, index) => (
                  <SortableItem key={`edu-${index}`} id={`edu-${index}`}>
                    <div className="p-4 border rounded-md bg-gray-50 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Wykształcenie {index + 1}</h4>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeEntry('edukacja', index)}
                          className="h-8 text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Usuń
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div className="space-y-2">
                          <Label htmlFor={`school-${index}`}>Nazwa uczelni/szkoły</Label>
                          <Input
                            id={`school-${index}`}
                            value={entry.school || ''}
                            onChange={(e) => updateEntry('edukacja', index, 'school', e.target.value)}
                            placeholder="np. Uniwersytet Warszawski"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`degree-${index}`}>Kierunek/Tytuł</Label>
                          <Input
                            id={`degree-${index}`}
                            value={entry.degree || ''}
                            onChange={(e) => updateEntry('edukacja', index, 'degree', e.target.value)}
                            placeholder="np. Informatyka, mgr"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`period-${index}`}>Okres</Label>
                          <Input
                            id={`period-${index}`}
                            value={entry.period || ''}
                            onChange={(e) => updateEntry('edukacja', index, 'period', e.target.value)}
                            placeholder="np. 2015 - 2020"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`details-${index}`}>Dodatkowe informacje</Label>
                        <Textarea
                          id={`details-${index}`}
                          value={entry.details?.toString() || ''}
                          onChange={(e) => updateEntry('edukacja', index, 'details', e.target.value)}
                          placeholder="- Specjalizacja&#10;- Ważne projekty"
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>
                  </SortableItem>
                ))}
              </SortableContext>
            </DndContext>
            
            <Button 
              type="button" 
              variant="outline" 
              className="w-full mt-2" 
              onClick={() => addEntry('edukacja')}
            >
              <Plus className="h-4 w-4 mr-1" />
              Dodaj wykształcenie
            </Button>
          </div>
        );
        
      case 'umiejetnosci':
        return (
          <div className="space-y-4">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={(event) => handleDragEnd(event, 'umiejetnosci')}
              modifiers={[restrictToVerticalAxis]}
            >
              <SortableContext
                items={multiEntries.umiejetnosci.map((_, index) => `skill-${index}`)}
                strategy={verticalListSortingStrategy}
              >
                {multiEntries.umiejetnosci.map((entry, index) => (
                  <SortableItem key={`skill-${index}`} id={`skill-${index}`}>
                    <div className="p-4 border rounded-md bg-gray-50 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Umiejętność {index + 1}</h4>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeEntry('umiejetnosci', index)}
                          className="h-8 text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Usuń
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`skill-${index}`}>Umiejętność</Label>
                        <Input
                          id={`skill-${index}`}
                          value={entry.skill || ''}
                          onChange={(e) => updateEntry('umiejetnosci', index, 'skill', e.target.value)}
                          placeholder="np. Tworzenie stron internetowych"
                        />
                      </div>
                      
                      <div className="space-y-2 mt-4">
                        <div className="flex justify-between">
                          <Label htmlFor={`proficiency-${index}`}>Poziom zaawansowania</Label>
                          <span className="text-sm font-medium">{entry.proficiency || 3}/5</span>
                        </div>
                        <Slider
                          id={`proficiency-${index}`}
                          defaultValue={[entry.proficiency as number || 3]}
                          min={1}
                          max={5}
                          step={1}
                          onValueChange={(values) => updateEntry('umiejetnosci', index, 'proficiency', values[0])}
                          className="py-2"
                        />
                        <Progress 
                          value={(Number(entry.proficiency || 3) / 5) * 100} 
                          className="h-2 w-full mt-1" 
                        />
                      </div>
                    </div>
                  </SortableItem>
                ))}
              </SortableContext>
            </DndContext>
            
            <Button 
              type="button" 
              variant="outline" 
              className="w-full mt-2" 
              onClick={() => addEntry('umiejetnosci')}
            >
              <Plus className="h-4 w-4 mr-1" />
              Dodaj umiejętność
            </Button>
          </div>
        );
        
      case 'jezyki':
        return (
          <div className="space-y-4">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={(event) => handleDragEnd(event, 'jezyki')}
              modifiers={[restrictToVerticalAxis]}
            >
              <SortableContext
                items={multiEntries.jezyki.map((_, index) => `lang-${index}`)}
                strategy={verticalListSortingStrategy}
              >
                {multiEntries.jezyki.map((entry, index) => (
                  <SortableItem key={`lang-${index}`} id={`lang-${index}`}>
                    <div className="p-4 border rounded-md bg-gray-50 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Język {index + 1}</h4>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeEntry('jezyki', index)}
                          className="h-8 text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Usuń
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`language-${index}`}>Język</Label>
                          <Input
                            id={`language-${index}`}
                            value={entry.language || ''}
                            onChange={(e) => updateEntry('jezyki', index, 'language', e.target.value)}
                            placeholder="np. Język angielski"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`level-${index}`}>Poziom</Label>
                          <Input
                            id={`level-${index}`}
                            value={entry.level || ''}
                            onChange={(e) => updateEntry('jezyki', index, 'level', e.target.value)}
                            placeholder="np. poziom B2"
                          />
                        </div>
                      </div>
                    </div>
                  </SortableItem>
                ))}
              </SortableContext>
            </DndContext>
            
            <Button 
              type="button" 
              variant="outline" 
              className="w-full mt-2" 
              onClick={() => addEntry('jezyki')}
            >
              <Plus className="h-4 w-4 mr-1" />
              Dodaj język
            </Button>
          </div>
        );
        
      case 'zainteresowania':
        return (
          <div className="space-y-4">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={(event) => handleDragEnd(event, 'zainteresowania')}
              modifiers={[restrictToVerticalAxis]}
            >
              <SortableContext
                items={multiEntries.zainteresowania.map((_, index) => `int-${index}`)}
                strategy={verticalListSortingStrategy}
              >
                {multiEntries.zainteresowania.map((entry, index) => (
                  <SortableItem key={`int-${index}`} id={`int-${index}`}>
                    <div className="p-4 border rounded-md bg-gray-50 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Zainteresowanie {index + 1}</h4>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeEntry('zainteresowania', index)}
                          className="h-8 text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Usuń
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`interest-${index}`}>Zainteresowanie</Label>
                        <Input
                          id={`interest-${index}`}
                          value={entry.interest || ''}
                          onChange={(e) => updateEntry('zainteresowania', index, 'interest', e.target.value)}
                          placeholder="np. Fotografia"
                        />
                      </div>
                    </div>
                  </SortableItem>
                ))}
              </SortableContext>
            </DndContext>
            
            <Button 
              type="button" 
              variant="outline" 
              className="w-full mt-2" 
              onClick={() => addEntry('zainteresowania')}
            >
              <Plus className="h-4 w-4 mr-1" />
              Dodaj zainteresowanie
            </Button>
          </div>
        );
        
      default:
        return null;
    }
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

          {/* Render CV specific forms for relevant sections */}
          {['doswiadczenie', 'edukacja', 'umiejetnosci', 'jezyki', 'zainteresowania'].includes(currentSection) ? (
            renderCVSectionForm()
          ) : (
            // Render regular fields for other sections
            sectionFields.filter(field => field.type !== 'photo').map((field) => (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={field.id}>
                  {field.label}
                  {field.required && <span className="text-destructive ml-1">*</span>}
                </Label>
                {field.type === 'textarea' ? (
                  <Textarea
                    id={field.id}
                    placeholder={field.placeholder}
                    value={formData[field.id] || ''}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    required={field.required}
                    className="min-h-[200px] font-mono text-sm"
                  />
                ) : field.type === 'date' ? (
                  <Input
                    id={field.id}
                    type="date"
                    value={formData[field.id] || ''}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    required={field.required}
                  />
                ) : field.type === 'email' ? (
                  <Input
                    id={field.id}
                    type="email"
                    placeholder={field.placeholder}
                    value={formData[field.id] || ''}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    required={field.required}
                  />
                ) : field.type === 'tel' ? (
                  <Input
                    id={field.id}
                    type="tel"
                    placeholder={field.placeholder}
                    value={formData[field.id] || ''}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    required={field.required}
                  />
                ) : (
                  <Input
                    id={field.id}
                    type="text"
                    placeholder={field.placeholder}
                    value={formData[field.id] || ''}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    required={field.required}
                  />
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2 justify-between pt-4">
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
