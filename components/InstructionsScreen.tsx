import React, { useRef, useState, useEffect } from 'react';
import { TestType } from '../types';
import { INSTRUCTIONS } from '../constants';
import { CheckIcon } from './icons/CheckIcon';
import { CameraIcon } from './icons/CameraIcon';
import { WarningIcon } from './icons/WarningIcon';
import { PoseGuide } from './common/PoseGuide';
import { LightbulbIcon } from './icons/LightbulbIcon';
import { FlipCameraIcon } from './icons/FlipCameraIcon';
import { TripodIcon } from './icons/TripodIcon';
import { SettingsIcon } from './icons/SettingsIcon';
import { UserInFrameIcon } from './icons/UserInFrameIcon';
import { SetupChecklist } from './common/SetupChecklist';

interface InstructionsScreenProps {
  testType: TestType;
  onStart: () => void;
}

const getTestDuration = (testType: TestType): number => {
    switch(testType) {
      case TestType.SITUP:
      case TestType.PUSHUP:
        return 20; // seconds
      case TestType.SPRINT:
        return 10; // seconds
      case TestType.JUMP:
      case TestType.BROAD_JUMP:
      case TestType.MEDICINE_BALL_THROW:
      default:
        return 5; // seconds
    }
}

const AutoStartStatus: React.FC<{ isOptimal: boolean; isCameraReady: boolean }> = ({ isOptimal, isCameraReady }) => {
    if (!isCameraReady) return null;

    let text, icon;
    if (isOptimal) {
        text = "Hold still, starting automatically...";
        icon = <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin mr-2"></div>;
    } else {
        text = "Complete the checklist to begin.";
        icon = <UserInFrameIcon className="w-4 h-4 mr-2" />;
    }

    return (
        <div className="mt-4 h-12 w-full max-w-xs flex items-center justify-center px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full animate-fade-in">
            {icon}
            <p className="font-semibold text-base text-white text-center">{text}</p>
        </div>
    );
};

export const InstructionsScreen: React.FC<InstructionsScreenProps> = ({ testType, onStart }) => {
  const instructions = INSTRUCTIONS[testType];
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  const [testState, setTestState] = useState<'idle' | 'countdown' | 'recording'>('idle');
  const [countdown, setCountdown] = useState(3);
  const [recordingProgress, setRecordingProgress] = useState(0);

  const [isCameraReady, setIsCameraReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [videoTrack, setVideoTrack] = useState<MediaStreamTrack | null>(null);
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [currentDeviceIndex, setCurrentDeviceIndex] = useState(0);
  const [focusPoint, setFocusPoint] = useState<{ x: number; y: number; key: number } | null>(null);
  const [supportsFocus, setSupportsFocus] = useState(false);
  
  const [isSimulatedLowLight, setIsSimulatedLowLight] = useState(false);
  const [isAutoLowLight, setIsAutoLowLight] = useState(false);
  const [distanceWarning, setDistanceWarning] = useState<'ok' | 'close' | 'far'>('ok');
  const [isSimulatedShake, setIsSimulatedShake] = useState(false);
  const [isDemoPanelOpen, setIsDemoPanelOpen] = useState(false);

  const showLowLightWarning = isAutoLowLight || isSimulatedLowLight;
  const showDistanceWarning = distanceWarning !== 'ok';
  const showShakeWarning = isSimulatedShake;
  const isOptimalCondition = isCameraReady && !error && !showLowLightWarning && !showDistanceWarning && !showShakeWarning;
  
  const testDuration = getTestDuration(testType);

  const getGuideText = () => {
    switch(testType) {
        case TestType.JUMP: return "Position your full body (sideways) inside the frame.";
        case TestType.SITUP: return "Lie sideways, keeping your body inside the frame.";
        case TestType.SPRINT: return "Position the start and finish lines inside the frame.";
        case TestType.PUSHUP: return "Position your full body (sideways) inside the frame.";
        case TestType.BROAD_JUMP: return "Stand sideways, with the start line visible in the frame.";
        case TestType.MEDICINE_BALL_THROW: return "Stand sideways, with the throwing area in the frame.";
        default: return "Position yourself correctly in the frame.";
    }
  }
  const guideText = getGuideText();

  useEffect(() => {
    const initializeDevices = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevs = devices.filter((d) => d.kind === 'videoinput');
        if (videoDevs.length > 0) setVideoDevices(videoDevs);
        else setError("No video cameras found.");
      } catch (err) {
        console.error("Error enumerating devices:", err);
        if (err instanceof Error && (err.name === "NotAllowedError" || err.name === "PermissionDeniedError")) {
             setError("Camera access was denied. Please enable it in your browser settings.");
        } else {
             setError("Could not access the camera.");
        }
      }
    };
    initializeDevices();
  }, []);

  useEffect(() => {
    if (videoDevices.length === 0) return;
    
    let stream: MediaStream | null = null;
    const setupCamera = async () => {
      const deviceId = videoDevices[currentDeviceIndex].deviceId;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { deviceId: { exact: deviceId } } });
        if (videoRef.current) videoRef.current.srcObject = stream;

        const track = stream.getVideoTracks()[0];
        setVideoTrack(track);
        // @ts-ignore - focusMode and pointsOfInterest might not be in standard TS lib
        if (track.getCapabilities().focusMode) setSupportsFocus(true);
        else setSupportsFocus(false);
        
        setIsCameraReady(true);
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.onstop = onStart;
      } catch (err) {
        console.error("Error setting up camera:", err);
        setError("Failed to start camera. Please try again.");
      }
    };
    setupCamera();
    return () => stream?.getTracks().forEach(track => track.stop());
  }, [videoDevices, currentDeviceIndex, onStart]);

  useEffect(() => {
    if (!canvasRef.current) {
      canvasRef.current = document.createElement('canvas');
      canvasRef.current.width = 64; canvasRef.current.height = 48;
    }
    const interval = setInterval(() => {
      if (!videoRef.current || videoRef.current.paused || videoRef.current.ended || !isCameraReady) return;
      const video = videoRef.current, canvas = canvasRef.current!, ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;
      try {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        let sum = 0;
        for (let i = 0; i < data.length; i += 4) sum += (data[i] + data[i + 1] + data[i + 2]) / 3;
        setIsAutoLowLight((sum / (data.length / 4)) < 70);
      } catch (e) { console.error("Could not analyze canvas for brightness:", e); }
    }, 2000);
    return () => clearInterval(interval);
  }, [isCameraReady]);
  
  const startTestSequence = () => {
    if (testState !== 'idle') return;
    setTestState('countdown');
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev > 1) return prev - 1;
        clearInterval(countdownInterval);
        setTestState('recording');
        return 0;
      });
    }, 1000);
  };

  useEffect(() => {
    let startTimeout: number;

    if (isOptimalCondition && testState === 'idle') {
      startTimeout = window.setTimeout(() => {
        startTestSequence();
      }, 2000); // 2-second delay to simulate AI readiness check
    }

    return () => {
      clearTimeout(startTimeout);
    };
  }, [isOptimalCondition, testState]);

  useEffect(() => {
    if (testState !== 'recording') return;

    mediaRecorderRef.current?.start();
    const recordingStartTime = Date.now();

    const progressInterval = setInterval(() => {
      const elapsed = (Date.now() - recordingStartTime) / 1000;
      setRecordingProgress(Math.min(1, elapsed / testDuration));
    }, 100);

    const recordingTimeout = setTimeout(() => {
        mediaRecorderRef.current?.stop();
    }, testDuration * 1000);

    return () => {
        clearInterval(progressInterval);
        clearTimeout(recordingTimeout);
        if (mediaRecorderRef.current?.state === 'recording') {
            mediaRecorderRef.current.stop();
        }
    };
  }, [testState, testDuration]);

  const handleFocus = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !videoTrack || !supportsFocus) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left, y = event.clientY - rect.top;
    // @ts-ignore
    videoTrack.applyConstraints({ advanced: [{ pointsOfInterest: [{ x: x / rect.width, y: y / rect.height }] }] });
    setFocusPoint({ x, y, key: Date.now() });
  };
  
  const DistanceButton: React.FC<{ value: 'ok' | 'close' | 'far', children: React.ReactNode }> = ({ value, children }) => (
    <button onClick={() => setDistanceWarning(value)} className={`px-2 py-0.5 text-xs rounded-full border transition-colors ${distanceWarning === value ? 'bg-brand-secondary text-white border-brand-secondary' : 'bg-brand-text/20 dark:bg-white/20 text-brand-text dark:text-brand-text-dark border-brand-text/30 dark:border-white/30'}`}>{children}</button>
  );

  const R = 38;
  const CIRCUMFERENCE = 2 * Math.PI * R;

  return (
    <div className="fixed inset-0 bg-brand-text text-white animate-fade-in" onClick={handleFocus}>
        <video ref={videoRef} className={`absolute inset-0 w-full h-full object-cover transition-all ${showLowLightWarning ? 'filter brightness-50' : ''} ${isSimulatedShake ? 'animate-shake' : ''}`} autoPlay playsInline muted onLoadedData={() => videoRef.current?.play()}></video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60"></div>
        
        {focusPoint && <div key={focusPoint.key} className="absolute w-16 h-16 border-2 border-brand-secondary rounded-full animate-focus-pulse pointer-events-none" style={{ left: `${focusPoint.x - 32}px`, top: `${focusPoint.y - 32}px` }}></div>}
        
        {/* --- Top Bar --- */}
        <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-start z-20">
            <button onClick={() => setIsDemoPanelOpen(true)} className="bg-black/50 p-2 rounded-full hover:bg-black/70"><SettingsIcon className="w-5 h-5" /></button>
            <button onClick={(e) => { e.stopPropagation(); setCurrentDeviceIndex(p => (p + 1) % videoDevices.length); }} className="bg-black/50 p-2 rounded-full hover:bg-black/70" disabled={videoDevices.length <= 1}><FlipCameraIcon className="w-5 h-5" /></button>
        </div>

        {/* --- Main Instruction --- */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-full max-w-[90%] sm:max-w-md z-10 pointer-events-none">
            <div className="bg-black/60 backdrop-blur-md p-3 sm:p-4 rounded-xl text-center animate-fade-in">
                <h1 className="text-lg sm:text-xl font-bold text-brand-secondary mb-1">{instructions.title}</h1>
                <p className="text-white/90 text-sm sm:text-base">{guideText}</p>
            </div>
        </div>
        
        {isCameraReady && !error && <PoseGuide status={showDistanceWarning ? 'warning' : 'ok'} warningText={distanceWarning === 'close' ? 'TOO CLOSE' : 'TOO FAR'} />}

        {!isCameraReady && !error && <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50"><div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mb-2"></div><p>Initializing Camera...</p></div>}
        {error && <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-warning/90 p-4 text-center"><WarningIcon className="w-10 h-10 mb-2" /><p className="font-bold">Camera Error</p><p className="text-sm">{error}</p></div>}

        {testState === 'countdown' && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p key={countdown} className="text-9xl font-extrabold text-white text-shadow-lg animate-scale-fade">{countdown}</p>
            </div>
        )}
        
        {/* --- Bottom UI --- */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10 flex flex-col items-center">
            {testState === 'idle' && (
                <>
                    <SetupChecklist items={[
                        { text: 'Stable Phone', isMet: !showShakeWarning, icon: <TripodIcon className="w-5 h-5"/> },
                        { text: 'Good Lighting', isMet: !showLowLightWarning, icon: <LightbulbIcon className="w-5 h-5"/> },
                        { text: 'Correct Position', isMet: !showDistanceWarning, icon: <UserInFrameIcon className="w-5 h-5"/> },
                    ]} />
                    <AutoStartStatus isOptimal={isOptimalCondition} isCameraReady={isCameraReady} />
                </>
            )}
            {testState === 'recording' && (
                <div className="relative inline-flex items-center justify-center h-24">
                    <svg className="w-20 h-20 transform -rotate-90">
                        <circle className="text-white/20" strokeWidth="4" stroke="currentColor" fill="transparent" r={R} cx="40" cy="40" />
                        <circle 
                            className="text-red-500" 
                            strokeWidth="4" 
                            strokeDasharray={CIRCUMFERENCE} 
                            strokeDashoffset={CIRCUMFERENCE * (1 - recordingProgress)} 
                            strokeLinecap="round" 
                            stroke="currentColor" 
                            fill="transparent" 
                            r={R} 
                            cx="40" 
                            cy="40" 
                            style={{ transition: 'stroke-dashoffset 0.1s linear' }} />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="mt-1 text-xs font-mono">REC</span>
                    </div>
                </div>
            )}
        </div>
        
        {/* --- Demo Panel (Bottom Sheet) --- */}
        <div className={`fixed inset-0 z-20 transition-opacity ${isDemoPanelOpen ? 'bg-black/60' : 'bg-transparent pointer-events-none'}`} onClick={() => setIsDemoPanelOpen(false)}></div>
        <div className={`fixed bottom-0 left-0 right-0 bg-brand-surface/95 dark:bg-brand-surface-dark/95 text-brand-text dark:text-brand-text-dark p-4 transform transition-transform z-30 shadow-lg rounded-t-2xl backdrop-blur-sm ${isDemoPanelOpen ? 'translate-y-0' : 'translate-y-full'}`}>
            <div className="w-10 h-1 bg-brand-text/20 dark:bg-white/20 rounded-full mx-auto mb-3"></div>
            <div className="flex justify-between items-center mb-4">
                 <h3 className="font-bold text-lg">Demo Controls</h3>
                 <button onClick={() => setIsDemoPanelOpen(false)} className="text-brand-text/70 hover:text-brand-text dark:text-brand-text-dark/70 dark:hover:text-brand-text-dark font-bold text-2xl">&times;</button>
            </div>
            <div className="text-sm space-y-4">
                <label className="flex items-center justify-between"><span className="flex items-center"><LightbulbIcon className="w-5 h-5 mr-2"/>Simulate Low Light</span><input type="checkbox" className="toggle" checked={isSimulatedLowLight} onChange={e => setIsSimulatedLowLight(e.target.checked)} /></label>
                <label className="flex items-center justify-between"><span className="flex items-center"><TripodIcon className="w-5 h-5 mr-2"/>Simulate Shake</span><input type="checkbox" className="toggle" checked={isSimulatedShake} onChange={e => setIsSimulatedShake(e.target.checked)} /></label>
                <div className="flex items-center justify-between"><span className="font-medium">Simulate Distance</span><div className="flex space-x-1"><DistanceButton value="close">Close</DistanceButton><DistanceButton value="ok">OK</DistanceButton><DistanceButton value="far">Far</DistanceButton></div></div>
            </div>
            <p className="text-xs text-brand-text/50 dark:text-brand-text-light-dark/50 mt-6 text-center">These controls are for demonstration purposes only.</p>
        </div>
    </div>
  );
};

// Simple toggle style for demo checkboxes
const style = document.createElement('style');
style.innerHTML = `
.toggle {
  -webkit-appearance: none;
  appearance: none;
  width: 3rem;
  height: 1.75rem;
  background-color: rgba(0,0,0,0.1);
  border-radius: 9999px;
  position: relative;
  cursor: pointer;
  transition: background-color .2s ease-in-out;
}
.toggle::before {
  content: '';
  position: absolute;
  top: 0.25rem;
  left: 0.25rem;
  width: 1.25rem;
  height: 1.25rem;
  background-color: white;
  border-radius: 9999px;
  transition: transform .2s ease-in-out;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
.toggle:checked {
  background-color: #FFB36B;
}
.toggle:checked::before {
  transform: translateX(1.25rem);
}
.dark .toggle {
    background-color: rgba(255,255,255,0.1);
}
.dark .toggle::before {
    background-color: #2D3748;
}
.dark .toggle:checked::before {
    background-color: white;
}
.text-shadow { text-shadow: 0 1px 3px rgba(0,0,0,0.5); }
`;
document.head.appendChild(style);