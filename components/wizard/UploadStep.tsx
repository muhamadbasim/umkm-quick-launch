import React, { RefObject } from 'react';
import { Button } from '../Button';

interface UploadStepProps {
    image: string | null;
    fileInputRef: RefObject<HTMLInputElement | null>;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onAnalyze: () => void;
    onCancel: () => void;
    t: {
        uploadTitle: string;
        uploadSubtitle: string;
        changePhoto: string;
        tapToTake: string;
        cancelBtn: string;
        analyzeBtn: string;
    };
}

export const UploadStep: React.FC<UploadStepProps> = ({
    image,
    fileInputRef,
    onFileChange,
    onAnalyze,
    onCancel,
    t,
}) => {
    return (
        <div className="flex-1 p-6 flex flex-col items-center justify-center">
            <div className="w-full max-w-sm">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                    {t.uploadTitle}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-center mb-8">
                    {t.uploadSubtitle}
                </p>

                {/* Upload Zone */}
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full border-2 border-dashed border-indigo-200 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl aspect-[4/3] flex flex-col items-center justify-center cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors mb-6 relative overflow-hidden group"
                    aria-label={image ? t.changePhoto : t.tapToTake}
                >
                    {image ? (
                        <>
                            <img src={image} alt="Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-white font-medium">{t.changePhoto}</span>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-800 text-indigo-600 dark:text-indigo-300 flex items-center justify-center mb-3">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <span className="font-semibold text-indigo-900 dark:text-indigo-200">{t.tapToTake}</span>
                        </>
                    )}
                </button>

                <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={onFileChange}
                    aria-label="Upload image"
                />

                <div className="flex gap-3">
                    <Button variant="outline" fullWidth onClick={onCancel}>
                        {t.cancelBtn}
                    </Button>
                    <Button
                        fullWidth
                        onClick={onAnalyze}
                        disabled={!image}
                        variant="primary"
                    >
                        {t.analyzeBtn}
                    </Button>
                </div>
            </div>
        </div>
    );
};
