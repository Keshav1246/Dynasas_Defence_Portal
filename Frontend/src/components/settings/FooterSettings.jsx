import React, { useState, useEffect } from 'react';
import SectionHeader from '../company-profile/SectionHeader';
import { Trash2, Plus, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { getFooterContent, updateFooterContent, createFooterContent } from '../../services/cms.service';

const defaultData = {
  tagline: "",
  description: "",
  columns: [
    { id: 'company', title: 'Company', links: [] },
    { id: 'solutions', title: 'Solutions', links: [] },
    { id: 'resources', title: 'Resources', links: [] },
    { id: 'legal', title: 'Legal', links: [] }
  ]
};

const parseLinks = (stringLinks) => {
  if (!stringLinks) return [];
  return stringLinks.map(str => {
    const [label = '', url = ''] = str.split('|').map(s => s.trim());
    return { label, url };
  });
};

const serializeLinks = (objLinks) => {
  return objLinks
    .filter(link => link.label.trim() !== '')
    .map(link => `${link.label.trim()}|${link.url.trim()}`);
};

const FooterSettings = () => {
  const [formData, setFormData] = useState(defaultData);
  const [originalData, setOriginalData] = useState(defaultData);
  const [footerId, setFooterId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchFooter = async () => {
    try {
      setIsLoading(true);
      const data = await getFooterContent();
      
      if (data) {
        setFooterId(data.id);
        const mappedData = {
          tagline: data.footerTagline || "",
          description: data.footerDescription || "",
          columns: [
            { id: 'company', title: 'Company', links: parseLinks(data.companyLinks) },
            { id: 'solutions', title: 'Solutions', links: parseLinks(data.solutionLinks) },
            { id: 'resources', title: 'Resources', links: parseLinks(data.resourceLinks) },
            { id: 'legal', title: 'Legal', links: parseLinks(data.legalLinks) }
          ]
        };
        setFormData(mappedData);
        setOriginalData(mappedData);
      }
    } catch (error) {
      toast.error('Failed to load footer settings');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFooter();
  }, []);

  const handleDiscard = () => {
    setFormData(originalData);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);

      const getColumnLinks = (id) => {
        const column = formData.columns.find(col => col.id === id);
        return column ? serializeLinks(column.links) : [];
      };

      const payload = {
        footerTagline: formData.tagline.trim(),
        footerDescription: formData.description.trim(),
        companyLinks: getColumnLinks('company'),
        solutionLinks: getColumnLinks('solutions'),
        resourceLinks: getColumnLinks('resources'),
        legalLinks: getColumnLinks('legal')
      };

      let freshData;
      if (footerId) {
        freshData = await updateFooterContent(footerId, payload);
      } else {
        freshData = await createFooterContent(payload);
        setFooterId(freshData.id);
      }
      
      const newMappedData = {
        tagline: freshData.footerTagline || "",
        description: freshData.footerDescription || "",
        columns: [
          { id: 'company', title: 'Company', links: parseLinks(freshData.companyLinks) },
          { id: 'solutions', title: 'Solutions', links: parseLinks(freshData.solutionLinks) },
          { id: 'resources', title: 'Resources', links: parseLinks(freshData.resourceLinks) },
          { id: 'legal', title: 'Legal', links: parseLinks(freshData.legalLinks) }
        ]
      };
      
      setFormData(newMappedData);
      setOriginalData(newMappedData);
      
      toast.success('Footer updated successfully');
    } catch (error) {
      toast.error('Failed to update footer');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleColumnChange = (columnId, linkIndex, field, newValue) => {
    setFormData(prev => ({
      ...prev,
      columns: prev.columns.map(col => {
        if (col.id === columnId) {
          const newLinks = [...col.links];
          newLinks[linkIndex] = { ...newLinks[linkIndex], [field]: newValue };
          return { ...col, links: newLinks };
        }
        return col;
      })
    }));
  };

  const handleDeleteLink = (columnId, linkIndex) => {
    setFormData(prev => ({
      ...prev,
      columns: prev.columns.map(col => {
        if (col.id === columnId) {
          return { ...col, links: col.links.filter((_, i) => i !== linkIndex) };
        }
        return col;
      })
    }));
  };

  const handleAddLink = (columnId) => {
    setFormData(prev => ({
      ...prev,
      columns: prev.columns.map(col => {
        if (col.id === columnId) {
          return { ...col, links: [...col.links, { label: "", url: "" }] };
        }
        return col;
      })
    }));
  };

  if (isLoading) {
    return (
      <div className="flex-1 bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 p-8 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4 text-gray-400">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
          <span className="text-sm font-medium">Loading Footer Settings...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 p-6 md:p-8 flex flex-col min-w-0">
      <SectionHeader 
        title="Footer Management" 
        subtitle="Manage portal settings and configuration" 
        onSave={handleSave} 
        onDiscard={handleDiscard}
        isSaving={isSaving}
      />

      <div className="space-y-6 mt-2">
        <div>
          <label className="block mb-2 text-[13px] font-semibold text-gray-900">Footer Tagline</label>
          <input 
            type="text" 
            value={formData.tagline}
            onChange={(e) => setFormData({...formData, tagline: e.target.value})}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F97316] focus:border-transparent outline-none transition-all text-[13px] text-gray-700 font-medium"
          />
        </div>

        <div>
          <label className="block mb-2 text-[13px] font-semibold text-gray-900">Footer Description</label>
          <textarea 
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            rows={2}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F97316] focus:border-transparent outline-none transition-all text-[13px] text-gray-700 leading-relaxed"
          />
        </div>

        <div>
          <label className="block mb-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-2">FOOTER COLUMNS</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {formData.columns.map(column => (
              <div key={column.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                <h4 className="font-bold text-[13px] text-gray-900 mb-3 px-1">{column.title}</h4>
                <div className="space-y-2">
                  {column.links.map((link, index) => (
                    <div key={index} className="flex items-center gap-2 group">
                      <input 
                        type="text"
                        placeholder="Label"
                        value={link.label}
                        onChange={(e) => handleColumnChange(column.id, index, 'label', e.target.value)}
                        className="w-1/2 px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#F97316] focus:border-[#F97316] outline-none transition-all text-[13px] text-gray-600"
                      />
                      <input 
                        type="text"
                        placeholder="URL"
                        value={link.url}
                        onChange={(e) => handleColumnChange(column.id, index, 'url', e.target.value)}
                        className="w-1/2 px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#F97316] focus:border-[#F97316] outline-none transition-all text-[13px] text-gray-600"
                      />
                      <button 
                        onClick={() => handleDeleteLink(column.id, index)}
                        className="p-1.5 text-gray-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button 
                    onClick={() => handleAddLink(column.id)}
                    className="flex items-center gap-1.5 text-[12px] font-bold text-[#F97316] hover:text-[#EA580C] px-1 pt-1 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" strokeWidth={3} />
                    Add link
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default FooterSettings;
