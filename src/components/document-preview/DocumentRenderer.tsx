
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import PageBreakIndicator from './PageBreakIndicator';

interface DocumentRendererProps {
  htmlContent: string;
  pageCount: number;
  scale: number;
  previewLoaded: boolean;
  previewRef: React.RefObject<HTMLDivElement>;
}

const DocumentRenderer: React.FC<DocumentRendererProps> = ({
  htmlContent,
  pageCount,
  scale,
  previewLoaded,
  previewRef
}) => {
  return (
    <ScrollArea 
      className="w-full h-[800px]"
      scrollHideDelay={0}
    >
      <div className="flex justify-center">
        <div 
          ref={previewRef}
          className="a4-preview bg-white shadow-md"
          style={{ 
            transformOrigin: 'top center',
            width: '794px', // A4 width at 96 DPI
            minHeight: '1123px', // A4 height at 96 DPI
            transform: `scale(${scale})`,
            margin: `0 0 ${(scale - 1) * -600}px 0`, // Adjust bottom margin to prevent scroll issues
            padding: 0,
            maxWidth: '100%'
          }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
      
      {/* Improved bottom padding to prevent content from touching the edge */}
      <div className="h-24"></div>
      
      {/* Page break indicators */}
      {previewLoaded && <PageBreakIndicator pageCount={pageCount} />}
    </ScrollArea>
  );
};

export default DocumentRenderer;
