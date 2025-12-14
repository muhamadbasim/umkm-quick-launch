import React from 'react';

interface AnalyzingStepProps {
    t: {
        analyzingTitle: string;
        analyzingSteps: string;
    };
}

export const AnalyzingStep: React.FC<AnalyzingStepProps> = ({ t }) => {
    return (
        <div
            className="flex flex-col h-full bg-white dark:bg-gray-800 items-center justify-center p-8 text-center transition-colors"
            role="status"
            aria-live="polite"
            aria-label={t.analyzingTitle}
        >
            <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 border-4 border-indigo-100 dark:border-indigo-900 rounded-full" />
                <div
                    className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"
                    aria-hidden="true"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {t.analyzingTitle}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs animate-pulse whitespace-pre-line">
                {t.analyzingSteps}
            </p>
        </div>
    );
};
