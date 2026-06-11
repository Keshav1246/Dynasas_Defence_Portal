import React from 'react';

const SectionHeader = ({ title, subtitle, onSave, onDiscard }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-gray-100 gap-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <button
          type="button"
          onClick={onDiscard}
          className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors"
        >
          Discard
        </button>
        <button
          type="button"
          onClick={onSave}
          className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-sm hover:from-orange-600 hover:to-orange-700 transition-all"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SectionHeader;
