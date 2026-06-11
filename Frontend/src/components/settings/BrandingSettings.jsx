import React, { useState, useEffect } from 'react';
import SectionHeader from '../company-profile/SectionHeader';
import { UploadCloud } from 'lucide-react';

const BrandingSettings = ({ data, onSave }) => {
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleDiscard = () => {
    setFormData(data);
  };

  return (
    <div className="flex-1 bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 p-6 md:p-8 flex flex-col min-w-0">
      <SectionHeader 
        title="Branding" 
        subtitle="Manage portal settings and configuration" 
        onSave={() => onSave('branding', formData)} 
        onDiscard={handleDiscard} 
      />

      <div className="space-y-8 mt-2">
        {/* Brand Colors */}
        <div>
          <label className="block mb-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">BRAND COLORS</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {formData.colors.map(color => (
              <div key={color.id} className="flex items-center gap-4 p-4 border border-gray-100 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                <div 
                  className="w-8 h-8 rounded-full shadow-sm shrink-0" 
                  style={{ backgroundColor: color.value }}
                />
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-gray-900">{color.label}</span>
                  <span className="text-[11px] font-medium text-gray-400 font-mono mt-0.5 uppercase tracking-wider">{color.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Logo Uploads */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block mb-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">PRIMARY LOGO</label>
            <label className="flex justify-center px-6 py-8 border-2 border-gray-200 border-dashed rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer group">
              <div className="space-y-2 text-center">
                <UploadCloud className="mx-auto h-7 w-7 text-gray-300 group-hover:text-gray-400 transition-colors" />
                <div className="flex text-[13px] text-gray-700 justify-center font-medium">
                  <span>Upload logo</span>
                </div>
                <p className="text-[11px] text-gray-400 font-medium">SVG or PNG &mdash; transparent bg</p>
              </div>
              <input type="file" className="hidden" />
            </label>
          </div>
          <div>
            <label className="block mb-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">LOGO (DARK BACKGROUND)</label>
            <label className="flex justify-center px-6 py-8 border-2 border-gray-200 border-dashed rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer group">
              <div className="space-y-2 text-center">
                <UploadCloud className="mx-auto h-7 w-7 text-gray-300 group-hover:text-gray-400 transition-colors" />
                <div className="flex text-[13px] text-gray-700 justify-center font-medium">
                  <span>Upload logo</span>
                </div>
                <p className="text-[11px] text-gray-400 font-medium">SVG or PNG &mdash; transparent bg</p>
              </div>
              <input type="file" className="hidden" />
            </label>
          </div>
        </div>

        {/* Favicon Upload */}
        <div>
          <label className="block mb-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">FAVICON</label>
          <label className="flex justify-center px-6 py-10 border-2 border-gray-200 border-dashed rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer group">
            <div className="space-y-2 text-center">
              <UploadCloud className="mx-auto h-7 w-7 text-gray-300 group-hover:text-gray-400 transition-colors" />
              <div className="flex text-[13px] text-gray-700 justify-center font-medium">
                <span>Upload favicon</span>
              </div>
              <p className="text-[11px] text-gray-400 font-medium">ICO or PNG &mdash; 32&times;32 or 64&times;64px</p>
            </div>
            <input type="file" className="hidden" />
          </label>
        </div>

        {/* Typography */}
        <div>
          <label className="block mb-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">TYPOGRAPHY</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest">HEADING FONT</label>
              <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-[13px] font-semibold text-gray-900 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23111827%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:16px_16px] bg-[right_16px_center] bg-no-repeat">
                <option>Inter</option>
                <option>Roboto</option>
                <option>Poppins</option>
                <option>Montserrat</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest">BODY FONT</label>
              <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-[13px] font-semibold text-gray-900 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23111827%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:16px_16px] bg-[right_16px_center] bg-no-repeat">
                <option>Inter</option>
                <option>Roboto</option>
                <option>Poppins</option>
                <option>Montserrat</option>
              </select>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BrandingSettings;
