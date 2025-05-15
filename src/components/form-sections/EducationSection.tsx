
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

interface EducationSectionProps {
  entries: Array<Record<string, string | number | boolean>>;
  onDragEnd: (event: DragEndEvent, section: string) => void;
  onAddEntry: (section: string) => void;
  onRemoveEntry: (section: string, index: number) => void;
  onUpdateEntry: (section: string, index: number, field: string, value: string | number | boolean) => void;
}

const EducationSection: React.FC<EducationSectionProps> = ({
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

  // Local state to handle text inputs
  const [textInputs, setTextInputs] = useState<Record<string, string>>({});
  
  // Handle text input change with local state
  const handleTextChange = (index: number, field: string, value: string) => {
    const key = `edu-${index}-${field}`;
    setTextInputs(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  // Apply changes to parent state when blur occurs
  const handleTextBlur = (index: number, field: string) => {
    const key = `edu-${index}-${field}`;
    const value = textInputs[key];
    if (value !== undefined) {
      onUpdateEntry('edukacja', index, field, value);
    }
  };

  return (
    <div className="space-y-6">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={(event) => onDragEnd(event, 'edukacja')}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext
          items={entries.map((_, index) => `edu-${index}`)}
          strategy={verticalListSortingStrategy}
        >
          {entries.map((entry, index) => (
            <SortableItem key={`edu-${index}`} id={`edu-${index}`}>
              <div className="p-4 border rounded-md bg-section-bg-secondary dark:bg-gray-800/90 dark:border-gray-700 mb-4 form-list-item shadow-sm">
                <div className="flex items-center justify-between mb-3 pb-2 border-b dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="text-gray-400 cursor-move">
                      <GripVertical className="h-5 w-5" />
                    </div>
                    <h4 className="font-medium text-primary dark:text-primary">Wykształcenie {index + 1}</h4>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onRemoveEntry('edukacja', index)}
                    className="h-8 text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Usuń
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div className="space-y-2">
                    <Label htmlFor={`school-${index}`}>Nazwa uczelni/szkoły</Label>
                    <Input
                      id={`school-${index}`}
                      value={textInputs[`edu-${index}-school`] !== undefined 
                        ? textInputs[`edu-${index}-school`] 
                        : entry.school?.toString() || ''}
                      onChange={(e) => handleTextChange(index, 'school', e.target.value)}
                      onBlur={() => handleTextBlur(index, 'school')}
                      placeholder="np. Uniwersytet Warszawski"
                      className="dark:bg-gray-900/80 dark:border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`degree-${index}`}>Kierunek/Tytuł</Label>
                    <Input
                      id={`degree-${index}`}
                      value={textInputs[`edu-${index}-degree`] !== undefined 
                        ? textInputs[`edu-${index}-degree`] 
                        : entry.degree?.toString() || ''}
                      onChange={(e) => handleTextChange(index, 'degree', e.target.value)}
                      onBlur={() => handleTextBlur(index, 'degree')}
                      placeholder="np. Informatyka, mgr"
                      className="dark:bg-gray-900/80 dark:border-gray-700"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div className="space-y-2">
                    <Label htmlFor={`edu-start-date-${index}`}>Data rozpoczęcia</Label>
                    <Input
                      id={`edu-start-date-${index}`}
                      value={textInputs[`edu-${index}-startDate`] !== undefined 
                        ? textInputs[`edu-${index}-startDate`] 
                        : entry.startDate?.toString() || ''}
                      onChange={(e) => handleTextChange(index, 'startDate', e.target.value)}
                      onBlur={() => handleTextBlur(index, 'startDate')}
                      placeholder="np. 01.10.2018"
                      className="dark:bg-gray-900/80 dark:border-gray-700"
                    />
                    <p className="text-xs text-muted-foreground">Format: DD.MM.RRRR (np. 01.10.2018)</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`edu-end-date-${index}`}>Data zakończenia</Label>
                    <Input
                      id={`edu-end-date-${index}`}
                      value={textInputs[`edu-${index}-endDate`] !== undefined 
                        ? textInputs[`edu-${index}-endDate`] 
                        : entry.endDate?.toString() || ''}
                      onChange={(e) => handleTextChange(index, 'endDate', e.target.value)}
                      onBlur={() => handleTextBlur(index, 'endDate')}
                      placeholder="np. 30.06.2023"
                      className="dark:bg-gray-900/80 dark:border-gray-700"
                      disabled={!!entry.isCurrent}
                    />
                    <p className="text-xs text-muted-foreground">Format: DD.MM.RRRR (np. 30.06.2023)</p>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex items-center justify-start space-x-2">
                    <Switch
                      id={`edu-is-current-${index}`}
                      checked={!!entry.isCurrent}
                      onCheckedChange={(checked) => {
                        onUpdateEntry('edukacja', index, 'isCurrent', Boolean(checked));
                      }}
                    />
                    <Label htmlFor={`edu-is-current-${index}`} className="cursor-pointer">W trakcie</Label>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`edu-details-${index}`}>Dodatkowe informacje</Label>
                  <Textarea
                    id={`edu-details-${index}`}
                    value={textInputs[`edu-${index}-details`] !== undefined 
                      ? textInputs[`edu-${index}-details`] 
                      : entry.details?.toString() || ''}
                    onChange={(e) => handleTextChange(index, 'details', e.target.value)}
                    onBlur={() => handleTextBlur(index, 'details')}
                    placeholder="- Specjalizacja&#10;- Ważne projekty"
                    className="min-h-[100px] dark:bg-gray-900/80 dark:border-gray-700"
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
        className="w-full mt-2 border-dashed border-2 dark:border-gray-700" 
        onClick={() => onAddEntry('edukacja')}
      >
        <Plus className="h-4 w-4 mr-1" />
        Dodaj wykształcenie
      </Button>
    </div>
  );
};

export default EducationSection;
