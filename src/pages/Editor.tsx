
import React, { useState, useRef, useEffect } from 'react';
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
import { generatePdfFromHtml } from '@/lib/utils/pdf-generator';
import { useLanguage } from "@/contexts/LanguageContext.tsx";
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

enum EditorStep {
  SelectType,
  SelectTemplate,
  EditDocument,
}

// Define section orders by document type
const COVER_LETTER_SECTION_ORDER = [
  SECTIONS.CONFIG,
  SECTIONS.PERSONAL,
  SECTIONS.RECIPIENT,
  SECTIONS.CONTENT,
  SECTIONS.CLAUSE,
];

const CV_SECTION_ORDER = [
  SECTIONS.CONFIG,
  SECTIONS.PERSONAL,
  SECTIONS.EXPERIENCE,
  SECTIONS.EDUCATION,
  SECTIONS.SKILLS,
  SECTIONS.LANGUAGES,
  SECTIONS.PORTFOLIO,
  SECTIONS.INTERESTS,
  SECTIONS.CLAUSE,
];

// Storage keys for localStorage
const STORAGE_KEYS = {
  EDITOR_STATE: 'cv_editor_state',
  FORM_DATA: 'cv_form_data',
  SELECTED_TYPE: 'cv_selected_type',
  SELECTED_TEMPLATE: 'cv_selected_template',
  CONFIG: 'cv_config',
  CURRENT_SECTION: 'cv_current_section'
};

const Editor: React.FC = () => {
  const previewRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();
  const [currentStep, setCurrentStep] = useState<EditorStep>(EditorStep.SelectType);
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [config, setConfig] = useState<Record<string, any>>({
    documentName: t('editor.defaultDocName'),
    primaryColor: '#3498db',
    fontFamily: 'Arial, sans-serif',
    fontSize: '12px',
    skillsProgressColor: '#3498db',
    language: language
  });

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [showResetDialog, setShowResetDialog] = useState(false);

  // Load saved state from localStorage on component mount
  useEffect(() => {
    const savedStep = localStorage.getItem(STORAGE_KEYS.EDITOR_STATE);
    const savedTypeId = localStorage.getItem(STORAGE_KEYS.SELECTED_TYPE);
    const savedTemplateId = localStorage.getItem(STORAGE_KEYS.SELECTED_TEMPLATE);
    const savedFormData = localStorage.getItem(STORAGE_KEYS.FORM_DATA);
    const savedConfig = localStorage.getItem(STORAGE_KEYS.CONFIG);
    const savedSectionIndex = localStorage.getItem(STORAGE_KEYS.CURRENT_SECTION);
    
    if (savedStep) {
      setCurrentStep(parseInt(savedStep, 10));
    }
    
    if (savedTypeId) {
      setSelectedTypeId(savedTypeId);
    }
    
    if (savedTemplateId && savedTypeId) {
      // Find the template object using the saved ID
      const templates = savedTypeId === 'cv' 
        ? documentTypes.find(type => type.id === 'cv')?.templates 
        : documentTypes.find(type => type.id === 'cover-letter')?.templates;
      
      const template = templates?.find(template => template.id === savedTemplateId) || null;
      if (template) {
        setSelectedTemplate(template);
      }
    }
    
    if (savedFormData) {
      try {
        setFormData(JSON.parse(savedFormData));
      } catch (e) {
        console.error('Error parsing saved form data', e);
      }
    }
    
    if (savedConfig) {
      try {
        setConfig(JSON.parse(savedConfig));
      } catch (e) {
        console.error('Error parsing saved config', e);
      }
    }
    
    if (savedSectionIndex) {
      setCurrentSectionIndex(parseInt(savedSectionIndex, 10));
    }
  }, []);

  // Update config when language changes
  useEffect(() => {
    setConfig(prev => ({
      ...prev,
      language
    }));
  }, [language]);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EDITOR_STATE, currentStep.toString());
    
    if (selectedTypeId) {
      localStorage.setItem(STORAGE_KEYS.SELECTED_TYPE, selectedTypeId);
    }
    
    if (selectedTemplate) {
      localStorage.setItem(STORAGE_KEYS.SELECTED_TEMPLATE, selectedTemplate.id);
    }
    
    localStorage.setItem(STORAGE_KEYS.FORM_DATA, JSON.stringify(formData));
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
    localStorage.setItem(STORAGE_KEYS.CURRENT_SECTION, currentSectionIndex.toString());
  }, [currentStep, selectedTypeId, selectedTemplate, formData, config, currentSectionIndex]);

  // Get the appropriate section order based on the document type
  const getSectionOrder = () => {
    if (selectedTypeId === 'cv') {
      return CV_SECTION_ORDER;
    }
    return COVER_LETTER_SECTION_ORDER;
  };

  const handleSelectType = (typeId: string) => {
    setSelectedTypeId(typeId);
    setCurrentStep(EditorStep.SelectTemplate);
  };

  const handleSelectTemplate = (template: DocumentTemplate) => {
    setSelectedTemplate(template);
    
    // Initialize form data with field IDs from the template if not already populated
    if (Object.keys(formData).length === 0) {
      const initialData: Record<string, string> = {};
      template.fields.forEach(field => {
        // Set default values for fields that have them
        if (field.defaultValue) {
          initialData[field.id] = field.defaultValue;
        } else {
          initialData[field.id] = '';
        }
      });
      setFormData(initialData);
    }
    
    setCurrentSectionIndex(0);
    setCurrentStep(EditorStep.EditDocument);
    
    // Update the config with appropriate document name
    setConfig(prev => ({
      ...prev,
      documentName: selectedTypeId === 'cv' ? t('editor.cv') : t('editor.coverLetter'),
      language: language
    }));
  };

  useEffect(() => {
    // Update skillsProgressColor from formData if it exists
    if (formData.skillsProgressColor) {
      setConfig(prev => ({
        ...prev,
        skillsProgressColor: formData.skillsProgressColor
      }));
    }
  }, [formData.skillsProgressColor]);

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
    const sectionOrder = getSectionOrder();
    if (currentSectionIndex < sectionOrder.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    }
  };

  const handleResetData = () => {
    // Clear all saved data
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    
    // Reset state
    setCurrentStep(EditorStep.SelectType);
    setSelectedTypeId(null);
    setSelectedTemplate(null);
    setFormData({});
    setConfig({
      documentName: t('editor.defaultDocName'),
      primaryColor: '#3498db',
      fontFamily: 'Arial, sans-serif',
      fontSize: '12px',
      skillsProgressColor: '#3498db',
      language: language
    });
    setCurrentSectionIndex(0);
    setShowResetDialog(false);
    
    toast({
      title: t("editor.reset.title") || "Dane zostały wyczyszczone",
      description: t("editor.reset.success") || "Wszystkie pola formularza zostały wyczyszczone.",
    });
  };

  const handleExportPdf = async () => {
    if (previewRef.current && selectedTemplate) {
      const fileName = `${formData.firstName || 'dokument'}_${formData.lastName || ''}_${new Date().toISOString().slice(0, 10)}.pdf`;
      
      try {
        await generatePdfFromHtml(previewRef.current, fileName);
        toast({
          title: t("editor.export.title"),
          description: t("editor.export.success"),
        });
      } catch (error) {
        console.error("PDF export error:", error);
        toast({
          title: t("editor.export.error"),
          description: t("editor.export.error"),
          variant: "destructive",
        });
      }
    }
  };

  const sectionOrder = getSectionOrder();
  const currentSection = sectionOrder[currentSectionIndex];

  // Map section keys to translation keys
  const sectionTranslationKeys: Record<string, string> = {
    'dane_osobowe': 'editor.section.personal',
    'odbiorca': 'editor.section.recipient',
    'tresc_listu': 'editor.section.content',
    'klauzula': 'editor.section.clause',
    'konfiguracja': 'editor.section.config',
    'doswiadczenie': 'editor.section.experience',
    'edukacja': 'editor.section.education',
    'umiejetnosci': 'editor.section.skills',
    'jezyki': 'editor.section.languages',
    'zainteresowania': 'editor.section.interests'
  };

  // Translation of section descriptions
  const sectionDescriptionKeys: Record<string, string> = {
    'dane_osobowe': 'editor.section.personal.desc',
    'odbiorca': 'editor.section.recipient.desc',
    'tresc_listu': 'editor.section.content.desc',
    'klauzula': 'editor.section.clause.desc',
    'konfiguracja': 'editor.section.config.desc',
    'doswiadczenie': 'editor.section.experience.desc',
    'edukacja': 'editor.section.education.desc',
    'umiejetnosci': 'editor.section.skills.desc',
    'jezyki': 'editor.section.languages.desc',
    'zainteresowania': 'editor.section.interests.desc'
  };

  return (
    <Layout className="pb-12">
      <div className="space-y-6">
        <div className="space-y-2 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t('editor.title')}</h1>
            <p className="text-muted-foreground">
              {t('editor.subtitle')}
            </p>
          </div>
          
          {/* Reset Data Button */}
          <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Trash2 className="h-4 w-4" />
                {t('editor.reset.button') || "Wyczyść dane"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t('editor.reset.confirmTitle') || "Czy na pewno chcesz wyczyścić wszystkie dane?"}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t('editor.reset.confirmDescription') || "Ta operacja usunie wszystkie wprowadzone dane i nie będzie można ich odzyskać."}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t('common.cancel') || "Anuluj"}</AlertDialogCancel>
                <AlertDialogAction onClick={handleResetData}>{t('common.confirm') || "Potwierdź"}</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className="flex flex-col space-y-8">
          {currentStep === EditorStep.SelectType && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-xl font-medium">{t('editor.step.type')}</h2>
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
                    defaultValue={sectionOrder[currentSectionIndex]} 
                    value={currentSection}
                    onValueChange={(value) => {
                      const newIndex = sectionOrder.findIndex(section => section === value);
                      if (newIndex !== -1) {
                        setCurrentSectionIndex(newIndex);
                      }
                    }}
                    className="mb-4"
                  >
                    <TabsList className="flex flex-wrap md:grid md:grid-cols-4 w-full overflow-visible mb-1 h-full gap-2">
                      {sectionOrder.map((section) => (
                        <TabsTrigger 
                          key={section}
                          value={section} 
                          className="text-xs sm:text-sm whitespace-nowrap"
                        >
                          {t(sectionTranslationKeys[section])}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    
                    {sectionOrder.map((section) => (
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
                            onNext={currentSectionIndex < sectionOrder.length - 1 ? handleNext : undefined}
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
