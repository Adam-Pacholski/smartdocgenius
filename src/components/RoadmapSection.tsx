
import React from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { 
  LayoutTemplate, 
  Languages, 
  Share2, 
  CloudCog
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const RoadmapSection: React.FC = () => {
  const { t } = useLanguage();

  // Roadmap items with translations
  const roadmapItems = [
    {
      title: t('roadmap.templates.title'),
      description: t('roadmap.templates.desc'),
      icon: <LayoutTemplate className="h-5 w-5 text-primary" />,
    },
    {
      title: t('roadmap.languages.title'),
      description: t('roadmap.languages.desc'),
      icon: <Languages className="h-5 w-5 text-primary" />,
    },
    {
      title: t('roadmap.sharing.title'),
      description: t('roadmap.sharing.desc'),
      icon: <Share2 className="h-5 w-5 text-primary" />,
    },
    {
      title: t('roadmap.pro.title'),
      description: t('roadmap.pro.desc'),
      icon: <CloudCog className="h-5 w-5 text-primary" />,
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-10">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
            {t('roadmap.label')}
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
            {t('roadmap.title')}
          </h2>
          <p className="max-w-[650px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {t('roadmap.subtitle')}
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {roadmapItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-muted">
                <AccordionTrigger className="py-5 flex items-center hover:no-underline">
                  <div className="flex items-center">
                    <div className="mr-4 p-2 rounded-full bg-primary/10">
                      {item.icon}
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-medium">{item.title}</h3>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-16 pr-4 pb-5 text-muted-foreground">
                  {item.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
