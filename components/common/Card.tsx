import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  const cardClasses = `bg-brand-surface dark:bg-brand-surface-dark dark:border dark:border-brand-subtle-dark/50 rounded-xl shadow-lg dark:shadow-none p-4 sm:p-6 transition-all duration-300 ${onClick ? 'cursor-pointer hover:shadow-xl hover:-translate-y-1' : ''} ${className}`;

  return (
    <div className={cardClasses} onClick={onClick}>
      {children}
    </div>
  );
};