
import React, { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import Layout from '@/components/Layout';
import DocumentTypeSelector from '@/components/DocumentTypeSelector';
import TemplateSelector from '@/components/TemplateSelector';
import DocumentEditor from '@/components/DocumentEditor';
import DocumentPreview from '@/components/DocumentPreview';
import documentTypes, { DocumentTemplate } from '@/lib/templates';

enum EditorStep {
  SelectType,
  SelectTemplate,
  EditDocument,
}

const Editor: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<EditorStep>(EditorStep.SelectType);
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleSelectType = (typeId: string) => {
    setSelectedTypeId(typeId);
    setCurrentStep(EditorStep.SelectTemplate);
  };

  const handleSelectTemplate = (template: DocumentTemplate) => {
    setSelectedTemplate(template);
    
    // Initialize form data with empty values for all fields
    const initialData: Record<string, string> = {};
    template.fields.forEach(field => {
      initialData[field.id] = '';
    });
    setFormData(initialData);
    
    setCurrentStep(EditorStep.EditDocument);
  };

  const handleBack = () => {
    if (currentStep === EditorStep.SelectTemplate) {
      setCurrentStep(EditorStep.SelectType);
    } else if (currentStep === EditorStep.EditDocument) {
      setCurrentStep(EditorStep.SelectTemplate);
    }
  };

  const handleExport = () => {
    // Check if required fields are filled
    let missingFields: string[] = [];
    
    if (selectedTemplate) {
      selectedTemplate.fields
        .filter(field => field.required)
        .forEach(field => {
          if (!formData[field.id]) {
            missingFields.push(field.label);
          }
        });
    }
    
    if (missingFields.length > 0) {
      toast({
        title: "Brakujące dane",
        description: `Proszę wypełnić wszystkie wymagane pola: ${missingFields.join(', ')}`,
        variant: "destructive",
      });
      return;
    }
    
    // In a real application, this would generate and download a PDF
    toast({
      title: "Eksport PDF",
      description: "Dokument został wygenerowany i pobrany.",
    });
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
                <DocumentEditor
                  template={selectedTemplate}
                  formData={formData}
                  setFormData={setFormData}
                  onBack={handleBack}
                  onExport={handleExport}
                />
              </div>
              <div>
                <DocumentPreview
                  template={selectedTemplate}
                  formData={formData}
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
