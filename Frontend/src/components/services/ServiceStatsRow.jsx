import React from 'react';
import StatsCard from '../StatsCard';
import { Layers, CheckCircle, FileEdit, Archive } from 'lucide-react';

const ServiceStatsRow = ({ total, published, draft, archived }) => {
  const stats = [
    { title: 'Total Services', value: total.toString(), icon: Layers, iconColor: 'orange' },
    { title: 'Published', value: published.toString(), icon: CheckCircle, iconColor: 'green' },
    { title: 'Draft', value: draft.toString(), icon: FileEdit, iconColor: 'yellow' },
    { title: 'Archived', value: archived?.toString() || '0', icon: Archive, iconColor: 'purple' },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default ServiceStatsRow;
