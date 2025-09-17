import React, { useState, useCallback, useEffect } from 'react';
import { Screen, TestType, TestResult, JumpResult, SitupResult, SprintResult, PushupResult, BroadJumpResult, MedicineBallThrowResult, UserProfile, TestRecord } from './types';
import { HomeScreen } from './components/HomeScreen';
import { InstructionsScreen } from './components/InstructionsScreen';
import { Header } from './components/common/Header';
import { AnalysisScreen } from './components/AnalysisScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { IntegrityCheckScreen } from './components/IntegrityCheckScreen';
import { TransmissionScreen } from './components/TransmissionScreen';
import { UserProfileScreen } from './components/UserProfileScreen';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>(Screen.HOME);
  const [selectedTest, setSelectedTest] = useState<TestType | null>(null);
  const [result, setResult] = useState<TestResult | null>(null);
  const [isDeepfakeDetected, setIsDeepfakeDetected] = useState<boolean>(false);
  
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const savedProfile = localStorage.getItem('userProfile');
      return savedProfile ? JSON.parse(savedProfile) : { name: 'Aspiring Athlete', sport: 'Athletics' };
    } catch (e) {
      console.error("Could not load user profile from localStorage", e);
      return { name: 'Aspiring Athlete', sport: 'Athletics' };
    }
  });
  
  const [testHistory, setTestHistory] = useState<TestRecord[]>(() => {
    try {
      const savedHistory = localStorage.getItem('testHistory');
      return savedHistory ? JSON.parse(savedHistory) : [];
    } catch (e) {
      console.error("Could not load test history from localStorage", e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
    } catch (e) {
      console.error("Could not save user profile to localStorage", e);
    }
  }, [userProfile]);

  useEffect(() => {
    try {
      localStorage.setItem('testHistory', JSON.stringify(testHistory));
    } catch (e) {
      console.error("Could not save test history to localStorage", e);
    }
  }, [testHistory]);

  const handleSelectTest = useCallback((testType: TestType) => {
    setSelectedTest(testType);
    setScreen(Screen.INSTRUCTIONS);
  }, []);

  const handleStartAnalysis = useCallback(() => {
    setScreen(Screen.ANALYSIS);
  }, []);

  const handleAnalysisComplete = useCallback(() => {
    // In a real app, the AI model would return the result. Here we mock it.
    let mockResult: TestResult;
    switch (selectedTest) {
        case TestType.JUMP:
            mockResult = { height: parseFloat((Math.random() * 40 + 20).toFixed(2)) };
            break;
        case TestType.SITUP:
            mockResult = { count: Math.floor(Math.random() * 40) + 10, deviations: Math.floor(Math.random() * 5) };
            break;
        case TestType.SPRINT:
            mockResult = { time: parseFloat((Math.random() * 2 + 4.5).toFixed(4)) };
            break;
        case TestType.PUSHUP:
            mockResult = { count: Math.floor(Math.random() * 30) + 5, deviations: Math.floor(Math.random() * 6) };
            break;
        case TestType.BROAD_JUMP:
            mockResult = { distance: parseFloat((Math.random() * 100 + 150).toFixed(2)) };
            break;
        case TestType.MEDICINE_BALL_THROW:
            mockResult = { distance: parseFloat((Math.random() * 7 + 3).toFixed(4)) };
            break;
        default:
            // Fallback for any unhandled test type
            mockResult = { height: 0 }; 
            break;
    }
    setResult(mockResult);
    setScreen(Screen.RESULTS);
  }, [selectedTest]);

  const handleFinalizeTest = useCallback(() => {
    if (selectedTest && result) {
      const newRecord: TestRecord = {
        id: new Date().toISOString(),
        date: new Date().toLocaleDateString('en-IN'),
        testType: selectedTest,
        result: result,
      };
      setTestHistory(prev => [newRecord, ...prev]);
    }
    // Reset current test state and go home
    setSelectedTest(null);
    setResult(null);
    setIsDeepfakeDetected(false);
    setScreen(Screen.HOME);
  }, [selectedTest, result]);

  const handleGoHome = useCallback(() => {
    setSelectedTest(null);
    setResult(null);
    setIsDeepfakeDetected(false);
    setScreen(Screen.HOME);
  }, []);

  const isFlagged = () => {
      if (isDeepfakeDetected) return true;
      if (result && ('deviations' in result)) {
          return (result as SitupResult | PushupResult).deviations > 0;
      }
      return false;
  }

  const renderScreen = () => {
    switch (screen) {
      case Screen.INSTRUCTIONS:
        return selectedTest && <InstructionsScreen testType={selectedTest} onStart={handleStartAnalysis} />;
      case Screen.ANALYSIS:
        return selectedTest && <div className="flex items-center justify-center h-full"><AnalysisScreen testType={selectedTest} onComplete={handleAnalysisComplete} /></div>;
      case Screen.RESULTS:
        return selectedTest && result && <ResultsScreen testType={selectedTest} result={result} onNext={() => setScreen(Screen.INTEGRITY)} />;
      case Screen.INTEGRITY:
        return selectedTest && result && (
            <IntegrityCheckScreen 
                testType={selectedTest}
                result={result}
                isDeepfake={isDeepfakeDetected}
                onToggleDeepfake={setIsDeepfakeDetected}
                onNext={() => setScreen(Screen.TRANSMISSION)}
            />
        );
      case Screen.TRANSMISSION:
          return selectedTest && result && (
            <TransmissionScreen 
                onFinish={handleFinalizeTest} 
                testType={selectedTest} 
                result={result} 
                isFlagged={isFlagged()}
            />
          );
      case Screen.USER_PROFILE:
          return <UserProfileScreen 
                    user={userProfile} 
                    history={testHistory} 
                    onUpdateUser={setUserProfile}
                    onBack={handleGoHome}
                 />;
      case Screen.HOME:
      default:
        return <HomeScreen onSelectTest={handleSelectTest} />;
    }
  };

  return (
    <div className="h-screen w-screen bg-brand-background dark:bg-brand-background-dark text-brand-text dark:text-brand-text-dark flex flex-col font-sans overflow-hidden">
      <Header 
        onHomeClick={handleGoHome} 
        showHomeButton={screen !== Screen.HOME && screen !== Screen.INSTRUCTIONS}
        onProfileClick={() => setScreen(Screen.USER_PROFILE)}
        showProfileButton={screen === Screen.HOME}
      />
      <main className="flex-grow overflow-y-auto">
        {renderScreen()}
      </main>
    </div>
  );
};

export default App;