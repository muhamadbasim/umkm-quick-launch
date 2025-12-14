import React from 'react';
import { AIAnalysisResult } from '../types';

interface TemplatePreviewProps {
  template: 'culinary' | 'fashion' | 'service';
  data: AIAnalysisResult;
  image: string;
  className?: string;
}

export const TemplatePreview: React.FC<TemplatePreviewProps> = ({ template, data, image, className = '' }) => {
  const getStyles = () => {
    switch (template) {
      case 'culinary':
        return {
          wrapper: 'bg-[#FFF8F0]', // Cream
          text: 'text-gray-800',
          header: 'font-serif text-orange-900',
          button: 'bg-orange-600 text-white rounded-full shadow-lg shadow-orange-200',
          imageStyle: 'rounded-b-[2rem] shadow-md',
          layout: 'default'
        };
      case 'fashion':
        return {
          wrapper: 'bg-white',
          text: 'text-gray-900',
          header: 'uppercase tracking-[0.2em] font-light text-2xl',
          button: 'bg-black text-white rounded-none uppercase tracking-widest text-[10px] hover:bg-gray-900',
          imageStyle: '',
          layout: 'overlay'
        };
      case 'service':
        return {
          wrapper: 'bg-slate-50',
          text: 'text-slate-600',
          header: 'font-bold tracking-tight text-slate-900',
          button: 'bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700',
          imageStyle: 'rounded-2xl mx-4 mt-4 shadow-sm',
          layout: 'card'
        };
      default:
        return {
          wrapper: 'bg-white',
          text: 'text-gray-800',
          header: 'font-bold',
          button: 'bg-indigo-600 text-white rounded-xl',
          imageStyle: '',
          layout: 'default'
        };
    }
  };

  const styles = getStyles();

  const renderMockSections = () => {
    if (template === 'culinary') {
      return (
        <div className="mt-8 space-y-8 animate-fade-in">
          {/* Menu Highlights */}
          <div>
            <h3 className={`font-serif text-lg mb-4 border-b border-orange-200/50 pb-2 ${styles.text}`}>Menu Highlights</h3>
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center mb-4">
                <div className="flex flex-col gap-1.5">
                  <div className={`h-2.5 bg-gray-800 rounded w-32 opacity-60`}></div>
                  <div className={`h-2 bg-gray-800 rounded w-20 opacity-30`}></div>
                </div>
                <div className={`h-3 w-12 bg-orange-900 rounded opacity-10`}></div>
              </div>
            ))}
          </div>
          
          {/* Location */}
          <div className="bg-white/60 p-5 rounded-2xl border border-orange-100 shadow-sm">
            <h3 className={`font-serif text-sm mb-3 ${styles.text}`}>Visit Our Kitchen</h3>
             <div className="space-y-2">
                <div className={`h-2 bg-gray-800 rounded w-full opacity-30`}></div>
                <div className={`h-2 bg-gray-800 rounded w-2/3 opacity-30`}></div>
             </div>
          </div>
        </div>
      );
    }

    if (template === 'fashion') {
       return (
         <div className="mt-12 space-y-12">
            {/* Gallery Grid */}
            <div className="space-y-2">
                <div className="uppercase tracking-widest text-[10px] text-center mb-4 opacity-50">New Arrivals</div>
                <div className="grid grid-cols-2 gap-2 px-2">
                   <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center text-gray-300">
                      <div className="w-8 h-8 rounded-full border border-gray-200"></div>
                   </div>
                   <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center text-gray-300">
                      <div className="w-8 h-8 rounded-full border border-gray-200"></div>
                   </div>
                </div>
            </div>

            {/* Statement */}
            <div className="px-4 text-center py-8 bg-gray-50 mx-[-1.5rem]">
               <div className="uppercase tracking-widest text-[10px] mb-3 opacity-40">Philosophy</div>
               <p className="text-sm italic opacity-60 font-serif">"Elegance is not standing out, but being remembered."</p>
            </div>
         </div>
       );
    }

    if (template === 'service') {
        return (
          <div className="mt-8 space-y-8">
             {/* Features */}
             <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Why Choose Us</h3>
                <div className="grid grid-cols-1 gap-3">
                    {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border border-slate-100">
                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center text-xs font-bold">✓</div>
                        <div className={`h-2 bg-slate-400 rounded w-2/3 opacity-50`}></div>
                    </div>
                    ))}
                </div>
             </div>

             {/* Testimonial */}
             <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg shadow-blue-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-2 -mr-2 text-6xl opacity-10 font-serif">"</div>
                <div className="h-2 bg-white/40 rounded w-full mb-2"></div>
                <div className="h-2 bg-white/40 rounded w-full mb-2"></div>
                <div className="h-2 bg-white/40 rounded w-1/2 mb-6"></div>
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-white/20"></div>
                   <div className="h-2.5 bg-white/80 rounded w-24"></div>
                </div>
             </div>
          </div>
        );
    }
  };

  return (
    <div className={`relative mx-auto w-full aspect-[9/19] bg-gray-900 rounded-[3rem] shadow-2xl border-[8px] border-gray-900 overflow-hidden ring-1 ring-gray-900/5 transform transition-transform duration-300 hover:scale-[1.02] ${className}`}>
      {/* Phone Notch/Bar */}
      <div className="absolute top-0 inset-x-0 h-7 bg-gray-900 z-30 flex justify-center">
        <div className="w-24 h-5 bg-black rounded-b-2xl"></div>
      </div>

      {/* Screen Content */}
      <div className={`w-full h-full overflow-hidden flex flex-col transition-colors duration-500 ease-in-out ${styles.wrapper}`}>
        
        {/* Mock Header */}
        <div className="h-14 flex items-center justify-between px-5 bg-white/80 backdrop-blur-md sticky top-0 z-20 text-xs font-bold border-b border-black/5">
          <span className="truncate max-w-[140px] tracking-tight">{data.businessNameSuggestion}</span>
          <div className="flex gap-1.5">
             <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>
             <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>
             <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-24 scroll-smooth">
          {styles.layout === 'overlay' ? (
             <div className="relative min-h-full fade-in">
                <img src={image} className="w-full h-[60vh] object-cover" alt="Hero" />
                <div className="p-6 text-center bg-white/95 backdrop-blur-sm -mt-24 relative mx-4 mb-4 shadow-lg border border-gray-100/50">
                  <h1 className={`mb-3 ${styles.header}`}>{data.headline}</h1>
                  <div className="w-10 h-[2px] bg-black mx-auto mb-4 opacity-20"></div>
                  <p className={`text-sm leading-relaxed ${styles.text}`}>{data.story}</p>
                </div>
                
                {/* Extended Content for Scrolling */}
                <div className="px-6 pb-8">
                     {renderMockSections()}
                     
                     {/* Footer */}
                     <div className="mt-12 text-center opacity-30">
                        <div className="w-4 h-4 bg-black mx-auto mb-4 rounded-full"></div>
                        <div className="text-[8px] uppercase tracking-widest">© 2024 {data.businessNameSuggestion}</div>
                     </div>
                </div>
             </div>
          ) : (
            <div className="flex flex-col min-h-full">
              <div className={`w-full h-56 shrink-0 overflow-hidden relative ${styles.layout === 'card' ? '' : ''}`}>
                 <img src={image} className={`w-full h-full object-cover transition-all duration-500 ${styles.imageStyle}`} alt="Hero" />
              </div>
              
              <div className="p-6 flex-1">
                <h1 className={`text-2xl mb-4 leading-tight ${styles.header}`}>{data.headline}</h1>
                <p className={`text-sm leading-relaxed opacity-90 mb-8 ${styles.text}`}>{data.story}</p>
                
                {template === 'service' && (
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-white p-3 rounded-xl shadow-sm h-20 flex flex-col items-center justify-center border border-slate-100 gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-100"></div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Premium</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl shadow-sm h-20 flex flex-col items-center justify-center border border-slate-100 gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-100"></div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Quality</span>
                    </div>
                  </div>
                )}
                
                {/* Extended Content for Scrolling */}
                {renderMockSections()}

                {/* Footer */}
                <div className="mt-12 pt-6 border-t border-black/5 text-center opacity-30 pb-4">
                     <div className="h-2 bg-current rounded w-1/3 mx-auto mb-2 opacity-50"></div>
                     <div className="text-[8px] uppercase tracking-widest">© 2024 {data.businessNameSuggestion}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Floating CTA */}
        <div className="absolute bottom-6 inset-x-6 z-20 pointer-events-none">
          <button className={`w-full py-3.5 text-center text-sm font-bold shadow-xl transform transition-all pointer-events-auto active:scale-95 hover:shadow-2xl hover:-translate-y-1 ${styles.button}`}>
            WhatsApp Order
          </button>
        </div>
        
        {/* Home Indicator */}
        <div className="absolute bottom-1.5 inset-x-0 flex justify-center z-20 pointer-events-none">
             <div className="w-36 h-1.5 bg-black/20 rounded-full backdrop-blur-md"></div>
        </div>

      </div>
    </div>
  );
};