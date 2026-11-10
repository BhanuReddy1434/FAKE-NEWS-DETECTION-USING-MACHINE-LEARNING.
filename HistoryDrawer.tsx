import React from 'react';
import { X, History, Clock, ArrowRight, CheckCircle2, XCircle, AlertTriangle, HelpCircle } from 'lucide-react';
import { VerificationResult } from '../lib/types';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: VerificationResult[];
  onSelectResult: (item: VerificationResult) => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onSelectResult,
}) => {
  if (!isOpen) return null;

  const getIcon = (verdict: string) => {
    if (verdict.includes('REAL')) return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
    if (verdict.includes('FAKE')) return <XCircle className="w-4 h-4 text-red-600" />;
    if (verdict.includes('MIXED')) return <AlertTriangle className="w-4 h-4 text-purple-600" />;
    return <HelpCircle className="w-4 h-4 text-amber-600" />;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-slate-900 text-base">
                Recent Verifications
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {history.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                No verifications recorded in this session yet. Verify an article, headline, or URL to see it here!
              </div>
            ) : (
              history.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectResult(item);
                    onClose();
                  }}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/20 cursor-pointer transition-all"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {item.inputMode}
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 line-clamp-2 mb-2 leading-snug">
                    {item.extractedMetadata?.headline || item.originalInput}
                  </h4>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-1.5 font-bold">
                      {getIcon(item.finalVerdict)}
                      <span className="text-[11px] truncate max-w-[200px]">
                        {item.finalVerdict}
                      </span>
                    </div>
                    <span className="text-blue-600 font-semibold text-[11px] flex items-center gap-0.5">
                      View <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
