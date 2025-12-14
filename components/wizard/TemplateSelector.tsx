import React from 'react';

type TemplateId = 'culinary' | 'fashion' | 'service';

interface TemplateSelectorProps {
    selectedTemplate: string;
    onSelect: (template: TemplateId) => void;
    t: {
        designStyle: string;
    };
}

const TEMPLATES: { id: TemplateId; icon: string }[] = [
    { id: 'culinary', icon: '🍳' },
    { id: 'fashion', icon: '👗' },
    { id: 'service', icon: '🛠️' },
];

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
    selectedTemplate,
    onSelect,
    t,
}) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 transition-all">
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-3">
                {t.designStyle}
            </label>
            <div className="grid grid-cols-3 gap-3" role="radiogroup" aria-label={t.designStyle}>
                {TEMPLATES.map((template) => (
                    <button
                        key={template.id}
                        role="radio"
                        aria-checked={selectedTemplate === template.id}
                        onClick={() => onSelect(template.id)}
                        className={`py-3 px-2 text-xs font-medium rounded-xl border-2 capitalize transition-all duration-200 flex flex-col items-center justify-center gap-1 ${selectedTemplate === template.id
                                ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 border-indigo-600 dark:border-indigo-400 transform scale-105'
                                : 'bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-600 hover:border-gray-200 dark:hover:border-gray-500'
                            }`}
                    >
                        <span
                            className={`block w-8 h-8 rounded-full mb-1 flex items-center justify-center text-lg ${selectedTemplate === template.id ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-600'
                                }`}
                            aria-hidden="true"
                        >
                            {template.icon}
                        </span>
                        {template.id}
                    </button>
                ))}
            </div>
        </div>
    );
};
