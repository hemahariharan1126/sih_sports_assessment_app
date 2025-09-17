
import React from 'react';

export const SprintIcon: React.FC<{ className?: string }> = ({ className }) => (
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
    <path d="M13 3.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
    <path d="m10.5 13 4.5-4.5" />
    <path d="M14 10.5 7.5 17" />
    <path d="M7 13.5v4" />
    <path d="M15.5 11.5 18 9" />
    <path d="M17 17.5v-4" />
  </svg>
);