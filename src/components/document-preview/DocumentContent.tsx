
import React, { useEffect, useState } from 'react';
import { estimatePageCount } from '@/lib/utils/pdf-generator';

interface DocumentContentProps {
  htmlContent: string;
  contentRef: React.RefObject<HTMLDivElement>;
  currentPage: number;
  onPageCountChange: (count: number) => void;
  onLoadComplete: () => void;
}

const DocumentContent: React.FC<DocumentContentProps> = ({
  htmlContent,
  contentRef,
  currentPage,
  onPageCountChange,
  onLoadComplete
}) => {
  const [scale, setScale] = useState(0.85);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (contentRef.current) {
        const count = estimatePageCount(contentRef.current);
        console.log(`Estimated page count: ${count}, content height: ${contentRef.current.scrollHeight}px`);
        setPageCount(Math.max(1, count));
        onPageCountChange(Math.max(1, count));
        
        const previewContainer = contentRef.current.closest('.preview-container');
        if (previewContainer) {
          const containerHeight = previewContainer.clientHeight - 40;
          const contentHeight = contentRef.current.scrollHeight;
          
          if (contentHeight > containerHeight) {
            const newScale = Math.max(0.7, Math.min(0.85, containerHeight / contentHeight));
            setScale(newScale);
          } else {
            setScale(0.85);
          }
        }
        
        onLoadComplete();
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [htmlContent, contentRef, onPageCountChange, onLoadComplete]);

  useEffect(() => {
    if (contentRef.current) {
      const scrollPosition = (currentPage - 1) * 1123;
      contentRef.current.scrollTop = scrollPosition;
    }
  }, [currentPage, contentRef]);

  const renderPageBreaks = () => {
    if (pageCount <= 1) return null;
    
    return Array.from({ length: pageCount - 1 }).map((_, index) => (
      <div 
        key={index}
        className="absolute left-0 right-0 border-b-2 border-red-400 border-dashed pointer-events-none z-10"
        style={{ top: `${(index + 1) * 1123}px` }}
      >
        <div className="absolute right-0 bg-red-100 text-red-800 px-2 py-0.5 text-xs rounded-tl-md">
          Podział strony
        </div>
      </div>
    ));
  };

  return (
    <div className="flex justify-center py-8 px-2">
      <div 
        ref={contentRef}
        className="a4-preview bg-white shadow-md"
        style={{ 
          width: '21cm',
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          minHeight: '29.7cm',
          padding: '1cm',
          margin: '0 auto'
        }}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
      {renderPageBreaks()}
    </div>
  );
};

export default DocumentContent;
