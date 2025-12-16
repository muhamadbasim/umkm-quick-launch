import React, { useState } from 'react';
import { AIAnalysisResult } from '../../types';

interface ContentEditorProps {
    editedData: AIAnalysisResult;
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
    };
}

export const ContentEditor: React.FC<ContentEditorProps> = ({
    editedData,
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
    t,
}) => {
    const [isDetecting, setIsDetecting] = useState(false);

    const detectLocation = () => {
        if (typeof navigator !== 'undefined' && navigator.geolocation) {
            setIsDetecting(true);
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const { latitude, longitude } = position.coords;
                        const response = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
                            {
                                headers: {
                                    'User-Agent': 'OCTOmatiz/1.0'
                                }
                            }
                        );
                        const data = await response.json();
                        if (data.display_name) {
                            onLocationChange(data.display_name);
                        }
                    } catch (error) {
                        console.debug('Geocoding failed:', error);
                    } finally {
                        setIsDetecting(false);
                    }
                },
                (error) => {
                    console.debug('Geolocation error:', error.code, error.message);
                    setIsDetecting(false);
                },
                {
                    timeout: 15000,
                    enableHighAccuracy: true,
                    maximumAge: 0
                }
            );
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5 transition-all">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                    <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 flex items-center justify-center text-xs mr-2" aria-hidden="true">
                        ✓
                    </span>
                    {t.editContent}
                </h2>
                <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1" role="group" aria-label="History controls">
                    <button
                        onClick={onUndo}
                        disabled={historyIndex <= 0}
                        className="p-1.5 rounded-md hover:bg-white dark:hover:bg-gray-600 disabled:opacity-30 disabled:hover:bg-transparent text-gray-600 dark:text-gray-300 transition-all shadow-sm disabled:shadow-none"
                        aria-label="Undo"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6M3 10l6-6" />
                        </svg>
                    </button>
                    <button
                        onClick={onRedo}
                        disabled={historyIndex >= historyLength - 1}
                        className="p-1.5 rounded-md hover:bg-white dark:hover:bg-gray-600 disabled:opacity-30 disabled:hover:bg-transparent text-gray-600 dark:text-gray-300 transition-all shadow-sm disabled:shadow-none"
                        aria-label="Redo"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6M21 10l-6-6" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <label htmlFor="business-name" className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">
                        {t.businessName}
                    </label>
                    <input
                        id="business-name"
                        type="text"
                        value={editedData.businessNameSuggestion}
                        onChange={(e) => onDataChange({ ...editedData, businessNameSuggestion: e.target.value })}
                        onBlur={() => onAddToHistory(editedData)}
                        className="w-full p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-semibold text-gray-900 dark:text-white"
                    />
                </div>

                <div>
                    <label htmlFor="headline" className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">
                        {t.headline}
                    </label>
                    <input
                        id="headline"
                        type="text"
                        value={editedData.headline}
                        onChange={(e) => onDataChange({ ...editedData, headline: e.target.value })}
                        onBlur={() => onAddToHistory(editedData)}
                        className="w-full p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white"
                    />
                </div>

                <div>
                    <label htmlFor="story" className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">
                        {t.story}
                    </label>
                    <textarea
                        id="story"
                        value={editedData.story}
                        rows={4}
                        onChange={(e) => onDataChange({ ...editedData, story: e.target.value })}
                        onBlur={() => onAddToHistory(editedData)}
                        className="w-full p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none text-gray-900 dark:text-white"
                    />
                </div>

                <div>
                    <label htmlFor="location" className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">
                        {t.location}
                    </label>
                    <div className="flex gap-2">
                        <input
                            id="location"
                            type="text"
                            placeholder="e.g. Jl. Sudirman No. 123, Jakarta"
                            value={location}
                            onChange={(e) => onLocationChange(e.target.value)}
                            className="flex-1 p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white"
                        />
                        <button
                            type="button"
                            onClick={detectLocation}
                            disabled={isDetecting}
                            className="px-4 py-3 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-xl hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors disabled:opacity-50 whitespace-nowrap text-sm font-medium"
                        >
                            {isDetecting ? t.detecting : t.detectLocation}
                        </button>
                    </div>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">{t.locationHint}</p>
                </div>

                <div>
                    <label htmlFor="whatsapp" className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">
                        {t.whatsapp}
                    </label>
                    <input
                        id="whatsapp"
                        type="tel"
                        placeholder="e.g. 628123456789"
                        value={phoneNumber}
                        onChange={(e) => onPhoneChange(e.target.value.replace(/\D/g, ''))}
                        className="w-full p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-gray-900 dark:text-white"
                    />
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">{t.whatsappHint}</p>
                </div>
            </div>
        </div>
    );
};
