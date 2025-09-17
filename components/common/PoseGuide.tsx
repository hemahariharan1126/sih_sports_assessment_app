import React from 'react';
import { PoseOutlineIcon } from '../icons/PoseOutlineIcon';

interface PoseGuideProps {
  className?: string;
  status?: 'ok' | 'warning';
  warningText?: string;
}

export const PoseGuide: React.FC<PoseGuideProps> = ({ className, status = 'ok', warningText = '' }) => {
  const borderClasses = status === 'ok'
    ? 'border-dashed border-white/60'
    : 'border-solid border-brand-warning animate-warning-pulse';

  const isTooClose = status === 'warning' && warningText === 'TOO CLOSE';
  const isTooFar = status === 'warning' && warningText === 'TOO FAR';

  const guideIconClasses = `
    absolute text-white/30 w-3/5 h-3/5 max-w-[200px] max-h-[400px] 
    transition-transform duration-500 ease-in-out
    ${isTooClose ? 'scale-125' : ''} 
    ${isTooFar ? 'scale-75' : ''}
  `;

  return (
    <div className={`absolute inset-0 flex items-center justify-center p-2 pointer-events-none ${className}`}>
      <div className={`w-full h-full border-2 sm:border-4 rounded-lg flex flex-col items-center justify-center pb-3 transition-colors duration-500 relative ${borderClasses}`}>
        
        <PoseOutlineIcon className={guideIconClasses} />

        {status === 'warning' && warningText && (
          <div className="absolute inset-0 flex items-center justify-center animate-fade-in">
            <p className="bg-brand-warning text-brand-surface font-extrabold px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-center tracking-wider text-base sm:text-lg">
                {warningText}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};