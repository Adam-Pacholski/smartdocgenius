
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

interface DatePickerInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  id: string;
  description?: string;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({ 
  label, 
  value, 
  onChange, 
  id,
  description
}) => {
  const [date, setDate] = useState<Date | undefined>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (value) {
      const parts = value.split('.');
      if (parts.length === 3) {
        const day = parseInt(parts[0]);
        const month = parseInt(parts[1]) - 1;
        const year = parseInt(parts[2]);
        const parsedDate = new Date(year, month, day);
        if (!isNaN(parsedDate.getTime())) {
          setDate(parsedDate);
        }
      }
    }
  }, [value]);

  return (
    <div className="space-y-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <Calendar className="mr-2 h-4 w-4" />
            {date ? format(date, 'dd.MM.yyyy') : <span>Wybierz datę</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-popover border-border" align="start">
          <CalendarComponent
            mode="single"
            selected={date}
            onSelect={(newDate) => {
              setDate(newDate);
              if (newDate) {
                onChange(format(newDate, 'dd.MM.yyyy'));
                setOpen(false);
              }
            }}
            initialFocus
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

export default DatePickerInput;
