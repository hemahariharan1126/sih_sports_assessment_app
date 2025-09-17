import React from 'react';
import { APP_TITLE, SAI_LOGO_URL } from '../../constants';
import { UserIcon } from '../icons/UserIcon';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
    onHomeClick?: () => void;
    showHomeButton?: boolean;
    onProfileClick?: () => void;
    showProfileButton?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onHomeClick, showHomeButton = false, onProfileClick, showProfileButton = false }) => {
  return (
    <header className="bg-brand-primary text-brand-surface p-3 shadow-md sticky top-0 z-10 flex-shrink-0">
      <div className="mx-auto flex justify-between items-center px-2">
        <div className="flex items-center space-x-2">
          <img src={SAI_LOGO_URL} alt="SAI Logo" className="h-9 bg-white p-0.5 rounded-full" />
          <h1 className="text-lg sm:text-xl font-bold tracking-tight">{APP_TITLE}</h1>
        </div>
        <div className="flex items-center space-x-2">
            {showHomeButton && (
            <button
                onClick={onHomeClick}
                className="text-sm bg-white/20 hover:bg-white/30 text-white font-bold py-2 px-3 rounded-lg transition-colors"
            >
                Home
            </button>
            )}
            {showProfileButton && (
                <>
                    <ThemeToggle />
                    <button
                        onClick={onProfileClick}
                        className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
                        aria-label="User Profile"
                    >
                        <UserIcon className="w-6 h-6" />
                    </button>
                </>
            )}
        </div>
      </div>
    </header>
  );
};