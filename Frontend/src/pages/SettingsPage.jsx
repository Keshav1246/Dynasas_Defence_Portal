import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import SettingsSidebar from '../components/settings/SettingsSidebar';
import BrandingSettings from '../components/settings/BrandingSettings';
import FooterSettings from '../components/settings/FooterSettings';
import SocialLinksSettings from '../components/settings/SocialLinksSettings';
import PortalSettings from '../components/settings/PortalSettings';

const initialSettingsData = {
  branding: {
    colors: [
      { id: 'primary', label: "Primary Color", value: "#FF6B00" },
      { id: 'accent', label: "Accent Color", value: "#D72638" },
      { id: 'bgDark', label: "Background Dark", value: "#0F1115" },
      { id: 'text', label: "Text Color", value: "#374151" }
    ],
    typography: {
      headingFont: "Inter",
      bodyFont: "Inter"
    }
  },
  footer: {
    tagline: "© 2025 DYNASOFT Defense Technologies. All rights reserved.",
    description: "Leading the future of defense technology through innovation, precision, and partners",
    columns: [
      { id: 'company', title: 'Company', links: ["About Us", "Careers", "News & Press"] },
      { id: 'solutions', title: 'Solutions', links: ["Autonomous Systems", "ISR Platforms", "Cybersecurity"] },
      { id: 'resources', title: 'Resources', links: ["Documentation", "Partners", "Contact"] },
      { id: 'legal', title: 'Legal', links: ["Privacy Policy", "Terms of Service", "Export Compliance"] }
    ]
  },
  social: [
    { id: 'linkedin', label: "LinkedIn", value: "https://linkedin.com/company/dynasoft" },
    { id: 'twitter', label: "Twitter / X", value: "https://twitter.com/dynasoft" },
    { id: 'youtube', label: "YouTube", value: "https://youtube.com/dynasoft" },
    { id: 'facebook', label: "Facebook", value: "" },
    { id: 'instagram', label: "Instagram", value: "" }
  ],
  portal: {
    websiteUrl: "https://www.dynasoft.com",
    adminUrl: "https://admin.dynasoft.com",
    gaId: "G-XXXXXXXXXX",
    toggles: [
      { id: 'maintenance', title: "Maintenance Mode", description: "Show maintenance page to all visitors", enabled: false },
      { id: 'analytics', title: "Google Analytics", description: "Enable GA4 tracking script on the website", enabled: true },
      { id: 'cookie', title: "Cookie Consent Banner", description: "Show GDPR-compliant cookie popup", enabled: true },
      { id: 'https', title: "Force HTTPS", description: "Redirect all HTTP traffic to HTTPS", enabled: true },
      { id: 'indexing', title: "Search Engine Indexing", description: "Allow crawlers to index the website", enabled: true },
      { id: 'livechat', title: "Live Chat Widget", description: "Enable customer support live chat", enabled: false }
    ]
  }
};

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('branding');
  const [settingsData, setSettingsData] = useState(initialSettingsData);

  const handleSaveSettings = (sectionKey, sectionData) => {
    setSettingsData((prev) => ({
      ...prev,
      [sectionKey]: sectionData
    }));
    console.log(`Saved ${sectionKey} data:`, sectionData);
  };

  const renderActiveSettingsPanel = () => {
    switch (activeTab) {
      case 'branding':
        return <BrandingSettings data={settingsData.branding} onSave={handleSaveSettings} />;
      case 'footer':
        return <FooterSettings data={settingsData.footer} onSave={handleSaveSettings} />;
      case 'social':
        return <SocialLinksSettings data={settingsData.social} onSave={handleSaveSettings} />;
      case 'portal':
        return <PortalSettings data={settingsData.portal} onSave={handleSaveSettings} />;
      default:
        return <BrandingSettings data={settingsData.branding} onSave={handleSaveSettings} />;
    }
  };

  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Configure branding, portal settings, social links and more."
      />

      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        <SettingsSidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
        
        {renderActiveSettingsPanel()}
        
        {/* Empty Space for 3-column layout matching Figma */}
        <div className="hidden lg:block lg:w-[220px] shrink-0"></div>
      </div>
    </>
  );
};

export default SettingsPage;
