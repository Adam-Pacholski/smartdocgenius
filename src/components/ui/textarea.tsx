
import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  preserveWhitespace?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, value, preserveWhitespace = true, onChange, ...props }, ref) => {
    // Ensure value is never undefined - convert to empty string
    const safeValue = value === undefined || value === null ? '' : value;
    
    // Create a custom onChange handler to prevent any automatic whitespace insertion
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      // Directly use the raw input value without any processing
      if (onChange) {
        onChange(e);
      }
    };
    
    return (
      <textarea
        value={safeValue}
        onChange={handleChange}
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          preserveWhitespace ? "whitespace-pre-wrap" : "",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
