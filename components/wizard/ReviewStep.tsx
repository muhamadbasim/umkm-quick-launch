import React from 'react';
import { AIAnalysisResult } from '../../types';
import { Button } from '../Button';
import { TemplatePreview } from '../TemplatePreview';
import { ContentEditor } from './ContentEditor';
import { TemplateSelector } from './TemplateSelector';

interface ReviewStepProps {
    editedData: AIAnalysisResult;
    image: string;
    phoneNumber: string;
    location: string;
    historyIndex: number;
    historyLength: number;
    onDataChange: (data: AIAnalysisResult) => void;
    onAddToHistory: (data: AIAnalysisResult) => void;
    onPhoneChange: (phone: string) => void;
    onLocationChange: (location: string) => void;
    onUndo: () => void;
    onRedo: () => void;
    onPublish: () => void;
    t: {
        editContent: string;
        businessName: string;
        headline: string;
        story: string;
        whatsapp: string;
        whatsappHint: string;
        location: string;
        locationHint: string;
        detectLocation: string;
        detecting: string;
        designStyle: string;
        livePreview: string;
        updatesInstantly: string;
        launchBtn: string;
        enterWhatsappBtn: string;
    };
}

export const ReviewStep: React.FC<ReviewStepProps> = ({
    editedData,
    image,
    phoneNumber,
    location,
    historyIndex,
    historyLength,
    onDataChange,
    onAddToHistory,
    onPhoneChange,
    onLocationChange,
    onUndo,
    onRedo,
    onPublish,
    t,
}) => {
    return (
        <div className="flex-1 overflow-y-auto lg:overflow-hidden p-4 pb-32 lg:pb-4">
            <div className="max-w-6xl mx-auto w-full lg:flex lg:gap-8 lg:h-[calc(100vh-140px)]">

                {/* LEFT COLUMN: Editor Tools */}
                <div className="flex-1 space-y-4 lg:overflow-y-auto lg:pr-2 lg:h-full scrollbar-thin">
                    <ContentEditor
                        editedData={editedData}
                        phoneNumber={phoneNumber}
                        location={location}
                        historyIndex={historyIndex}
                        historyLength={historyLength}
                        onDataChange={onDataChange}
                        onAddToHistory={onAddToHistory}
                        onPhoneChange={onPhoneChange}
                        onLocationChange={onLocationChange}
                        onUndo={onUndo}
                        onRedo={onRedo}
                        t={t}
                    />

                    <TemplateSelector
                        selectedTemplate={editedData.suggestedTemplate}
                        onSelect={(template) => {
                            const newData = { ...editedData, suggestedTemplate: template };
                            onDataChange(newData);
                            onAddToHistory(newData);
                        }}
                        t={{ designStyle: t.designStyle }}
                    />
                </div>

                {/* RIGHT COLUMN: Live Preview */}
                <div className="mt-6 lg:mt-0 lg:flex-1 lg:h-full flex flex-col">
                    <div className="bg-gray-100 dark:bg-gray-900/50 rounded-3xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col items-center justify-center relative overflow-hidden lg:h-full transition-colors">
                        <div className="absolute top-4 left-0 right-0 text-center z-10 pointer-events-none">
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-white/50 dark:bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
                                {t.livePreview}
                            </span>
                        </div>

                        <TemplatePreview
                            template={editedData.suggestedTemplate}
                            data={editedData}
                            image={image}
                            className="w-full max-w-[320px] shadow-2xl transition-all duration-500"
                        />

                        <p className="text-xs text-gray-400 mt-6 text-center max-w-xs animate-pulse hidden lg:block">
                            {t.updatesInstantly}
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 lg:static lg:bg-transparent lg:border-t-0 z-30 transition-all">
                <div className="max-w-md mx-auto lg:max-w-6xl lg:flex lg:justify-end">
                    <div className="lg:w-1/3">
                        <Button
                            fullWidth
                            onClick={onPublish}
                            disabled={!phoneNumber}
                            variant={phoneNumber ? 'primary' : 'outline'}
                            className="lg:py-4 lg:text-lg shadow-xl shadow-indigo-200/50 dark:shadow-none transition-all hover:scale-[1.02]"
                        >
                            {phoneNumber ? t.launchBtn : t.enterWhatsappBtn}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
