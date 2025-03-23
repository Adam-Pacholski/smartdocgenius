
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FloatingPageControlsProps {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

const FloatingPageControls: React.FC<FloatingPageControlsProps> = ({
  currentPage,
  pageCount,
  onPageChange
}) => {
  if (pageCount <= 1) return null;
  
  return (
    <div className="absolute top-2 right-2 bg-white shadow-md rounded-md px-2 py-1 text-sm flex items-center">
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span>{currentPage} / {pageCount}</span>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8"
        disabled={currentPage === pageCount}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default FloatingPageControls;
