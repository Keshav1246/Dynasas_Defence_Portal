import React, { useState, useEffect } from 'react';
import SectionHeader from './SectionHeader';

const ContactSection = ({ data, onSave }) => {
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
        title="Contact Information" 
        subtitle="Edit this section of the company profile" 
        onSave={() => onSave('contact', formData)} 
        onDiscard={handleDiscard} 
      />

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">General Email</label>
            <input 
              type="email" 
              name="generalEmail"
              value={formData.generalEmail}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Security Email</label>
            <input 
              type="email" 
              name="securityEmail"
              value={formData.securityEmail}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Main Phone</label>
            <input 
              type="text" 
              name="mainPhone"
              value={formData.mainPhone}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Defense Contracts</label>
            <input 
              type="text" 
              name="defenseContracts"
              value={formData.defenseContracts}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">Mailing Address</label>
          <textarea 
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all leading-relaxed text-sm text-gray-700"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">Website</label>
          <input 
            type="url" 
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-gray-700"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
