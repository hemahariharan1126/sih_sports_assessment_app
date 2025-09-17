
import { useState, useEffect } from 'react';

export const useTypingEffect = (text: string | null, speed: number = 50) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        if (text === null) return;
        
        // If text is empty (during loading), keep it empty.
        if (text === '') {
            setDisplayedText('');
            return;
        }

        let i = 0;
        const intervalId = setInterval(() => {
            if (i < text.length) {
                setDisplayedText(prev => text.slice(0, i + 1));
                i++;
            } else {
                clearInterval(intervalId);
            }
        }, speed);

        return () => clearInterval(intervalId);
    }, [text, speed]);

    return displayedText;
};
