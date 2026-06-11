import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import ModuleSidebar from '../components/content/ModuleSidebar';
import HeroEditor from '../components/content/HeroEditor';
import ServicesEditor from '../components/content/ServicesEditor';
import StatisticsEditor from '../components/content/StatisticsEditor';
import LivePreview from '../components/content/LivePreview';

const initialContentData = {
  hero: {
    heroTitle: "Defending the Future with Intelligent Systems",
    heroSubtitle: "DYNASOFT delivers cutting-edge defense technology, autonomous systems, and intelligence solutions for government and allied organizations worldwide.",
    ctaText: "Explore Technologies",
    ctaLink: "/services",
    secondaryCtaText: "Contact Us",
    secondaryCtaLink: "/contact",
    heroImage: ""
  },
  services: {
    sectionTitle: "Our Core Capabilities",
    sectionDescription: "End-to-end defense solutions engineered for mission-critical environments.",
    servicesList: [
      { id: 1, text: "Autonomous Intelligence Systems" },
      { id: 2, text: "ISR & Surveillance Platforms" },
      { id: 3, text: "Cybersecurity & Electronic Warfare" },
      { id: 4, text: "C4ISR Integration" },
      { id: 5, text: "Directed Energy Weapons" }
    ]
  },
  statistics: {
    sectionTitle: "By the Numbers",
    statsList: [
      { id: 1, value: "25+", label: "Years of Operation" },
      { id: 2, value: "48", label: "Allied Nations" },
      { id: 3, value: "12,000+", label: "Deployed Systems" },
      { id: 4, value: "340", label: "Defense Patents" }
    ]
  }
};

const ContentManagementPage = () => {
  const [activeTab, setActiveTab] = useState('hero');
  const [contentData, setContentData] = useState(initialContentData);

  const handleSaveContent = (sectionKey, sectionData) => {
    setContentData((prev) => ({
      ...prev,
      [sectionKey]: sectionData
    }));
    console.log(`Saved ${sectionKey} data:`, sectionData);
  };

  const renderActiveEditor = () => {
    switch (activeTab) {
      case 'hero':
        return <HeroEditor data={contentData.hero} onSave={handleSaveContent} />;
      case 'services':
        return <ServicesEditor data={contentData.services} onSave={handleSaveContent} />;
      case 'statistics':
        return <StatisticsEditor data={contentData.statistics} onSave={handleSaveContent} />;
      default:
        return <HeroEditor data={contentData.hero} onSave={handleSaveContent} />;
    }
  };

  return (
    <>
      <PageHeader
        title="Content Management"
        subtitle="Edit homepage modules and manage published content sections."
      />

      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        <ModuleSidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
        
        {renderActiveEditor()}
        
        <LivePreview heroData={contentData.hero} />
      </div>
    </>
  );
};

export default ContentManagementPage;
