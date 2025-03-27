
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { useLanguage } from "@/contexts/LanguageContext";

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
  const [calendarMonth, setCalendarMonth] = useState<Date | undefined>();
  const { language, t } = useLanguage();

  // Function to format date based on current language
  const formatDateForDisplay = (date: Date): string => {
    return format(date, 'dd.MM.yyyy');
  };

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
          setCalendarMonth(parsedDate);
        }
      }
    }
  }, [value]);

  const handleYearChange = (increment: number) => {
    if (date) {
      const newDate = new Date(date);
      newDate.setFullYear(newDate.getFullYear() + increment);
      setDate(newDate);
      setCalendarMonth(newDate); // Update the calendar view
      onChange(formatDateForDisplay(newDate));
    } else {
      const newDate = new Date();
      newDate.setFullYear(newDate.getFullYear() + increment);
      setDate(newDate);
      setCalendarMonth(newDate); // Update the calendar view
      onChange(formatDateForDisplay(newDate));
    }
  };

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
            {date ? formatDateForDisplay(date) : <span>{t('datepicker.selectDate')}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-popover border-border" align="start">
          <div className="flex justify-between p-2 border-b border-border">
            <Button 
              variant="outline"
              size="sm"
              onClick={() => handleYearChange(-5)}
              type="button"
            >
              -5 {t('datepicker.years')}
            </Button>
            <Button 
              variant="outline"
              size="sm"
              onClick={() => handleYearChange(-1)}
              type="button"
            >
              -1 {t('datepicker.year')}
            </Button>
            <Button 
              variant="outline"
              size="sm"
              onClick={() => handleYearChange(1)}
              type="button"
            >
              +1 {t('datepicker.year')}
            </Button>
            <Button 
              variant="outline"
              size="sm"
              onClick={() => handleYearChange(5)}
              type="button"
            >
              +5 {t('datepicker.years')}
            </Button>
          </div>
          <div className="w-[300px] h-[300px]"> {/* Fixed size container for the calendar */}
            <CalendarComponent
              mode="single"
              selected={date}
              defaultMonth={calendarMonth}
              month={calendarMonth}
              onMonthChange={setCalendarMonth}
              onSelect={(newDate) => {
                setDate(newDate);
                if (newDate) {
                  onChange(formatDateForDisplay(newDate));
                  setOpen(false);
                }
              }}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </div>
        </PopoverContent>
      </Popover>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

export default DatePickerInput;
