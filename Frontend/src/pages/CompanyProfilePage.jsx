import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import CompanyProfileSidebar from '../components/company-profile/CompanyProfileSidebar';
import AboutSection from '../components/company-profile/AboutSection';
import MissionSection from '../components/company-profile/MissionSection';
import VisionSection from '../components/company-profile/VisionSection';
import StatisticsSection from '../components/company-profile/StatisticsSection';
import ContactSection from '../components/company-profile/ContactSection';
import { companyProfileData } from '../data/mockCompanyProfile';

const CompanyProfilePage = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [profileData, setProfileData] = useState(companyProfileData);

  const handleSaveSection = (sectionKey, sectionData) => {
    // In a real application, this would be an API call
    // For Phase 1, we just update the local master state
    setProfileData((prev) => ({
      ...prev,
      [sectionKey]: sectionData
    }));
    
    // Optional: Add a success toast notification here
    console.log(`Saved ${sectionKey} data:`, sectionData);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'about':
        return <AboutSection data={profileData.about} onSave={handleSaveSection} />;
      case 'mission':
        return <MissionSection data={profileData.mission} onSave={handleSaveSection} />;
      case 'vision':
        return <VisionSection data={profileData.vision} onSave={handleSaveSection} />;
      case 'statistics':
        return <StatisticsSection data={profileData.statistics} onSave={handleSaveSection} />;
      case 'contact':
        return <ContactSection data={profileData.contact} onSave={handleSaveSection} />;
      default:
        return <AboutSection data={profileData.about} onSave={handleSaveSection} />;
    }
  };

  return (
    <>
      <PageHeader
        title="Company Profile"
        subtitle="Manage organization information, mission, vision and contact details."
      />

      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        <CompanyProfileSidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />
        
        <div className="flex-1 min-w-0">
          {renderActiveSection()}
        </div>
      </div>
    </>
  );
};

export default CompanyProfilePage;
