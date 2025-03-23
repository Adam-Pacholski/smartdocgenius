
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DocumentTemplate } from '@/lib/templates';
import { ArrowLeft, FileDown } from 'lucide-react';

interface DocumentEditorProps {
  template: DocumentTemplate;
  formData: Record<string, string>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  onBack: () => void;
  onExport: () => void;
}

const DocumentEditor: React.FC<DocumentEditorProps> = ({
  template,
  formData,
  setFormData,
  onBack,
  onExport,
}) => {
  const handleChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <Card className="shadow-subtle">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Button variant="ghost" size="sm" onClick={onBack} className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            <span>Wróć</span>
          </Button>
          <Button size="sm" onClick={onExport} className="flex items-center gap-1">
            <FileDown className="h-4 w-4" />
            <span>Eksportuj PDF</span>
          </Button>
        </div>
        <CardTitle>{template.name}</CardTitle>
        <CardDescription>Wypełnij poniższe dane, aby wygenerować dokument</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {template.fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={field.id}>
                {field.label}
                {field.required && <span className="text-destructive ml-1">*</span>}
              </Label>
              {field.type === 'textarea' ? (
                <Textarea
                  id={field.id}
                  placeholder={field.placeholder}
                  value={formData[field.id] || ''}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  required={field.required}
                  className="min-h-[120px]"
                />
              ) : field.type === 'date' ? (
                <Input
                  id={field.id}
                  type="date"
                  value={formData[field.id] || ''}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  required={field.required}
                />
              ) : (
                <Input
                  id={field.id}
                  type="text"
                  placeholder={field.placeholder}
                  value={formData[field.id] || ''}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  required={field.required}
                />
              )}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={onExport} className="flex items-center gap-1">
          <FileDown className="h-4 w-4" />
          <span>Eksportuj PDF</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DocumentEditor;
