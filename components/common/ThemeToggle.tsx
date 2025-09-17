import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { SunIcon } from '../icons/SunIcon';
import { MoonIcon } from '../icons/MoonIcon';

export const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors relative w-10 h-10 flex items-center justify-center overflow-hidden"
            aria-label="Toggle theme"
        >
            <span className={`transform transition-transform duration-500 ${theme === 'dark' ? '-translate-y-12' : 'translate-y-0'}`}>
                <SunIcon className="w-6 h-6" />
            </span>
            <span className={`transform transition-transform duration-500 absolute ${theme === 'dark' ? 'translate-y-0' : 'translate-y-12'}`}>
                <MoonIcon className="w-6 h-6" />
            </span>
        </button>
    );
};
