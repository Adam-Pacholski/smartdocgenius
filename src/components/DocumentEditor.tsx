
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { DocumentTemplate } from '@/lib/templates';
import { ArrowLeft, FileDown, ArrowRight, Upload, Plus, Trash2, MoveUp, MoveDown } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { SECTIONS } from '@/lib/types/document-types';
import { toast } from '@/components/ui/use-toast';

interface DocumentEditorProps {
  template: DocumentTemplate;
  formData: Record<string, string>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  onBack: () => void;
  onExport: () => void;
  onNext?: () => void;
  currentSection: string;
}

interface ListItem {
  id: string;
  data: Record<string, string>;
}

const DocumentEditor: React.FC<DocumentEditorProps> = ({
  template,
  formData,
  setFormData,
  onBack,
  onExport,
  onNext,
  currentSection,
}) => {
  // State for list-based sections
  const [experienceItems, setExperienceItems] = useState<ListItem[]>([]);
  const [educationItems, setEducationItems] = useState<ListItem[]>([]);
  const [skillItems, setSkillItems] = useState<ListItem[]>([]);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Handling changes to text fields
  const handleChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  // Handling changes to checkbox fields
  const handleCheckboxChange = (id: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [id]: checked ? 'true' : 'false' }));
  };
  
  // Handling photo uploads
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('photo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add new experience item
  const handleAddExperience = () => {
    const newItem: ListItem = {
      id: `exp-${Date.now()}`,
      data: {
        jobTitle: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        currentJob: 'false',
        jobDescription: '',
      }
    };
    setExperienceItems(prev => [...prev, newItem]);
    setExpandedItems(prev => [...prev, newItem.id]);
    
    // Update the formData with the list
    const updatedFormData = { ...formData };
    updatedFormData.experience = JSON.stringify([...experienceItems, newItem]);
    setFormData(updatedFormData);
    
    toast({
      title: "Dodano nowe doświadczenie",
      description: "Wypełnij dane o swoim doświadczeniu zawodowym."
    });
  };

  // Add new education item
  const handleAddEducation = () => {
    const newItem: ListItem = {
      id: `edu-${Date.now()}`,
      data: {
        school: '',
        educationStartDate: '',
        educationEndDate: '',
        currentEducation: 'false',
        educationDescription: '',
      }
    };
    setEducationItems(prev => [...prev, newItem]);
    setExpandedItems(prev => [...prev, newItem.id]);
    
    // Update the formData with the list
    const updatedFormData = { ...formData };
    updatedFormData.education = JSON.stringify([...educationItems, newItem]);
    setFormData(updatedFormData);
    
    toast({
      title: "Dodano nowe wykształcenie",
      description: "Wypełnij dane o swoim wykształceniu."
    });
  };

  // Add new skill item
  const handleAddSkill = () => {
    const newItem: ListItem = {
      id: `skill-${Date.now()}`,
      data: {
        skillName: '',
        skillLevel: '3',
        hideSkillLevel: 'false',
      }
    };
    setSkillItems(prev => [...prev, newItem]);
    setExpandedItems(prev => [...prev, newItem.id]);
    
    // Update the formData with the list
    const updatedFormData = { ...formData };
    updatedFormData.skills = JSON.stringify([...skillItems, newItem]);
    setFormData(updatedFormData);
    
    toast({
      title: "Dodano nową umiejętność",
      description: "Określ nazwę umiejętności i poziom jej opanowania."
    });
  };

  // Handle list item deletion
  const handleRemoveItem = (section: string, itemId: string) => {
    if (section === SECTIONS.EXPERIENCE) {
      const updatedItems = experienceItems.filter(item => item.id !== itemId);
      setExperienceItems(updatedItems);
      const updatedFormData = { ...formData };
      updatedFormData.experience = JSON.stringify(updatedItems);
      setFormData(updatedFormData);
    } else if (section === SECTIONS.EDUCATION) {
      const updatedItems = educationItems.filter(item => item.id !== itemId);
      setEducationItems(updatedItems);
      const updatedFormData = { ...formData };
      updatedFormData.education = JSON.stringify(updatedItems);
      setFormData(updatedFormData);
    } else if (section === SECTIONS.SKILLS) {
      const updatedItems = skillItems.filter(item => item.id !== itemId);
      setSkillItems(updatedItems);
      const updatedFormData = { ...formData };
      updatedFormData.skills = JSON.stringify(updatedItems);
      setFormData(updatedFormData);
    }
    
    toast({
      title: "Usunięto element",
      description: "Element został usunięty z listy."
    });
  };

  // Handle list item change
  const handleListItemChange = (section: string, itemId: string, field: string, value: string) => {
    if (section === SECTIONS.EXPERIENCE) {
      const updatedItems = experienceItems.map(item => {
        if (item.id === itemId) {
          return {
            ...item,
            data: {
              ...item.data,
              [field]: value
            }
          };
        }
        return item;
      });
      setExperienceItems(updatedItems);
      const updatedFormData = { ...formData };
      updatedFormData.experience = JSON.stringify(updatedItems);
      setFormData(updatedFormData);
    } else if (section === SECTIONS.EDUCATION) {
      const updatedItems = educationItems.map(item => {
        if (item.id === itemId) {
          return {
            ...item,
            data: {
              ...item.data,
              [field]: value
            }
          };
        }
        return item;
      });
      setEducationItems(updatedItems);
      const updatedFormData = { ...formData };
      updatedFormData.education = JSON.stringify(updatedItems);
      setFormData(updatedFormData);
    } else if (section === SECTIONS.SKILLS) {
      const updatedItems = skillItems.map(item => {
        if (item.id === itemId) {
          return {
            ...item,
            data: {
              ...item.data,
              [field]: value
            }
          };
        }
        return item;
      });
      setSkillItems(updatedItems);
      const updatedFormData = { ...formData };
      updatedFormData.skills = JSON.stringify(updatedItems);
      setFormData(updatedFormData);
    }
  };

  // Handle checkbox change in list items
  const handleListItemCheckboxChange = (section: string, itemId: string, field: string, checked: boolean) => {
    handleListItemChange(section, itemId, field, checked ? 'true' : 'false');
  };

  // Handle item order change (move up)
  const handleMoveUp = (section: string, itemId: string) => {
    if (section === SECTIONS.EXPERIENCE) {
      const itemIndex = experienceItems.findIndex(item => item.id === itemId);
      if (itemIndex > 0) {
        const updatedItems = [...experienceItems];
        [updatedItems[itemIndex - 1], updatedItems[itemIndex]] = [updatedItems[itemIndex], updatedItems[itemIndex - 1]];
        setExperienceItems(updatedItems);
        const updatedFormData = { ...formData };
        updatedFormData.experience = JSON.stringify(updatedItems);
        setFormData(updatedFormData);
      }
    } else if (section === SECTIONS.EDUCATION) {
      const itemIndex = educationItems.findIndex(item => item.id === itemId);
      if (itemIndex > 0) {
        const updatedItems = [...educationItems];
        [updatedItems[itemIndex - 1], updatedItems[itemIndex]] = [updatedItems[itemIndex], updatedItems[itemIndex - 1]];
        setEducationItems(updatedItems);
        const updatedFormData = { ...formData };
        updatedFormData.education = JSON.stringify(updatedItems);
        setFormData(updatedFormData);
      }
    } else if (section === SECTIONS.SKILLS) {
      const itemIndex = skillItems.findIndex(item => item.id === itemId);
      if (itemIndex > 0) {
        const updatedItems = [...skillItems];
        [updatedItems[itemIndex - 1], updatedItems[itemIndex]] = [updatedItems[itemIndex], updatedItems[itemIndex - 1]];
        setSkillItems(updatedItems);
        const updatedFormData = { ...formData };
        updatedFormData.skills = JSON.stringify(updatedItems);
        setFormData(updatedFormData);
      }
    }
  };

  // Handle item order change (move down)
  const handleMoveDown = (section: string, itemId: string) => {
    if (section === SECTIONS.EXPERIENCE) {
      const itemIndex = experienceItems.findIndex(item => item.id === itemId);
      if (itemIndex < experienceItems.length - 1) {
        const updatedItems = [...experienceItems];
        [updatedItems[itemIndex], updatedItems[itemIndex + 1]] = [updatedItems[itemIndex + 1], updatedItems[itemIndex]];
        setExperienceItems(updatedItems);
        const updatedFormData = { ...formData };
        updatedFormData.experience = JSON.stringify(updatedItems);
        setFormData(updatedFormData);
      }
    } else if (section === SECTIONS.EDUCATION) {
      const itemIndex = educationItems.findIndex(item => item.id === itemId);
      if (itemIndex < educationItems.length - 1) {
        const updatedItems = [...educationItems];
        [updatedItems[itemIndex], updatedItems[itemIndex + 1]] = [updatedItems[itemIndex + 1], updatedItems[itemIndex]];
        setEducationItems(updatedItems);
        const updatedFormData = { ...formData };
        updatedFormData.education = JSON.stringify(updatedItems);
        setFormData(updatedFormData);
      }
    } else if (section === SECTIONS.SKILLS) {
      const itemIndex = skillItems.findIndex(item => item.id === itemId);
      if (itemIndex < skillItems.length - 1) {
        const updatedItems = [...skillItems];
        [updatedItems[itemIndex], updatedItems[itemIndex + 1]] = [updatedItems[itemIndex + 1], updatedItems[itemIndex]];
        setSkillItems(updatedItems);
        const updatedFormData = { ...formData };
        updatedFormData.skills = JSON.stringify(updatedItems);
        setFormData(updatedFormData);
      }
    }
  };

  // Toggle accordion item expansion
  const toggleItemExpansion = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };
  
  // Filter form fields by section
  const sectionFields = template.fields.filter(field => field.section === currentSection);
  
  // Section titles mapping
  const sectionTitles: Record<string, string> = {
    'dane_osobowe': 'Dane osobowe',
    'odbiorca': 'Odbiorca',
    'tresc_listu': 'Treść listu',
    'klauzula': 'Klauzula',
    'konfiguracja': 'Konfiguracja',
    'podsumowanie': 'Podsumowanie',
    'doswiadczenie': 'Doświadczenie zawodowe',
    'wyksztalcenie': 'Wykształcenie',
    'umiejetnosci': 'Umiejętności',
    'dodatkowe': 'Dodatkowe informacje'
  };

  // Render the education items list
  const renderEducationList = () => {
    if (educationItems.length === 0) {
      return (
        <Button 
          variant="add-button" 
          className="w-full my-4"
          onClick={handleAddEducation}
        >
          <Plus className="h-4 w-4 mr-1" /> Dodaj wykształcenie
        </Button>
      );
    }

    return (
      <div className="space-y-4">
        <Accordion 
          type="multiple" 
          value={expandedItems}
          onValueChange={setExpandedItems}
          className="space-y-2"
        >
          {educationItems.map((item, index) => (
            <AccordionItem 
              key={item.id} 
              value={item.id}
              className="border border-gray-200 rounded-md overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-2 bg-gray-50">
                <AccordionTrigger className="py-0 hover:no-underline">
                  <span className="font-medium">
                    {item.data.school || `Wykształcenie ${index + 1}`}
                  </span>
                </AccordionTrigger>
                <div className="flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMoveUp(SECTIONS.EDUCATION, item.id);
                    }}
                    disabled={index === 0}
                    className="h-8 w-8 p-0"
                  >
                    <MoveUp className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMoveDown(SECTIONS.EDUCATION, item.id);
                    }}
                    disabled={index === educationItems.length - 1}
                    className="h-8 w-8 p-0"
                  >
                    <MoveDown className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveItem(SECTIONS.EDUCATION, item.id);
                    }}
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <AccordionContent className="px-4 py-2">
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`${item.id}-school`}>Nazwa szkoły/uczelni</Label>
                      <Input
                        id={`${item.id}-school`}
                        value={item.data.school || ''}
                        onChange={(e) => handleListItemChange(SECTIONS.EDUCATION, item.id, 'school', e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`${item.id}-start-date`}>Data rozpoczęcia</Label>
                        <Input
                          id={`${item.id}-start-date`}
                          value={item.data.educationStartDate || ''}
                          onChange={(e) => handleListItemChange(SECTIONS.EDUCATION, item.id, 'educationStartDate', e.target.value)}
                          placeholder="mm.rrrr"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`${item.id}-end-date`}>Data zakończenia</Label>
                        <Input
                          id={`${item.id}-end-date`}
                          value={item.data.educationEndDate || ''}
                          onChange={(e) => handleListItemChange(SECTIONS.EDUCATION, item.id, 'educationEndDate', e.target.value)}
                          placeholder="mm.rrrr lub obecnie"
                          disabled={item.data.currentEducation === 'true'}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`${item.id}-current`}
                      checked={item.data.currentEducation === 'true'}
                      onCheckedChange={(checked) => 
                        handleListItemCheckboxChange(SECTIONS.EDUCATION, item.id, 'currentEducation', checked as boolean)
                      }
                    />
                    <Label 
                      htmlFor={`${item.id}-current`}
                      className="text-sm font-medium cursor-pointer"
                    >
                      Nadal się uczę
                    </Label>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`${item.id}-description`}>Opis</Label>
                    <Textarea
                      id={`${item.id}-description`}
                      value={item.data.educationDescription || ''}
                      onChange={(e) => handleListItemChange(SECTIONS.EDUCATION, item.id, 'educationDescription', e.target.value)}
                      placeholder="np. Kierunek: psychologia, Poziom wykształcenia: magister"
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <Button 
          variant="add-button" 
          onClick={handleAddEducation}
        >
          <Plus className="h-4 w-4 mr-1" /> Dodaj wykształcenie
        </Button>
      </div>
    );
  };

  // Render the experience items list
  const renderExperienceList = () => {
    if (experienceItems.length === 0) {
      return (
        <Button 
          variant="add-button" 
          className="w-full my-4"
          onClick={handleAddExperience}
        >
          <Plus className="h-4 w-4 mr-1" /> Dodaj doświadczenie zawodowe
        </Button>
      );
    }

    return (
      <div className="space-y-4">
        <Accordion 
          type="multiple" 
          value={expandedItems}
          onValueChange={setExpandedItems}
          className="space-y-2"
        >
          {experienceItems.map((item, index) => (
            <AccordionItem 
              key={item.id} 
              value={item.id}
              className="border border-gray-200 rounded-md overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-2 bg-gray-50">
                <AccordionTrigger className="py-0 hover:no-underline">
                  <span className="font-medium">
                    {item.data.jobTitle || `Doświadczenie ${index + 1}`}
                    {item.data.company ? ` - ${item.data.company}` : ''}
                  </span>
                </AccordionTrigger>
                <div className="flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMoveUp(SECTIONS.EXPERIENCE, item.id);
                    }}
                    disabled={index === 0}
                    className="h-8 w-8 p-0"
                  >
                    <MoveUp className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMoveDown(SECTIONS.EXPERIENCE, item.id);
                    }}
                    disabled={index === experienceItems.length - 1}
                    className="h-8 w-8 p-0"
                  >
                    <MoveDown className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveItem(SECTIONS.EXPERIENCE, item.id);
                    }}
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <AccordionContent className="px-4 py-2">
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`${item.id}-job-title`}>Stanowisko</Label>
                      <Input
                        id={`${item.id}-job-title`}
                        value={item.data.jobTitle || ''}
                        onChange={(e) => handleListItemChange(SECTIONS.EXPERIENCE, item.id, 'jobTitle', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`${item.id}-company`}>Firma</Label>
                      <Input
                        id={`${item.id}-company`}
                        value={item.data.company || ''}
                        onChange={(e) => handleListItemChange(SECTIONS.EXPERIENCE, item.id, 'company', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`${item.id}-location`}>Miejscowość</Label>
                      <Input
                        id={`${item.id}-location`}
                        value={item.data.location || ''}
                        onChange={(e) => handleListItemChange(SECTIONS.EXPERIENCE, item.id, 'location', e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`${item.id}-start-date`}>Data od</Label>
                        <Input
                          id={`${item.id}-start-date`}
                          value={item.data.startDate || ''}
                          onChange={(e) => handleListItemChange(SECTIONS.EXPERIENCE, item.id, 'startDate', e.target.value)}
                          placeholder="mm.rrrr"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`${item.id}-end-date`}>Data do</Label>
                        <Input
                          id={`${item.id}-end-date`}
                          value={item.data.endDate || ''}
                          onChange={(e) => handleListItemChange(SECTIONS.EXPERIENCE, item.id, 'endDate', e.target.value)}
                          placeholder="mm.rrrr lub obecnie"
                          disabled={item.data.currentJob === 'true'}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`${item.id}-current`}
                      checked={item.data.currentJob === 'true'}
                      onCheckedChange={(checked) => 
                        handleListItemCheckboxChange(SECTIONS.EXPERIENCE, item.id, 'currentJob', checked as boolean)
                      }
                    />
                    <Label 
                      htmlFor={`${item.id}-current`}
                      className="text-sm font-medium cursor-pointer"
                    >
                      Nadal tu pracuję
                    </Label>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`${item.id}-description`}>Opis</Label>
                    <Textarea
                      id={`${item.id}-description`}
                      value={item.data.jobDescription || ''}
                      onChange={(e) => handleListItemChange(SECTIONS.EXPERIENCE, item.id, 'jobDescription', e.target.value)}
                      placeholder="Opisz swoje obowiązki i osiągnięcia..."
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <Button 
          variant="add-button" 
          onClick={handleAddExperience}
        >
          <Plus className="h-4 w-4 mr-1" /> Dodaj doświadczenie zawodowe
        </Button>
      </div>
    );
  };

  // Render the skills items list
  const renderSkillsList = () => {
    if (skillItems.length === 0) {
      return (
        <Button 
          variant="add-button" 
          className="w-full my-4"
          onClick={handleAddSkill}
        >
          <Plus className="h-4 w-4 mr-1" /> Dodaj umiejętność
        </Button>
      );
    }

    return (
      <div className="space-y-4">
        <Accordion 
          type="multiple" 
          value={expandedItems}
          onValueChange={setExpandedItems}
          className="space-y-2"
        >
          {skillItems.map((item, index) => (
            <AccordionItem 
              key={item.id} 
              value={item.id}
              className="border border-gray-200 rounded-md overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-2 bg-gray-50">
                <AccordionTrigger className="py-0 hover:no-underline">
                  <span className="font-medium">
                    {item.data.skillName || `Umiejętność ${index + 1}`}
                    {item.data.skillLevel && !item.data.hideSkillLevel ? ` - ${item.data.skillLevel}/5` : ''}
                  </span>
                </AccordionTrigger>
                <div className="flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMoveUp(SECTIONS.SKILLS, item.id);
                    }}
                    disabled={index === 0}
                    className="h-8 w-8 p-0"
                  >
                    <MoveUp className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMoveDown(SECTIONS.SKILLS, item.id);
                    }}
                    disabled={index === skillItems.length - 1}
                    className="h-8 w-8 p-0"
                  >
                    <MoveDown className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveItem(SECTIONS.SKILLS, item.id);
                    }}
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <AccordionContent className="px-4 py-2">
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`${item.id}-skill-name`}>Nazwa umiejętności</Label>
                      <Input
                        id={`${item.id}-skill-name`}
                        value={item.data.skillName || ''}
                        onChange={(e) => handleListItemChange(SECTIONS.SKILLS, item.id, 'skillName', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`${item.id}-skill-level`}>Poziom umiejętności (1-5)</Label>
                      <div className="flex items-center gap-4">
                        <ToggleGroup 
                          type="single" 
                          value={item.data.skillLevel || '3'} 
                          onValueChange={(value) => {
                            if (value) handleListItemChange(SECTIONS.SKILLS, item.id, 'skillLevel', value);
                          }}
                          className="justify-start"
                        >
                          {[1, 2, 3, 4, 5].map((level) => (
                            <ToggleGroupItem 
                              key={level} 
                              value={level.toString()}
                              variant="outline"
                              className="w-8 h-8"
                              disabled={item.data.hideSkillLevel === 'true'}
                            >
                              {level}
                            </ToggleGroupItem>
                          ))}
                        </ToggleGroup>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`${item.id}-hide-level`}
                      checked={item.data.hideSkillLevel === 'true'}
                      onCheckedChange={(checked) => 
                        handleListItemCheckboxChange(SECTIONS.SKILLS, item.id, 'hideSkillLevel', checked as boolean)
                      }
                    />
                    <Label 
                      htmlFor={`${item.id}-hide-level`}
                      className="text-sm font-medium cursor-pointer"
                    >
                      Ukryj poziom umiejętności
                    </Label>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <Button 
          variant="add-button" 
          onClick={handleAddSkill}
        >
          <Plus className="h-4 w-4 mr-1" /> Dodaj umiejętność
        </Button>
      </div>
    );
  };

  // Render the languages section
  const renderLanguagesSection = () => {
    const languagesField = sectionFields.find(field => field.id === 'languages');
    
    if (!languagesField) return null;
    
    return (
      <div className="space-y-2 mt-6">
        <Label htmlFor="languages">
          {languagesField.label}
          {languagesField.required && <span className="text-destructive ml-1">*</span>}
        </Label>
        <Textarea
          id="languages"
          placeholder={languagesField.placeholder}
          value={formData.languages || languagesField.defaultValue || ''}
          onChange={(e) => handleChange('languages', e.target.value)}
          required={languagesField.required}
          className="min-h-[120px]"
        />
      </div>
    );
  };

  // Render the hobbies section
  const renderHobbiesSection = () => {
    const hobbiesField = sectionFields.find(field => field.id === 'hobbies');
    
    if (!hobbiesField) return null;
    
    return (
      <div className="space-y-2 mt-6">
        <Label htmlFor="hobbies">
          {hobbiesField.label}
          {hobbiesField.required && <span className="text-destructive ml-1">*</span>}
        </Label>
        <Textarea
          id="hobbies"
          placeholder={hobbiesField.placeholder}
          value={formData.hobbies || hobbiesField.defaultValue || ''}
          onChange={(e) => handleChange('hobbies', e.target.value)}
          required={hobbiesField.required}
          className="min-h-[120px]"
        />
      </div>
    );
  };

  return (
    <Card className="shadow-subtle">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Button variant="ghost" size="sm" onClick={onBack} className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            <span>Wróć</span>
          </Button>
          <Button variant="blue" size="sm" onClick={onExport} className="flex items-center gap-1">
            <FileDown className="h-4 w-4" />
            <span>Eksportuj PDF</span>
          </Button>
        </div>
        <CardTitle>{sectionTitles[currentSection] || 'Edycja dokumentu'}</CardTitle>
        <CardDescription>
          {currentSection === 'dane_osobowe' && 'Wprowadź swoje dane osobowe'}
          {currentSection === 'odbiorca' && 'Wprowadź dane odbiorcy'}
          {currentSection === 'tresc_listu' && 'Napisz treść swojego listu motywacyjnego'}
          {currentSection === 'klauzula' && 'Dodaj klauzulę o przetwarzaniu danych osobowych'}
          {currentSection === 'konfiguracja' && 'Dostosuj wygląd dokumentu'}
          {currentSection === 'podsumowanie' && 'Przedstaw krótki opis swoich umiejętności, osiągnięć i doświadczenia'}
          {currentSection === 'doswiadczenie' && 'Dodaj informacje o swoim doświadczeniu zawodowym'}
          {currentSection === 'wyksztalcenie' && 'Dodaj informacje o swoim wykształceniu'}
          {currentSection === 'umiejetnosci' && 'Dodaj swoje umiejętności i określ ich poziom'}
          {currentSection === 'dodatkowe' && 'Dodaj informacje o językach i zainteresowaniach'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {currentSection === 'dane_osobowe' && (
            <div className="mb-6 flex flex-col items-center">
              <div className="w-32 h-40 border rounded-md overflow-hidden mb-2 bg-gray-100 flex items-center justify-center">
                {formData.photo ? (
                  <img 
                    src={formData.photo} 
                    alt="Zdjęcie użytkownika" 
                    className="w-full h-full object-cover rounded" 
                  />
                ) : (
                  <div className="text-gray-400 flex flex-col items-center">
                    <Upload size={24} />
                    <span className="text-xs mt-1">Brak zdjęcia</span>
                  </div>
                )}
              </div>
              <label htmlFor="photo-upload" className="cursor-pointer">
                <div className="text-primary text-sm flex items-center">
                  <Upload size={14} className="mr-1" />
                  <span>Dodaj zdjęcie</span>
                </div>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
              </label>
            </div>
          )}

          {/* Standard fields (text, textarea, etc) */}
          {currentSection !== 'doswiadczenie' && 
           currentSection !== 'wyksztalcenie' && 
           currentSection !== 'umiejetnosci' && 
           currentSection !== 'dodatkowe' &&
           sectionFields
            .filter(field => field.type !== 'photo')
            .map((field) => (
              <div key={field.id} className="space-y-2">
                {field.type === 'checkbox' ? (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={field.id}
                      checked={formData[field.id] === 'true'}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange(field.id, checked as boolean)
                      }
                    />
                    <Label 
                      htmlFor={field.id}
                      className="text-sm font-medium cursor-pointer"
                    >
                      {field.label}
                    </Label>
                  </div>
                ) : (
                  <>
                    <Label htmlFor={field.id}>
                      {field.label}
                      {field.required && <span className="text-destructive ml-1">*</span>}
                    </Label>
                    {field.type === 'textarea' ? (
                      <Textarea
                        id={field.id}
                        placeholder={field.placeholder}
                        value={formData[field.id] || field.defaultValue || ''}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                        required={field.required}
                        className="min-h-[120px]"
                      />
                    ) : field.type === 'date' ? (
                      <Input
                        id={field.id}
                        type="date"
                        value={formData[field.id] || field.defaultValue || ''}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                        required={field.required}
                      />
                    ) : field.type === 'email' ? (
                      <Input
                        id={field.id}
                        type="email"
                        placeholder={field.placeholder}
                        value={formData[field.id] || field.defaultValue || ''}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                        required={field.required}
                      />
                    ) : field.type === 'tel' ? (
                      <Input
                        id={field.id}
                        type="tel"
                        placeholder={field.placeholder}
                        value={formData[field.id] || field.defaultValue || ''}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                        required={field.required}
                      />
                    ) : (
                      <Input
                        id={field.id}
                        type="text"
                        placeholder={field.placeholder}
                        value={formData[field.id] || field.defaultValue || ''}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                        required={field.required}
                      />
                    )}
                  </>
                )}
              </div>
            ))}
          
          {/* Specialized sections */}
          {currentSection === 'doswiadczenie' && renderExperienceList()}
          {currentSection === 'wyksztalcenie' && renderEducationList()}
          {currentSection === 'umiejetnosci' && renderSkillsList()}
          {currentSection === 'dodatkowe' && (
            <>
              {renderLanguagesSection()}
              {renderHobbiesSection()}
            </>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" />
          Wróć
        </Button>
        {onNext ? (
          <Button variant="blue" onClick={onNext} className="flex items-center gap-1">
            Dalej
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button variant="blue" onClick={onExport} className="flex items-center gap-1">
            <FileDown className="h-4 w-4" />
            Eksportuj PDF
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default DocumentEditor;
