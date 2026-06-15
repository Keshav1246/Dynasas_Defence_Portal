import React, { useState, useEffect } from 'react';
import SectionHeader from './SectionHeader';
import { Trash2, Plus } from 'lucide-react';

const MissionSection = ({ data, onSave }) => {
  const [formData, setFormData] = useState(data);
  const [deletedPillarIds, setDeletedPillarIds] = useState([]);

  useEffect(() => {
    setFormData(data);
    setDeletedPillarIds([]);
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

  const handleDeletePillar = (id) => {
    if (String(id).startsWith('temp-')) {
      setFormData(prev => ({
        ...prev,
        pillars: prev.pillars.filter(p => p.id !== id)
      }));
    } else {
      setDeletedPillarIds(prev => [...prev, id]);
      setFormData(prev => ({
        ...prev,
        pillars: prev.pillars.filter(p => p.id !== id)
      }));
    }
  };

  const handleAddPillar = () => {
    setFormData(prev => ({
      ...prev,
      pillars: [...prev.pillars, { id: `temp-${Date.now()}`, text: '' }]
    }));
  };

  const handleDiscard = () => {
    setFormData(data);
    setDeletedPillarIds([]);
  };

  const handleSave = () => {
    const originalPillarsMap = new Map(data.pillars.map(p => [p.id, p]));
    
    const newPillars = formData.pillars.filter(p => String(p.id).startsWith('temp-') && p.text.trim());
    const modifiedPillars = formData.pillars.filter(p => {
      if (String(p.id).startsWith('temp-')) return false;
      const original = originalPillarsMap.get(p.id);
      return original && original.text !== p.text && p.text.trim();
    });

    onSave('mission', {
      title: formData.title,
      statement: formData.statement,
      pillarsData: {
        newItems: newPillars,
        modifiedItems: modifiedPillars,
        deletedIds: deletedPillarIds
      }
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 p-6 md:p-8 w-full">
      <SectionHeader 
        title="Mission" 
        subtitle="Edit this section of the company profile" 
        onSave={handleSave} 
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
                  placeholder="Enter pillar text"
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-gray-700"
                />
                <button
                  type="button"
                  onClick={() => handleDeletePillar(pillar.id)}
                  className="p-2.5 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors shrink-0"
                  title="Delete Pillar"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            
            <button 
              type="button"
              onClick={handleAddPillar}
              className="flex items-center justify-center gap-2 mt-4 border-2 border-dashed border-gray-200 rounded-xl py-3 text-gray-400 hover:text-orange-500 hover:border-orange-200 hover:bg-orange-50/50 transition-all w-full"
            >
              <Plus className="w-4 h-4" />
              <span className="font-medium text-sm">Add Pillar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionSection;
