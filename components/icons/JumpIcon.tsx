
import React from 'react';

export const JumpIcon: React.FC<{ className?: string }> = ({ className }) => (
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
    <path d="M18 8.5c-0.8-2.5-3.3-4.5-6-4.5s-5.2 2-6 4.5" />
    <path d="M6 15.5c0.8 2.5 3.3 4.5 6 4.5s5.2-2 6-4.5" />
    <path d="M12 2v20" />
    <path d="m6 9 12 6" />
    <path d="m6 15 12-6" />
  </svg>
);
