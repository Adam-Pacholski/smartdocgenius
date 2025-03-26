
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

const CookieConsent: React.FC = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookieConsent') === 'true';
    
    if (!hasConsented) {
      // Show the consent banner after a short delay
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-lg z-50 animate-slide-up">
      <div className="max-w-7xl mx-auto p-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between">
        <div className="mb-4 sm:mb-0 pr-10">
          <h3 className="text-lg font-medium">Polityka cookie</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Ta strona używa plików cookie, aby zapewnić najlepsze doświadczenie użytkownika. 
            Korzystając z naszej strony, zgadzasz się na używanie plików cookie zgodnie z naszą{' '}
            <Link to="/polityka-prywatnosci" className="text-primary hover:underline">
              polityką prywatności
            </Link>.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={handleAccept} variant="default">
            Akceptuję
          </Button>
          <Button onClick={() => setShowConsent(false)} variant="ghost" size="icon">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
