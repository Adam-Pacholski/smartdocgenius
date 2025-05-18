
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

interface PreviewPaginationProps {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

const PreviewPagination: React.FC<PreviewPaginationProps> = ({ 
  currentPage, 
  pageCount, 
  onPageChange 
}) => {
  if (pageCount <= 1) return null;
  
  // Generate page numbers to show (first, last, and around current)
  const pagesToShow = new Set<number>();
  pagesToShow.add(1); // Always show first page
  pagesToShow.add(pageCount); // Always show last page
  
  // Show pages around current
  for (let i = Math.max(1, currentPage - 1); i <= Math.min(pageCount, currentPage + 1); i++) {
    pagesToShow.add(i);
  }
  
  const sortedPages = Array.from(pagesToShow).sort((a, b) => a - b);
  
  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= pageCount && page !== currentPage) {
      onPageChange(page);
    }
  };
  
  return (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => handlePageClick(currentPage - 1)}
            className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>
        
        {sortedPages.map((page, index) => {
          // Check if we need to add ellipsis
          if (index > 0 && page > sortedPages[index - 1] + 1) {
            return (
              <React.Fragment key={`ellipsis-${page}`}>
                <PaginationItem>
                  <span className="flex h-9 w-9 items-center justify-center opacity-50">...</span>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink 
                    onClick={() => handlePageClick(page)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
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
                onClick={() => handlePageClick(page)}
                isActive={currentPage === page}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        
        <PaginationItem>
          <PaginationNext 
            onClick={() => handlePageClick(currentPage + 1)}
            className={currentPage === pageCount ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            aria-disabled={currentPage === pageCount}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PreviewPagination;
