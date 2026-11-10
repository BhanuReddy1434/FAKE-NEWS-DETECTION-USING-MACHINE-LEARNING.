import React, { useState } from 'react';
import {
  History,
  Download,
  Printer,
  FileCode,
  Search,
  Trash2,
  ExternalLink,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  HelpCircle,
  ArrowRight,
  Clock,
  Globe2,
  Cpu
} from 'lucide-react';
import { VerificationResult, VerdictCategory } from '../lib/types';
import { SupportedLanguage, TRANSLATIONS } from '../lib/i18n';
import { downloadJsonReport, downloadTextReport, printVerificationReport } from '../lib/report-generator';

interface HistoryPageProps {
  history: VerificationResult[];
  onSelectResult: (result: VerificationResult) => void;
  onClearHistory: () => void;
  language: SupportedLanguage;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({
  history,
  onSelectResult,
  onClearHistory,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const [filterVerdict, setFilterVerdict] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = history.filter((item) => {
    const matchesVerdict =
      filterVerdict === 'All' ||
      (filterVerdict === 'Real' && item.finalVerdict.includes('REAL')) ||
      (filterVerdict === 'Fake' && item.finalVerdict.includes('FAKE')) ||
      (filterVerdict === 'Unverified' && item.finalVerdict.includes('UNVERIFIED'));

    const q = searchQuery.toLowerCase();
    const textToMatch = (
      item.originalInput +
      ' ' +
      (item.extractedMetadata?.headline || '') +
      ' ' +
      item.verdictExplanation
    ).toLowerCase();

    return matchesVerdict && textToMatch.includes(q);
  });

  const getVerdictBadge = (verdict: VerdictCategory) => {
    if (verdict.includes('REAL')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-extrabold bg-emerald-100 text-emerald-800">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>REAL</span>
        </span>
      );
    }
    if (verdict.includes('FAKE')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-extrabold bg-red-100 text-red-800">
          <XCircle className="w-3.5 h-3.5 text-red-600" />
          <span>FAKE</span>
        </span>
      );
    }
    if (verdict.includes('MIXED')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-extrabold bg-purple-100 text-purple-800">
          <AlertTriangle className="w-3.5 h-3.5 text-purple-600" />
          <span>MIXED</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-extrabold bg-amber-100 text-amber-800">
        <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
        <span>UNVERIFIED</span>
      </span>
    );
  };

  return (
    <div className="py-8 sm:py-12 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-2">
            <History className="w-3.5 h-3.5" />
            <span>Verification Archives & Audit Logs</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {language === 'te' ? 'పరిశీలన చరిత్ర & రిపోర్టుల డౌన్‌లోడ్' : 'Verification History & Downloadable Reports'}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {language === 'te'
              ? 'మీరు గతంలో తనిఖీ చేసిన వార్తల రికార్డులను పరిశీలించండి మరియు అధికారిక రిపోర్టులను డౌన్‌లోడ్ చేసుకోండి.'
              : 'Review previous checks and download official verification dossiers (PDF/Print/JSON).'}
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 border border-red-200 flex items-center gap-1.5 transition-colors self-start sm:self-auto cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{language === 'te' ? 'చరిత్రను తొలగించండి' : 'Clear All History'}</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-6 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'te' ? 'చరిత్రలో శోధించండి...' : 'Search verification history by keyword...'}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {['All', 'Real', 'Fake', 'Unverified'].map((verdict) => (
            <button
              key={verdict}
              onClick={() => setFilterVerdict(verdict)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                filterVerdict === verdict
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {verdict}
            </button>
          ))}
        </div>
      </div>

      {/* Records List */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <History className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">
            {language === 'te' ? 'ఇంకా ఎలాంటి రికార్డులు లేవు' : 'No Verification Records Found'}
          </h3>
          <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
            {language === 'te'
              ? 'న్యూస్ వెరిఫైయర్ స్టూడియోలో ఏదైనా వార్తను తనిఖీ చేస్తే ఆ రిపోర్ట్ ఇక్కడ భద్రపరచబడుతుంది.'
              : 'Verify any news URL, headline, or screenshot in the News Verifier Studio to generate and download reports.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {getVerdictBadge(item.finalVerdict)}

                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    Mode: {item.inputMode}
                  </span>

                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(item.timestamp).toLocaleString()}
                  </span>

                  <span className="text-[10px] font-mono text-slate-400">
                    ID: {item.id}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2">
                  {item.extractedMetadata?.headline || item.originalInput}
                </h3>

                <p className="mt-1 text-xs text-slate-600 line-clamp-2 font-normal">
                  {item.verdictExplanation}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Cpu className="w-3.5 h-3.5 text-blue-600" />
                    ML: {item.mlResult.predictedLabel} ({item.mlResult.confidenceScore}%)
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Globe2 className="w-3.5 h-3.5 text-emerald-600" />
                    Sources: {item.evidenceResult.allSources.length} verified
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 self-stretch md:self-center pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                <button
                  onClick={() => downloadTextReport(item, language)}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Download Formatted Text Dossier"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Dossier (.txt)</span>
                </button>

                <button
                  onClick={() => downloadJsonReport(item)}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Export Raw JSON"
                >
                  <FileCode className="w-3.5 h-3.5" />
                  <span>JSON</span>
                </button>

                <button
                  onClick={() => onSelectResult(item)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <span>{language === 'te' ? 'వివరాలు చూడండి' : 'Open in Studio'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
