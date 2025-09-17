
import React from 'react';

export const MedicineBallIcon: React.FC<{ className?: string }> = ({ className }) => (
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
    <circle cx="12" cy="12" r="3" />
    <path d="M16.2 7.8a6.5 6.5 0 0 0-8.4 0" />
    <path d="M18.6 5.4a10.5 10.5 0 0 0-13.2 0" />
    <circle cx="6" cy="6" r="1" />
    <path d="M8 17.5c-2.5 0-5-2-5-5" />
    <path d="M16 22.5c2.5 0 5-2 5-5" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.9 4.9 1.4 1.4" />
    <path d="m17.7 17.7 1.4 1.4" />
    <path d="m2 12 h2" />
    <path d="m20 12 h2" />
    <path d="m4.9 19.1 1.4-1.4" />
    <path d="m17.7 6.3 1.4-1.4" />
  </svg>
);