
import React from 'react';

export const CoachIcon: React.FC<{ className?: string }> = ({ className }) => (
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
    <path d="M10 16.5c-2-3-2-5.5 0-8.5l6 6c3 3 5.5 3 8.5 0"/>
    <path d="M14.5 12 18 8.5"/>
    <path d="M5.5 18.5 2 22"/>
    <path d="m16 18-3-3"/>
    <path d="M11.5 7.5c-3 3-3 5.5 0 8.5"/>
    <path d="M2 2l1.5 1.5"/>
  </svg>
);
