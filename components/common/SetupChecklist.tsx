import React from 'react';
import { CheckIcon } from '../icons/CheckIcon';
import { WarningIcon } from '../icons/WarningIcon';

interface ChecklistItem {
    text: string;
    isMet: boolean;
    icon: React.ReactNode;
}

interface SetupChecklistProps {
    items: ChecklistItem[];
}

const ChecklistItem: React.FC<ChecklistItem> = ({ text, isMet, icon }) => {
    return (
        <div className="flex items-center space-x-2">
            <div className={`relative flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-colors ${isMet ? 'bg-brand-success' : 'bg-white/30'}`}>
                {isMet ? (
                   <>
                    <CheckIcon className="w-3 h-3 text-white" />
                    <span className="absolute inline-flex h-full w-full rounded-full bg-brand-success opacity-75 animate-ping-once"></span>
                   </>
                ) : (
                    <div className="text-white/80">{icon}</div>
                )}
            </div>
            <span className={`transition-colors text-sm ${isMet ? 'text-white font-semibold' : 'text-white/70'}`}>{text}</span>
        </div>
    )
}

export const SetupChecklist: React.FC<SetupChecklistProps> = ({ items }) => {
    return (
        <div className="bg-black/50 backdrop-blur-sm p-3 rounded-xl">
            <div className="flex items-center justify-center space-x-3 sm:space-x-4">
                {items.map(item => (
                    <ChecklistItem key={item.text} {...item} />
                ))}
            </div>
        </div>
    )
}