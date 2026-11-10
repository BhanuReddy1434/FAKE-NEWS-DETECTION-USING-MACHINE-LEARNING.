import React, { useState } from 'react';
import {
  Link as LinkIcon,
  Type,
  FileText,
  Search,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Loader2,
  ArrowRight,
  ExternalLink,
  RotateCcw
} from 'lucide-react';
import { InputMode, SampleNewsItem, VerificationResult } from '../lib/types';
import { VerificationResultCard } from './VerificationResultCard';

interface NewsCheckerProps {
  samples: SampleNewsItem[];
  onVerifyComplete: (result: VerificationResult) => void;
  activeResult: VerificationResult | null;
  onClearResult: () => void;
}

export const NewsChecker: React.FC<NewsCheckerProps> = ({
  samples,
  onVerifyComplete,
  activeResult,
  onClearResult,
}) => {
  const [mode, setMode] = useState<InputMode>('headline');
  const [urlInput, setUrlInput] = useState('');
  const [headlineInput, setHeadlineInput] = useState('');
  const [articleInput, setArticleInput] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [inaccessibleUrlNote, setInaccessibleUrlNote] = useState<string | null>(null);

  const steps = [
    'Validating input and extracting factual claims...',
    'Connecting to live internet search & fact-checking registries...',
    'Running TF-IDF feature extraction & ML classifier...',
    'Comparing independent sources & cross-referencing dates...',
    'Synthesizing final evidence report & transparent verdict...'
  ];

  const handleSelectSample = (sample: SampleNewsItem) => {
    setErrorMsg(null);
    setInaccessibleUrlNote(null);
    setMode(sample.type);
    if (sample.type === 'url' && sample.sourceUrl) {
      setUrlInput(sample.sourceUrl);
    } else if (sample.type === 'headline') {
      setHeadlineInput(sample.headline);
    } else {
      setArticleInput(sample.content);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setInaccessibleUrlNote(null);

    let contentToVerify = '';
    if (mode === 'url') contentToVerify = urlInput.trim();
    else if (mode === 'headline') contentToVerify = headlineInput.trim();
    else contentToVerify = articleInput.trim();

    if (!contentToVerify) {
      setErrorMsg(`Please enter a valid news ${mode} to verify.`);
      return;
    }

    if (mode === 'url') {
      let testUrl = contentToVerify;
      if (!testUrl.startsWith('http://') && !testUrl.startsWith('https://')) {
        testUrl = 'https://' + testUrl;
        contentToVerify = testUrl;
      }
      try {
        new URL(testUrl);
      } catch {
        setErrorMsg('Please enter a valid web address (e.g., https://example.com/news/article).');
        return;
      }
    }

    setIsLoading(true);
    setLoadingStep(0);

    // Step simulation timer for reassuring progress
    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1100);

    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: mode,
          content: contentToVerify,
        }),
      });

      clearInterval(stepInterval);

      const data = await response.json();

      if (!response.ok) {
        if (data.inaccessibleUrl) {
          setInaccessibleUrlNote(
            data.error + ' ' + (data.suggestion || '')
          );
        } else {
          setErrorMsg(data.error || 'Failed to verify news. Please try again.');
        }
        setIsLoading(false);
        return;
      }

      onVerifyComplete(data as VerificationResult);
    } catch (err: unknown) {
      clearInterval(stepInterval);
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMsg(`Network or server error: ${msg}. Please ensure the server is running.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-8 sm:py-12 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Hero Header */}
      <div className="text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Dual-Engine Verification: Machine Learning + Live Internet Search</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Is This News Real or Fake?
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal">
          Verify news from the internet using machine learning, online research, and reliable sources.
        </p>
      </div>

      {/* Main Input Form Card */}
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
        {/* Three Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50/70 p-1.5 gap-1.5">
          <button
            type="button"
            onClick={() => {
              setMode('url');
              setErrorMsg(null);
            }}
            className={`flex-1 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              mode === 'url'
                ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            <LinkIcon className="w-4 h-4" />
            <span>1. News URL</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMode('headline');
              setErrorMsg(null);
            }}
            className={`flex-1 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              mode === 'headline'
                ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            <Type className="w-4 h-4" />
            <span>2. Headline</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMode('article');
              setErrorMsg(null);
            }}
            className={`flex-1 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              mode === 'article'
                ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>3. Full Article</span>
          </button>
        </div>

        {/* Input Area */}
        <form onSubmit={handleVerify} className="p-5 sm:p-7">
          {mode === 'url' && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Paste Article Web Address (HTTP/HTTPS)
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://www.reuters.com/... or any accessible news article link"
                  className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm sm:text-base text-slate-900 placeholder:text-slate-400"
                  disabled={isLoading}
                />
                <LinkIcon className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
              <p className="mt-2 text-xs text-slate-500 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                Protected against SSRF and malicious redirects. The engine extracts the headline, publisher, and text safely.
              </p>
            </div>
          )}

          {mode === 'headline' && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Paste News Headline or Breaking Claim
                </label>
                <span className="text-xs text-slate-400">
                  {headlineInput.length} / 500 characters
                </span>
              </div>
              <textarea
                rows={3}
                value={headlineInput}
                onChange={(e) => setHeadlineInput(e.target.value.slice(0, 500))}
                placeholder="e.g., 'Federal Reserve cuts interest rates by 25 basis points' or 'Shocking secret cure discovered...'"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm sm:text-base text-slate-900 placeholder:text-slate-400 resize-none"
                disabled={isLoading}
              />
              <p className="mt-2 text-xs text-slate-500">
                Works for breaking news, recently published claims, and historical news topics.
              </p>
            </div>
          )}

          {mode === 'article' && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Paste Complete News Article Text
                </label>
                <span className="text-xs text-slate-400">
                  {articleInput.split(/\s+/).filter(Boolean).length} words
                </span>
              </div>
              <textarea
                rows={7}
                value={articleInput}
                onChange={(e) => setArticleInput(e.target.value)}
                placeholder="Paste the full body text of the article here. TruthCheck AI will clean the text, extract key factual claims, run the ML model, and verify facts online..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm text-slate-900 placeholder:text-slate-400"
                disabled={isLoading}
              />
            </div>
          )}

          {/* Error Message Banner */}
          {errorMsg && (
            <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Unable to process request</p>
                <p className="mt-0.5 text-red-700">{errorMsg}</p>
              </div>
            </div>
          )}

          {/* Inaccessible URL Helper Banner */}
          {inaccessibleUrlNote && (
            <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-800">
                  Website Inaccessible (Not Marked as Fake)
                </p>
                <p className="mt-1 text-amber-700">{inaccessibleUrlNote}</p>
                <button
                  type="button"
                  onClick={() => {
                    setMode('headline');
                    setInaccessibleUrlNote(null);
                  }}
                  className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:underline"
                >
                  Switch to Headline Tab & Paste Manually <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <div className="text-xs text-slate-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Real-time Google Search grounding active</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {(urlInput || headlineInput || articleInput) && (
                <button
                  type="button"
                  onClick={() => {
                    setUrlInput('');
                    setHeadlineInput('');
                    setArticleInput('');
                    setErrorMsg(null);
                    setInaccessibleUrlNote(null);
                  }}
                  className="px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Clear
                </button>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-sm shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying News...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 stroke-[2.5]" />
                    <span>Verify News</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Step-by-step progress indicator when loading */}
        {isLoading && (
          <div className="bg-slate-50 border-t border-slate-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Investigation Pipeline in Progress
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Step {loadingStep + 1} of {steps.length}
              </span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-3">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-700"
                style={{ width: `${((loadingStep + 1) / steps.length) * 100}%` }}
              />
            </div>
            <p className="text-sm font-medium text-slate-800 animate-pulse">
              {steps[loadingStep]}
            </p>
          </div>
        )}
      </div>

      {/* Quick Sample Selector Bar */}
      <div className="mt-6 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Quick Academic Test Cases (Click to Test)
          </span>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Demonstrates real vs fake vs unverified vs style traps
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {samples.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => handleSelectSample(s)}
              className="text-left text-xs px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/60 transition-colors flex items-center gap-1.5"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  s.expectedVerdict.includes('REAL')
                    ? 'bg-emerald-500'
                    : s.expectedVerdict.includes('FAKE')
                    ? 'bg-red-500'
                    : 'bg-amber-500'
                }`}
              />
              <span className="font-semibold text-slate-800 truncate max-w-[220px]">
                {s.title}
              </span>
              <span className="text-[10px] text-slate-400">({s.category})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Result Card Display */}
      {activeResult && (
        <div className="mt-8" id="verification-result">
          <VerificationResultCard
            result={activeResult}
            onReset={onClearResult}
          />
        </div>
      )}
    </div>
  );
};
