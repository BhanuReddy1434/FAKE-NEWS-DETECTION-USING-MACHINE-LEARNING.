import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  HelpCircle,
  ExternalLink,
  Cpu,
  Globe2,
  Calendar,
  Share2,
  ThumbsUp,
  ThumbsDown,
  Info,
  Clock,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  ArrowRight,
  Download,
  Printer,
  FileCode,
  Image as ImageIcon
} from 'lucide-react';
import { VerificationResult, VerdictCategory } from '../lib/types';
import { SupportedLanguage, TRANSLATIONS } from '../lib/i18n';
import { downloadJsonReport, downloadTextReport, printVerificationReport } from '../lib/report-generator';

interface VerificationResultCardProps {
  result: VerificationResult;
  onReset: () => void;
  language?: SupportedLanguage;
}

export const VerificationResultCard: React.FC<VerificationResultCardProps> = ({
  result,
  onReset,
  language = 'en',
}) => {
  const t = TRANSLATIONS[language];
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Verdict Theme Configuration
  const getVerdictTheme = (verdict: VerdictCategory) => {
    switch (verdict) {
      case 'LIKELY REAL / SUPPORTED':
        return {
          bg: 'bg-emerald-50',
          border: 'border-emerald-300',
          badgeBg: 'bg-emerald-600',
          text: 'text-emerald-950',
          badgeText: 'text-white',
          icon: CheckCircle2,
          colorCode: '#059669',
          label: language === 'te' ? 'నిజమైనదిగా నిర్ధారించబడింది (LIKELY REAL)' : 'LIKELY REAL / SUPPORTED',
        };
      case 'LIKELY FAKE / CONTRADICTED':
        return {
          bg: 'bg-red-50',
          border: 'border-red-300',
          badgeBg: 'bg-red-600',
          text: 'text-red-950',
          badgeText: 'text-white',
          icon: XCircle,
          colorCode: '#dc2626',
          label: language === 'te' ? 'నకిలీ / ఖండించబడింది (LIKELY FAKE)' : 'LIKELY FAKE / CONTRADICTED',
        };
      case 'MIXED EVIDENCE':
        return {
          bg: 'bg-purple-50',
          border: 'border-purple-300',
          badgeBg: 'bg-purple-600',
          text: 'text-purple-950',
          badgeText: 'text-white',
          icon: AlertTriangle,
          colorCode: '#9333ea',
          label: language === 'te' ? 'మిశ్రమ ఆధారాలు (MIXED EVIDENCE)' : 'MIXED EVIDENCE',
        };
      case 'UNVERIFIED / INSUFFICIENT EVIDENCE':
      default:
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-300',
          badgeBg: 'bg-amber-500',
          text: 'text-amber-950',
          badgeText: 'text-white',
          icon: HelpCircle,
          colorCode: '#d97706',
          label: language === 'te' ? 'ఆధారాలు సరిపోవు (UNVERIFIED)' : 'UNVERIFIED / INSUFFICIENT EVIDENCE',
        };
    }
  };

  const theme = getVerdictTheme(result.finalVerdict);
  const VerdictIcon = theme.icon;

  const handleFeedback = async (rating: 'accurate' | 'inaccurate') => {
    setFeedbackLoading(true);
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          verificationId: result.id,
          rating,
        }),
      });
      setFeedbackSent(true);
    } catch {
      // ignore
    } finally {
      setFeedbackLoading(false);
    }
  };

  const handleShare = () => {
    const text = `TruthCheck AI Report\nVerdict: ${result.finalVerdict}\nSummary: ${result.verdictExplanation}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-200 overflow-hidden printable-area">
      {/* 1. Header Banner & Final Verdict */}
      <div className={`p-6 sm:p-8 ${theme.bg} border-b ${theme.border}`}>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-black text-sm sm:text-base ${theme.badgeBg} ${theme.badgeText} shadow-sm`}
            >
              <VerdictIcon className="w-5 h-5 stroke-[2.5]" />
              <span>{theme.label}</span>
            </span>
            <span className="text-xs font-semibold text-slate-500 bg-white/70 px-2.5 py-1 rounded-lg border border-slate-200">
              ID: {result.id}
            </span>
          </div>

          {/* Action Tools: Download, Print, Share */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => downloadTextReport(result, language)}
              className="px-3 py-1.5 rounded-lg bg-white/90 hover:bg-white text-xs font-bold text-slate-700 border border-slate-300 shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Download Full Dossier"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download (.txt)</span>
            </button>

            <button
              onClick={printVerificationReport}
              className="px-3 py-1.5 rounded-lg bg-white/90 hover:bg-white text-xs font-bold text-slate-700 border border-slate-300 shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Print Official Certificate"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={() => downloadJsonReport(result)}
              className="px-3 py-1.5 rounded-lg bg-white/90 hover:bg-white text-xs font-bold text-slate-700 border border-slate-300 shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Export JSON"
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>JSON</span>
            </button>

            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded-lg bg-white/90 hover:bg-white text-xs font-bold text-slate-700 border border-slate-300 shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied!' : 'Share'}</span>
            </button>

            <button
              onClick={onReset}
              className="px-3 py-1.5 rounded-lg bg-white/90 hover:bg-white text-xs font-bold text-blue-700 border border-blue-200 shadow-xs transition-colors cursor-pointer"
            >
              {t.buttons.checkAnother}
            </button>
          </div>
        </div>

        {/* Why Explanation */}
        <div className="mt-2">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1">
            {t.labels.why}
          </h2>
          <p className="text-lg sm:text-2xl font-black text-slate-900 leading-snug">
            {result.verdictExplanation}
          </p>
          {result.evidenceResult.summary && (
            <p className="mt-2.5 text-sm text-slate-700 leading-relaxed font-normal">
              {result.evidenceResult.summary}
            </p>
          )}
        </div>

        {/* Divergence Notice if ML and Web Evidence differ */}
        {result.divergenceNotes && (
          <div className="mt-4 p-3.5 rounded-xl bg-white/90 border border-amber-300 text-amber-900 text-xs sm:text-sm flex items-start gap-2.5 shadow-sm">
            <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-800">
                Machine Learning vs. Live Evidence Divergence Notice
              </p>
              <p className="mt-0.5 text-amber-900 leading-relaxed font-medium">
                {result.divergenceNotes}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Uploaded Image & Extracted OCR Section (if upload mode) */}
      {result.uploadedImagePreview && (
        <div className="p-6 border-b border-slate-200 bg-slate-50/50">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
            <ImageIcon className="w-4 h-4 text-blue-600" />
            <span>{t.labels.extractedText}</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            <div className="rounded-xl overflow-hidden border border-slate-200 bg-white p-2">
              <img
                src={result.uploadedImagePreview}
                alt="Analyzed news screenshot"
                className="max-h-48 w-full object-contain mx-auto"
              />
            </div>
            <div className="md:col-span-2 p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 max-h-48 overflow-y-auto font-mono whitespace-pre-wrap">
              {result.ocrExtractedText || 'No text extracted.'}
            </div>
          </div>
        </div>
      )}

      {/* 2. Comparative Dual-Signal Grid: Machine Learning vs Online Evidence */}
      <div className="p-6 sm:p-8 border-b border-slate-200">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-4">
          Dual-Signal Breakdown (ML Stylometry vs. Live Web Research)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Machine Learning Model Signal Card */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
                  <Cpu className="w-4 h-4 text-blue-600" />
                  {t.labels.mlSignal}
                </span>
                <span className="text-[11px] font-semibold text-slate-500">
                  TF-IDF + Stylometry
                </span>
              </div>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl font-extrabold text-slate-900">
                  {result.mlResult.predictedLabel}
                </span>
                <span className="text-xs font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                  {result.mlResult.confidenceScore}% Confidence
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Learned patterns from benchmark news datasets. Evaluates sensationalism, capitalization, and clickbait rhetoric.
              </p>

              {/* Stylometric Indicators */}
              <div className="space-y-2 pt-3 border-t border-slate-200">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600">{t.labels.sensationalism}:</span>
                  <span className="font-bold text-slate-900">
                    {result.mlResult.stylometricSignals.sensationalismScore}/100
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: `${result.mlResult.stylometricSignals.sensationalismScore}%` }}
                  />
                </div>

                <div className="flex justify-between items-center text-xs pt-1">
                  <span className="text-slate-600">{t.labels.attribution}:</span>
                  <span className="font-bold text-slate-900">
                    {result.mlResult.stylometricSignals.journalisticAttributionScore}/100
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${result.mlResult.stylometricSignals.journalisticAttributionScore}%` }}
                  />
                </div>
              </div>

              {/* Matched features */}
              {result.mlResult.topFeatures.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-200">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                    Top Predictive Cues Detected:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {result.mlResult.topFeatures.map((f, i) => (
                      <span
                        key={i}
                        className={`text-[11px] px-2 py-0.5 rounded border font-mono ${
                          f.indication === 'Fake'
                            ? 'bg-red-50 text-red-700 border-red-200'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}
                      >
                        {f.term} ({f.indication === 'Fake' ? '+' : '-'}{f.weight})
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Online Evidence Assessment Card */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
                  <Globe2 className="w-4 h-4 text-emerald-600" />
                  {t.labels.webEvidence}
                </span>
                <span className="text-[11px] font-semibold text-slate-500">
                  Live Internet Verification
                </span>
              </div>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl font-extrabold text-slate-900">
                  {result.evidenceResult.status}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                  {result.evidenceResult.evidenceStrength} Consensus
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {result.evidenceResult.consensusSummary}
              </p>

              {/* Search queries executed */}
              <div className="space-y-2 pt-3 border-t border-slate-200">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Search Queries Investigated:
                </span>
                <div className="space-y-1">
                  {result.evidenceResult.searchQueriesUsed.slice(0, 3).map((q, idx) => (
                    <div
                      key={idx}
                      className="text-xs font-mono bg-white px-2.5 py-1 rounded border border-slate-200 text-slate-700 truncate"
                    >
                      🔍 {q}
                    </div>
                  ))}
                </div>
              </div>

              {/* Independent Sources Count */}
              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">Independent Sources Retrieved:</span>
                <span className="font-extrabold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {result.evidenceResult.allSources.length} Verified Links
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Factual Claims Identified */}
      <div className="p-6 sm:p-8 border-b border-slate-200 bg-slate-50/20">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
          <span>{t.labels.claims}</span>
          <span className="text-[10px] font-medium text-slate-400">
            (Extracted from {result.inputMode})
          </span>
        </h3>
        <ul className="space-y-2">
          {result.evidenceResult.mainClaimsIdentified.map((claim, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2.5 text-sm font-medium text-slate-800 bg-white p-3 rounded-xl border border-slate-200 shadow-xs"
            >
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span>{claim}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 4. Supporting & Contradicting Evidence Breakdowns */}
      <div className="p-6 sm:p-8 border-b border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Supporting Evidence */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 mb-3 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {t.labels.supporting} ({result.evidenceResult.supportingEvidence.length})
            </h4>

            {result.evidenceResult.supportingEvidence.length > 0 ? (
              <div className="space-y-2.5">
                {result.evidenceResult.supportingEvidence.map((ev, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs sm:text-sm text-slate-800"
                  >
                    <p className="font-semibold text-emerald-950 mb-1">{ev.claim}</p>
                    <p className="text-slate-700 leading-relaxed font-normal">{ev.explanation}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 text-xs italic">
                No direct supporting corroboration found from authoritative newsrooms or primary records.
              </div>
            )}
          </div>

          {/* Contradicting Evidence */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-red-700 mb-3 flex items-center gap-1.5">
              <XCircle className="w-4 h-4 text-red-600" />
              {t.labels.contradicting} ({result.evidenceResult.contradictingEvidence.length})
            </h4>

            {result.evidenceResult.contradictingEvidence.length > 0 ? (
              <div className="space-y-2.5">
                {result.evidenceResult.contradictingEvidence.map((ev, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-red-50/60 border border-red-200 text-xs sm:text-sm text-slate-800"
                  >
                    <p className="font-semibold text-red-950 mb-1">{ev.claim}</p>
                    <p className="text-slate-700 leading-relaxed font-normal">{ev.explanation}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 text-xs italic">
                No direct refutation or debunks found contradicting this event.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 5. Clickable Verified Sources */}
      <div className="p-6 sm:p-8 border-b border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Globe2 className="w-4 h-4 text-blue-600" />
            {t.labels.sources}
          </h3>
          <span className="text-[11px] text-slate-500">
            Verified external links
          </span>
        </div>

        {result.evidenceResult.allSources.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {result.evidenceResult.allSources.map((source, index) => (
              <a
                key={index}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-700">
                      {source.credibilityTier || 'Web Source'}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
                  </div>
                  <h5 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-700 line-clamp-2 leading-snug">
                    {source.title}
                  </h5>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="truncate max-w-[200px]">{source.publisher}</span>
                  <span className="text-blue-600 font-semibold group-hover:underline">
                    View Article
                  </span>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 text-xs">
            No external links retrieved.
          </div>
        )}
      </div>

      {/* 6. Academic Disclaimer & Limitations */}
      <div className="p-6 sm:p-8 bg-slate-50/70 border-b border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-2 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-slate-500" />
              {t.labels.limitations}
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {result.limitations.map((lim, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-slate-400">•</span>
                  <span>{lim}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              {t.labels.advice}
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {result.recommendedActions.map((act, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-blue-500">→</span>
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-200/80 text-[11px] text-slate-500 font-medium italic">
          {t.labels.disclaimer}
        </div>
      </div>

      {/* 7. User Feedback & Footer */}
      <div className="p-5 sm:p-6 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-700">
            Did this analysis help you?
          </span>
          {feedbackSent ? (
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              ✓ Feedback submitted. Thank you!
            </span>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleFeedback('accurate')}
                disabled={feedbackLoading}
                className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
                Accurate
              </button>
              <button
                onClick={() => handleFeedback('inaccurate')}
                disabled={feedbackLoading}
                className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <ThumbsDown className="w-3.5 h-3.5 text-red-600" />
                Inaccurate
              </button>
            </div>
          )}
        </div>

        <div className="text-[11px] text-slate-400 text-center sm:text-right">
          B.Tech CSE AI & ML Minor Project • TruthCheck AI Engine
        </div>
      </div>
    </div>
  );
};
