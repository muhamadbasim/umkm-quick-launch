import React from 'react';

interface ProgressBarProps {
    currentStep: 'upload' | 'analyzing' | 'review' | 'publishing';
}

const STEPS = ['upload', 'analyzing', 'review', 'publishing'] as const;

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
    const currentIndex = STEPS.indexOf(currentStep);
    const progress = Math.max(5, ((currentIndex + 1) / STEPS.length) * 100);

    return (
        <div
            className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 mb-6"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Project creation progress"
        >
            <div
                className="bg-indigo-600 h-1.5 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};
