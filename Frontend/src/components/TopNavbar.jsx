import React from 'react';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';

const TopNavbar = () => {
    return (
        <header className="flex-none h-[64px] px-8 bg-white border-b border-slate-200 flex items-center justify-between w-full">
            {/* Left side: Search */}
            <div className="flex items-center flex-1">
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
