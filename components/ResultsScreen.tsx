import React, { useState } from 'react';
import { TestType, TestResult, JumpResult, SitupResult, SprintResult, PushupResult, BroadJumpResult, MedicineBallThrowResult } from '../types';
import { Card } from './common/Card';
import { getAICoachingFeedback } from '../services/coachingService';
import { useTypingEffect } from '../hooks/useTypingEffect';
import { CoachIcon } from './icons/CoachIcon';


interface ResultsScreenProps {
  testType: TestType;
  result: TestResult;
  onNext: () => void;
}

const isJumpResult = (result: TestResult): result is JumpResult => 'height' in result;
const isSitupResult = (result: TestResult): result is SitupResult => 'count' in result && 'deviations' in result;
const isPushupResult = (result: TestResult): result is PushupResult => 'count' in result && 'deviations' in result;
const isSprintResult = (result: TestResult): result is SprintResult => 'time' in result;
const isBroadJumpResult = (result: TestResult): result is BroadJumpResult => 'distance' in result && !('time' in result);
const isMedicineBallThrowResult = (result: TestResult): result is MedicineBallThrowResult => 'distance' in result && !('time' in result);


type PerformanceFeedback = {
  tier: 'good' | 'average' | 'poor';
  feedback: string;
  animationClass: string;
};

const getPerformanceTier = (testType: TestType, result: TestResult): PerformanceFeedback => {
  switch (testType) {
    case TestType.JUMP:
      if (isJumpResult(result)) {
        if (result.height > 45) return { tier: 'good', feedback: 'Excellent explosive power! To improve further, focus on plyometric exercises.', animationClass: 'animate-celebrate-burst' };
        if (result.height > 30) return { tier: 'average', feedback: 'A strong performance! Incorporating squats can help you reach new heights.', animationClass: 'animate-subtle-glow' };
        return { tier: 'poor', feedback: 'Solid effort! Building foundational leg strength will boost your results.', animationClass: '' };
      }
      break;
    case TestType.SITUP:
       if (isSitupResult(result)) {
        if (result.count > 40) return { tier: 'good', feedback: 'Incredible core endurance! Your core is a solid athletic foundation.', animationClass: 'animate-celebrate-burst' };
        if (result.count > 20) return { tier: 'average', feedback: 'Great work! Try incorporating planks to build supporting core muscles.', animationClass: 'animate-subtle-glow' };
        return { tier: 'poor', feedback: 'Good job! Focus on consistent training to improve endurance.', animationClass: '' };
      }
      break;
    case TestType.SPRINT:
        if (isSprintResult(result)) {
            if (result.time < 5.0) return { tier: 'good', feedback: 'Blazing fast! Maintain this with regular sprint drills and explosive starts.', animationClass: 'animate-celebrate-burst' };
            if (result.time < 5.8) return { tier: 'average', feedback: 'A great display of speed! Work on acceleration in the first 10 meters.', animationClass: 'animate-subtle-glow' };
            return { tier: 'poor', feedback: 'Solid sprint! Improving your running form will make a big difference.', animationClass: '' };
        }
        break;
    case TestType.PUSHUP:
        if (isPushupResult(result)) {
            if (result.count > 30) return { tier: 'good', feedback: 'Amazing upper body strength! This shows excellent muscular endurance.', animationClass: 'animate-celebrate-burst' };
            if (result.count > 15) return { tier: 'average', feedback: 'Strong performance! Try variations like incline push-ups to progress.', animationClass: 'animate-subtle-glow' };
            return { tier: 'poor', feedback: 'Good work! Build chest and triceps strength to improve your count.', animationClass: '' };
        }
        break;
    case TestType.BROAD_JUMP:
        if (isBroadJumpResult(result)) {
            if (result.distance > 220) return { tier: 'good', feedback: 'Phenomenal leg power! This shows elite explosive strength.', animationClass: 'animate-celebrate-burst' };
            if (result.distance > 180) return { tier: 'average', feedback: 'Great distance! Use your arms for momentum to jump even farther.', animationClass: 'animate-subtle-glow' };
            return { tier: 'poor', feedback: 'A solid jump! Improving squat strength will help you cover more ground.', animationClass: '' };
        }
        break;
    case TestType.MEDICINE_BALL_THROW:
        if (isMedicineBallThrowResult(result)) {
            if (result.distance > 8) return { tier: 'good', feedback: 'Incredible power! This is a great measure of total-body explosiveness.', animationClass: 'animate-celebrate-burst' };
            if (result.distance > 5) return { tier: 'average', feedback: 'A powerful throw! Focus on rotating your hips and torso for more force.', animationClass: 'animate-subtle-glow' };
            return { tier: 'poor', feedback: 'Nice throw! Build rotational strength with exercises like wood chops.', animationClass: '' };
        }
        break;
  }
  return { tier: 'average', feedback: 'Well done! Consistent practice leads to improvement.', animationClass: '' };
};

const MetricDisplay: React.FC<{ value: string | number; label: string; unit: string; animationClass?: string; }> = ({ value, label, unit, animationClass = '' }) => (
    <div className={`bg-brand-secondary/10 dark:bg-brand-secondary/20 p-4 sm:p-6 rounded-lg text-center ${animationClass}`}>
        <p className="text-brand-text-light dark:text-brand-text-light-dark text-base sm:text-lg">{label}</p>
        <p className="text-5xl sm:text-6xl font-extrabold text-brand-text dark:text-brand-text-dark">
            {value}
            <span className="text-2xl sm:text-3xl font-semibold ml-2">{unit}</span>
        </p>
    </div>
);


export const ResultsScreen: React.FC<ResultsScreenProps> = ({ testType, result, onNext }) => {
  const performance = getPerformanceTier(testType, result);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [isLoadingAiFeedback, setIsLoadingAiFeedback] = useState(false);
  const typedFeedback = useTypingEffect(aiFeedback, 30);

  const handleGetCoachingTips = async () => {
    setIsLoadingAiFeedback(true);
    setAiFeedback(''); // Clear previous feedback
    try {
        const feedback = await getAICoachingFeedback(testType, result);
        setAiFeedback(feedback);
    } catch (error) {
        console.error("Failed to get AI coaching feedback:", error);
        setAiFeedback("Sorry, the AI Coach is unavailable right now. Please try again later.");
    } finally {
        setIsLoadingAiFeedback(false);
    }
  };
  
  return (
    <div className="p-4 sm:p-6 animate-slide-up-fade w-full">
      <Card className="max-w-2xl mx-auto text-center w-full">
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-text dark:text-brand-text-dark mb-2">Test Complete!</h2>
        <p className="text-brand-text-light dark:text-brand-text-light-dark mb-6 text-sm sm:text-base">Here are your performance results.</p>
        
        <div className="mb-4">
            {testType === TestType.JUMP && isJumpResult(result) && (
                <MetricDisplay value={result.height.toFixed(1)} label="Vertical Jump Height" unit="cm" animationClass={performance.animationClass} />
            )}
            {testType === TestType.SITUP && isSitupResult(result) && (
                 <MetricDisplay value={result.count} label="Total Sit-ups" unit="reps" animationClass={performance.animationClass} />
            )}
            {testType === TestType.SPRINT && isSprintResult(result) && (
                 <MetricDisplay value={result.time.toFixed(2)} label="40m Sprint Time" unit="s" animationClass={performance.animationClass} />
            )}
            {testType === TestType.PUSHUP && isPushupResult(result) && (
                 <MetricDisplay value={result.count} label="Total Push-ups" unit="reps" animationClass={performance.animationClass} />
            )}
            {testType === TestType.BROAD_JUMP && isBroadJumpResult(result) && (
                 <MetricDisplay value={result.distance.toFixed(1)} label="Broad Jump Distance" unit="cm" animationClass={performance.animationClass} />
            )}
            {testType === TestType.MEDICINE_BALL_THROW && isMedicineBallThrowResult(result) && (
                <MetricDisplay value={result.distance.toFixed(2)} label="Medicine Ball Throw" unit="m" animationClass={performance.animationClass} />
            )}
        </div>

        <p className="text-brand-text dark:text-brand-text-dark font-semibold text-base sm:text-lg mb-6 animate-fade-in h-7 flex items-center justify-center">{performance.feedback}</p>
        
        <div className="my-6">
            <button
                onClick={handleGetCoachingTips}
                disabled={isLoadingAiFeedback}
                className="bg-brand-success hover:bg-green-400 text-green-900 font-bold py-3 px-6 rounded-full text-md shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoadingAiFeedback ? (
                    <>
                        <div className="w-5 h-5 border-2 border-green-900/50 border-t-green-900 rounded-full animate-spin mr-2"></div>
                        AI Coach is Analyzing...
                    </>
                ) : (
                    <>
                        <CoachIcon className="w-6 h-6 mr-2" />
                        Get AI Coaching Tips
                    </>
                )}
            </button>
        </div>
        
        {(isLoadingAiFeedback || aiFeedback) && (
            <Card className="mt-6 text-left !p-0 overflow-hidden animate-fade-in">
                <div className="p-4 bg-brand-primary text-white flex items-center">
                    <CoachIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-3" />
                    <h4 className="font-bold text-base sm:text-lg">AI Coach Analysis</h4>
                </div>
                <div className="p-4">
                    {isLoadingAiFeedback && !aiFeedback && <p className="text-brand-text-light dark:text-brand-text-light-dark">Generating personalized feedback...</p>}
                    {aiFeedback && <div className="prose prose-sm sm:prose-base max-w-none dark:text-brand-text-light-dark" dangerouslySetInnerHTML={{ __html: typedFeedback.replace(/### (.*?)\n/g, '<h3 class="font-bold text-brand-text dark:text-brand-text-dark text-md mt-2 mb-1">$1</h3>').replace(/(\d+\.\s.*)/g, '<p class="m-0">$1</p>') }}></div>}
                </div>
            </Card>
        )}

        <hr className="my-8 border-brand-subtle dark:border-brand-subtle-dark" />

        <button
          onClick={onNext}
          className="w-full max-w-xs sm:w-auto bg-brand-primary hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
          View Integrity Report
        </button>
      </Card>
    </div>
  );
};