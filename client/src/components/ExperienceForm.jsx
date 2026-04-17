import React from 'react';
import { useText } from '../hooks/useText';
import { Briefcase, Plus, Sparkles, Trash2 } from 'lucide-react';

const ExperienceForm = ({ data, onChange }) => {
  const t = useText("experience");

  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false
    };

    onChange([...data, newExperience]);
  };

  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>
            {t.sectionTitle}
          </h3>

          <p className='text-sm text-gray-500'>
            {t.sectionDescription}
          </p>
        </div>

        <button
          onClick={addExperience}
          className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors'
        >
          <Plus className='size-4' />
          {t.addButtonLabel}
        </button>
      </div>

      {data.length === 0 ? (
        <div className='text-center py-8 text-gray-500'>
          <Briefcase className='w-12 h-12 mx-auto mb-3 text-gray-300' />
          <p>{t.emptyStateMessage}</p>
          <p className='text-sm'>{t.addExperienceButtonLabel}</p>
        </div>
      ) : (
        <div className='space-y-4'>
          {data.map((experience, index) => (
            <div
              key={index}
              className='p-4 border border-gray-200 rounded-lg space-y-3'
            >
              <div className='flex justify-between items-start'>
                <h4>{t.format("experienceLabel", { number: index + 1 })}</h4>

                <button
                  onClick={() => removeExperience(index)}
                  aria-label={t.deleteButtonAriaLabel}
                  className='text-red-500 hover:text-red-700 transition-colors'
                >
                  <Trash2 className='size-4' />
                </button>
              </div>

              <div className='grid md:grid-cols-2 gap-3'>
                <input
                  value={experience.company || ""}
                  onChange={(e) => updateExperience(index, "company", e.target.value)}
                  type="text"
                  className='px-3 py-2 text-sm rounded-lg'
                  placeholder={t.companyPlaceholder}
                />

                <input
                  value={experience.position || ""}
                  onChange={(e) => updateExperience(index, "position", e.target.value)}
                  type="text"
                  className='px-3 py-2 text-sm rounded-lg'
                  placeholder={t.positionPlaceholder}
                />

                <input
                  value={experience.start_date || ""}
                  onChange={(e) => updateExperience(index, "start_date", e.target.value)}
                  type="month"
                  className='px-3 py-2 text-sm rounded-lg'
                />

                <input
                  value={experience.end_date || ""}
                  onChange={(e) => updateExperience(index, "end_date", e.target.value)}
                  type="month"
                  disabled={experience.is_current}
                  className='px-3 py-2 text-sm rounded-lg disabled:bg-gray-100'
                />
              </div>

              <label className='flex items-center gap-2'>
                <input
                  type="checkbox"
                  checked={experience.is_current || false}
                  onChange={(e) => { updateExperience(index, "is_current", e.target.checked ? true : false); }}
                  className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                />

                <span className='text-sm text-gray-700'>
                  {t.currentJobLabel}
                </span>
              </label>

              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <label
                    className='text-sm font-medium text-gray-700'
                  >
                    {t.jobDescriptionLabel}
                  </label>
                  <button
                    className='flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50'
                  >
                    <Sparkles className='w-3 h3' />
                    {t.enhanceAIButton}
                  </button>
                </div>

                <textarea
                  rows={4}
                  value={experience.description || ""}
                  onChange={(e) => updateExperience(index, "description", e.target.value)}
                  className='w-full text-sm px-3 py-2 rounded-lg resize-none'
                  placeholder={t.jobDescriptionPlaceholder}
                />
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ExperienceForm;