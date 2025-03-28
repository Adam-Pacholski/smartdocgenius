
import React from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import SortableItem from '@/components/sortable/SortableItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, Trash2, GripVertical, Link as LinkIcon, Github, Linkedin } from 'lucide-react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Link {
  title: string;
  url: string;
  type: string;
}

interface PortfolioSectionProps {
  entries: Array<Record<string, string | number | boolean>>;
  onDragEnd: (event: DragEndEvent, section: string) => void;
  onAddEntry: (section: string) => void;
  onRemoveEntry: (section: string, index: number) => void;
  onUpdateEntry: (section: string, index: number, field: string, value: string | number | boolean) => void;
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  entries,
  onDragEnd,
  onAddEntry,
  onRemoveEntry,
  onUpdateEntry
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

  const handleDragEnd = (event: DragEndEvent) => {
    onDragEnd(event, 'portfolio');
  };

  const getLinkIcon = (type: string) => {
    switch (type) {
      case 'github':
        return <Github className="h-5 w-5" />;
      case 'linkedin':
        return <Linkedin className="h-5 w-5" />;
      default:
        return <LinkIcon className="h-5 w-5" />;
    }
  };

  const linkTypes = [
    { value: 'website', label: 'Strona WWW' },
    { value: 'github', label: 'GitHub' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'other', label: 'Inny link' }
  ];

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Portfolio i linki</h3>
        <p className="text-sm text-muted-foreground">
          Dodaj linki do swojego portfolio, profili w mediach społecznościowych i innych platform
        </p>
      </div>
      
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext 
          items={entries.map((_, i) => `item-${i}`)}
          strategy={verticalListSortingStrategy}
        >
          {entries.map((entry, index) => (
            <SortableItem key={`item-${index}`} id={`item-${index}`}>
              <div className="bg-white border rounded-lg shadow-sm p-4 mb-4 relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <GripVertical className="h-5 w-5" />
                </div>
                
                <div className="pl-8 pr-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <Label htmlFor={`link-title-${index}`} className="mb-2 block text-sm">Tytuł</Label>
                      <Input
                        id={`link-title-${index}`}
                        value={entry.title?.toString() || ''}
                        onChange={(e) => onUpdateEntry('portfolio', index, 'title', e.target.value)}
                        placeholder="np. Mój GitHub"
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`link-type-${index}`} className="mb-2 block text-sm">Typ</Label>
                      <Select 
                        value={entry.type?.toString() || 'website'} 
                        onValueChange={(value) => onUpdateEntry('portfolio', index, 'type', value)}
                      >
                        <SelectTrigger id={`link-type-${index}`}>
                          <SelectValue placeholder="Wybierz typ linku" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {linkTypes.map(type => (
                              <SelectItem key={type.value} value={type.value}>
                                <div className="flex items-center">
                                  {getLinkIcon(type.value)}
                                  <span className="ml-2">{type.label}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor={`link-url-${index}`} className="mb-2 block text-sm">URL</Label>
                      <Input
                        id={`link-url-${index}`}
                        value={entry.url?.toString() || ''}
                        onChange={(e) => onUpdateEntry('portfolio', index, 'url', e.target.value)}
                        placeholder="https://"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
                
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
                  onClick={() => onRemoveEntry('portfolio', index)}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>
      
      <Button
        type="button"
        variant="outline"
        className="w-full mt-4"
        onClick={() => onAddEntry('portfolio')}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Dodaj link
      </Button>
    </div>
  );
};

export default PortfolioSection;
