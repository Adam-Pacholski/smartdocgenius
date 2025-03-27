
import React from 'react';
import Layout from '@/components/Layout';
import { FileText, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-8">
          <div className="p-3 rounded-full bg-primary/10 mr-4">
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">{t('about.title')}</h1>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-sm mb-8">
          <h2 className="text-xl font-medium text-primary mb-4">{t('about.whoami')}</h2>
          <p className="mb-4 text-muted-foreground">
            Nazywam się Adam Pacholski i jestem pasjonatem nowych technologii oraz profesjonalnym web developerem. 
            Od zawsze fascynowało mnie, jak technologia może zmieniać świat i usprawniać życie ludzi. 
            Moja droga w branży IT zaczęła się od prostych projektów stron internetowych, ale szybko stało się to moją pasją i zawodowym powołaniem.
          </p>
          <p className="mb-4 text-muted-foreground">
            Nieustannie rozwijam swoje umiejętności, eksplorując nowe technologie i narzędzia, 
            które pozwalają mi tworzyć nowoczesne, responsywne i funkcjonalne strony internetowe oraz aplikacje webowe. 
            Moim celem jest dostarczanie rozwiązań, które nie tylko wyglądają estetycznie, ale przede wszystkim są intuicyjne, szybkie i skuteczne. 
            Wierzę, że prostota i użyteczność idą w parze, dlatego projektuję strony, które są łatwe w obsłudze, 
            a jednocześnie technologicznie zaawansowane.
          </p>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-sm mb-8">
          <h2 className="text-xl font-medium text-primary mb-4">{t('about.approach')}</h2>
          <p className="mb-4 text-muted-foreground">
            Dla mnie kluczowym aspektem każdej realizacji jest zrozumienie potrzeb klienta. 
            Każdy projekt traktuję indywidualnie, dostosowując rozwiązania do wymagań biznesowych i oczekiwań użytkowników końcowych. 
            Zależy mi na budowaniu długoterminowych relacji opartych na zaufaniu, dlatego zawsze dbam o transparentność współpracy, 
            rzetelną komunikację i najwyższą jakość kodu.
          </p>
          <p className="mb-4 text-muted-foreground">
            Nie boję się wyzwań i trudnych projektów – wręcz przeciwnie, to one mnie motywują do dalszego rozwoju. 
            Moja ambicja nie pozwala mi stać w miejscu, dlatego stale podnoszę swoje kwalifikacje, 
            uczestniczę w kursach, śledzę nowinki technologiczne i testuję najnowsze rozwiązania.
          </p>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-sm mb-8">
          <h2 className="text-xl font-medium text-primary mb-4">{t('about.project')}</h2>
          <p className="mb-4 text-muted-foreground">
            APDocs powstał w ramach mojej edukacji i doskonalenia umiejętności programistycznych przy współpracy z technologiami AI. 
            Jest to projekt, który łączy moją pasję do tworzenia użytecznych narzędzi z nauką najnowszych technologii.
          </p>
          <p className="mb-4 text-muted-foreground">
            Generator dokumentów jest całkowicie darmowy i otwarty do dalszego rozwoju. Może być swobodnie używany 
            przez wszystkich do tworzenia profesjonalnych dokumentów bez żadnych opłat.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
            <a href="https://www.ap-development.eu" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="w-full sm:w-auto">
                {t('about.visit')}
              </Button>
            </a>
            <Link to="/kontakt">
              <Button variant="default" className="w-full sm:w-auto group">
                {t('about.support')}
                <Heart className="ml-2 h-4 w-4 transition-colors group-hover:text-red-500" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
