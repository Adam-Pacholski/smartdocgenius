
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavigationItemProps {
  to: string;
  label: string;
  mobile?: boolean;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ to, label, mobile }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  if (mobile) {
    return (
      <Link 
        to={to} 
        className={cn(
          "block px-3 py-2 rounded-md text-base font-medium transition-colors",
          isActive 
            ? "bg-primary/10 text-primary" 
            : "text-muted-foreground hover:text-foreground hover:bg-accent"
        )}
      >
        {label}
      </Link>
    );
  }

  return (
    <Link 
      to={to} 
      className={cn(
        "relative py-1.5 text-sm font-medium transition-colors after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:origin-center after:scale-x-0 after:transform after:rounded-full after:bg-primary after:transition-transform after:duration-200",
        isActive 
          ? "text-primary after:scale-x-100" 
          : "text-muted-foreground hover:text-foreground hover:after:scale-x-30"
      )}
    >
      {label}
    </Link>
  );
};

export default NavigationItem;
