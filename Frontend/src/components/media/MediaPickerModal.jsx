import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, UploadCloud, Search, LayoutGrid, List } from 'lucide-react';
import { fetchFiles, uploadFile } from '../../api/mediaApi';
import { MediaCard } from './MediaCard';
import { Button } from '../ui/Button';
import toast from 'react-hot-toast';

const MediaPickerModal = ({ isOpen, onClose, onSelect, title = "Select Media" }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [view, setView] = useState('grid');
  
  const fileInputRef = useRef(null);
  const searchTimer = useRef(null);

  const loadFiles = useCallback(async (searchVal = search) => {
    setLoading(true);
    try {
      const json = await fetchFiles({ search: searchVal, page: 1, limit: 50 });
      setFiles(json.data || []);
    } catch (err) {
      console.error('Failed to load files:', err);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    if (isOpen) {
      loadFiles('');
      setSearch('');
    }
  }, [isOpen]); // eslint-disable-line

  const handleSearchChange = (val) => {
    setSearch(val);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => loadFiles(val), 400);
  };

  const handleFilesSelected = async (selectedFiles) => {
    if (!selectedFiles || selectedFiles.length === 0) return;
    setUploading(true);
    try {
      await Promise.all(Array.from(selectedFiles).map((f) => uploadFile(f)));
      toast.success('Files uploaded successfully');
      await loadFiles();
    } catch (err) {
      console.error('Upload error:', err);
      toast.error(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleSelect = (item) => {
    onSelect(item.fileUrl);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex items-center gap-4 bg-gray-50/50">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search files..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full h-10 pl-9 pr-4 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-[#F97316] outline-none transition-all"
            />
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.svg,.pdf,.mp4"
            className="hidden"
            onChange={(e) => handleFilesSelected(e.target.files)}
          />
          
          <Button
            variant="outline"
            leftIcon={<UploadCloud className="w-4 h-4" />}
            isLoading={uploading}
            onClick={() => fileInputRef.current?.click()}
          >
            Upload
          </Button>
          
          <div className="flex bg-white rounded-lg border border-gray-200 p-1">
            <button
              onClick={() => setView('grid')}
              className={`p-1.5 rounded transition-colors ${view === 'grid' ? 'bg-[#fff2ee] text-[#f95724]' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-1.5 rounded transition-colors ${view === 'list' ? 'bg-[#fff2ee] text-[#f95724]' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#fafafa]">
          {loading ? (
            <div className="flex items-center justify-center h-full text-gray-400 text-sm">Loading files...</div>
          ) : files.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <UploadCloud className="w-12 h-12 mb-3 text-gray-300" />
              <p className="text-sm font-medium">No files found.</p>
            </div>
          ) : view === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {files.map((item) => (
                <div key={item.id} className="relative group cursor-pointer" onClick={() => handleSelect(item)}>
                  <MediaCard item={item} />
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#F97316] rounded-2xl pointer-events-none transition-colors"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {files.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => handleSelect(item)}
                  className="flex items-center gap-4 px-4 py-3 bg-white border border-gray-100 rounded-xl cursor-pointer hover:border-[#F97316] hover:shadow-sm transition-all"
                >
                  <img src={item.fileUrl} alt="" className="w-10 h-10 rounded-lg object-cover bg-gray-50" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{item.originalName || item.fileName}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default MediaPickerModal;
