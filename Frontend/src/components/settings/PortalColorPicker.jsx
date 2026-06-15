import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { HexColorPicker } from 'react-colorful';

const PortalColorPicker = ({ color, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef();
  const buttonRef = useRef();
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const toggle = () => {
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
      });
    }
    setIsOpen(!isOpen);
  };

  const close = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target) && buttonRef.current && !buttonRef.current.contains(e.target)) {
        close();
      }
    };
    
    // Close on scroll so it doesn't float around disconnected
    const handleScroll = (e) => {
      if (isOpen) {
        close();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', handleScroll, true);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [isOpen]);

  return (
    <>
      <div 
        ref={buttonRef}
        onClick={toggle}
        className="w-8 h-8 rounded-full shadow-sm shrink-0 cursor-pointer border border-gray-200 transition-transform hover:scale-105" 
        style={{ backgroundColor: color || '#000000' }}
        title="Click to pick color"
      />
      
      {isOpen && createPortal(
        <div 
          ref={popoverRef}
          className="absolute z-[999999] shadow-2xl rounded-xl bg-white p-3 border border-gray-100 animate-in fade-in zoom-in-95 duration-200"
          style={{ top: position.top, left: position.left }}
        >
          <HexColorPicker color={color || '#000000'} onChange={onChange} />
          <div className="mt-3 flex items-center justify-between border-t border-gray-50 pt-2 gap-2">
            <div className="relative flex items-center bg-gray-50 rounded px-2 py-1">
              <span className="text-[11px] font-mono font-medium text-gray-400 mr-1">#</span>
              <input 
                type="text"
                value={(color || '#000000').replace('#', '')}
                onChange={(e) => {
                  const val = e.target.value;
                  onChange(val.startsWith('#') ? val : `#${val}`);
                }}
                className="text-[11px] font-mono font-medium text-gray-600 bg-transparent border-none p-0 focus:ring-0 w-14 outline-none uppercase"
                maxLength={6}
              />
            </div>
            <button onClick={close} className="text-[11px] font-bold text-orange-500 hover:text-orange-600 px-2 py-1 rounded hover:bg-orange-50 transition-colors">
              Done
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default PortalColorPicker;
