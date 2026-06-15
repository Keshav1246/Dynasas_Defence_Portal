import React, { useState, useEffect } from 'react';
import SectionHeader from './SectionHeader';
import StatisticCard from './StatisticCard';
import { Plus } from 'lucide-react';

const StatisticsSection = ({ data, onSave }) => {
  const [statistics, setStatistics] = useState(data);
  const [deletedIds, setDeletedIds] = useState([]);

  useEffect(() => {
    setStatistics(data);
    setDeletedIds([]);
  }, [data]);

  const handleChange = (id, field, value) => {
    setStatistics(prev => prev.map(stat => 
      stat.id === id ? { ...stat, [field]: value } : stat
    ));
  };

  const handleDelete = (id) => {
    if (String(id).startsWith('temp-')) {
      setStatistics(prev => prev.filter(stat => stat.id !== id));
    } else {
      setDeletedIds(prev => [...prev, id]);
      setStatistics(prev => prev.filter(stat => stat.id !== id));
    }
  };

  const handleAdd = () => {
    setStatistics(prev => [...prev, { id: `temp-${Date.now()}`, value: '', label: '' }]);
  };

  const handleDiscard = () => {
    setStatistics(data);
    setDeletedIds([]);
  };

  const handleSave = () => {
    const originalMap = new Map(data.map(s => [s.id, s]));
    
    const newItems = statistics.filter(s => String(s.id).startsWith('temp-') && s.value.trim() && s.label.trim());
    const modifiedItems = statistics.filter(s => {
      if (String(s.id).startsWith('temp-')) return false;
      const original = originalMap.get(s.id);
      return original && (original.value !== s.value || original.label !== s.label) && s.value.trim() && s.label.trim();
    });

    onSave('statistics', {
      newItems,
      modifiedItems,
      deletedIds
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 p-6 md:p-8 w-full">
      <SectionHeader 
        title="Company Statistics" 
        subtitle="Edit this section of the company profile" 
        onSave={handleSave} 
        onDiscard={handleDiscard} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {statistics.map((stat) => (
          <StatisticCard 
            key={stat.id} 
            {...stat} 
            onChange={handleChange}
            onDelete={handleDelete} 
          />
        ))}

        {/* Add New Button */}
        <button 
          onClick={handleAdd}
          className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-2xl p-5 text-gray-400 hover:text-orange-500 hover:border-orange-200 hover:bg-orange-50/50 transition-all min-h-[110px] w-full"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium text-sm">Add Statistic</span>
        </button>
      </div>
    </div>
  );
};

export default StatisticsSection;
