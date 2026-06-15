import React from 'react';

const LivePreviewCard = () => {
  return (
    <div className="mt-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-5 shadow-lg shadow-orange-500/20 text-white">
      <h3 className="font-bold text-base mb-1">Live Preview</h3>
      <p className="text-white/80 text-xs mb-4">Changes saved instantly</p>
      <button className="w-full py-2.5 bg-white/20 hover:bg-white/30 transition-colors rounded-xl text-sm font-medium backdrop-blur-sm">
        View Website &rarr;
      </button>
    </div>
  );
};

export default LivePreviewCard;
