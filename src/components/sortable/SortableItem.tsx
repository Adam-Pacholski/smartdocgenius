
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { GripVertical } from 'lucide-react';

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

export default SortableItem;
