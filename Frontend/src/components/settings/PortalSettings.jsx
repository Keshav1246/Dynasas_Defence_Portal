import React, { useState, useEffect } from 'react';
import SectionHeader from '../company-profile/SectionHeader';

const Toggle = ({ enabled, onChange }) => (
  <button 
    type="button"
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:ring-offset-2 ${enabled ? 'bg-[#F97316]' : 'bg-gray-200'}`}
  >
    <span 
      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? 'translate-x-5' : 'translate-x-0'}`} 
    />
  </button>
);

const PortalSettings = ({ data, onSave }) => {
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleDiscard = () => {
    setFormData(data);
  };

  const handleToggle = (id) => {
    setFormData(prev => ({
      ...prev,
      toggles: prev.toggles.map(t => t.id === id ? { ...t, enabled: !t.enabled } : t)
    }));
  };

  return (
    <div className="flex-1 bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 p-6 md:p-8 flex flex-col min-w-0">
      <SectionHeader 
        title="Portal Configuration" 
        subtitle="Manage portal settings and configuration" 
        onSave={() => onSave('portal', formData)} 
        onDiscard={handleDiscard} 
      />

      <div className="space-y-6 mt-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-[13px] font-semibold text-gray-900">Website URL</label>
            <input 
              type="text" 
              value={formData.websiteUrl}
              onChange={(e) => setFormData({...formData, websiteUrl: e.target.value})}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F97316] focus:border-transparent outline-none transition-all text-[13px] text-gray-700 font-medium"
            />
          </div>
          <div>
            <label className="block mb-2 text-[13px] font-semibold text-gray-900">Admin Portal URL</label>
            <input 
              type="text" 
              value={formData.adminUrl}
              onChange={(e) => setFormData({...formData, adminUrl: e.target.value})}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F97316] focus:border-transparent outline-none transition-all text-[13px] text-gray-700 font-medium"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 text-[13px] font-semibold text-gray-900">Google Analytics ID</label>
          <input 
            type="text" 
            value={formData.gaId}
            onChange={(e) => setFormData({...formData, gaId: e.target.value})}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F97316] focus:border-transparent outline-none transition-all text-[13px] text-gray-700 font-medium"
          />
        </div>

        <div>
          <label className="block mb-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-4">CONFIGURATION TOGGLES</label>
          <div className="space-y-0 border-t border-gray-100 pt-2">
            {formData.toggles.map((toggle, index) => (
              <div key={toggle.id} className={`flex items-center justify-between py-4 ${index !== formData.toggles.length - 1 ? 'border-b border-gray-50' : ''}`}>
                <div>
                  <h4 className="text-[13px] font-bold text-gray-900">{toggle.title}</h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">{toggle.description}</p>
                </div>
                <Toggle enabled={toggle.enabled} onChange={() => handleToggle(toggle.id)} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PortalSettings;
