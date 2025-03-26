
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Sparkles, CheckCircle } from 'lucide-react';
import Layout from '@/components/Layout';
import RoadmapSection from '@/components/RoadmapSection';
import { Separator } from '@/components/ui/separator';

const features = [
  {
    title: 'Profesjonalne szablony',
    description: 'Różnorodne szablony dokumentów dostosowane do różnych branż i potrzeb.',
    icon: <FileText className="h-6 w-6 text-primary" />,
  },
  {
    title: 'Łatwe w użyciu',
    description: 'Intuicyjny interfejs, który przeprowadzi Cię krok po kroku przez proces tworzenia dokumentu.',
    icon: <CheckCircle className="h-6 w-6 text-primary" />,
  },
  {
    title: 'Zaawansowana personalizacja',
    description: 'Pełna kontrola nad wyglądem i zawartością dokumentów, dostosowanych do Twoich potrzeb.',
    icon: <Sparkles className="h-6 w-6 text-primary" />,
  },
];

const Index: React.FC = () => {
  return (
    <Layout>
      {/* Hero section */}
      <section className="relative py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
              Twórz profesjonalne dokumenty w minutę
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter max-w-3xl text-balance animate-fade-in">
              Twoje profesjonalne dokumenty. Szybko i prosto.
            </h1>
            <p className="max-w-[650px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed animate-fade-in">
              APDocs to nowoczesna aplikacja, która pomoże Ci stworzyć profesjonalne dokumenty w kilka minut.
              Wybieraj spośród różnych typów dokumentów i szablonów dostosowanych do Twoich potrzeb.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 animate-fade-in">
              <Link to="/editor">
                <Button size="lg" className="group">
                  Rozpocznij teraz
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/o-mnie">
                <Button variant="outline" size="lg">
                  Dowiedz się więcej
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#f3f4f6_100%)]" />
      </section>
      
      {/* Features section */}
      <section className="py-12 md:py-24 bg-section-bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Dlaczego APDocs?
            </h2>
            <p className="max-w-[650px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Narzędzie stworzone, aby ułatwić i przyspieszyć proces tworzenia profesjonalnych dokumentów.
            </p>
            <Separator className="w-24 bg-primary/30 h-0.5 mt-2" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-elegant border"
              >
                <div className="p-3 rounded-full bg-primary/10 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Roadmap section */}
      <RoadmapSection />
      
      {/* CTA section */}
      <section className="py-12 md:py-24 bg-section-bg-accent">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl max-w-3xl text-balance">
              Gotowy do tworzenia profesjonalnych dokumentów?
            </h2>
            <p className="max-w-[650px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Dołącz do tysięcy zadowolonych użytkowników i zacznij tworzyć profesjonalne dokumenty już dziś.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Link to="/editor">
                <Button size="lg" className="group">
                  Rozpocznij teraz
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
