
import React, { ReactNode } from 'react';
import Header from './Header';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className={cn("flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full", className)}>
        <div className="animate-fade-in">
          {children}
        </div>
      </main>
      <footer className="py-6 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} APDocs. Wszystkie prawa zastrzeżone.
            </p>
            <div className="flex gap-4">
              <Link to="/polityka-prywatnosci" className="text-sm text-muted-foreground hover:text-foreground">
                Polityka prywatności i cookies
              </Link>
              <Link to="/kontakt" className="text-sm text-muted-foreground hover:text-foreground">
                Kontakt
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
