
import React from 'react';

export const FlipCameraIcon: React.FC<{ className?: string }> = ({ className }) => (
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
    <path d="M13 16.5a2.5 2.5 0 0 0-5 0" />
    <path d="M15 8v2a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1.17a2 2 0 0 0 1.41-.59l.83-.83a2 2 0 0 1 1.41-.59H13a2 2 0 0 1 2 2v2" />
    <path d="m18 15 3 3-3 3" />
    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.75-2.8" />
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.75 2.8" />
  </svg>
);
