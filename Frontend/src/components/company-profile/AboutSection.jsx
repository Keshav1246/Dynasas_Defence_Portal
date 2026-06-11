import React, { useState, useEffect } from 'react';
import SectionHeader from './SectionHeader';
import { UploadCloud } from 'lucide-react';

const AboutSection = ({ data, onSave }) => {
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDiscard = () => {
    setFormData(data);
  };

  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 p-6 md:p-8 w-full">
      <SectionHeader 
        title="About Us" 
        subtitle="Edit this section of the company profile" 
        onSave={() => onSave('about', formData)} 
        onDiscard={handleDiscard} 
      />

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Company Name</label>
            <input 
              type="text" 
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Founded Year</label>
            <input 
              type="text" 
              name="foundedYear"
              value={formData.foundedYear}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">Headquarters</label>
          <input 
            type="text" 
            name="headquarters"
            value={formData.headquarters}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">Registration Number</label>
          <input 
            type="text" 
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">Company Overview</label>
          <textarea 
            name="overview"
            value={formData.overview}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all leading-relaxed text-sm text-gray-700"
          />
        </div>

        <div>
          <label className="block mb-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Company Logo</label>
          <label className="mt-1 flex justify-center px-6 pt-8 pb-8 border-2 border-gray-200 border-dashed rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer group relative">
            <div className="space-y-2 text-center">
              <UploadCloud className="mx-auto h-10 w-10 text-gray-300 group-hover:text-orange-400 transition-colors" />
              <div className="flex text-sm text-gray-700 justify-center font-medium">
                <span>Upload company logo</span>
              </div>
              <p className="text-xs text-gray-400 font-medium tracking-wide">SVG, PNG &mdash; transparent background preferred</p>
            </div>
            <input type="file" className="hidden" accept="image/svg+xml,image/png" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
