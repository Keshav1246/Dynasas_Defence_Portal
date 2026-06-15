import React from 'react';
import { Search, Plus } from 'lucide-react';

const ServiceToolbar = ({ searchQuery, onSearchChange, statusFilter, onStatusFilterChange, onAddClick }) => {
  const filters = ['All', 'Published', 'Draft', 'Archived'];

  return (
    <div className="flex flex-col items-start justify-between gap-4 mt-8 mb-6 md:flex-row md:items-center">
      <div className="flex flex-col w-full gap-4 md:flex-row md:w-auto md:items-center">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-white border border-gray-200 text-gray-900 text-sm rounded-full focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 p-2.5 shadow-sm"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => onStatusFilterChange(filter)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                statusFilter === filter
                  ? 'bg-orange-50 text-orange-600 border border-orange-200'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      
      <button
        onClick={onAddClick}
        className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-full shadow hover:from-orange-600 hover:to-orange-700 transition-all whitespace-nowrap"
      >
        <Plus className="w-4 h-4" />
        Add Service
      </button>
    </div>
  );
};

export default ServiceToolbar;
