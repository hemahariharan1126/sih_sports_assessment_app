import React, { useState, useEffect } from 'react';
import { ANALYSIS_STAGES } from '../constants';
import { TestType } from '../types';
import { PoseOutlineIcon } from './icons/PoseOutlineIcon';

interface AnalysisScreenProps {
  onComplete: () => void;
  testType: TestType;
}

export const AnalysisScreen: React.FC<AnalysisScreenProps> = ({ onComplete, testType }) => {
  const analysisStages = ANALYSIS_STAGES[testType];
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    const stageInterval = setInterval(() => {
      setStageIndex((prevIndex) => {
        if (prevIndex < analysisStages.length - 1) {
          return prevIndex + 1;
        }
        clearInterval(stageInterval);
        return prevIndex;
      });
    }, 1200);

    const completionTimeout = setTimeout(() => {
      onComplete();
    }, analysisStages.length * 1200 + 500);

    return () => {
      clearInterval(stageInterval);
      clearTimeout(completionTimeout);
    };
  }, [analysisStages, onComplete]);

  const currentStage = analysisStages[stageIndex];
  const intermediateResult = currentStage.result;

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 text-center animate-slide-up-fade w-full max-w-md mx-auto">
      <div className="relative w-20 h-40 mb-6 overflow-hidden">
        <PoseOutlineIcon className="w-full h-full text-brand-primary/30 dark:text-brand-primary/40" />
        <div className="absolute inset-x-0 top-0 h-1.5 bg-brand-secondary rounded-full shadow-[0_0_15px_rgba(255,179,107,0.8)] animate-scanner-glow"></div>
      </div>
      <h2 className="text-xl sm:text-2xl font-bold text-brand-text dark:text-brand-text-dark mb-4">Performing On-Device Analysis</h2>
      <p className="text-brand-text-light dark:text-brand-text-light-dark max-w-md mb-8 text-sm sm:text-base">
        Your video is being processed locally on your device. No data has been uploaded.
      </p>
      <div className="w-full bg-brand-subtle dark:bg-brand-subtle-dark rounded-full h-2.5 mb-2">
          <div 
            className="bg-brand-success h-2.5 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${(stageIndex + 1) / analysisStages.length * 100}%` }}
          ></div>
      </div>
      <p className="mt-2 text-brand-text dark:text-brand-text-dark font-medium h-6 text-sm sm:text-base">{currentStage.message}</p>
      
      {intermediateResult && (
        <div className="mt-6 bg-brand-background dark:bg-brand-background-dark p-3 sm:p-4 rounded-lg w-full text-left animate-fade-in border border-brand-subtle dark:border-brand-subtle-dark">
            <p className="text-xs text-brand-text-light dark:text-brand-text-light-dark font-bold uppercase tracking-wider mb-1">AI Status</p>
            <p className="text-base sm:text-lg text-brand-text dark:text-brand-text-dark font-semibold">{intermediateResult}</p>
        </div>
      )}
    </div>
  );
};