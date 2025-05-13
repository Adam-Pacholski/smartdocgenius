
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
          {/* Add a larger safe zone indicator with better visibility */}
          <div className="absolute left-0 right-0 pointer-events-none" 
               style={{ 
                 top: '-100px',
                 height: '200px',
                 background: 'linear-gradient(180deg, rgba(255,237,237,0) 0%, rgba(255,237,237,0.2) 48%, rgba(255,237,237,0) 100%)',
                 borderTop: '1px dashed rgba(239,68,68,0.2)',
                 borderBottom: '1px dashed rgba(239,68,68,0.2)'
               }}>
          </div>
        </div>
      ))}
    </>
  );
};

export default PageBreakIndicator;
