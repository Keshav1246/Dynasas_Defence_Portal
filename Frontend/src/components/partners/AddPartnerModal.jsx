import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import { Label } from '../ui/Label';
import { Button } from '../ui/Button';
import toast from 'react-hot-toast';
import { UploadCloud } from 'lucide-react';
import MediaPickerModal from '../media/MediaPickerModal';

export const AddPartnerModal = ({ isOpen, onClose, onSave, editingPartner }) => {
  const [formData, setFormData] = useState({
    name: '',
    status: 'ACTIVE',
    description: '',
    website: '',
    logo: '',
    displayOrder: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pickerState, setPickerState] = useState({ isOpen: false });

  useEffect(() => {
    if (isOpen) {
      if (editingPartner) {
        setFormData({
          name: editingPartner.name || '',
          status: (editingPartner.status && editingPartner.status.toUpperCase() === 'INACTIVE') ? 'INACTIVE' : 'ACTIVE',
          description: editingPartner.description || '',
          website: editingPartner.website || editingPartner.url || '',
          logo: editingPartner.logo || '',
          displayOrder: editingPartner.displayOrder || 0
        });
      } else {
        setFormData({
          name: '',
          status: 'ACTIVE',
          description: '',
          website: '',
          logo: '',
          displayOrder: 0
        });
      }
    }
  }, [isOpen, editingPartner]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMediaSelect = (url) => {
    setFormData(prev => ({ ...prev, logo: url }));
  };

  const openPicker = () => {
    setPickerState({ isOpen: true });
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      await onSave(formData);
      onClose();
    } catch (err) {
      console.error(err);
      toast.error('Failed to save partner: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-md">
      <ModalHeader title={editingPartner ? "Edit Partner" : "Add New Partner"} onClose={onClose} />
      <ModalBody>
        <div className="space-y-5">
          <div>
            <Label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Partner Logo</Label>
            <div onClick={openPicker} className="mt-1 flex justify-center px-6 pt-6 pb-6 border-2 border-gray-200 border-dashed rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group relative">
              <div className="space-y-2 text-center">
                <UploadCloud className="mx-auto h-8 w-8 text-gray-300 group-hover:text-orange-400 transition-colors" />
                <div className="flex text-sm text-gray-700 justify-center font-medium">
                  <span>Select logo from Media Library</span>
                </div>
                <p className="text-[11px] text-gray-400 font-medium tracking-wide">SVG, PNG — transparent background</p>
              </div>
            </div>
            {formData.logo && (
              <div className="mt-2 flex items-center gap-2">
                <img src={formData.logo} alt="Logo" className="h-8 object-contain bg-gray-50 rounded border border-gray-100 p-1" />
                <span className="text-xs text-gray-500 truncate flex-1">{formData.logo.split('/').pop()}</span>
                <button type="button" onClick={() => setFormData(prev => ({ ...prev, logo: '' }))} className="text-[10px] font-bold text-red-500 hover:text-red-600 uppercase tracking-wider">Remove</button>
              </div>
            )}
          </div>

          <div>
            <Label>Partner Name</Label>
            <Input 
              name="name" 
              placeholder="e.g. Lockheed Martin" 
              value={formData.name} 
              onChange={handleChange} 
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label>Status</Label>
              <Select name="status" value={formData.status} onChange={handleChange}>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </Select>
            </div>
            <div>
              <Label>Display Order</Label>
              <Input 
                name="displayOrder" 
                type="number"
                value={formData.displayOrder} 
                onChange={(e) => setFormData(prev => ({ ...prev, displayOrder: parseInt(e.target.value) || 0 }))} 
              />
            </div>
          </div>

          <div>
            <Label>Description</Label>
            <Textarea 
              name="description" 
              placeholder="Brief description of the partnership..." 
              value={formData.description} 
              onChange={handleChange} 
            />
          </div>

          <div>
            <Label>Website URL</Label>
            <Input 
              name="website" 
              placeholder="https://partner.com" 
              value={formData.website} 
              onChange={handleChange} 
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter className="bg-white border-t-0 pt-0">
        <Button variant="outline" onClick={onClose} className="px-6 text-gray-600 rounded-full" disabled={isSubmitting}>Cancel</Button>
        <Button 
          variant="primary" 
          onClick={handleSave} 
          isLoading={isSubmitting}
          className="px-6 rounded-full" 
          leftIcon={!isSubmitting && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>}
        >
          {editingPartner ? 'Update Partner' : 'Save Partner'}
        </Button>
      </ModalFooter>

      <MediaPickerModal 
        isOpen={pickerState.isOpen}
        title="Select Partner Logo"
        onClose={() => setPickerState({ isOpen: false })}
        onSelect={handleMediaSelect}
      />
    </Modal>
  );
};

