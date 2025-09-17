import React from 'react';

export const TripodIcon: React.FC<{ className?: string }> = ({ className }) => (
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
    <path d="M12 21a1 1 0 0 0 1-1v-6a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1Z" />
    <path d="m6.7 12.5-.2 1.3a1 1 0 0 0 1 1.2l3-1.2a1 1 0 0 0 .5-1.3l-1.3-3.1a1 1 0 0 0-1.3-.5l-3 1.2a1 1 0 0 0-.2 1.4Z" />
    <path d="m17.3 12.5 1.4.5a1 1 0 0 1 .5 1.3l-1.3 3.1a1 1 0 0 1-1.3.5l-3-1.2a1 1 0 0 1-.5-1.3l1.3-3.1a1 1 0 0 1 1.2-1Z" />
    <path d="M12 11.5 7.5 5l-5 4" />
    <path d="M16.5 5 12 11.5l5 4" />
  </svg>
);