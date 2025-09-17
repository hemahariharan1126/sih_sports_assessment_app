import React, { useState } from 'react';
import { UserProfile, TestRecord, TestType, TestResult, JumpResult, SitupResult, SprintResult, PushupResult, BroadJumpResult, MedicineBallThrowResult } from '../types';
import { Card } from './common/Card';
import { UserIcon } from './icons/UserIcon';
import { EditIcon } from './icons/EditIcon';
import { CheckIcon } from './icons/CheckIcon';
import { DashboardIcon } from './icons/DashboardIcon';

import { JumpIcon } from './icons/JumpIcon';
import { SitupIcon } from './icons/SitupIcon';
import { SprintIcon } from './icons/SprintIcon';
import { PushupIcon } from './icons/PushupIcon';
import { BroadJumpIcon } from './icons/BroadJumpIcon';
import { MedicineBallIcon } from './icons/MedicineBallIcon';

interface UserProfileScreenProps {
  user: UserProfile;
  history: TestRecord[];
  onUpdateUser: (newUser: UserProfile) => void;
  onBack: () => void;
}

const SPORTS_LIST = ["Athletics", "Cricket", "Football", "Hockey", "Kabaddi", "Wrestling", "Other"];

// FIX: Replaced ambiguous type guards with a robust function using `testType` as a discriminant.
const getResultSummary = (record: TestRecord): string => {
    const { result, testType } = record;
    switch (testType) {
        case TestType.JUMP:
            return `${(result as JumpResult).height.toFixed(1)} cm`;
        case TestType.SITUP:
            return `${(result as SitupResult).count} reps`;
        case TestType.SPRINT:
            return `${(result as SprintResult).time.toFixed(2)} s`;
        case TestType.PUSHUP:
            return `${(result as PushupResult).count} reps`;
        case TestType.BROAD_JUMP:
            return `${(result as BroadJumpResult).distance.toFixed(1)} cm`;
        case TestType.MEDICINE_BALL_THROW:
            return `${(result as MedicineBallThrowResult).distance.toFixed(2)} m`;
        default:
            return '-';
    }
};

const getTestIcon = (testType: TestType) => {
    const iconProps = { className: "w-8 h-8" };
    switch (testType) {
        case TestType.JUMP: return <JumpIcon {...iconProps} />;
        case TestType.SITUP: return <SitupIcon {...iconProps} />;
        case TestType.SPRINT: return <SprintIcon {...iconProps} />;
        case TestType.PUSHUP: return <PushupIcon {...iconProps} />;
        case TestType.BROAD_JUMP: return <BroadJumpIcon {...iconProps} />;
        case TestType.MEDICINE_BALL_THROW: return <MedicineBallIcon {...iconProps} />;
        default: return null;
    }
};

export const UserProfileScreen: React.FC<UserProfileScreenProps> = ({ user, history, onUpdateUser, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<UserProfile>(user);

  const handleSave = () => {
    onUpdateUser(editedUser);
    setIsEditing(false);
  };

  return (
    <div className="p-4 sm:p-6 animate-slide-up-fade w-full">
      <Card className="max-w-2xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-text dark:text-brand-text-dark flex items-center">
            <UserIcon className="w-7 h-7 sm:w-8 sm:h-8 mr-3" />
            User Profile
          </h2>
          <button 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="flex items-center text-sm bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary font-bold py-2 px-3 sm:px-4 rounded-lg transition-colors"
          >
            {isEditing ? <CheckIcon className="w-5 h-5 mr-2" /> : <EditIcon className="w-5 h-5 mr-2" />}
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>

        {/* --- Settings Section --- */}
        <div key={isEditing ? 'editing' : 'viewing'} className="space-y-4 mb-8 animate-fade-in">
            <div>
                <label className="block text-sm font-medium text-brand-text-light dark:text-brand-text-light-dark mb-1">Name</label>
                {isEditing ? (
                    <input 
                        type="text"
                        value={editedUser.name}
                        onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                        className="w-full p-2 border border-brand-subtle dark:border-brand-subtle-dark rounded-md text-lg bg-brand-surface dark:bg-brand-subtle-dark text-brand-text dark:text-brand-text-dark"
                    />
                ) : (
                    <p className="text-lg sm:text-xl text-brand-text dark:text-brand-text-dark">{user.name}</p>
                )}
            </div>
            <div>
                <label className="block text-sm font-medium text-brand-text-light dark:text-brand-text-light-dark mb-1">Primary Sport</label>
                {isEditing ? (
                    <>
                    <select
                        value={editedUser.sport === 'Other' || !SPORTS_LIST.includes(editedUser.sport) ? 'Other' : editedUser.sport}
                        onChange={(e) => setEditedUser({...editedUser, sport: e.target.value})}
                        className="w-full p-2 border border-brand-subtle dark:border-brand-subtle-dark rounded-md mb-2 text-lg bg-brand-surface dark:bg-brand-subtle-dark text-brand-text dark:text-brand-text-dark"
                    >
                        {SPORTS_LIST.map(sport => <option key={sport} value={sport}>{sport}</option>)}
                    </select>
                    {(editedUser.sport === 'Other' || !SPORTS_LIST.includes(editedUser.sport)) && (
                        <input 
                            type="text"
                            placeholder="Please specify your sport"
                            value={!SPORTS_LIST.includes(editedUser.sport) ? editedUser.sport : ''}
                            onChange={(e) => setEditedUser({...editedUser, sport: e.target.value})}
                            className="w-full p-2 border border-brand-subtle dark:border-brand-subtle-dark rounded-md text-lg bg-brand-surface dark:bg-brand-subtle-dark text-brand-text dark:text-brand-text-dark"
                        />
                    )}
                    </>
                ) : (
                    <p className="text-lg sm:text-xl text-brand-text dark:text-brand-text-dark">{user.sport}</p>
                )}
            </div>
        </div>
        
        <hr className="my-8 border-brand-subtle dark:border-brand-subtle-dark" />
        
        {/* --- Dashboard Section --- */}
        <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-brand-text dark:text-brand-text-dark flex items-center mb-4">
                <DashboardIcon className="w-6 h-6 sm:w-7 sm:h-7 mr-3" />
                Performance History
            </h3>
            {history.length === 0 ? (
                <div className="text-center text-brand-text-light dark:text-brand-text-light-dark bg-brand-background dark:bg-brand-background-dark p-6 rounded-lg">
                    <p>No test results yet.</p>
                    <p className="text-sm">Complete a test to see your history here.</p>
                </div>
            ) : (
                <ul className="space-y-3 max-h-96 overflow-y-auto pr-2">
                    {history.map(record => (
                        <li key={record.id} className="bg-brand-background dark:bg-brand-background-dark p-3 rounded-lg flex items-center justify-between transition hover:bg-brand-subtle dark:hover:bg-brand-subtle-dark">
                           <div className="flex items-center">
                                <div className="text-brand-secondary bg-brand-secondary/10 p-2 rounded-full mr-3 sm:mr-4">
                                    {getTestIcon(record.testType)}
                                </div>
                                <div>
                                    <p className="font-bold text-brand-text dark:text-brand-text-dark text-sm sm:text-base">{record.testType}</p>
                                    <p className="text-xs sm:text-sm text-brand-text-light dark:text-brand-text-light-dark">{record.date}</p>
                                </div>
                           </div>
                           <p className="text-xl sm:text-2xl font-bold text-brand-text dark:text-brand-text-dark">{getResultSummary(record)}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>

        <div className="text-center mt-8">
            <button
                onClick={onBack}
                className="w-full max-w-xs sm:w-auto bg-brand-secondary hover:bg-orange-400 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
                Back to Home
            </button>
        </div>
      </Card>
    </div>
  );
};