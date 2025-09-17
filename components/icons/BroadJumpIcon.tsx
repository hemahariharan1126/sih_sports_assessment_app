
import React from 'react';

export const BroadJumpIcon: React.FC<{ className?: string }> = ({ className }) => (
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
    <circle cx="6.5" cy="4.5" r="1.5"/>
    <path d="M5 8v3l2 2.5 1-4.5 -2-1Z"/>
    <path d="M10 13l-1.5 5.5"/>
    <path d="M7 18.5H4"/>
    <path d="M10 20H8"/>
    <path d="M21 16.5h-7"/>
    <path d="m18 13.5-3 3 3 3"/>
  </svg>
);
