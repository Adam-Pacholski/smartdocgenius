
import React from 'react';
import { DndContext, closestCenter, PointerSensor, KeyboardSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import SortableItem from '@/components/sortable/SortableItem';

interface InterestsSectionProps {
  entries: Array<Record<string, string | number | boolean>>;
  onDragEnd: (event: DragEndEvent, section: string) => void;
  onAddEntry: (section: string) => void;
  onRemoveEntry: (section: string, index: number) => void;
  onUpdateEntry: (section: string, index: number, field: string, value: string | number | boolean) => void;
}

const InterestsSection: React.FC<InterestsSectionProps> = ({
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
        onDragEnd={(event) => onDragEnd(event, 'zainteresowania')}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext
          items={entries.map((_, index) => `interest-${index}`)}
          strategy={verticalListSortingStrategy}
        >
          {entries.map((entry, index) => (
            <SortableItem key={`interest-${index}`} id={`interest-${index}`}>
              <div className="p-4 border rounded-md bg-section-bg-secondary dark:bg-gray-800/90 dark:border-gray-700 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="text-gray-400 cursor-move">
                      <GripVertical className="h-5 w-5" />
                    </div>
                    <h4 className="font-medium">Zainteresowanie {index + 1}</h4>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onRemoveEntry('zainteresowania', index)}
                    className="h-8 text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Usuń
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`interest-${index}`}>Zainteresowanie</Label>
                  <Input
                    id={`interest-${index}`}
                    value={entry.interest?.toString() || ''}
                    onChange={(e) => onUpdateEntry('zainteresowania', index, 'interest', e.target.value)}
                    placeholder="np. Fotografia"
                    className="dark:bg-gray-900/80 dark:border-gray-700"
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
        className="w-full mt-2 border-dashed dark:border-gray-700" 
        onClick={() => onAddEntry('zainteresowania')}
      >
        <Plus className="h-4 w-4 mr-1" />
        Dodaj zainteresowanie
      </Button>
    </div>
  );
};

export default InterestsSection;
