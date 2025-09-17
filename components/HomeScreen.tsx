import React from 'react';
import { TestType } from '../types';
import { Card } from './common/Card';
import { JumpIcon } from './icons/JumpIcon';
import { SitupIcon } from './icons/SitupIcon';
import { SprintIcon } from './icons/SprintIcon';
import { PushupIcon } from './icons/PushupIcon';
import { BroadJumpIcon } from './icons/BroadJumpIcon';
import { MedicineBallIcon } from './icons/MedicineBallIcon';
import { ArrowRightIcon } from './icons/ArrowRightIcon';

interface HomeScreenProps {
  onSelectTest: (testType: TestType) => void;
}

const TestSelectionCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}> = ({ icon, title, description, onClick }) => (
    <Card 
        onClick={onClick} 
        className="text-center group relative overflow-hidden p-6 border border-brand-subtle/50 dark:border-brand-subtle-dark hover:border-brand-primary/30 dark:hover:border-brand-primary"
    >
        <div className="absolute -top-8 -right-8 w-24 h-24 bg-brand-secondary/5 dark:bg-brand-secondary/10 rounded-full blur-xl transition-all duration-500 group-hover:scale-150 group-hover:bg-brand-secondary/10 dark:group-hover:bg-brand-secondary/20"></div>
        
        <div className="relative z-10 flex flex-col items-center">
            <div className="bg-brand-secondary/10 text-brand-secondary p-4 rounded-full mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-brand-secondary/20">
                {icon}
            </div>
            
            <h3 className="text-xl font-bold text-brand-text dark:text-brand-text-dark mb-2">{title}</h3>
            <p className="text-brand-text-light dark:text-brand-text-light-dark text-sm sm:text-base h-16">{description}</p>
            
            <div className="absolute bottom-4 right-4 text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRightIcon className="w-6 h-6" />
            </div>
        </div>
    </Card>
);


export const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectTest }) => {
  return (
    <div className="p-4 sm:p-6 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-text dark:text-brand-text-dark mb-2">Select a Test</h2>
        <p className="text-brand-text-light dark:text-brand-text-light-dark max-w-xl mx-auto text-sm sm:text-base">Choose an assessment below. Our AI analyzes your performance on your device for accurate results, even offline.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
        <TestSelectionCard
            icon={<JumpIcon className="w-10 h-10" />}
            title={TestType.JUMP}
            description="Measure your explosive power by performing a maximum vertical jump."
            onClick={() => onSelectTest(TestType.JUMP)}
        />
        <TestSelectionCard
            icon={<SitupIcon className="w-10 h-10" />}
            title={TestType.SITUP}
            description="Test your core strength and endurance with the sit-up challenge."
            onClick={() => onSelectTest(TestType.SITUP)}
        />
        <TestSelectionCard
            icon={<SprintIcon className="w-10 h-10" />}
            title={TestType.SPRINT}
            description="Measure your speed and acceleration over a 40-meter distance."
            onClick={() => onSelectTest(TestType.SPRINT)}
        />
        <TestSelectionCard
            icon={<PushupIcon className="w-10 h-10" />}
            title={TestType.PUSHUP}
            description="Assess upper body strength and endurance."
            onClick={() => onSelectTest(TestType.PUSHUP)}
        />
        <TestSelectionCard
            icon={<BroadJumpIcon className="w-10 h-10" />}
            title={TestType.BROAD_JUMP}
            description="Test explosive leg power with a standing broad jump."
            onClick={() => onSelectTest(TestType.BROAD_JUMP)}
        />
         <TestSelectionCard
            icon={<MedicineBallIcon className="w-10 h-10" />}
            title={TestType.MEDICINE_BALL_THROW}
            description="Measure upper-body power with a forward medicine ball throw."
            onClick={() => onSelectTest(TestType.MEDICINE_BALL_THROW)}
        />
      </div>
    </div>
  );
};