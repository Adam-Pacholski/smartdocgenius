
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DragEndEvent } from '@dnd-kit/core';
import { DocumentTemplate } from '@/lib/templates';
import { parseExistingEntries, formatEntriesToString } from '@/lib/utils/form-data-utils';
import { sectionTitles, sectionDescriptions } from '@/lib/constants/section-text';
import SectionContentRenderer from '@/components/editor/SectionContentRenderer';
import EditorFooter from '@/components/editor/EditorFooter';

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
    // Parse existing entries from form data
    const parsed = {
      doswiadczenie: parseExistingEntries('doswiadczenie', formData),
      edukacja: parseExistingEntries('edukacja', formData),
      umiejetnosci: parseExistingEntries('umiejetnosci', formData),
      jezyki: parseExistingEntries('jezyki', formData),
      zainteresowania: parseExistingEntries('zainteresowania', formData),
      portfolio: parseExistingEntries('portfolio', formData),
    };
    
    setMultiEntries(parsed);
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
        setFormData(prevData => ({ ...prevData, [section]: formattedString }));
        
        return {
          ...prev,
          [section]: items
        };
      });
    }
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
      setFormData(prevData => ({ ...prevData, [section]: formattedString }));
      
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
      setFormData(prevData => ({ ...prevData, [section]: formattedString }));
      
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
      setFormData(prevData => ({ ...prevData, [section]: formattedString }));
      
      return {
        ...prev,
        [section]: newEntries
      };
    });
  };

  const sectionFields = template.fields.filter(field => field.section === currentSection);

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>{sectionTitles[currentSection]}</CardTitle>
        <CardDescription>{sectionDescriptions[currentSection]}</CardDescription>
      </CardHeader>
      <CardContent>
        <SectionContentRenderer
          currentSection={currentSection}
          sectionFields={sectionFields}
          formData={formData}
          multiEntries={multiEntries}
          handleChange={handleChange}
          handlePhotoUpload={handlePhotoUpload}
          onAddEntry={addEntry}
          onRemoveEntry={removeEntry}
          onUpdateEntry={updateEntry}
          onDragEnd={handleDragEnd}
        />
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2 border-t pt-6">
        <EditorFooter
          onBack={onBack}
          onNext={onNext}
          onExport={onExport}
        />
      </CardFooter>
    </Card>
  );
};

export default DocumentEditor;
