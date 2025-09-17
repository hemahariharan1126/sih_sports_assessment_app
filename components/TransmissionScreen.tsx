import React, { useState, useEffect } from 'react';
import { Card } from './common/Card';
import { UploadIcon } from './icons/UploadIcon';
import { LockIcon } from './icons/LockIcon';
import { TestType, TestResult, JumpResult, SitupResult, SprintResult, PushupResult, BroadJumpResult, MedicineBallThrowResult } from '../types';

interface TransmissionScreenProps {
  onFinish: () => void;
  testType: TestType;
  result: TestResult;
  isFlagged: boolean;
}

const isJumpResult = (result: TestResult): result is JumpResult => 'height' in result;
const isSitupResult = (result: TestResult): result is SitupResult => 'count' in result && 'deviations' in result;
const isSprintResult = (result: TestResult): result is SprintResult => 'time' in result;
const isPushupResult = (result: TestResult): result is PushupResult => 'count' in result && 'deviations' in result;
const isBroadJumpResult = (result: TestResult): result is BroadJumpResult => 'distance' in result && !('time' in result) && !('count' in result);
const isMedicineBallThrowResult = (result: TestResult): result is MedicineBallThrowResult => 'distance' in result && !('time' in result) && !('count' in result);


export const TransmissionScreen: React.FC<TransmissionScreenProps> = ({ onFinish, testType, result, isFlagged }) => {
  const [animationState, setAnimationState] = useState<'encrypting' | 'encrypted'>('encrypting');
  const [randomLines, setRandomLines] = useState<string[]>([]);

  const generateGibberish = (length = 50) => {
    const chars = 'abcdef1234567890';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  useEffect(() => {
    if (animationState === 'encrypting') {
      const intervalId = setInterval(() => {
        setRandomLines(Array(16).fill(null).map(() => generateGibberish()));
      }, 80);

      const timeoutId = setTimeout(() => {
        setAnimationState('encrypted');
      }, 2500);

      return () => {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
      };
    }
  }, [animationState]);

  // This function is kept for logical consistency, representing the data that IS being prepared, even if not displayed.
  const getDataPacket = () => {
    const basePacket = {
      testType: testType,
      timestamp: new Date().toISOString(),
      integrityStatus: isFlagged ? 'FLAGGED' : 'VERIFIED',
    };
    if (testType === TestType.JUMP && isJumpResult(result)) {
      return { ...basePacket, jumpHeight_cm: result.height };
    }
    if (testType === TestType.SITUP && isSitupResult(result)) {
      return { ...basePacket, situpCount: result.count, formDeviations: result.deviations };
    }
    if (testType === TestType.SPRINT && isSprintResult(result)) {
        return { ...basePacket, sprintTime_s: result.time };
    }
    if (testType === TestType.PUSHUP && isPushupResult(result)) {
        return { ...basePacket, pushupCount: result.count, formDeviations: result.deviations };
    }
    if (testType === TestType.BROAD_JUMP && isBroadJumpResult(result)) {
        return { ...basePacket, broadJumpDistance_cm: result.distance };
    }
    if (testType === TestType.MEDICINE_BALL_THROW && isMedicineBallThrowResult(result)) {
        return { ...basePacket, medicineBallThrow_m: result.distance };
    }
    return basePacket;
  };
  
  return (
    <div className="p-4 sm:p-6 animate-slide-up-fade w-full">
      <Card className="max-w-2xl mx-auto text-center w-full">
        <div className="bg-brand-success/10 text-brand-success p-4 rounded-full mb-4 w-20 h-20 mx-auto flex items-center justify-center">
          <UploadIcon className="w-10 h-10" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-text dark:text-brand-text-dark mb-2">Data Ready for Transmission</h2>
        <p className="text-brand-text-light dark:text-brand-text-light-dark mb-6 text-sm sm:text-base">
            The on-device analysis is complete. A small, secure data packet has been created. The raw video has been discarded to protect your privacy.
        </p>

        <div className="bg-brand-background dark:bg-brand-background-dark p-4 rounded-lg text-left mb-8 border border-brand-subtle dark:border-brand-subtle-dark">
            <h4 className="font-bold text-brand-text dark:text-brand-text-dark mb-2 text-sm sm:text-base">Data Packet to be Sent to SAI:</h4>

            {animationState === 'encrypting' && (
              <div className="bg-brand-text dark:bg-black text-brand-success p-4 rounded-md text-xs font-mono overflow-hidden h-48 relative">
                <div className="absolute inset-x-0 top-0 animate-scramble">
                    {randomLines.map((line, index) => (
                        <p key={index} className="whitespace-nowrap">{line}</p>
                    ))}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-text dark:from-black via-transparent to-brand-text dark:to-black pointer-events-none"></div>
              </div>
            )}
            
            {animationState === 'encrypted' && (
              <div className="bg-brand-success/20 border border-brand-success/40 text-green-800 p-4 rounded-md flex flex-col items-center justify-center h-48 animate-fade-in">
                  <LockIcon className="w-12 h-12 mb-2" />
                  <p className="text-lg font-semibold">Packet Encrypted & Secured</p>
                  <p className="text-sm">Ready for transmission.</p>
              </div>
            )}
        </div>

        <button
          onClick={onFinish}
          disabled={animationState === 'encrypting'}
          className="w-full max-w-xs sm:w-auto bg-brand-secondary hover:bg-orange-400 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Finish & Return Home
        </button>
      </Card>
    </div>
  );
};