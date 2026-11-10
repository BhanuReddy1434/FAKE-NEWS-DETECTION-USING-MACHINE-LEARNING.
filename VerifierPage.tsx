import React, { useState, useRef } from 'react';
import {
  Link as LinkIcon,
  Type,
  FileText,
  UploadCloud,
  Search,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Loader2,
  ArrowRight,
  RotateCcw,
  Image as ImageIcon,
  FileCode,
  Languages
} from 'lucide-react';
import { InputMode, SampleNewsItem, VerificationResult } from '../lib/types';
import { SupportedLanguage, TRANSLATIONS } from '../lib/i18n';
import { VerificationResultCard } from '../components/VerificationResultCard';

interface VerifierPageProps {
  samples: SampleNewsItem[];
  activeResult: VerificationResult | null;
  onVerifyComplete: (result: VerificationResult) => void;
  onClearResult: () => void;
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  pendingClaim?: string | null;
  onClearPendingClaim?: () => void;
}

export const VerifierPage: React.FC<VerifierPageProps> = ({
  samples,
  activeResult,
  onVerifyComplete,
  onClearResult,
  language,
  setLanguage,
  pendingClaim,
  onClearPendingClaim,
}) => {
  const t = TRANSLATIONS[language];
  const [mode, setMode] = useState<InputMode>('headline');
  const [urlInput, setUrlInput] = useState('');
  const [headlineInput, setHeadlineInput] = useState('');
  const [articleInput, setArticleInput] = useState('');

  // Handle incoming claim from Explorer or presets
  React.useEffect(() => {
    if (pendingClaim) {
      setMode('headline');
      setHeadlineInput(pendingClaim);
      setErrorMsg(null);
      setInaccessibleUrlNote(null);
      onClearPendingClaim?.();
    }
  }, [pendingClaim, onClearPendingClaim]);

  // Image / Document Upload States
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [inaccessibleUrlNote, setInaccessibleUrlNote] = useState<string | null>(null);

  const steps = [
    language === 'te' ? 'ఇన్‌పుట్‌ను ధృవీకరించి ముఖ్య వాస్తవాలను గుర్తిస్తోంది...' : 'Validating input & identifying factual predicates...',
    language === 'te' ? 'లైవ్ ఇంటర్నెట్ సెర్చ్ & నిజనిర్ధారణ కేంద్రాలను పరిశీలిస్తోంది...' : 'Connecting to live search grounding & fact-check registries...',
    language === 'te' ? 'మెషిన్ లెర్నింగ్ TF-IDF & సంచలనాత్మకతను విశ్లేషిస్తోంది...' : 'Running TF-IDF feature extraction & ML classifier...',
    language === 'te' ? 'స్వతంత్ర వార్తా సంస్థల ఆధారాలతో సరిపోలుస్తోంది...' : 'Cross-referencing independent wire reports & dates...',
    language === 'te' ? 'స్పష్టమైన నివేదిక మరియు ఫలితాన్ని రూపొందిస్తోంది...' : 'Synthesizing evidence report & transparent verdict...'
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(null);
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else if (file.type.includes('text') || file.name.endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result as string;
        setArticleInput(text);
        setMode('article');
      };
      reader.readAsText(file);
    } else {
      setErrorMsg('Please upload a supported image (PNG, JPG, WebP) or text file.');
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setInaccessibleUrlNote(null);

    // If in upload mode with an image
    if (mode === 'upload') {
      if (!uploadedImagePreview) {
        setErrorMsg('Please select or upload a screenshot/image first.');
        return;
      }

      setIsLoading(true);
      setLoadingStep(0);
      const stepInterval = setInterval(() => {
        setLoadingStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
      }, 1200);

      try {
        const mimeType = uploadedImagePreview.split(';')[0]?.replace('data:', '') || 'image/png';
        const response = await fetch('/api/verify-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageBase64: uploadedImagePreview,
            mimeType,
            language,
          }),
        });

        clearInterval(stepInterval);
        const data = await response.json();

        if (!response.ok) {
          setErrorMsg(data.error || 'Failed to analyze image. Please try again.');
          setIsLoading(false);
          return;
        }

        onVerifyComplete(data as VerificationResult);
      } catch (err: unknown) {
        clearInterval(stepInterval);
        const msg = err instanceof Error ? err.message : String(err);
        setErrorMsg(`Analysis error: ${msg}.`);
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // URL, Headline, or Article mode
    let contentToVerify = '';
    if (mode === 'url') contentToVerify = urlInput.trim();
    else if (mode === 'headline') contentToVerify = headlineInput.trim();
    else contentToVerify = articleInput.trim();

    if (!contentToVerify) {
      setErrorMsg(language === 'te' ? 'దయచేసి తనిఖీ చేయడానికి సమాచారాన్ని నమోదు చేయండి.' : `Please enter news ${mode} to verify.`);
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
          language,
        }),
      });

      clearInterval(stepInterval);
      const data = await response.json();

      if (!response.ok) {
        if (data.inaccessibleUrl) {
          setInaccessibleUrlNote(data.error + ' ' + (data.suggestion || ''));
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
      setErrorMsg(`Network or server error: ${msg}. Please ensure server is running.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-8 sm:py-12 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Page Header */}
      <div className="text-center mb-8 sm:mb-10">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.hero.badge}</span>
          </div>

          {/* Bilingual Switcher Pill */}
          <div className="inline-flex items-center p-0.5 rounded-full bg-slate-200/80 text-xs font-bold">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-0.5 rounded-full transition-all ${
                language === 'en' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('te')}
              className={`px-2.5 py-0.5 rounded-full transition-all ${
                language === 'te' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              తెలుగు
            </button>
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          {t.hero.title}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
          {t.hero.subtitle}
        </p>
      </div>

      {/* Main Input Form Card */}
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
        {/* 4 Tabs */}
        <div className="flex flex-wrap border-b border-slate-200 bg-slate-50/80 p-1.5 gap-1.5">
          <button
            type="button"
            onClick={() => {
              setMode('url');
              setErrorMsg(null);
            }}
            className={`flex-1 min-w-[120px] py-3 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              mode === 'url'
                ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            <LinkIcon className="w-4 h-4" />
            <span>{t.tabs.url}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMode('headline');
              setErrorMsg(null);
            }}
            className={`flex-1 min-w-[120px] py-3 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              mode === 'headline'
                ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            <Type className="w-4 h-4" />
            <span>{t.tabs.headline}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMode('article');
              setErrorMsg(null);
            }}
            className={`flex-1 min-w-[120px] py-3 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              mode === 'article'
                ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{t.tabs.article}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMode('upload');
              setErrorMsg(null);
            }}
            className={`flex-1 min-w-[120px] py-3 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              mode === 'upload'
                ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            <UploadCloud className="w-4 h-4 text-purple-600" />
            <span className="flex items-center gap-1">
              {t.tabs.upload}
              <span className="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.2 rounded font-extrabold">NEW</span>
            </span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleVerify} className="p-5 sm:p-7">
          {mode === 'url' && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                {language === 'te' ? 'వార్తా వెబ్‌సైట్ లింక్ (URL)' : 'Paste Article Web Address (HTTP/HTTPS)'}
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder={t.placeholders.url}
                  className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base text-slate-900 placeholder:text-slate-400"
                  disabled={isLoading}
                />
                <LinkIcon className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
              <p className="mt-2 text-xs text-slate-500 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                {language === 'te'
                  ? 'SSRF రక్షణ కలదు. సిస్టమ్ వెబ్‌సైట్‌ను సురక్షితంగా పరిశీలించి డేటాను సేకరిస్తుంది.'
                  : 'Protected against SSRF. Extracts headline, publisher, author, date, and body text safely.'}
              </p>
            </div>
          )}

          {mode === 'headline' && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  {language === 'te' ? 'వార్తా హెడ్‌లైన్ లేదా క్లెయిమ్ నమోదు చేయండి' : 'Paste News Headline or Breaking Claim'}
                </label>
                <span className="text-xs text-slate-400">
                  {headlineInput.length} / 500
                </span>
              </div>
              <textarea
                rows={3}
                value={headlineInput}
                onChange={(e) => setHeadlineInput(e.target.value.slice(0, 500))}
                placeholder={t.placeholders.headline}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 resize-none"
                disabled={isLoading}
              />
              <p className="mt-2 text-xs text-slate-500">
                {language === 'te'
                  ? 'తెలుగు లేదా ఇంగ్లీష్ భాషలలోని బ్రేకింగ్ న్యూస్, ఇటీవల ప్రచురితమైన లేదా చారిత్రక వార్తలపై పనిచేస్తుంది.'
                  : 'Works for breaking news, recently published claims, and historical news in English and Telugu.'}
              </p>
            </div>
          )}

          {mode === 'article' && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  {language === 'te' ? 'పూర్తి వార్తా వ్యాసం లేదా వాట్సాప్ సందేశం' : 'Paste Complete News Article Text'}
                </label>
                <span className="text-xs text-slate-400">
                  {articleInput.split(/\s+/).filter(Boolean).length} words
                </span>
              </div>
              <textarea
                rows={7}
                value={articleInput}
                onChange={(e) => setArticleInput(e.target.value)}
                placeholder={t.placeholders.article}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm text-slate-900 placeholder:text-slate-400"
                disabled={isLoading}
              />
            </div>
          )}

          {mode === 'upload' && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                {t.placeholders.uploadTitle}
              </label>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/png,image/jpeg,image/webp,text/plain"
                className="hidden"
              />

              {!uploadedImagePreview ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-8 text-center cursor-pointer bg-slate-50/50 hover:bg-blue-50/20 transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-3">
                    <UploadCloud className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <p className="text-sm font-bold text-slate-900">
                    {language === 'te' ? 'చిత్రం లేదా డాక్యుమెంట్ ఎంచుకోండి' : 'Click to Upload or Drag & Drop'}
                  </p>
                  <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
                    {t.placeholders.uploadSub}
                  </p>
                </div>
              ) : (
                <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                      <ImageIcon className="w-4 h-4 text-blue-600" />
                      <span>{uploadedFileName || 'Uploaded Image'}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setUploadedImagePreview(null);
                        setUploadedFileName(null);
                      }}
                      className="text-xs text-red-600 hover:underline font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="max-h-64 overflow-hidden rounded-xl border border-slate-200 bg-white flex justify-center">
                    <img
                      src={uploadedImagePreview}
                      alt="Uploaded news preview"
                      className="max-h-64 object-contain"
                    />
                  </div>
                  <p className="mt-2 text-xs text-slate-500 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    OCR text transcription & factual verification will automatically execute when you click Verify News.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Error Message */}
          {errorMsg && (
            <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Unable to process request</p>
                <p className="mt-0.5 text-red-700">{errorMsg}</p>
              </div>
            </div>
          )}

          {/* Inaccessible URL Note */}
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
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <div className="text-xs text-slate-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Multi-Source Verification Engine Active</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {(urlInput || headlineInput || articleInput || uploadedImagePreview) && (
                <button
                  type="button"
                  onClick={() => {
                    setUrlInput('');
                    setHeadlineInput('');
                    setArticleInput('');
                    setUploadedImagePreview(null);
                    setUploadedFileName(null);
                    setErrorMsg(null);
                    setInaccessibleUrlNote(null);
                  }}
                  className="px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  {t.buttons.clear}
                </button>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-extrabold text-sm shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{t.buttons.verifying}</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 stroke-[2.5]" />
                    <span>{t.buttons.verify}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Step-by-step progress indicator */}
        {isLoading && (
          <div className="bg-slate-50 border-t border-slate-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Pipeline Execution in Progress
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

      {/* Quick Academic Test Cases Bar */}
      <div className="mt-6 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            {t.hero.trySample}
          </span>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Includes English & Telugu verified cases
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {samples.map((s) => {
            const isReal = s.expectedVerdict.includes('REAL');
            const isFake = s.expectedVerdict.includes('FAKE');
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => handleSelectSample(s)}
                className="text-left text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/60 transition-colors flex items-center gap-2 cursor-pointer bg-slate-50/50"
              >
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider ${
                    isReal
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : isFake
                      ? 'bg-red-100 text-red-800 border border-red-300'
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}
                >
                  {isReal ? 'Real' : isFake ? 'Fake' : 'Check'}
                </span>
                <span className="font-semibold text-slate-800 truncate max-w-[240px]">
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Verification Result Card */}
      {activeResult && (
        <div className="mt-8" id="verification-result">
          <VerificationResultCard
            result={activeResult}
            onReset={onClearResult}
            language={language}
          />
        </div>
      )}
    </div>
  );
};
