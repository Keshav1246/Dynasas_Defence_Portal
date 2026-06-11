import React from 'react';
import { Trash2 } from 'lucide-react';

const StatisticCard = ({ id, value, label, onDelete }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] relative group">
      <button 
        onClick={() => onDelete(id)}
        className="absolute top-4 right-4 p-1.5 text-gray-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
        title="Delete Statistic"
      >
        <Trash2 className="w-[18px] h-[18px]" />
      </button>
      <div className="flex flex-col">
        <h3 className="text-3xl font-bold text-orange-500 mb-1.5 tracking-tight">{value}</h3>
        <p className="text-[13px] font-medium text-gray-500">{label}</p>
      </div>
    </div>
  );
};

export default StatisticCard;
