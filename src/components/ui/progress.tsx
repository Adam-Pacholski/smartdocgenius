
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all duration-300 ease-in-out"
      style={{ 
        transform: `translateX(-${100 - (value || 0)}%)`,
        backgroundImage: value && value > 80 ? 'linear-gradient(90deg, #8B5CF6, #D946EF)' :
                         value && value > 60 ? 'linear-gradient(90deg, #9b87f5, #8B5CF6)' :
                         value && value > 40 ? 'linear-gradient(90deg, #0EA5E9, #9b87f5)' :
                         value && value > 20 ? 'linear-gradient(90deg, #33C3F0, #0EA5E9)' :
                         'linear-gradient(90deg, #56CCF2, #33C3F0)'
      }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
