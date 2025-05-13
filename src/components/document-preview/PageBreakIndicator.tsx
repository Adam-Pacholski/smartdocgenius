
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
          {/* Add a larger safe zone indicator */}
          <div className="absolute left-0 right-0 h-[160px] bg-red-100/10 pointer-events-none" 
               style={{ top: '-80px' }}>
          </div>
        </div>
      ))}
    </>
  );
};

export default PageBreakIndicator;
