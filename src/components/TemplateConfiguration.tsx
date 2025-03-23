
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ColorOption {
  value: string;
  label: string;
  hex: string;
}

interface FontOption {
  value: string;
  label: string;
}

interface FontSizeOption {
  value: string;
  label: string;
}

interface TemplateConfigurationProps {
  config: Record<string, any>;
  setConfig: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  onBack: () => void;
  onNext: () => void;
}

const colorOptions: ColorOption[] = [
  { value: '#3498db', label: 'Niebieski', hex: '#3498db' },
  { value: '#2c3e50', label: 'Granatowy', hex: '#2c3e50' },
  { value: '#27ae60', label: 'Zielony', hex: '#27ae60' },
  { value: '#8e44ad', label: 'Fioletowy', hex: '#8e44ad' },
  { value: '#e74c3c', label: 'Czerwony', hex: '#e74c3c' },
  { value: '#f39c12', label: 'Pomarańczowy', hex: '#f39c12' },
  { value: '#1abc9c', label: 'Morski', hex: '#1abc9c' },
  { value: '#34495e', label: 'Ciemnogranatowy', hex: '#34495e' },
  { value: '#16a085', label: 'Szmaragdowy', hex: '#16a085' },
  { value: '#d35400', label: 'Miedziany', hex: '#d35400' },
  { value: '#c0392b', label: 'Bordowy', hex: '#c0392b' },
  { value: '#7f8c8d', label: 'Szary', hex: '#7f8c8d' },
  { value: '#2980b9', label: 'Jasnoniebieski', hex: '#2980b9' },
  { value: '#8e44ad', label: 'Purpurowy', hex: '#8e44ad' },
  { value: '#2c3e50', label: 'Grafitowy', hex: '#2c3e50' },
  { value: '#f1c40f', label: 'Żółty', hex: '#f1c40f' },
  { value: '#273c75', label: 'Granatowy', hex: '#273c75' },
  { value: '#c23616', label: 'Ceglasty', hex: '#c23616' },
];

const fontOptions: FontOption[] = [
  { value: 'Arial, sans-serif', label: 'Arial' },
  { value: 'Helvetica, sans-serif', label: 'Helvetica' },
  { value: 'Times New Roman, serif', label: 'Times New Roman' },
  { value: 'Georgia, serif', label: 'Georgia' },
  { value: 'Verdana, sans-serif', label: 'Verdana' },
  { value: 'Tahoma, sans-serif', label: 'Tahoma' },
  { value: 'Trebuchet MS, sans-serif', label: 'Trebuchet MS' },
  { value: 'Courier New, monospace', label: 'Courier New' },
  { value: 'Calibri, sans-serif', label: 'Calibri' },
];

const fontSizeOptions: FontSizeOption[] = [
  { value: '12px', label: '12px' },
  { value: '13px', label: '13px' },
  { value: '14px', label: '14px' },
  { value: '15px', label: '15px' },
  { value: '16px', label: '16px' },
];

const TemplateConfiguration: React.FC<TemplateConfigurationProps> = ({
  config,
  setConfig,
  onBack,
  onNext,
}) => {
  const handleColorChange = (value: string) => {
    setConfig(prev => ({ ...prev, primaryColor: value }));
  };

  const handleFontChange = (value: string) => {
    setConfig(prev => ({ ...prev, fontFamily: value }));
  };

  const handleFontSizeChange = (value: string) => {
    setConfig(prev => ({ ...prev, fontSize: value }));
  };

  const handleDocumentNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig(prev => ({ ...prev, documentName: e.target.value }));
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig(prev => ({ ...prev, primaryColor: e.target.value }));
  };

  return (
    <Card className="shadow-subtle">
      <CardHeader className="pb-3">
        <CardTitle>Konfiguracja</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="documentName">Nazwa dokumentu:</Label>
            <Input
              id="documentName"
              value={config.documentName || ''}
              onChange={handleDocumentNameChange}
              placeholder="List motywacyjny"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fontFamily">Czcionka:</Label>
            <Select 
              value={config.fontFamily || 'Arial, sans-serif'} 
              onValueChange={handleFontChange}
            >
              <SelectTrigger id="fontFamily">
                <SelectValue placeholder="Wybierz czcionkę" />
              </SelectTrigger>
              <SelectContent>
                {fontOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fontSize">Rozmiar czcionki:</Label>
            <Select 
              value={config.fontSize || '14px'} 
              onValueChange={handleFontSizeChange}
            >
              <SelectTrigger id="fontSize">
                <SelectValue placeholder="Wybierz rozmiar" />
              </SelectTrigger>
              <SelectContent>
                {fontSizeOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Kolory:</Label>
            <div className="grid grid-cols-6 gap-2">
              {colorOptions.map(color => (
                <button
                  key={color.value}
                  title={color.label}
                  type="button"
                  className={`w-10 h-10 rounded-full border ${config.primaryColor === color.value ? 'ring-2 ring-primary ring-offset-2' : 'border-gray-200'}`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => handleColorChange(color.value)}
                ></button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="customColor">Wybierz dowolny kolor:</Label>
            <Input
              id="customColor"
              type="color"
              value={config.primaryColor || '#3498db'}
              onChange={handleCustomColorChange}
              className="h-10 w-full p-1"
            />
          </div>

          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={onBack}
              className="flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Wróć
            </Button>
            <Button
              onClick={onNext}
              className="flex items-center gap-1"
            >
              Dalej
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateConfiguration;
