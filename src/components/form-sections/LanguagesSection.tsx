
import React, { useState } from 'react';
import { DndContext, closestCenter, PointerSensor, KeyboardSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import SortableItem from '@/components/sortable/SortableItem';
import { Textarea } from '@/components/ui/textarea';

interface LanguagesSectionProps {
  entries: Array<Record<string, string | number | boolean>>;
  onDragEnd: (event: DragEndEvent, section: string) => void;
  onAddEntry: (section: string) => void;
  onRemoveEntry: (section: string, index: number) => void;
  onUpdateEntry: (section: string, index: number, field: string, value: string | number | boolean) => void;
}

const LanguagesSection: React.FC<LanguagesSectionProps> = ({
  entries,
  onDragEnd,
  onAddEntry,
  onRemoveEntry,
  onUpdateEntry,
}) => {
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

  // Local state for text inputs
  const [textInputs, setTextInputs] = useState<Record<string, string>>({});

  // Handle input change with local state
  const handleInputChange = (index: number, field: string, value: string) => {
    const key = `lang-${index}-${field}`;
    setTextInputs(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Apply changes when input loses focus
  const handleInputBlur = (index: number, field: string) => {
    const key = `lang-${index}-${field}`;
    const value = textInputs[key];
    if (value !== undefined) {
      onUpdateEntry('jezyki', index, field, value);
    }
  };

  return (
    <div className="space-y-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={(event) => onDragEnd(event, 'jezyki')}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext
          items={entries.map((_, index) => `lang-${index}`)}
          strategy={verticalListSortingStrategy}
        >
          {entries.map((entry, index) => (
            <SortableItem key={`lang-${index}`} id={`lang-${index}`}>
              <div className="p-4 border rounded-md bg-section-bg-secondary dark:bg-gray-800/90 dark:border-gray-700 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="text-gray-400 cursor-move">
                      <GripVertical className="h-5 w-5" />
                    </div>
                    <h4 className="font-medium">Język {index + 1}</h4>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onRemoveEntry('jezyki', index)}
                    className="h-8 text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Usuń
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`language-${index}`}>Język</Label>
                    <Textarea
                      id={`language-${index}`}
                      value={textInputs[`lang-${index}-language`] !== undefined 
                        ? textInputs[`lang-${index}-language`] 
                        : entry.language?.toString() || ''}
                      onChange={(e) => handleInputChange(index, 'language', e.target.value)}
                      onBlur={() => handleInputBlur(index, 'language')}
                      placeholder="np. Język angielski"
                      className="dark:bg-gray-900/80 dark:border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`level-${index}`}>Poziom</Label>
                    <Textarea
                      id={`level-${index}`}
                      value={textInputs[`lang-${index}-level`] !== undefined 
                        ? textInputs[`lang-${index}-level`] 
                        : entry.level?.toString() || ''}
                      onChange={(e) => handleInputChange(index, 'level', e.target.value)}
                      onBlur={() => handleInputBlur(index, 'level')}
                      placeholder="np. poziom B2"
                      className="dark:bg-gray-900/80 dark:border-gray-700"
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
        className="w-full mt-2 border-dashed dark:border-gray-700" 
        onClick={() => onAddEntry('jezyki')}
      >
        <Plus className="h-4 w-4 mr-1" />
        Dodaj język
      </Button>
    </div>
  );
};

export default LanguagesSection;
