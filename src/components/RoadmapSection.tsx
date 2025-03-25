
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

interface RoadmapItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const roadmapItems: RoadmapItem[] = [
  {
    title: 'Więcej szablonów dokumentów',
    description: 'Dodanie nowych profesjonalnych szablonów CV, listów motywacyjnych i innych dokumentów biznesowych.',
    icon: <LayoutTemplate className="h-5 w-5 text-primary" />,
  },
  {
    title: 'Wsparcie wielu języków',
    description: 'Tłumaczenie interfejsu i szablonów na popularne języki w celu poszerzenia dostępności.',
    icon: <Languages className="h-5 w-5 text-primary" />,
  },
  {
    title: 'Współpraca i udostępnianie',
    description: 'Możliwość udostępniania dokumentów i współpracy z innymi użytkownikami w czasie rzeczywistym.',
    icon: <Share2 className="h-5 w-5 text-primary" />,
  },
  {
    title: 'Wersja profesjonalna',
    description: 'Subskrypcja oferująca zaawansowane funkcje, przechowywanie w chmurze i wsparcie priorytetowe.',
    icon: <CloudCog className="h-5 w-5 text-primary" />,
  },
];

const RoadmapSection: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-10">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
            Plany rozwoju
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
            Co planujemy w przyszłości?
          </h2>
          <p className="max-w-[650px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            APDocs stale się rozwija. Oto co przygotowujemy dla Ciebie.
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
