
import React from 'react';
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
import DatePickerInput from '@/components/date-picker/DatePickerInput';

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
                      value={entry.company?.toString() || ''}
                      onChange={(e) => onUpdateEntry('doswiadczenie', index, 'company', e.target.value)}
                      placeholder="np. ABC Sp. z o.o."
                      className="dark:bg-gray-900/80 dark:border-gray-700 focus:ring-1 focus:ring-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`position-${index}`}>Stanowisko</Label>
                    <Input
                      id={`position-${index}`}
                      value={entry.position?.toString() || ''}
                      onChange={(e) => onUpdateEntry('doswiadczenie', index, 'position', e.target.value)}
                      placeholder="np. Specjalista ds. marketingu"
                      className="dark:bg-gray-900/80 dark:border-gray-700 focus:ring-1 focus:ring-primary/20"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div className="space-y-2">
                    <DatePickerInput 
                      label="Data rozpoczęcia" 
                      value={entry.startDate?.toString() || ''} 
                      onChange={(value) => onUpdateEntry('doswiadczenie', index, 'startDate', value)}
                      id={`start-date-${index}`}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <DatePickerInput 
                      label="Data zakończenia" 
                      value={entry.endDate?.toString() || ''} 
                      onChange={(value) => onUpdateEntry('doswiadczenie', index, 'endDate', value)}
                      id={`end-date-${index}`}
                    />
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
                    value={entry.details?.toString() || ''}
                    onChange={(e) => onUpdateEntry('doswiadczenie', index, 'details', e.target.value)}
                    placeholder="- Osiągnięcie 1&#10;- Osiągnięcie 2"
                    className="min-h-[100px] dark:bg-gray-900/80 dark:border-gray-700 focus:ring-1 focus:ring-primary/20"
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
