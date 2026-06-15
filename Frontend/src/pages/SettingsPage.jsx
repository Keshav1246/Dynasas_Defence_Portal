import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SettingsSidebar from '../components/settings/SettingsSidebar';
import BrandingSettings from '../components/settings/BrandingSettings';
import FooterSettings from '../components/settings/FooterSettings';
import SocialLinksSettings from '../components/settings/SocialLinksSettings';
import PortalSettings from '../components/settings/PortalSettings';
import { getSettings, updateSettings } from '../services/settings.service';

const defaultMockData = {
  footer: {
    tagline: "© 2025 DYNASOFT Defense Technologies. All rights reserved.",
    description: "Leading the future of defense technology through innovation, precision, and partners",
    columns: [
      { id: 'company', title: 'Company', links: ["About Us", "Careers", "News & Press"] },
      { id: 'solutions', title: 'Solutions', links: ["Autonomous Systems", "ISR Platforms", "Cybersecurity"] },
      { id: 'resources', title: 'Resources', links: ["Documentation", "Partners", "Contact"] },
      { id: 'legal', title: 'Legal', links: ["Privacy Policy", "Terms of Service", "Export Compliance"] }
    ]
  }
};

const defaultBranding = {
  primaryColor: "#FF6B00",
  accentColor: "#D72638",
  backgroundDark: "#0F1115",
  textColor: "#374151",
  primaryLogo: null,
  darkLogo: null,
  favicon: null,
  headingFont: "Inter",
  bodyFont: "Inter"
};

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('branding');
  const [settingsData, setSettingsData] = useState(null);
  const [settingsId, setSettingsId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      const data = await getSettings();
      
      setSettingsId(data.id || null);
      
      setSettingsData({
        branding: {
          primaryColor: data.primaryColor || defaultBranding.primaryColor,
          accentColor: data.accentColor || defaultBranding.accentColor,
          backgroundDark: data.backgroundDark || defaultBranding.backgroundDark,
          textColor: data.textColor || defaultBranding.textColor,
          primaryLogo: data.primaryLogo || null,
          darkLogo: data.darkLogo || null,
          favicon: data.favicon || null,
          headingFont: data.headingFont || defaultBranding.headingFont,
          bodyFont: data.bodyFont || defaultBranding.bodyFont
        },
        footer: defaultMockData.footer,
        social: [
          { id: 'linkedinUrl', label: 'LinkedIn', value: data.linkedinUrl || '' },
          { id: 'twitterUrl', label: 'Twitter / X', value: data.twitterUrl || '' },
          { id: 'youtubeUrl', label: 'YouTube', value: data.youtubeUrl || '' },
          { id: 'facebookUrl', label: 'Facebook', value: data.facebookUrl || '' },
          { id: 'instagramUrl', label: 'Instagram', value: data.instagramUrl || '' }
        ],
        portal: {
          portalName: data.portalName || '',
          siteName: data.siteName || '',
          siteDescription: data.siteDescription || '',
          supportEmail: data.supportEmail || '',
          supportPhone: data.supportPhone || '',
          defaultLanguage: data.defaultLanguage || 'English',
          timezone: data.timezone || 'Asia/Kolkata',
          maintenanceMode: data.maintenanceMode || false
        }
      });
      
    } catch (err) {
      toast.error('Failed to load settings data');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSaveSettings = async (sectionKey, sectionData) => {
    if (sectionKey === 'branding') {
      try {
        setIsSaving(true);
        const payload = {
          primaryColor: sectionData.primaryColor,
          accentColor: sectionData.accentColor,
          backgroundDark: sectionData.backgroundDark,
          textColor: sectionData.textColor,
          primaryLogo: sectionData.primaryLogo,
          darkLogo: sectionData.darkLogo,
          favicon: sectionData.favicon,
          headingFont: sectionData.headingFont,
          bodyFont: sectionData.bodyFont
        };

        await updateSettings(settingsId, payload);
        toast.success('Branding settings updated successfully');
        await fetchSettings();
      } catch (err) {
        toast.error(err.message || 'Failed to update branding settings');
      } finally {
        setIsSaving(false);
      }
    } else if (sectionKey === 'social') {
      try {
        setIsSaving(true);
        const payload = {
          linkedinUrl: sectionData.find(s => s.id === 'linkedinUrl')?.value || '',
          twitterUrl: sectionData.find(s => s.id === 'twitterUrl')?.value || '',
          youtubeUrl: sectionData.find(s => s.id === 'youtubeUrl')?.value || '',
          facebookUrl: sectionData.find(s => s.id === 'facebookUrl')?.value || '',
          instagramUrl: sectionData.find(s => s.id === 'instagramUrl')?.value || ''
        };

        await updateSettings(settingsId, payload);
        toast.success('Social media links updated successfully');
        await fetchSettings();
      } catch (err) {
        toast.error(err.message || 'Failed to update social media links');
      } finally {
        setIsSaving(false);
      }
    } else if (sectionKey === 'portal') {
      try {
        setIsSaving(true);
        const payload = {
          portalName: sectionData.portalName || '',
          siteName: sectionData.siteName || '',
          siteDescription: sectionData.siteDescription || '',
          supportEmail: sectionData.supportEmail || '',
          supportPhone: sectionData.supportPhone || '',
          defaultLanguage: sectionData.defaultLanguage || 'English',
          timezone: sectionData.timezone || 'Asia/Kolkata',
          maintenanceMode: sectionData.maintenanceMode || false
        };

        await updateSettings(settingsId, payload);
        toast.success('Site settings updated successfully');
        await fetchSettings();
      } catch (err) {
        toast.error(err.message || 'Failed to update site settings');
      } finally {
        setIsSaving(false);
      }
    } else {
      console.log(`Save triggered for ${sectionKey}, but saving is disabled in Step 1.`, sectionData);
      toast.success(`Data fetching verified! Save functionality for ${sectionKey} is deferred.`);
    }
  };

  const renderActiveSettingsPanel = () => {
    if (isLoading || !settingsData) {
      return (
        <div className="flex-1 bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 p-8 flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4 text-gray-400">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            <span className="text-sm font-medium">Loading Settings...</span>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'branding':
        return <BrandingSettings data={settingsData.branding} onSave={handleSaveSettings} isSaving={isSaving} />;
      case 'footer':
        return <FooterSettings />;
      case 'social':
        return <SocialLinksSettings data={settingsData.social} onSave={handleSaveSettings} />;
      case 'portal':
        return <PortalSettings data={settingsData.portal} onSave={handleSaveSettings} />;
      default:
        return <BrandingSettings data={settingsData.branding} onSave={handleSaveSettings} isSaving={isSaving} />;
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
