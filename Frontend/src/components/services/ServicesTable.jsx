import React from 'react';
import { Edit2, Eye, Trash2 } from 'lucide-react';

const ServicesTable = ({ services, onEdit, onDelete, onView }) => {
  return (
    <div className="bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-400 uppercase bg-gray-50 border-b border-gray-100">
            <tr>
              <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Image</th>
              <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Title</th>
              <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Description</th>
              <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Status</th>
              <th scope="col" className="px-6 py-4 font-semibold tracking-wider text-center">Order</th>
              <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Created At</th>
              <th scope="col" className="px-6 py-4 font-semibold tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {services.map((service) => (
              <tr key={service.id} className="bg-white hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  {service.image ? (
                    <img src={service.image} alt={service.title} className="w-10 h-10 rounded-full object-cover border border-gray-100 shadow-sm" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                      N/A
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">
                  {service.title}
                </td>
                <td className="px-6 py-4 text-gray-500">
                  <div className="truncate max-w-[200px]" title={service.description}>
                    {service.description}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full ${
                    service.status === 'published' 
                      ? 'bg-emerald-50 text-emerald-600' 
                      : service.status === 'draft'
                      ? 'bg-yellow-50 text-yellow-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {service.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 text-gray-700 font-medium border border-gray-100">
                    {service.displayOrder}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {new Date(service.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => onView(service)}
                      className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg transition-colors border border-transparent hover:border-indigo-100"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onEdit(service)}
                      className="p-2 text-orange-500 hover:bg-orange-50 rounded-lg transition-colors border border-transparent hover:border-orange-100"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onDelete(service)}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-100"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            
            {services.length === 0 && (
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                  No services found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServicesTable;
