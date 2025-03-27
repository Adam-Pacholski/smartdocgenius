
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Sparkles, CheckCircle } from 'lucide-react';
import Layout from '@/components/Layout';
import { Separator } from '@/components/ui/separator';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

const Index: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  
  // Ensure hydration is complete before showing theme-dependent UI
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Hero background style based on theme
  // You can modify these gradients to change the hero section background
  const bgStyle = theme === 'dark' 
    ? { 
        backgroundColor: '#0F1624', 
        background: 'radial-gradient(125% 125% at 50% 10%, #0F1624 40%, #091018 100%)' 
      }
    : { 
        backgroundColor: 'white', 
        background: 'radial-gradient(125% 125% at 50% 10%, #fff 40%, #f3f4f6 100%)' 
      };

  // Features with translations
  const features = [
    {
      title: t('features.templates.title'),
      description: t('features.templates.desc'),
      icon: <FileText className="h-6 w-6 text-primary" />,
    },
    {
      title: t('features.ease.title'),
      description: t('features.ease.desc'),
      icon: <CheckCircle className="h-6 w-6 text-primary" />,
    },
    {
      title: t('features.custom.title'),
      description: t('features.custom.desc'),
      icon: <Sparkles className="h-6 w-6 text-primary" />,
    },
  ];
  
  return (
    <Layout>
      {/* Hero section */}
      <section className="relative py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
              {t('app.subtitle')}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter max-w-3xl text-balance animate-fade-in">
              {t('app.tagline')}
            </h1>
            <p className="max-w-[650px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed animate-fade-in">
              {t('app.description')}
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 animate-fade-in">
              <Link to="/editor">
                <Button size="lg" className="group">
                  {t('button.start')}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/o-mnie">
                <Button variant="outline" size="lg">
                  {t('button.learn')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <div 
          className="absolute inset-0 -z-10 h-full w-full"
          style={mounted ? bgStyle : { backgroundColor: theme === 'dark' ? '#0F1624' : 'white' }}
        />
      </section>
      
      {/* Features section */}
      <section className="py-12 md:py-24 bg-section-bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              {t('features.title')}
            </h2>
            <p className="max-w-[650px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t('features.subtitle')}
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
      
      {/* RoadmapSection removed */}
      
      {/* CTA section */}
      <section className="py-12 md:py-24 bg-section-bg-accent">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl max-w-3xl text-balance">
              {t('cta.title')}
            </h2>
            <p className="max-w-[650px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t('cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Link to="/editor">
                <Button size="lg" className="group">
                  {t('button.start')}
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
