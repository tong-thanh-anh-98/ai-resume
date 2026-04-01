import React from 'react';
import { dummyResumeData } from '../assets/assets';
import { data, Link, useParams } from 'react-router-dom';
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, FileText, FolderIcon, GraduationCap, SparkleIcon, User } from 'lucide-react';
import PersonalInfoForm from '../components/PersonalInfoForm';
import SummaryForm from '../components/SummaryForm';
import ExperienceForm from '../components/ExperienceForm';
import EducationForm from '../components/EducationForm';
import ProjectsForm from '../components/ProjectsForm';
import SkillsForm from '../components/SkillsForm';
import { useText } from '../hooks/useText';

const ResumeBuilder = () => {
  const t = useText("resumeBuilder");

  const { resumeId } = useParams();

  const [resumeData, setResumeData] = React.useState({
    _id: '',
    title: '',
    personal_info: {},
    personal_summary: '',
    experiences: [],
    education: [],
    projects: [],
    skills: [],
    templates: 'classic',
    accent_color: '#3b82F6',
    public: false
  });

  const loadExistingResumeData = async () => {
    const resume = dummyResumeData.find(resume => resume._id === resumeId);
    if (resume) {
      setResumeData(resume);
      document.title = resume.title;
    }
  };

  const [activeSectionIndex, setActiveSectionIndex] = React.useState(0);
  const [removeBackground, setRemoveBackground] = React.useState(false);

  const section = [
    { id: 'personal', name: 'Personal Info', icon: User },
    { id: 'summary', name: 'Summary', icon: FileText },
    { id: 'experience', name: 'Experience', icon: Briefcase },
    { id: 'education', name: 'Education', icon: GraduationCap },
    { id: 'projects', name: 'Projects', icon: FolderIcon },
    { id: 'skills', name: 'Skills', icon: SparkleIcon },
  ];

  const activeSection = section[activeSectionIndex] || {};

  React.useEffect(() => {
    if (resumeId) {
      loadExistingResumeData();
    }
  }, [resumeId]);


  return (
    <div>

      <div className='max-w-7xl mx-auto px-4 py-6'>
        <Link
          to={'/app'}
          className='inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all'
        >
          <ArrowLeftIcon className='size-4' /> {t.navigation.back}
        </Link>
      </div>

      <div className='max-w-7xl mx-auto px-4 pb-8'>
        <div className='grid lg:grid-cols-12 gap-8'>
          {/* left panel - form */}
          <div
            className='relative lg:col-span-5 rounded-lg overflow-hidden'
          >
            <div
              className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1'
            >
              {/* progress bar using activeSectionIndex */}
              <hr
                className="absolute top-0 left-0 right-0 border-2 border-gray-200"
              />

              <hr
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-2000"
                style={{ width: `${activeSectionIndex * 100 / (section.length - 1)}%` }}
              />

              {/* section navigation */}
              <div
                className='flex justify-between items-center mb-6 border-b border-gray-300 py-1'
              >
                <div></div>

                <div className='flex items-center'>
                  {activeSectionIndex !== 0 && (
                    <button
                      onClick={() => setActiveSectionIndex(prevIndex => Math.max(prevIndex - 1, 0))}
                      className='flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all'
                      disabled={activeSectionIndex === 0}
                    >
                      <ChevronLeft className='size-4' /> {t.navigation.previous}
                    </button>
                  )}

                  <button
                    onClick={() => setActiveSectionIndex(prevIndex => Math.min(prevIndex + 1, section.length - 1))}
                    className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${activeSectionIndex === section.length - 1 ? 'opacity-50' : ''}`}
                    disabled={activeSectionIndex === section.length - 1}
                  >
                    {t.navigation.next} <ChevronRight className='size-4' />
                  </button>

                </div>

              </div>

              {/* form content */}
              <div
                className='space-y-6'
              >
                {activeSection.id === 'personal' && (
                  <PersonalInfoForm
                    data={resumeData.personal_info}
                    onChange={(data) => setResumeData(prev => ({ ...prev, personal_info: data }))}
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}

                {activeSection.id === 'summary' && (
                  <SummaryForm
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                  />
                )}

                {activeSection.id === 'experience' && (
                  <ExperienceForm
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                  />
                )}

                {activeSection.id === 'education' && (
                  <EducationForm
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                  />
                )}

                {activeSection.id === 'projects' && (
                  <ProjectsForm
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                  />
                )}

                {activeSection.id === 'skills' && (
                  <SkillsForm
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                  />
                )}

              </div>

            </div>

          </div>

          {/* right panel - preview */}
          <div
            className='lg:col-span-7 max-lg:mt-6'
          >
            <div>
              {/* button */}
            </div>

            <div>
              {/* resume preview */}
            </div>
            
          </div>

        </div>
      </div>

    </div>
  )
}

export default ResumeBuilder