import React, { useState, useEffect } from 'react';
import { Eye, UploadCloud } from 'lucide-react';

const HeroEditor = ({ data, onSave }) => {
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex-1 bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 p-6 md:p-8 flex flex-col min-w-0">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-gray-100 gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Hero Section</h2>
          <p className="text-sm text-gray-500 mt-1">Edit content for this homepage module</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors">
            <Eye className="w-4 h-4" />
            Preview
          </button>
          <button 
            onClick={() => onSave('hero', formData)}
            className="px-5 py-2 text-sm font-medium text-white bg-[#E1432E] rounded-xl shadow-sm hover:bg-[#C92A22] transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Dark Navy Hero Banner Preview inside Editor */}
      <div className="w-full bg-[#111318] rounded-2xl flex flex-col items-center justify-center py-10 px-6 text-center mb-8 relative overflow-hidden shadow-md">
        <span className="text-[9px] font-bold text-[#F97316] uppercase tracking-widest mb-3">
          DYNASOFT • DEFENSE TECHNOLOGY
        </span>
        <h2 className="text-[26px] font-bold text-white leading-tight max-w-xl">
          {formData.heroTitle || "Defending the Future with Intelligent Systems"}
        </h2>
        <button className="mt-6 px-5 py-2 bg-[#F97316] text-white text-sm font-bold rounded-lg hover:bg-[#EA580C] transition-colors">
          {formData.ctaText || "Explore Technologies"}
        </button>
        <span className="absolute bottom-3 right-4 text-[10px] text-gray-500 font-medium">Preview</span>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block mb-2 text-[13px] font-semibold text-gray-900">Hero Title</label>
          <input 
            type="text" 
            name="heroTitle"
            value={formData.heroTitle}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F97316] focus:border-transparent outline-none transition-all text-sm"
          />
        </div>

        <div>
          <label className="block mb-2 text-[13px] font-semibold text-gray-900">Hero Subtitle</label>
          <textarea 
            name="heroSubtitle"
            value={formData.heroSubtitle}
            onChange={handleChange}
            rows={2}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F97316] focus:border-transparent outline-none transition-all text-[13px] text-gray-700 leading-relaxed"
          />
        </div>

        <div>
          <label className="block mb-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">BACKGROUND MEDIA</label>
          <label className="flex justify-center px-6 py-10 border-2 border-gray-200 border-dashed rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer group">
            <div className="space-y-2 text-center">
              <UploadCloud className="mx-auto h-8 w-8 text-gray-300 group-hover:text-gray-400 transition-colors" />
              <div className="flex text-sm text-gray-700 justify-center font-medium">
                <span>Upload background image or video</span>
              </div>
              <p className="text-xs text-gray-400 font-medium">PNG, JPG, MP4 &mdash; recommended 1920&times;1080</p>
            </div>
            <input type="file" className="hidden" />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-[13px] font-semibold text-gray-700">CTA Button Text</label>
            <input 
              type="text" 
              name="ctaText"
              value={formData.ctaText}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F97316] focus:border-transparent outline-none transition-all text-sm text-gray-700"
            />
          </div>
          <div>
            <label className="block mb-2 text-[13px] font-semibold text-gray-700">CTA URL</label>
            <input 
              type="text" 
              name="ctaLink"
              value={formData.ctaLink}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F97316] focus:border-transparent outline-none transition-all text-sm text-gray-700"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-[13px] font-semibold text-gray-700">Secondary CTA Text</label>
            <input 
              type="text" 
              name="secondaryCtaText"
              value={formData.secondaryCtaText}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F97316] focus:border-transparent outline-none transition-all text-sm text-gray-700"
            />
          </div>
          <div>
            <label className="block mb-2 text-[13px] font-semibold text-gray-700">Secondary CTA URL</label>
            <input 
              type="text" 
              name="secondaryCtaLink"
              value={formData.secondaryCtaLink}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F97316] focus:border-transparent outline-none transition-all text-sm text-gray-700"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroEditor;
