import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileDown, ArrowRight } from 'lucide-react';
import { parseMultiEntryData } from '@/lib/templates/template-utils';
import { DragEndEvent } from '@dnd-kit/core';
import { DocumentTemplate } from '@/lib/templates';

// Import our components
import ExperienceSection from '@/components/form-sections/ExperienceSection';
import EducationSection from '@/components/form-sections/EducationSection';
import SkillsSection from '@/components/form-sections/SkillsSection';
import LanguagesSection from '@/components/form-sections/LanguagesSection';
import InterestsSection from '@/components/form-sections/InterestsSection';
import PortfolioSection from '@/components/form-sections/PortfolioSection';
import GenericFieldsSection from '@/components/form-sections/GenericFieldsSection';

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
  const [multiEntries, setMultiEntries] = useState<Record<string, Array<Record<string, string | number | boolean>>>>({
    doswiadczenie: [],
    edukacja: [],
    umiejetnosci: [],
    jezyki: [],
    zainteresowania: [],
    portfolio: [],
  });

  useEffect(() => {
    setMultiEntries({
      doswiadczenie: parseExistingEntries('doswiadczenie'),
      edukacja: parseExistingEntries('edukacja'),
      umiejetnosci: parseExistingSkills(),
      jezyki: parseExistingLanguages(),
      zainteresowania: parseExistingInterests(),
      portfolio: parseExistingPortfolio(),
    });
  }, [formData]);

  function handleDragEnd(event: DragEndEvent, section: string) {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setMultiEntries(prev => {
        const oldIndex = parseInt(active.id.toString().split('-')[1]);
        const newIndex = parseInt(over.id.toString().split('-')[1]);
        
        const items = [...prev[section]];
        const [movedItem] = items.splice(oldIndex, 1);
        items.splice(newIndex, 0, movedItem);
        
        const formattedString = formatEntriesToString(section, items);
        handleChange(section, formattedString);
        
        return {
          ...prev,
          [section]: items
        };
      });
    }
  }

  function parseExistingEntries(fieldName: string): Array<Record<string, string | number | boolean>> {
    if (!formData[fieldName]) return [];
    
    try {
      console.log(`Parsing ${fieldName} data:`, formData[fieldName]);
      const lines = formData[fieldName].split('\n').filter(line => line.trim() !== '' || line === '\n');
      const entries = [];
      let currentEntry: Record<string, string | number | boolean> = {};
      let currentLines: string[] = [];
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        if (line.includes('|') && !line.startsWith('-')) {
          if (Object.keys(currentEntry).length > 0 || currentLines.length > 0) {
            if (currentLines.length > 0) {
              currentEntry.details = currentLines.join('\n');
            }
            entries.push({...currentEntry});
            currentEntry = {};
            currentLines = [];
          }
          
          const parts = line.split('|').map(part => part);
          
          if (fieldName === 'doswiadczenie') {
            currentEntry.company = parts[0] || '';
            currentEntry.position = parts[1] || '';
            
            const periodText = parts[2] || '';
            currentEntry.isCurrent = periodText.includes('do teraz');
            
            if (periodText) {
              const dateParts = periodText.split('-').map(d => d);
              currentEntry.startDate = dateParts[0] || '';
              
              if (dateParts.length > 1 && !currentEntry.isCurrent) {
                currentEntry.endDate = dateParts[1] || '';
              } else {
                currentEntry.endDate = '';
              }
            }
          } else if (fieldName === 'edukacja') {
            currentEntry.school = parts[0] || '';
            currentEntry.degree = parts[1] || '';
            
            const periodText = parts[2] || '';
            currentEntry.isCurrent = periodText.includes('do teraz');
            
            if (periodText) {
              const dateParts = periodText.split('-').map(d => d);
              currentEntry.startDate = dateParts[0] || '';
              
              if (dateParts.length > 1 && !currentEntry.isCurrent) {
                currentEntry.endDate = dateParts[1] || '';
              } else {
                currentEntry.endDate = '';
              }
            }
          }
        } 
        else if (line.trim().length > 0 || line === '\n') {
          // Add any non-empty line or explicit line breaks to the details
          currentLines.push(line);
        }
      }
      
      if (Object.keys(currentEntry).length > 0 || currentLines.length > 0) {
        if (currentLines.length > 0) {
          currentEntry.details = currentLines.join('\n');
        }
        entries.push({...currentEntry});
      }
      
      console.log(`Parsed ${fieldName} entries:`, entries);
      return entries;
    } catch (e) {
      console.error(`Error parsing ${fieldName} entries:`, e);
      return [];
    }
  }

  function parseExistingSkills(): Array<Record<string, string | number | boolean>> {
    if (!formData.umiejetnosci) return [];
    
    try {
      return formData.umiejetnosci.split('\n')
        .filter(line => line.trim() !== '')
        .map(line => {
          if (line.includes('|')) {
            const parts = line.replace(/^-\s*/, '').split('|');
            return {
              skill: parts[0],
              proficiency: parseInt(parts[1]) || 3
            };
          }
          return {
            skill: line.replace(/^-\s*/, ''),
            proficiency: 3
          };
        });
    } catch (e) {
      console.error("Error parsing skills:", e);
      return [];
    }
  }

  function parseExistingLanguages(): Array<Record<string, string | number | boolean>> {
    if (!formData.jezyki) return [];
    
    try {
      return formData.jezyki.split('\n')
        .filter(line => line.trim() !== '')
        .map(line => {
          const parts = line.replace(/^-\s*/, '').split('-');
          return {
            language: parts[0],
            level: parts.length > 1 ? parts[1] : ''
          };
        });
    } catch (e) {
      console.error("Error parsing languages:", e);
      return [];
    }
  }

  function parseExistingInterests(): Array<Record<string, string | number | boolean>> {
    if (!formData.zainteresowania) return [];
    
    try {
      return formData.zainteresowania.split('\n')
        .filter(line => line.trim() !== '')
        .map(line => ({
          interest: line.replace(/^-\s*/, '')
        }));
    } catch (e) {
      console.error("Error parsing interests:", e);
      return [];
    }
  }

  function parseExistingPortfolio(): Array<Record<string, string | number | boolean>> {
    if (!formData.portfolio) return [];
    
    try {
      return formData.portfolio.split('\n')
        .filter(line => line.trim() !== '')
        .map(line => {
          const parts = line.replace(/^-\s*/, '').split('|');
          return {
            title: parts[0] || '',
            url: parts.length > 1 ? parts[1] : '',
            type: parts.length > 2 ? parts[2] : 'website'
          };
        });
    } catch (e) {
      console.error("Error parsing portfolio links:", e);
      return [];
    }
  }

  function formatEntriesToString(fieldName: string, entries: Array<Record<string, string | number | boolean>>): string {
    let result = '';
    
    entries.forEach(entry => {
      if (fieldName === 'doswiadczenie') {
        let period = '';
        if (entry.startDate) {
          const start = entry.startDate.toString();
          const end = entry.endDate ? entry.endDate.toString() : '';
          period = entry.isCurrent ? `${start} - do teraz` : `${start}${end ? ` - ${end}` : ''}`;
        }

        result += `${entry.company ? entry.company.toString() : ''}|${entry.position ? entry.position.toString() : ''}|${period}\n`;
        if (entry.details) {
          result += `${entry.details.toString()}\n`;
        }
      } else if (fieldName === 'edukacja') {
        let period = '';
        if (entry.startDate) {
          const start = entry.startDate.toString();
          const end = entry.endDate ? entry.endDate.toString() : '';
          period = entry.isCurrent ? `${start} - do teraz` : `${start}${end ? ` - ${end}` : ''}`;
        }

        result += `${entry.school ? entry.school.toString() : ''}|${entry.degree ? entry.degree.toString() : ''}|${period}\n`;
        if (entry.details) {
          result += `${entry.details.toString()}\n`;
        }
      } else if (fieldName === 'umiejetnosci') {
        result += `- ${entry.skill ? entry.skill.toString() : ''}|${entry.proficiency !== undefined ? entry.proficiency.toString() : '3'}\n`;
      } else if (fieldName === 'jezyki') {
        result += `- ${entry.language ? entry.language.toString() : ''}-${entry.level ? entry.level.toString() : ''}\n`;
      } else if (fieldName === 'zainteresowania') {
        result += `- ${entry.interest ? entry.interest.toString() : ''}\n`;
      } else if (fieldName === 'portfolio') {
        result += `${entry.title ? entry.title.toString() : ''}|${entry.url ? entry.url.toString() : ''}|${entry.type ? entry.type.toString() : 'website'}\n`;
      }
      
      result += '\n';
    });
    
    return result;
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
      
      const formattedString = formatEntriesToString(section, newEntries);
      handleChange(section, formattedString);
      
      return {
        ...prev,
        [section]: newEntries
      };
    });
  };

  const updateEntry = (section: string, index: number, field: string, value: string | number | boolean) => {
    setMultiEntries(prev => {
      const newEntries = [...prev[section]];
      if (!newEntries[index]) {
        newEntries[index] = {};
      }
      
      newEntries[index][field] = value;
      
      const formattedString = formatEntriesToString(section, newEntries);
      handleChange(section, formattedString);
      
      return {
        ...prev,
        [section]: newEntries
      };
    });
  };

  const sectionFields = template.fields.filter(field => field.section === currentSection);

  const sectionTitles: Record<string, string> = {
    'konfiguracja': 'Konfiguracja',
    'dane_osobowe': 'Dane osobowe',
    'odbiorca': 'Odbiorca',
    'tresc_listu': 'Treść listu',
    'klauzula': 'Klauzula',
    'doswiadczenie': 'Doświadczenie zawodowe',
    'edukacja': 'Wykształcenie',
    'umiejetnosci': 'Umiejętności',
    'jezyki': 'Języki obce',
    'portfolio': 'Portfolio i linki',
    'zainteresowania': 'Zainteresowania'
  };

  const sectionDescriptions: Record<string, string> = {
    'konfiguracja': 'Dostosuj wygląd dokumentu',
    'dane_osobowe': 'Wprowadź swoje dane osobowe',
    'odbiorca': 'Wprowadź dane odbiorcy',
    'tresc_listu': 'Napisz treść swojego listu motywacyjnego',
    'klauzula': 'Dodaj klauzulę o przetwarzaniu danych osobowych',
    'doswiadczenie': 'Dodaj informacje o swoim doświadczeniu zawodowym',
    'edukacja': 'Uzupełnij dane o swoim wykształceniu',
    'umiejetnosci': 'Wymień swoje umiejętności',
    'jezyki': 'Podaj znane Ci języki obce i poziom ich znajomości',
    'portfolio': 'Dodaj linki do swojego portfolio i mediów społecznościowych',
    'zainteresowania': 'Opisz swoje zainteresowania i hobby'
  };

  const renderContent = () => {
    switch (currentSection) {
      case 'doswiadczenie':
        return (
          <ExperienceSection
            entries={multiEntries.doswiadczenie}
            onDragEnd={handleDragEnd}
            onAddEntry={addEntry}
            onRemoveEntry={removeEntry}
            onUpdateEntry={updateEntry}
          />
        );
        
      case 'edukacja':
        return (
          <EducationSection
            entries={multiEntries.edukacja}
            onDragEnd={handleDragEnd}
            onAddEntry={addEntry}
            onRemoveEntry={removeEntry}
            onUpdateEntry={updateEntry}
          />
        );
        
      case 'umiejetnosci':
        return (
          <SkillsSection
            entries={multiEntries.umiejetnosci}
            onDragEnd={handleDragEnd}
            onAddEntry={addEntry}
            onRemoveEntry={removeEntry}
            onUpdateEntry={updateEntry}
            progressColor={formData.skillsProgressColor || '#3498db'}
            onProgressColorChange={(color) => handleChange('skillsProgressColor', color)}
          />
        );
        
      case 'jezyki':
        return (
          <LanguagesSection
            entries={multiEntries.jezyki}
            onDragEnd={handleDragEnd}
            onAddEntry={addEntry}
            onRemoveEntry={removeEntry}
            onUpdateEntry={updateEntry}
          />
        );
        
      case 'zainteresowania':
        return (
          <InterestsSection
            entries={multiEntries.zainteresowania}
            onDragEnd={handleDragEnd}
            onAddEntry={addEntry}
            onRemoveEntry={removeEntry}
            onUpdateEntry={updateEntry}
          />
        );

      case 'portfolio':
        return (
          <PortfolioSection
            entries={multiEntries.portfolio}
            onDragEnd={handleDragEnd}
            onAddEntry={addEntry}
            onRemoveEntry={removeEntry}
            onUpdateEntry={updateEntry}
          />
        );
        
      default:
        return (
          <GenericFieldsSection
            fields={sectionFields}
            formData={formData}
            handleChange={handleChange}
            handlePhotoUpload={handlePhotoUpload}
          />
        );
    }
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>{sectionTitles[currentSection]}</CardTitle>
        <CardDescription>{sectionDescriptions[currentSection]}</CardDescription>
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2 border-t pt-6">
        <Button 
          type="button" 
          variant="outline" 
          className="w-full sm:w-auto" 
          onClick={onBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Wstecz
        </Button>
        <div className="flex-1 flex justify-end gap-2">
          {onNext && (
            <Button 
              type="button" 
              className="w-full sm:w-auto" 
              onClick={onNext}
            >
              Dalej
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
          {!onNext && (
            <Button 
              type="button" 
              className="w-full sm:w-auto" 
              onClick={onExport}
            >
              Pobierz PDF
              <FileDown className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default DocumentEditor;
