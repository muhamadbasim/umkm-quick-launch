import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectUrl: string;
  projectName: string;
  projectHeadline: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({ 
  isOpen, 
  onClose, 
  projectUrl, 
  projectName, 
  projectHeadline 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
      setIsCopied(false);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;

  const encodedUrl = encodeURIComponent(projectUrl);
  const encodedText = encodeURIComponent(`${projectName}: ${projectHeadline}`);

  const platforms = [
    {
      name: 'WhatsApp',
      color: 'bg-[#25D366]',
      href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      icon: <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    },
    {
      name: 'Facebook',
      color: 'bg-[#1877F2]',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    },
    {
      name: 'X (Twitter)',
      color: 'bg-black',
      href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    },
    {
      name: 'LinkedIn',
      color: 'bg-[#0A66C2]',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    }
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(projectUrl).then(() => {
        setIsCopied(true);
        // Reset copy state after 2 seconds
        setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div 
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div 
        className={`bg-white dark:bg-gray-800 rounded-3xl w-full max-w-sm p-6 shadow-2xl transform transition-all duration-300 relative z-10 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t.shareModal.title}</h3>
          
          <button 
              onClick={onClose}
              className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
            {platforms.map((platform) => (
                <a
                    key={platform.name}
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 group"
                >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg transform transition-all group-hover:-translate-y-1 group-hover:shadow-xl group-active:scale-95 ${platform.color}`}>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            {platform.icon}
                        </svg>
                    </div>
                    <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors text-center leading-tight">
                        {platform.name}
                    </span>
                </a>
            ))}
        </div>

        <div className="relative">
             <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">{t.shareModal.copyLabel}</label>
             <div className="flex items-center gap-2 p-1.5 bg-gray-100 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                <input 
                    type="text" 
                    readOnly 
                    value={projectUrl} 
                    className="flex-1 bg-transparent border-none text-xs text-gray-600 dark:text-gray-300 font-mono focus:ring-0 px-2 truncate"
                />
                <button 
                    onClick={handleCopy}
                    className={`text-xs font-bold py-2 px-4 rounded-lg shadow-sm border transition-all active:scale-95 duration-200 ${
                        isCopied 
                        ? 'bg-green-500 border-green-500 text-white' 
                        : 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white border-gray-200 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-500'
                    }`}
                >
                    {isCopied ? t.shareModal.copiedBtn : t.shareModal.copyBtn}
                </button>
             </div>
        </div>
      </div>
    </div>
  );
};