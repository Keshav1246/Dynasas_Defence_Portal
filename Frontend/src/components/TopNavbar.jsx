import React from 'react';
import { Menu } from 'lucide-react';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';

const TopNavbar = ({ onMenuClick }) => {
    return (
        <header className="flex-none h-[64px] px-4 lg:px-8 bg-white border-b border-slate-200 flex items-center justify-between w-full">
            {/* Left side: Search & Hamburger */}
            <div className="flex items-center flex-1">
                <button 
                  onClick={onMenuClick} 
                  className="lg:hidden p-2 mr-3 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Open sidebar"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <SearchBar />
            </div>

            {/* Right side: Actions & User */}
            <div className="flex items-center gap-5">

                {/* User Menu */}
                <UserMenu />
            </div>
        </header>
    );
};

export default TopNavbar;
