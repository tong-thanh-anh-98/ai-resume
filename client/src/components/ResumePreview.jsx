import React from 'react';
import ModernTemplate from './templates/ModernTemplate';

const ResumePreview = ({ data, template, accentColor, classes = '' }) => {

  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        // Import and return the modern template component
        return <ModernTemplate data={data} accentColor={accentColor} />;
        break;

      default:
        break;
    }
  };

  return (
    <div className='w-full bg-gray-100'>
      <div
        id='resume-preview'
        className={`border border-gray-200 print:shadow-none print:border-none` + classes}
      >

      </div>
    </div>
  )
}

export default ResumePreview;