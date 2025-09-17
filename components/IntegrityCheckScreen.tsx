import React, { useState, useEffect } from 'react';
import { TestType, TestResult, SitupResult, PushupResult } from '../types';
import { Card } from './common/Card';
import { CheckIcon } from './icons/CheckIcon';
import { WarningIcon } from './icons/WarningIcon';

interface IntegrityCheckScreenProps {
  testType: TestType;
  result: TestResult;
  isDeepfake: boolean;
  onToggleDeepfake: (isFake: boolean) => void;
  onNext: () => void;
}

const StatusPill: React.FC<{ isPositive: boolean; text: string; }> = ({ isPositive, text }) => (
    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${isPositive ? 'bg-brand-success/20 text-green-900' : 'bg-brand-warning/20 text-red-900'}`}>
        {text}
    </span>
);

export const IntegrityCheckScreen: React.FC<IntegrityCheckScreenProps> = ({ testType, result, isDeepfake, onToggleDeepfake, onNext }) => {
  const [showArtifact, setShowArtifact] = useState(false);
  
  const isSitupResult = (res: TestResult): res is SitupResult => testType === TestType.SITUP && 'deviations' in res;
  const isPushupResult = (res: TestResult): res is PushupResult => testType === TestType.PUSHUP && 'deviations' in res;

  const deviationCount = (isSitupResult(result) ? result.deviations : 0) || (isPushupResult(result) ? result.deviations : 0);
  const hasDeviations = deviationCount > 0;

  const getDeviationText = () => {
      if (testType === TestType.SITUP) {
          return `Detected ${deviationCount} repetitions with incorrect form (e.g., half sit-ups). These were not included in the final count.`;
      }
      if (testType === TestType.PUSHUP) {
          return `Detected ${deviationCount} repetitions with incorrect form (e.g., incomplete range of motion). These were not included in the final count.`;
      }
      return '';
  }

  useEffect(() => {
    if (isDeepfake) {
      setShowArtifact(true);
      const timer = setTimeout(() => setShowArtifact(false), 300); // Animation duration
      return () => clearTimeout(timer);
    }
  }, [isDeepfake]);

  return (
    <div className="p-4 sm:p-6 animate-slide-up-fade w-full">
      <Card className="max-w-2xl mx-auto w-full">
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-text dark:text-brand-text-dark mb-2 text-center">Integrity & Authenticity</h2>
        <p className="text-brand-text-light dark:text-brand-text-light-dark mb-8 text-center text-sm sm:text-base">This report verifies the validity of the submitted test.</p>
        
        <div className="space-y-6 mb-8">
          {(testType === TestType.SITUP || testType === TestType.PUSHUP) && (
            <div className={`p-4 rounded-lg flex items-start space-x-4 ${hasDeviations ? 'bg-brand-warning/10 border-brand-warning/30 border' : 'bg-brand-success/10 border-brand-success/30 border'}`}>
              {hasDeviations ? <WarningIcon className="w-8 h-8 text-brand-warning flex-shrink-0 mt-1" /> : <CheckIcon className="w-8 h-8 text-brand-success flex-shrink-0 mt-1" />}
              <div>
                <h3 className="font-bold text-lg text-brand-text dark:text-brand-text-dark">Form Check</h3>
                <p className="text-brand-text-light dark:text-brand-text-light-dark text-sm sm:text-base">
                  {hasDeviations ? getDeviationText() : 'Congratulations! All repetitions were performed with correct form.'}
                </p>
              </div>
            </div>
          )}

          <div className={`relative p-4 rounded-lg flex items-start space-x-4 overflow-hidden ${isDeepfake ? 'bg-brand-warning/10 border-brand-warning/30 border' : 'bg-brand-success/10 border-brand-success/30 border'}`}>
             {showArtifact && (
                <div className="absolute inset-0 bg-brand-warning/20 animate-glitch pointer-events-none z-10"></div>
             )}
             {isDeepfake ? <WarningIcon className="w-8 h-8 text-brand-warning flex-shrink-0 mt-1" /> : <CheckIcon className="w-8 h-8 text-brand-success flex-shrink-0 mt-1" />}
            <div>
              <h3 className="font-bold text-lg text-brand-text dark:text-brand-text-dark">Video Authenticity</h3>
              <p className="text-brand-text-light dark:text-brand-text-light-dark mb-3 text-sm sm:text-base">
                {isDeepfake ? 'Anomaly detected! The video appears to be manipulated. Submission will be flagged.' : 'Video metadata and content appear authentic. No signs of manipulation detected.'}
              </p>
               
               {isDeepfake && (
                <div className="text-sm text-red-800 my-3 p-2 bg-brand-warning/20 rounded">
                    <p><span className="font-semibold">Analysis Detail:</span> Metadata inconsistency found (Frame rate mismatch). Subtle visual artifacts detected in frames 45-52.</p>
                </div>
               )}

               <StatusPill isPositive={!isDeepfake} text={isDeepfake ? 'FLAGGED' : 'VERIFIED'} />
            </div>
          </div>
        </div>

        <div className="bg-brand-subtle/50 dark:bg-brand-subtle-dark/20 p-4 rounded-lg mb-8 text-center">
            <label htmlFor="deepfake-toggle" className="flex items-center justify-center cursor-pointer">
                <span className="mr-3 text-brand-text dark:text-brand-text-dark font-medium text-sm sm:text-base">Simulate Deepfake Detection</span>
                <div className="relative">
                    <input id="deepfake-toggle" type="checkbox" className="sr-only" checked={isDeepfake} onChange={(e) => onToggleDeepfake(e.target.checked)} />
                    <div className="block bg-brand-text/10 dark:bg-white/10 w-14 h-8 rounded-full"></div>
                    <div className={`dot absolute left-1 top-1 bg-white dark:bg-brand-subtle-dark w-6 h-6 rounded-full transition-transform shadow ${isDeepfake ? 'translate-x-6 bg-brand-secondary dark:bg-brand-secondary' : ''}`}></div>
                </div>
            </label>
            <p className="text-xs text-brand-text-light dark:text-brand-text-light-dark mt-2">For demonstration purposes only.</p>
        </div>

        <div className="text-center">
          <button
            onClick={onNext}
            className="w-full max-w-xs sm:w-auto bg-brand-primary hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            Prepare Data Packet
          </button>
        </div>
      </Card>
    </div>
  );
};