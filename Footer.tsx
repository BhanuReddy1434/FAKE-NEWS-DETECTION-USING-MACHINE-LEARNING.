import React from 'react';
import { ShieldCheck, Heart, Sparkles, BookOpen } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-16 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-lg font-extrabold text-slate-900 tracking-tight">
                TruthCheck<span className="text-blue-600"> AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm mb-3">
              Fake News Detection Using Machine Learning — B.Tech Computer Science and Engineering (AI & ML) Minor Project.
              Dual-layer verification platform combining TF-IDF stylometric classifiers, Telugu/English NLP, and live Google Search grounding.
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bilingual Telugu + English Support Enabled</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Multi-Page Navigation
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-blue-600 transition-colors cursor-pointer"
                >
                  Home (12/12 Features Overview)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('verifier')}
                  className="hover:text-blue-600 transition-colors cursor-pointer"
                >
                  News Verifier Studio (URL / Headline / Upload)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('explorer')}
                  className="hover:text-blue-600 transition-colors cursor-pointer"
                >
                  Fact-Check Explorer & Archives
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('metrics')}
                  className="hover:text-blue-600 transition-colors cursor-pointer"
                >
                  Model Performance (Confusion Matrix)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('history')}
                  className="hover:text-blue-600 transition-colors cursor-pointer"
                >
                  History & Downloadable Dossiers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-blue-600 transition-colors cursor-pointer"
                >
                  About Project & Examiner Viva Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Academic Attribution & Disclaimer */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Academic Disclaimer
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
              This system is developed for academic research purposes. Machine learning signals should be interpreted alongside primary documentation and verified wire agency reporting.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} TruthCheck AI. B.Tech CSE (AI & ML) Minor Project.</p>
          <p>“Check Any News. Verify the Facts.”</p>
        </div>
      </div>
    </footer>
  );
};
