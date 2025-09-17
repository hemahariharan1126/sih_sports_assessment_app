import React from 'react';

export const PoseOutlineIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v7" />
    <path d="M12 14l-4 6" />
    <path d="M12 14l4 6" />
    <path d="M5 12h14" />
  </svg>
);
