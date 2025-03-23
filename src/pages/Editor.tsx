
import React, { useState, useRef } from 'react';
import { toast } from '@/components/ui/use-toast';
import Layout from '@/components/Layout';
import DocumentTypeSelector from '@/components/DocumentTypeSelector';
import TemplateSelector from '@/components/TemplateSelector';
import DocumentEditor from '@/components/DocumentEditor';
import DocumentPreview from '@/components/DocumentPreview';
import TemplateConfiguration from '@/components/TemplateConfiguration';
import documentTypes, { DocumentTemplate } from '@/lib/templates';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { SECTIONS } from '@/lib/types/document-types';
import { sampleCoverLetterData } from '@/lib/utils/sample-data';
import { generatePdfFromHtml } from '@/lib/utils/pdf-generator';

enum EditorStep {
  SelectType,
  SelectTemplate,
  EditDocument,
}

// Kolejność sekcji
const SECTION_ORDER = [
  SECTIONS.CONFIG,
  SECTIONS.PERSONAL,
  SECTIONS.RECIPIENT,
  SECTIONS.CONTENT,
  SECTIONS.CLAUSE,
];

// Kolejność sekcji dla CV
const CV_SECTION_ORDER = [
  SECTIONS.CONFIG,
  SECTIONS.PERSONAL,
  SECTIONS.SUMMARY,
  SECTIONS.EXPERIENCE,
  SECTIONS.EDUCATION,
  SECTIONS.SKILLS,
  SECTIONS.ADDITIONAL,
  SECTIONS.CLAUSE,
];

const Editor: React.FC = () => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState<EditorStep>(EditorStep.SelectType);
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>(sampleCoverLetterData);
  const [config, setConfig] = useState<Record<string, any>>({
    documentName: 'List motywacyjny',
    primaryColor: '#3498db',
    fontFamily: 'Arial, sans-serif',
    fontSize: '12px',
  });
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  // Determine if we're in CV mode
  const isCvMode = selectedTypeId === 'cv';
  
  // Get the appropriate section order based on document type
  const activeSectionOrder = isCvMode ? CV_SECTION_ORDER : SECTION_ORDER;
  
  const handleSelectType = (typeId: string) => {
    setSelectedTypeId(typeId);
    setCurrentStep(EditorStep.SelectTemplate);
  };

  const handleSelectTemplate = (template: DocumentTemplate) => {
    setSelectedTemplate(template);
    
    const initialData: Record<string, string> = { ...sampleCoverLetterData };
    template.fields.forEach(field => {
      if (!initialData[field.id]) {
        initialData[field.id] = field.defaultValue || '';
      }
    });
    setFormData(initialData);
    
    setCurrentSectionIndex(0);
    setCurrentStep(EditorStep.EditDocument);
  };

  const handleBack = () => {
    if (currentStep === EditorStep.SelectTemplate) {
      setCurrentStep(EditorStep.SelectType);
    } else if (currentStep === EditorStep.EditDocument) {
      if (currentSectionIndex > 0) {
        setCurrentSectionIndex(currentSectionIndex - 1);
      } else {
        setCurrentStep(EditorStep.SelectTemplate);
      }
    }
  };
  
  const handleBackToTemplates = () => {
    setCurrentStep(EditorStep.SelectTemplate);
  };

  const handleSectionChange = (sectionIndex: number) => {
    setCurrentSectionIndex(sectionIndex);
  };

  const handleNext = () => {
    if (currentSectionIndex < activeSectionOrder.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    }
  };

  const handleExportPdf = async () => {
    if (previewRef.current && selectedTemplate) {
      const fileName = `${formData.firstName || 'dokument'}_${formData.lastName || ''}_${new Date().toISOString().slice(0, 10)}.pdf`;
      
      try {
        await generatePdfFromHtml(previewRef.current, fileName);
        toast({
          title: "Eksport PDF",
          description: "Dokument został wygenerowany i pobrany.",
        });
      } catch (error) {
        console.error("PDF export error:", error);
        toast({
          title: "Błąd eksportu",
          description: "Nie udało się wygenerować dokumentu PDF.",
          variant: "destructive",
        });
      }
    }
  };

  const currentSection = activeSectionOrder[currentSectionIndex];

  const sectionTitles: Record<string, string> = {
    'dane_osobowe': 'Dane osobowe',
    'odbiorca': 'Odbiorca',
    'tresc_listu': 'Treść listu',
    'klauzula': 'Klauzula',
    'konfiguracja': 'Konfiguracja',
    'podsumowanie': 'Podsumowanie',
    'doswiadczenie': 'Doświadczenie',
    'wyksztalcenie': 'Wykształcenie',
    'umiejetnosci': 'Umiejętności',
    'dodatkowe': 'Dodatkowe',
  };

  return (
    <Layout className="pb-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Edytor dokumentów</h1>
          <p className="text-muted-foreground">
            Stwórz profesjonalny dokument w kilku prostych krokach
          </p>
        </div>

        <div className="flex flex-col space-y-8">
          {currentStep === EditorStep.SelectType && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-xl font-medium">Wybierz typ dokumentu</h2>
              <DocumentTypeSelector
                selectedType={selectedTypeId}
                onSelectType={handleSelectType}
              />
            </div>
          )}

          {currentStep === EditorStep.SelectTemplate && selectedTypeId && (
            <div className="animate-fade-in">
              <TemplateSelector
                typeId={selectedTypeId}
                selectedTemplate={selectedTemplate?.id || null}
                onSelectTemplate={handleSelectTemplate}
                onBack={handleBack}
              />
            </div>
          )}

          {currentStep === EditorStep.EditDocument && selectedTemplate && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
              <div>
                {currentStep === EditorStep.EditDocument && (
                  <Tabs 
                    defaultValue={activeSectionOrder[currentSectionIndex]} 
                    value={currentSection}
                    onValueChange={(value) => {
                      const newIndex = activeSectionOrder.findIndex(section => section === value);
                      if (newIndex !== -1) {
                        setCurrentSectionIndex(newIndex);
                      }
                    }}
                    className="mb-4"
                  >
                    <TabsList className="grid grid-cols-5 w-full">
                      {activeSectionOrder.map((section) => (
                        <TabsTrigger 
                          key={section}
                          value={section} 
                          className="text-xs sm:text-sm"
                        >
                          {sectionTitles[section]}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    
                    {activeSectionOrder.map((section) => (
                      <TabsContent key={section} value={section}>
                        {section === SECTIONS.CONFIG ? (
                          <TemplateConfiguration 
                            config={config}
                            setConfig={setConfig}
                            onBack={handleBack}
                            onNext={handleNext}
                          />
                        ) : (
                          <DocumentEditor
                            template={selectedTemplate}
                            formData={formData}
                            setFormData={setFormData}
                            onBack={handleBack}
                            onNext={currentSectionIndex < activeSectionOrder.length - 1 ? handleNext : undefined}
                            currentSection={section}
                            onExport={handleExportPdf}
                          />
                        )}
                      </TabsContent>
                    ))}
                  </Tabs>
                )}
              </div>
              <div>
                <DocumentPreview
                  template={selectedTemplate}
                  formData={formData}
                  config={config}
                  previewRef={previewRef}
                  onBack={handleBackToTemplates}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Editor;
