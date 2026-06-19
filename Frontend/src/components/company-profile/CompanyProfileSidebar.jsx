import React from 'react';
import { Building2, Target, Eye, BarChart2, Phone } from 'lucide-react';
import LivePreviewCard from './LivePreviewCard';

const navItems = [
  { id: 'about', label: 'About Us', icon: Building2 },
  { id: 'mission', label: 'Mission', icon: Target },
  { id: 'vision', label: 'Vision', icon: Eye },
  { id: 'statistics', label: 'Company Statistics', icon: BarChart2 },
  { id: 'contact', label: 'Contact Information', icon: Phone },
];

const CompanyProfileSidebar = ({ activeSection, onSectionChange }) => {
  return (
    <div className="w-full lg:w-[240px] shrink-0 flex flex-col">
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-1">Sections</h3>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${isActive
                  ? 'bg-orange-50/80 text-orange-600 border border-orange-200'
                  : 'text-gray-500 hover:bg-gray-100/80 hover:text-gray-900 border border-transparent'
                }`}
            >
              <Icon className="w-[18px] h-[18px]" strokeWidth={isActive ? 2.5 : 2} />
              {item.label}
            </button>
          );
        })}
      </nav>
      <LivePreviewCard />
    </div>
  );
};

export default CompanyProfileSidebar;
