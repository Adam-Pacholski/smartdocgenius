
import React from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ThemeToggleProps {
  className?: string;
  variant?: "icon" | "switch";
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className,
  variant = "icon" 
}) => {
  const { theme, toggleTheme } = useTheme();
  
  if (variant === "switch") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Sun className="h-4 w-4 text-muted-foreground" />
        <Switch
          checked={theme === "dark"}
          onCheckedChange={toggleTheme}
          aria-label={theme === "dark" ? "Przełącz na tryb jasny" : "Przełącz na tryb ciemny"}
        />
        <Moon className="h-4 w-4 text-muted-foreground" />
      </div>
    );
  }
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className={cn("rounded-full", className)}
            aria-label={theme === "dark" ? "Przełącz na tryb jasny" : "Przełącz na tryb ciemny"}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-yellow-300" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{theme === "dark" ? "Tryb jasny" : "Tryb ciemny"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ThemeToggle;
