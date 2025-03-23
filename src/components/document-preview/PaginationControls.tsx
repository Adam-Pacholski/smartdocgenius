
import React from 'react';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

interface PaginationControlsProps {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  pageCount,
  onPageChange
}) => {
  if (pageCount <= 1) return null;
  
  const pagesToShow = new Set<number>();
  pagesToShow.add(1);
  pagesToShow.add(pageCount);
  
  for (let i = Math.max(1, currentPage - 1); i <= Math.min(pageCount, currentPage + 1); i++) {
    pagesToShow.add(i);
  }
  
  const sortedPages = Array.from(pagesToShow).sort((a, b) => a - b);
  
  return (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => onPageChange(currentPage - 1)}
            className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
        
        {sortedPages.map((page, index) => {
          if (index > 0 && page > sortedPages[index - 1] + 1) {
            return (
              <React.Fragment key={`ellipsis-${page}`}>
                <PaginationItem>
                  <span className="flex h-9 w-9 items-center justify-center opacity-50">...</span>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink 
                    onClick={() => onPageChange(page)}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              </React.Fragment>
            );
          }
          
          return (
            <PaginationItem key={page}>
              <PaginationLink 
                onClick={() => onPageChange(page)}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        
        <PaginationItem>
          <PaginationNext 
            onClick={() => onPageChange(currentPage + 1)}
            className={currentPage === pageCount ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationControls;
