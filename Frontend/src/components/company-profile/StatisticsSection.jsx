import React, { useState, useEffect } from 'react';
import SectionHeader from './SectionHeader';
import StatisticCard from './StatisticCard';
import { Plus } from 'lucide-react';

const StatisticsSection = ({ data, onSave }) => {
  const [statistics, setStatistics] = useState(data);

  useEffect(() => {
    setStatistics(data);
  }, [data]);

  const handleDelete = (id) => {
    setStatistics(prev => prev.filter(stat => stat.id !== id));
  };

  const handleDiscard = () => {
    setStatistics(data);
  };

  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 p-6 md:p-8 w-full">
      <SectionHeader 
        title="Company Statistics" 
        subtitle="Edit this section of the company profile" 
        onSave={() => onSave('statistics', statistics)} 
        onDiscard={handleDiscard} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {statistics.map((stat) => (
          <StatisticCard 
            key={stat.id} 
            {...stat} 
            onDelete={handleDelete} 
          />
        ))}

        {/* Add New Button */}
        <button className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-2xl p-5 text-gray-400 hover:text-orange-500 hover:border-orange-200 hover:bg-orange-50/50 transition-all min-h-[110px] w-full">
          <Plus className="w-5 h-5" />
          <span className="font-medium text-sm">Add Statistic</span>
        </button>
      </div>
    </div>
  );
};

export default StatisticsSection;
