import React, { useState, useEffect } from 'react';
import SectionHeader from './SectionHeader';

const MissionSection = ({ data, onSave }) => {
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePillarChange = (id, text) => {
    setFormData(prev => ({
      ...prev,
      pillars: prev.pillars.map(p => p.id === id ? { ...p, text } : p)
    }));
  };

  const handleDiscard = () => {
    setFormData(data);
  };

  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 p-6 md:p-8 w-full">
      <SectionHeader 
        title="Mission" 
        subtitle="Edit this section of the company profile" 
        onSave={() => onSave('mission', formData)} 
        onDiscard={handleDiscard} 
      />

      <div className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">Mission Title</label>
          <input 
            type="text" 
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">Mission Statement</label>
          <textarea 
            name="statement"
            value={formData.statement}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all leading-relaxed text-sm text-gray-700"
          />
        </div>

        <div>
          <label className="block mb-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Mission Pillars</label>
          <div className="space-y-3">
            {formData.pillars.map((pillar, index) => (
              <div key={pillar.id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 font-bold text-sm flex items-center justify-center shrink-0 border border-orange-100">
                  {index + 1}
                </div>
                <input 
                  type="text" 
                  value={pillar.text}
                  onChange={(e) => handlePillarChange(pillar.id, e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-gray-700"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionSection;
