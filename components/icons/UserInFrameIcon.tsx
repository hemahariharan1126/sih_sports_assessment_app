import React from 'react';

export const UserInFrameIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={className} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
    >
        <circle cx="12" cy="8" r="2" />
        <path d="M12.3 10.1 14 14" />
        <path d="M12 18H8l-2.5-3.5" />
        <path d="M14.5 18H16l2-3" />
        <path d="M3 3v18h18V3H3z" />
    </svg>
);