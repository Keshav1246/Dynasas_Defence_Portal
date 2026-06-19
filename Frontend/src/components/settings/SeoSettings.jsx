import React, { useState, useEffect } from 'react';
import SectionHeader from '../company-profile/SectionHeader';
import { AlertCircle } from 'lucide-react';

const SeoSettings = ({ data, onSave, isSaving }) => {
  const [formData, setFormData] = useState(data || {});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(data || {});
    setErrors({});
  }, [data]);

  const handleDiscard = () => {
    setFormData(data || {});
    setErrors({});
  };

  const validateField = (name, value) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) return null;
    
    if (name === 'seoTitle' && value.length > 70) return 'Max 70 characters recommended';
    if (name === 'seoDescription' && value.length > 160) return 'Max 160 characters recommended';
    
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({ ...prev, [name]: value }));
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const isDirty = JSON.stringify(data || {}) !== JSON.stringify(formData);
  const hasErrors = Object.values(errors).some(err => err !== null);

  const handleSave = () => {
    if (hasErrors) return;
    onSave('seo', formData);
  };

  return (
    <div className="flex-1 bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 p-6 md:p-8 flex flex-col min-w-0">
      <SectionHeader 
        title="SEO & Meta Data" 
        subtitle="Manage search engine optimization and social sharing meta tags" 
        onSave={handleSave} 
        onDiscard={handleDiscard}
        isDirty={isDirty && !hasErrors}
        isSaving={isSaving}
      />

      <div className="space-y-8 mt-2">
        {/* Basic SEO */}
        <div>
          <h3 className="text-[14px] font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4">Basic SEO</h3>
          <div className="grid grid-cols-1 gap-6 mb-6">
            <div>
              <label className="block mb-2 text-[13px] font-semibold text-gray-900">Meta Title</label>
              <input 
                type="text"
                name="seoTitle"
                value={formData.seoTitle || ''}
                onChange={handleChange}
                placeholder="e.g. Dynasas | Advanced Defense Solutions"
                className={`w-full px-4 py-2.5 bg-gray-50 border ${errors.seoTitle ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-[#F97316]'} rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all text-[13px] text-gray-700 font-medium`}
              />
              <div className="flex justify-between items-center mt-1.5">
                {errors.seoTitle ? (
                  <div className="flex items-center gap-1 text-[11px] font-medium text-red-500">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.seoTitle}
                  </div>
                ) : (
                  <span className="text-[11px] text-gray-400">Ideally 50-60 characters</span>
                )}
                <span className={`text-[11px] ${formData.seoTitle?.length > 70 ? 'text-red-500' : 'text-gray-400'}`}>
                  {formData.seoTitle?.length || 0}/70
                </span>
              </div>
            </div>
            
            <div>
              <label className="block mb-2 text-[13px] font-semibold text-gray-900">Meta Description</label>
              <textarea 
                name="seoDescription"
                value={formData.seoDescription || ''}
                onChange={handleChange}
                rows={3}
                placeholder="Brief description of the site for search engines..."
                className={`w-full px-4 py-3 bg-gray-50 border ${errors.seoDescription ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-[#F97316]'} rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all text-[13px] text-gray-700 font-medium resize-none`}
              />
              <div className="flex justify-between items-center mt-1.5">
                {errors.seoDescription ? (
                  <div className="flex items-center gap-1 text-[11px] font-medium text-red-500">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.seoDescription}
                  </div>
                ) : (
                  <span className="text-[11px] text-gray-400">Ideally 150-160 characters</span>
                )}
                <span className={`text-[11px] ${formData.seoDescription?.length > 160 ? 'text-red-500' : 'text-gray-400'}`}>
                  {formData.seoDescription?.length || 0}/160
                </span>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-[13px] font-semibold text-gray-900">Keywords</label>
              <input 
                type="text"
                name="seoKeywords"
                value={formData.seoKeywords || ''}
                onChange={handleChange}
                placeholder="defense, aerospace, tactical (comma separated)"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F97316] focus:border-transparent outline-none transition-all text-[13px] text-gray-700 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Social Sharing (Open Graph / Twitter) */}
        <div>
          <h3 className="text-[14px] font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4">Social Sharing Images</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-[13px] font-semibold text-gray-900">Open Graph (OG) Image URL</label>
              <input 
                type="text"
                name="seoOgImage"
                value={formData.seoOgImage || ''}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F97316] focus:border-transparent outline-none transition-all text-[13px] text-gray-700 font-medium"
              />
              <span className="block mt-1 text-[11px] text-gray-400">Used by Facebook, LinkedIn, etc.</span>
            </div>
            <div>
              <label className="block mb-2 text-[13px] font-semibold text-gray-900">Twitter Card Image URL</label>
              <input 
                type="text"
                name="seoTwitterImage"
                value={formData.seoTwitterImage || ''}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F97316] focus:border-transparent outline-none transition-all text-[13px] text-gray-700 font-medium"
              />
              <span className="block mt-1 text-[11px] text-gray-400">Used for Twitter link previews.</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SeoSettings;
