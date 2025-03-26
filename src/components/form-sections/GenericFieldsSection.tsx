
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DatePickerInput from '@/components/date-picker/DatePickerInput';
import { TemplateField } from '@/lib/types/document-types';

interface GenericFieldsSectionProps {
  fields: TemplateField[];
  formData: Record<string, string>;
  handleChange: (id: string, value: string) => void;
  handlePhotoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const GenericFieldsSection: React.FC<GenericFieldsSectionProps> = ({
  fields,
  formData,
  handleChange,
  handlePhotoUpload,
}) => {
  return (
    <div className="space-y-4">
      {fields.map((field) => {
        switch (field.type) {
          case 'text':
          case 'email':
          case 'tel':
            return (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={field.id}>{field.label}</Label>
                <Input
                  id={field.id}
                  placeholder={field.placeholder}
                  value={formData[field.id] || ''}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  type={field.type}
                />
                {field.description && (
                  <p className="text-sm text-muted-foreground">{field.description}</p>
                )}
              </div>
            );
          case 'textarea':
            return (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={field.id}>{field.label}</Label>
                <Textarea
                  id={field.id}
                  placeholder={field.placeholder}
                  value={formData[field.id] || ''}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  className="min-h-[150px]"
                />
                {field.description && (
                  <p className="text-sm text-muted-foreground">{field.description}</p>
                )}
              </div>
            );
          case 'date':
            return (
              <DatePickerInput
                key={field.id}
                id={field.id}
                label={field.label}
                value={formData[field.id] || ''}
                onChange={(value) => handleChange(field.id, value)}
                description={field.description}
              />
            );
          case 'photo':
            return (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={field.id}>{field.label}</Label>
                <div className="mt-1 flex items-center">
                  {formData.photo ? (
                    <div className="relative">
                      <img
                        src={formData.photo}
                        alt="Profile"
                        className="h-24 w-24 object-cover rounded-md"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 p-0"
                        onClick={() => handleChange('photo', '')}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <label
                      htmlFor="photo-upload"
                      className="cursor-pointer flex flex-col items-center justify-center h-24 w-24 border-2 border-dashed border-gray-300 rounded-md hover:border-primary transition-colors"
                    >
                      <Upload className="h-6 w-6 text-muted-foreground" />
                      <span className="mt-1 text-xs text-muted-foreground">Dodaj zdjęcie</span>
                      <input
                        id="photo-upload"
                        name="photo"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                      />
                    </label>
                  )}
                </div>
                {field.description && (
                  <p className="text-sm text-muted-foreground">{field.description}</p>
                )}
              </div>
            );
          case 'color':
            return (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={field.id}>{field.label}</Label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    id={field.id}
                    value={formData[field.id] || field.defaultValue || '#000000'}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    className="w-14 h-10 cursor-pointer rounded border"
                  />
                  <span className="text-sm font-medium">{formData[field.id] || field.defaultValue}</span>
                </div>
                {field.description && (
                  <p className="text-sm text-muted-foreground">{field.description}</p>
                )}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default GenericFieldsSection;
