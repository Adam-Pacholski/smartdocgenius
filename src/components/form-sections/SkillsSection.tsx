
import React from 'react';
import { DndContext, closestCenter, PointerSensor, KeyboardSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Plus, Trash2 } from 'lucide-react';
import SortableItem from '@/components/sortable/SortableItem';

interface SkillsSectionProps {
  entries: Array<Record<string, string | number | boolean>>;
  onDragEnd: (event: DragEndEvent, section: string) => void;
  onAddEntry: (section: string) => void;
  onRemoveEntry: (section: string, index: number) => void;
  onUpdateEntry: (section: string, index: number, field: string, value: string | number | boolean) => void;
  progressColor: string;
  onProgressColorChange: (color: string) => void;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({
  entries,
  onDragEnd,
  onAddEntry,
  onRemoveEntry,
  onUpdateEntry,
  progressColor,
  onProgressColorChange,
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
      <div className="space-y-4 mb-4 p-4 border rounded-md bg-gray-50">
        <Label htmlFor="skillsProgressColor">Kolor paska umiejętności</Label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            id="skillsProgressColor"
            value={progressColor || '#3498db'}
            onChange={(e) => onProgressColorChange(e.target.value)}
            className="w-14 h-10 cursor-pointer rounded border"
          />
          <div className="flex-1">
            <Progress 
              value={75} 
              progressColor={progressColor || '#3498db'} 
              className="h-4 w-full" 
            />
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Wybierz kolor, który będzie użyty do wyświetlania poziomu umiejętności
        </p>
      </div>
      
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={(event) => onDragEnd(event, 'umiejetnosci')}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext
          items={entries.map((_, index) => `skill-${index}`)}
          strategy={verticalListSortingStrategy}
        >
          {entries.map((entry, index) => (
            <SortableItem key={`skill-${index}`} id={`skill-${index}`}>
              <div className="p-4 border rounded-md bg-gray-50 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Umiejętność {index + 1}</h4>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onRemoveEntry('umiejetnosci', index)}
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
                    value={entry.skill?.toString() || ''}
                    onChange={(e) => onUpdateEntry('umiejetnosci', index, 'skill', e.target.value)}
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
                    value={[entry.proficiency as number || 3]}
                    min={1}
                    max={5}
                    step={1}
                    onValueChange={(values) => onUpdateEntry('umiejetnosci', index, 'proficiency', values[0])}
                    className="py-2"
                  />
                  <Progress 
                    value={(Number(entry.proficiency || 3) / 5) * 100} 
                    progressColor={progressColor || undefined}
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
        onClick={() => onAddEntry('umiejetnosci')}
      >
        <Plus className="h-4 w-4 mr-1" />
        Dodaj umiejętność
      </Button>
    </div>
  );
};

export default SkillsSection;
