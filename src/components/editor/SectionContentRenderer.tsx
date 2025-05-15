
import React from 'react';
import { DragEndEvent } from '@dnd-kit/core';
import ExperienceSection from '@/components/form-sections/ExperienceSection';
import EducationSection from '@/components/form-sections/EducationSection';
import SkillsSection from '@/components/form-sections/SkillsSection';
import LanguagesSection from '@/components/form-sections/LanguagesSection';
import InterestsSection from '@/components/form-sections/InterestsSection';
import PortfolioSection from '@/components/form-sections/PortfolioSection';
import GenericFieldsSection from '@/components/form-sections/GenericFieldsSection';

interface SectionContentRendererProps {
  currentSection: string;
  sectionFields: any[];
  formData: Record<string, string>;
  multiEntries: Record<string, Array<Record<string, string | number | boolean>>>;
  handleChange: (id: string, value: string) => void;
  handlePhotoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAddEntry: (section: string) => void;
  onRemoveEntry: (section: string, index: number) => void;
  onUpdateEntry: (section: string, index: number, field: string, value: string | number | boolean) => void;
  onDragEnd: (event: DragEndEvent, section: string) => void;
}

const SectionContentRenderer: React.FC<SectionContentRendererProps> = ({
  currentSection,
  sectionFields,
  formData,
  multiEntries,
  handleChange,
  handlePhotoUpload,
  onAddEntry,
  onRemoveEntry,
  onUpdateEntry,
  onDragEnd
}) => {
  switch (currentSection) {
    case 'doswiadczenie':
      return (
        <ExperienceSection
          entries={multiEntries.doswiadczenie}
          onDragEnd={onDragEnd}
          onAddEntry={onAddEntry}
          onRemoveEntry={onRemoveEntry}
          onUpdateEntry={onUpdateEntry}
        />
      );
      
    case 'edukacja':
      return (
        <EducationSection
          entries={multiEntries.edukacja}
          onDragEnd={onDragEnd}
          onAddEntry={onAddEntry}
          onRemoveEntry={onRemoveEntry}
          onUpdateEntry={onUpdateEntry}
        />
      );
      
    case 'umiejetnosci':
      return (
        <SkillsSection
          entries={multiEntries.umiejetnosci}
          onDragEnd={onDragEnd}
          onAddEntry={onAddEntry}
          onRemoveEntry={onRemoveEntry}
          onUpdateEntry={onUpdateEntry}
          progressColor={formData.skillsProgressColor || '#3498db'}
          onProgressColorChange={(color) => handleChange('skillsProgressColor', color)}
        />
      );
      
    case 'jezyki':
      return (
        <LanguagesSection
          entries={multiEntries.jezyki}
          onDragEnd={onDragEnd}
          onAddEntry={onAddEntry}
          onRemoveEntry={onRemoveEntry}
          onUpdateEntry={onUpdateEntry}
        />
      );
      
    case 'zainteresowania':
      return (
        <InterestsSection
          entries={multiEntries.zainteresowania}
          onDragEnd={onDragEnd}
          onAddEntry={onAddEntry}
          onRemoveEntry={onRemoveEntry}
          onUpdateEntry={onUpdateEntry}
        />
      );

    case 'portfolio':
      return (
        <PortfolioSection
          entries={multiEntries.portfolio}
          onDragEnd={onDragEnd}
          onAddEntry={onAddEntry}
          onRemoveEntry={onRemoveEntry}
          onUpdateEntry={onUpdateEntry}
        />
      );
      
    default:
      return (
        <GenericFieldsSection
          fields={sectionFields}
          formData={formData}
          handleChange={handleChange}
          handlePhotoUpload={handlePhotoUpload}
        />
      );
  }
};

export default SectionContentRenderer;
