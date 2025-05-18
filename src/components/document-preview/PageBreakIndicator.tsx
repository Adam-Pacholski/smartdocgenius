
import React from 'react';

interface PageBreakIndicatorProps {
  pageCount: number;
}

const PageBreakIndicator: React.FC<PageBreakIndicatorProps> = ({ pageCount }) => {
  if (pageCount <= 1) return null;
  
  return (
    <>
      {Array.from({ length: pageCount - 1 }).map((_, index) => (
        <div 
          key={index}
          className="absolute left-0 right-0 border-b-2 border-red-400 border-dashed pointer-events-none z-10"
          style={{ top: `${(index + 1) * 1123}px` }}
          data-page-break="true"
        >
          <div className="absolute right-0 bg-red-100 text-red-800 px-2 py-0.5 text-xs rounded-tl-md">
            Podział strony
          </div>
          {/* Dodano wyraźniejszą bezpieczną strefę nad podziałem strony */}
          <div className="absolute left-0 right-0 h-[100px] bg-red-100/20 pointer-events-none" 
               style={{ top: '-50px', borderTop: '1px dotted #f87171' }}>
          </div>
          {/* Dodano bezpieczną strefę na dole strony */}
          <div className="absolute left-0 right-0 h-[100px] bg-red-100/20 pointer-events-none" 
               style={{ top: '0px', borderBottom: '1px dotted #f87171' }}>
          </div>
        </div>
      ))}
    </>
  );
};

export default PageBreakIndicator;
