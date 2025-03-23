
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NavigationItem from './navigation/NavigationItem';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-primary" />
          <span className="font-medium tracking-tight text-lg">APDocs</span>
        </Link>
        <nav className="hidden ml-10 md:flex items-center space-x-4 lg:space-x-6">
          <NavigationItem to="/" label="Strona główna" />
          <NavigationItem to="/editor" label="Edytor" />
          <NavigationItem to="/o-mnie" label="O mnie" />
          <NavigationItem to="/kontakt" label="Kontakt" />
        </nav>
        <div className="flex-1" />
        <div className="hidden md:flex items-center">
          <Link to="/editor">
            <Button size="sm">Rozpocznij</Button>
          </Link>
        </div>
        <button
          className="ml-2 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-b">
            <NavigationItem to="/" label="Strona główna" mobile />
            <NavigationItem to="/editor" label="Edytor" mobile />
            <NavigationItem to="/o-mnie" label="O mnie" mobile />
            <NavigationItem to="/kontakt" label="Kontakt" mobile />
            <div className="pt-2">
              <Link to="/editor">
                <Button className="w-full">Rozpocznij</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
