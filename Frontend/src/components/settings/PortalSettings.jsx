import React, { useState, useEffect } from 'react';
import SectionHeader from '../company-profile/SectionHeader';
import { AlertCircle } from 'lucide-react';

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

const PortalSettings = ({ data, onSave, isSaving }) => {
  const [formData, setFormData] = useState(data);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(data);
    setErrors({});
  }, [data]);

  const handleDiscard = () => {
    setFormData(data);
    setErrors({});
  };

  const validateField = (name, value) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) return null;
    
    if (name === 'portalName' && value.length > 100) return 'Max 100 characters';
    if (name === 'siteName' && value.length > 100) return 'Max 100 characters';
    if (name === 'siteDescription' && value.length > 500) return 'Max 500 characters';
    if (name === 'supportEmail' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
    
    return null;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({ ...prev, [name]: val }));
    
    if (type !== 'checkbox') {
      const error = validateField(name, val);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleToggle = () => {
    setFormData(prev => ({ ...prev, maintenanceMode: !prev.maintenanceMode }));
  };

  const isDirty = JSON.stringify(data) !== JSON.stringify(formData);
  const hasErrors = Object.values(errors).some(err => err !== null);

  const handleSave = () => {
    if (hasErrors) return;
    onSave('portal', formData);
  };

  return (
    <div className="flex-1 bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 p-6 md:p-8 flex flex-col min-w-0">
      <SectionHeader 
        title="Site Settings" 
        subtitle="Manage core platform configuration and preferences" 
        onSave={handleSave} 
        onDiscard={handleDiscard}
        isDirty={isDirty && !hasErrors}
        isSaving={isSaving}
      />

      <div className="space-y-8 mt-2">
        {/* Basic Information */}
        <div>
          <h3 className="text-[14px] font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block mb-2 text-[13px] font-semibold text-gray-900">Portal Name</label>
              <input 
                type="text"
                name="portalName"
                value={formData.portalName}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 bg-gray-50 border ${errors.portalName ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-[#F97316]'} rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all text-[13px] text-gray-700 font-medium`}
              />
              {errors.portalName && (
                <div className="flex items-center gap-1 mt-1.5 text-[11px] font-medium text-red-500">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.portalName}
                </div>
              )}
            </div>
            <div>
              <label className="block mb-2 text-[13px] font-semibold text-gray-900">Site Name</label>
              <input 
                type="text"
                name="siteName"
                value={formData.siteName}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 bg-gray-50 border ${errors.siteName ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-[#F97316]'} rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all text-[13px] text-gray-700 font-medium`}
              />
              {errors.siteName && (
                <div className="flex items-center gap-1 mt-1.5 text-[11px] font-medium text-red-500">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.siteName}
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="block mb-2 text-[13px] font-semibold text-gray-900">Site Description</label>
            <textarea 
              name="siteDescription"
              value={formData.siteDescription}
              onChange={handleChange}
              rows={3}
              className={`w-full px-4 py-3 bg-gray-50 border ${errors.siteDescription ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-[#F97316]'} rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all text-[13px] text-gray-700 font-medium resize-none`}
            />
            {errors.siteDescription && (
              <div className="flex items-center gap-1 mt-1.5 text-[11px] font-medium text-red-500">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.siteDescription}
              </div>
            )}
          </div>
        </div>

        {/* Support Information */}
        <div>
          <h3 className="text-[14px] font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4">Support Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-[13px] font-semibold text-gray-900">Support Email</label>
              <input 
                type="email"
                name="supportEmail"
                value={formData.supportEmail}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 bg-gray-50 border ${errors.supportEmail ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-[#F97316]'} rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all text-[13px] text-gray-700 font-medium`}
              />
              {errors.supportEmail && (
                <div className="flex items-center gap-1 mt-1.5 text-[11px] font-medium text-red-500">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.supportEmail}
                </div>
              )}
            </div>
            <div>
              <label className="block mb-2 text-[13px] font-semibold text-gray-900">Support Phone</label>
              <input 
                type="text"
                name="supportPhone"
                value={formData.supportPhone}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F97316] focus:border-transparent outline-none transition-all text-[13px] text-gray-700 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Localization */}
        <div>
          <h3 className="text-[14px] font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4">Localization</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-[13px] font-semibold text-gray-900">Default Language</label>
              <select 
                name="defaultLanguage"
                value={formData.defaultLanguage}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F97316] focus:border-transparent outline-none transition-all text-[13px] text-gray-700 font-medium appearance-none"
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Arabic">Arabic</option>
                <option value="French">French</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-[13px] font-semibold text-gray-900">Timezone</label>
              <select 
                name="timezone"
                value={formData.timezone}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F97316] focus:border-transparent outline-none transition-all text-[13px] text-gray-700 font-medium appearance-none"
              >
                <option value="Asia/Kolkata">Asia/Kolkata</option>
                <option value="UTC">UTC</option>
                <option value="Europe/London">Europe/London</option>
                <option value="America/New_York">America/New_York</option>
                <option value="Asia/Dubai">Asia/Dubai</option>
              </select>
            </div>
          </div>
        </div>

        {/* System Controls */}
        <div>
          <h3 className="text-[14px] font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4">System Controls</h3>
          <div className="flex items-center justify-between py-2">
            <div>
              <h4 className="text-[13px] font-bold text-gray-900">Maintenance Mode</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">Temporarily disable public access to the portal.</p>
            </div>
            <Toggle enabled={formData.maintenanceMode} onChange={handleToggle} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default PortalSettings;
