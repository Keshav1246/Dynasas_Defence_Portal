import React from 'react';
import { Trash2 } from 'lucide-react';

const StatisticCard = ({ id, value, label, onChange, onDelete }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] relative group">
      <button 
        onClick={() => onDelete(id)}
        className="absolute top-4 right-4 p-1.5 text-gray-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
        title="Delete Statistic"
      >
        <Trash2 className="w-[18px] h-[18px]" />
      </button>
      <div className="flex flex-col pr-8">
        <input 
          type="text"
          value={value}
          onChange={(e) => onChange(id, 'value', e.target.value)}
          placeholder="Value (e.g. 25+)"
          className="text-3xl font-bold text-orange-500 mb-1.5 tracking-tight bg-transparent border-none p-0 focus:ring-0 outline-none w-full placeholder-orange-200"
        />
        <input 
          type="text"
          value={label}
          onChange={(e) => onChange(id, 'label', e.target.value)}
          placeholder="Label (e.g. Years of Operation)"
          className="text-[13px] font-medium text-gray-500 bg-transparent border-none p-0 focus:ring-0 outline-none w-full placeholder-gray-300"
        />
      </div>
    </div>
  );
};

export default StatisticCard;
