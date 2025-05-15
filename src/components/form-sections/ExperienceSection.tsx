
import React, { useState } from 'react';
import { DndContext, closestCenter, PointerSensor, KeyboardSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import SortableItem from '@/components/sortable/SortableItem';

interface ExperienceSectionProps {
  entries: Array<Record<string, string | number | boolean>>;
  onDragEnd: (event: DragEndEvent, section: string) => void;
  onAddEntry: (section: string) => void;
  onRemoveEntry: (section: string, index: number) => void;
  onUpdateEntry: (section: string, index: number, field: string, value: string | number | boolean) => void;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
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
  
  // Local state to handle textarea inputs
  const [textInputs, setTextInputs] = useState<Record<string, string>>({});
  
  // Handle text input change with local state
  const handleTextChange = (index: number, field: string, value: string) => {
    const key = `exp-${index}-${field}`;
    setTextInputs(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  // Apply changes to parent state when blur occurs
  const handleTextBlur = (index: number, field: string) => {
    const key = `exp-${index}-${field}`;
    const value = textInputs[key];
    if (value !== undefined) {
      onUpdateEntry('doswiadczenie', index, field, value);
    }
  };

  return (
    <div className="space-y-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={(event) => onDragEnd(event, 'doswiadczenie')}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext
          items={entries.map((_, index) => `exp-${index}`)}
          strategy={verticalListSortingStrategy}
        >
          {entries.map((entry, index) => (
            <SortableItem key={`exp-${index}`} id={`exp-${index}`}>
              <div className="p-4 border rounded-md bg-section-bg-secondary dark:bg-gray-800/90 dark:border-gray-700 mb-4 form-list-item shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="text-gray-400 cursor-move hover:text-gray-600 dark:hover:text-gray-300">
                      <GripVertical className="h-5 w-5" />
                    </div>
                    <h4 className="font-medium">Pozycja {index + 1}</h4>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onRemoveEntry('doswiadczenie', index)}
                    className="h-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Usuń
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div className="space-y-2">
                    <Label htmlFor={`company-${index}`}>Nazwa firmy</Label>
                    <Input
                      id={`company-${index}`}
                      value={textInputs[`exp-${index}-company`] !== undefined 
                        ? textInputs[`exp-${index}-company`] 
                        : entry.company?.toString() || ''}
                      onChange={(e) => handleTextChange(index, 'company', e.target.value)}
                      onBlur={() => handleTextBlur(index, 'company')}
                      placeholder="np. ABC Sp. z o.o."
                      className="dark:bg-gray-900/80 dark:border-gray-700 focus:ring-1 focus:ring-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`position-${index}`}>Stanowisko</Label>
                    <Input
                      id={`position-${index}`}
                      value={textInputs[`exp-${index}-position`] !== undefined 
                        ? textInputs[`exp-${index}-position`] 
                        : entry.position?.toString() || ''}
                      onChange={(e) => handleTextChange(index, 'position', e.target.value)}
                      onBlur={() => handleTextBlur(index, 'position')}
                      placeholder="np. Specjalista ds. marketingu"
                      className="dark:bg-gray-900/80 dark:border-gray-700 focus:ring-1 focus:ring-primary/20"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div className="space-y-2">
                    <Label htmlFor={`start-date-${index}`}>Data rozpoczęcia</Label>
                    <Input
                      id={`start-date-${index}`}
                      value={textInputs[`exp-${index}-startDate`] !== undefined 
                        ? textInputs[`exp-${index}-startDate`] 
                        : entry.startDate?.toString() || ''}
                      onChange={(e) => handleTextChange(index, 'startDate', e.target.value)}
                      onBlur={() => handleTextBlur(index, 'startDate')}
                      placeholder="np. 01.05.2023"
                      className="dark:bg-gray-900/80 dark:border-gray-700 focus:ring-1 focus:ring-primary/20"
                    />
                    <p className="text-xs text-muted-foreground">Format: DD.MM.RRRR (np. 01.05.2023)</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`end-date-${index}`}>Data zakończenia</Label>
                    <Input
                      id={`end-date-${index}`}
                      value={textInputs[`exp-${index}-endDate`] !== undefined 
                        ? textInputs[`exp-${index}-endDate`] 
                        : entry.endDate?.toString() || ''}
                      onChange={(e) => handleTextChange(index, 'endDate', e.target.value)}
                      onBlur={() => handleTextBlur(index, 'endDate')}
                      placeholder="np. 01.05.2024"
                      className="dark:bg-gray-900/80 dark:border-gray-700 focus:ring-1 focus:ring-primary/20"
                      disabled={!!entry.isCurrent}
                    />
                    <p className="text-xs text-muted-foreground">Format: DD.MM.RRRR (np. 01.05.2024)</p>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex items-center justify-start space-x-2">
                    <Switch
                      id={`is-current-${index}`}
                      checked={!!entry.isCurrent}
                      onCheckedChange={(checked) => {
                        onUpdateEntry('doswiadczenie', index, 'isCurrent', Boolean(checked));
                      }}
                      className="data-[state=checked]:bg-primary"
                    />
                    <Label htmlFor={`is-current-${index}`} className="cursor-pointer">Obecnie pracuję</Label>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`details-${index}`}>Osiągnięcia i zadania</Label>
                  <Textarea
                    id={`details-${index}`}
                    value={textInputs[`exp-${index}-details`] !== undefined 
                      ? textInputs[`exp-${index}-details`] 
                      : entry.details?.toString() || ''}
                    onChange={(e) => handleTextChange(index, 'details', e.target.value)}
                    onBlur={() => handleTextBlur(index, 'details')}
                    placeholder="- Osiągnięcie 1&#10;- Osiągnięcie 2"
                    className="min-h-[100px] dark:bg-gray-900/80 dark:border-gray-700 focus:ring-1 focus:ring-primary/20"
                    preserveWhitespace={true}
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
        className="w-full mt-2 border-dashed dark:border-gray-700 hover:bg-accent/50" 
        onClick={() => onAddEntry('doswiadczenie')}
      >
        <Plus className="h-4 w-4 mr-1" />
        Dodaj doświadczenie
      </Button>
    </div>
  );
};

export default ExperienceSection;
