import React from 'react';
import { useText } from '../hooks/useText';
import { Plus, ProjectorIcon, Trash2 } from 'lucide-react';

const ProjectForm = ({ data, onChange }) => {
  const t = useText('projectForm');

  const addProject = () => {
    const newProject = {
      name: "",
      type: "",
      description: ""
    };
    onChange([...data, newProject]);
  };

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div>
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
          onClick={addProject}
          className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors'
        >
          <Plus className='size-4' />
          {t.addButtonLabel}
        </button>
      </div>

      <div className='space-y-4 mt-6'>
        {data.map((project, index) => (
          <div
            key={index}
            className='p-4 border border-gray-200 rounded-lg space-y-3'
          >
            <div className='flex justify-between items-start'>
              <h4>{t.format("projectLabel", { number: index + 1 })}</h4>

              <button
                onClick={() => removeProject(index)}
                aria-label={t.deleteButtonAriaLabel}
                className='text-red-500 hover:text-red-700 transition-colors'
              >
                <Trash2 className='size-4' />
              </button>
            </div>

            <div className='grid gap-3'>
              <input
                value={project.name || ""}
                onChange={(e) => updateProject(index, "name", e.target.value)}
                type="text"
                className='px-3 py-2 text-sm rounded-lg'
                placeholder={t.namePlaceholder}
              />

              <input
                value={project.type || ""}
                onChange={(e) => updateProject(index, "type", e.target.value)}
                type="text"
                className='px-3 py-2 text-sm rounded-lg'
                placeholder={t.typePlaceholder}
              />

              <textarea
                value={project.description || ""}
                onChange={(e) => updateProject(index, "description", e.target.value)}
                rows={4}
                className='w-full px-3 py-2 text-sm rounded-lg resize-none'
                placeholder={t.descriptionPlaceholder}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectForm;