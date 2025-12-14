import React from 'react';
import { Project } from '../../types';
import { Button } from '../Button';

type PublishStatus = 'idle' | 'generating' | 'pushing' | 'deploying' | 'completed';

interface PublishingStepProps {
    publishStatus: PublishStatus;
    finalProject: Project | null;
    onSuccess: (project: Project) => void;
    t: {
        successTitle: string;
        successSubtitle: string;
        launchingTitle: string;
        launchingSubtitle: string;
        step1: string;
        step1Desc: string;
        step2: string;
        step2Desc: string;
        step3: string;
        step3Desc: string;
        backDashboard: string;
        viewSite: string;
    };
}

export const PublishingStep: React.FC<PublishingStepProps> = ({
    publishStatus,
    finalProject,
    onSuccess,
    t,
}) => {
    // Determine progress based on status
    let progressPercentage = 5;
    if (publishStatus === 'generating') progressPercentage = 20;
    if (publishStatus === 'pushing') progressPercentage = 50;
    if (publishStatus === 'deploying') progressPercentage = 80;
    if (publishStatus === 'completed') progressPercentage = 100;

    const stepsList = ['generating', 'pushing', 'deploying', 'completed'] as const;
    const currentStepIndex = stepsList.indexOf(publishStatus as typeof stepsList[number]);

    const steps = [
        { id: 'generating', label: t.step1, desc: t.step1Desc },
        { id: 'pushing', label: t.step2, desc: t.step2Desc },
        { id: 'deploying', label: t.step3, desc: t.step3Desc },
    ];

    return (
        <div
            className="flex flex-col h-full bg-white dark:bg-gray-800 items-center justify-center p-8 transition-colors"
            role="status"
            aria-live="polite"
        >
            <div className="w-full max-w-md">
                <div className="text-center mb-10">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {publishStatus === 'completed' ? t.successTitle : t.launchingTitle}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                        {publishStatus === 'completed' ? t.successSubtitle : t.launchingSubtitle}
                    </p>
                </div>

                <div className="space-y-8 relative pl-2" aria-label="Publishing steps">
                    {/* Vertical Line */}
                    <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gray-100 dark:bg-gray-700 -z-10" aria-hidden="true" />

                    {steps.map((step, index) => {
                        const isActive = publishStatus === step.id;
                        const isComplete = currentStepIndex > index;

                        return (
                            <div key={step.id} className="flex items-center gap-4 group">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-500 z-10 ${isActive
                                            ? 'bg-white dark:bg-gray-800 border-indigo-600 text-indigo-600 scale-110 shadow-lg shadow-indigo-200/50'
                                            : isComplete
                                                ? 'bg-emerald-500 border-emerald-500 text-white'
                                                : 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400'
                                        }`}
                                    aria-hidden="true"
                                >
                                    {isComplete ? (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <span className="text-sm font-bold">{index + 1}</span>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h4 className={`font-bold text-lg ${isActive ? 'text-indigo-600 dark:text-indigo-400'
                                            : isComplete ? 'text-emerald-600 dark:text-emerald-400'
                                                : 'text-gray-400 dark:text-gray-600'
                                        }`}>
                                        {step.label}
                                    </h4>
                                    {isActive && (
                                        <p className="text-sm text-gray-500 animate-pulse mt-0.5">{step.desc}</p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Progress Bar overall */}
                <div
                    className="w-full bg-gray-100 dark:bg-gray-700 h-2.5 rounded-full overflow-hidden mt-12 mb-8"
                    role="progressbar"
                    aria-valuenow={progressPercentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                >
                    <div
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full transition-all duration-1000 ease-linear shadow-[0_0_10px_rgba(79,70,229,0.5)]"
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>

                {/* Success Actions */}
                {publishStatus === 'completed' && finalProject && (
                    <div className="animate-[fade-in-up_0.5s_ease-out] w-full max-w-sm mx-auto">
                        <Button
                            fullWidth
                            onClick={() => onSuccess(finalProject)}
                            variant="primary"
                            className="shadow-xl mb-4"
                        >
                            {t.backDashboard}
                        </Button>
                        {finalProject.publishedUrl && (
                            <a
                                href={finalProject.publishedUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors group"
                            >
                                {t.viewSite}
                                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
