import React from 'react';
import {
  ShieldCheck,
  Search,
  Sparkles,
  Cpu,
  Globe2,
  FileText,
  UploadCloud,
  CheckCircle2,
  ArrowRight,
  Download,
  Languages,
  BookOpen,
  History,
  TrendingUp,
  Layers
} from 'lucide-react';
import { SupportedLanguage, TRANSLATIONS } from '../lib/i18n';

interface HomePageProps {
  onNavigate: (page: string) => void;
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  language,
  setLanguage,
}) => {
  const t = TRANSLATIONS[language];

  const checklistItems = [
    {
      titleEn: 'News URL Checker',
      titleTe: 'న్యూస్ URL చెకర్',
      descEn: 'Safely fetches web articles with SSRF defense, extracting headline, date, author, and article body.',
      descTe: 'URL పేస్ట్ చేస్తే వ్యాసాన్ని సురక్షితంగా ఫెచ్ చేసి హెడ్‌లైన్, తేదీ, రచయిత సమాచారం సేకరిస్తుంది.',
      tab: 'verifier',
      icon: Globe2,
    },
    {
      titleEn: 'Headline Checker',
      titleTe: 'హెడ్‌లైన్ చెకర్',
      descEn: 'Investigate breaking news claims, viral tweets, and emerging headlines across the web.',
      descTe: 'బ్రేకింగ్ న్యూస్, వైరల్ ప్రచారాలు మరియు హెడ్‌లైన్లను తక్షణమే విశ్లేషిస్తుంది.',
      tab: 'verifier',
      icon: Search,
    },
    {
      titleEn: 'Full News Text Checker',
      titleTe: 'పూర్తి వ్యాసం చెకర్',
      descEn: 'Paste complete long-form news reports or forwarded WhatsApp messages for in-depth NLP analysis.',
      descTe: 'పూర్తి వార్తా కథనం లేదా వాట్సాప్ సందేశాన్ని పేస్ట్ చేసి లోతైన NLP విశ్లేషణ చేయవచ్చు.',
      tab: 'verifier',
      icon: FileText,
    },
    {
      titleEn: 'Screenshot & Document Upload',
      titleTe: 'చిత్రం / డాక్యుమెంట్ అప్‌లోడ్',
      descEn: 'Upload screenshots of news clippings, WhatsApp forwards, or TXT documents for instant OCR & verification.',
      descTe: 'వార్తా స్క్రీన్‌షాట్‌లు లేదా డాక్యుమెంట్లను అప్‌లోడ్ చేసి OCR ద్వారా టెక్స్ట్ సేకరించి విశ్లేషిస్తుంది.',
      tab: 'verifier',
      icon: UploadCloud,
    },
    {
      titleEn: 'Live Internet Search Grounding',
      titleTe: 'లైవ్ ఇంటర్నెట్ సెర్చ్',
      descEn: 'Cross-references claims with live Google Search & wire agencies (Reuters, AP, BBC) for breaking news.',
      descTe: 'ఇంటర్నెట్‌లో లైవ్ సెర్చ్ చేసి వాస్తవ నివేదికలతో సరిపోల్చుతుంది.',
      tab: 'explorer',
      icon: Sparkles,
    },
    {
      titleEn: 'Telugu + English Bilingual Support',
      titleTe: 'తెలుగు + ఇంగ్లీష్ మద్దతు',
      descEn: 'Full bilingual interface, Telugu script tokenizer, and Telugu viral hoax detection dictionary.',
      descTe: 'తెలుగు మరియు ఇంగ్లీష్ భాషలలో వార్తలను తనిఖీ చేయడానికి పూర్తి మద్దతు.',
      tab: 'verifier',
      icon: Languages,
    },
    {
      titleEn: 'AI & Machine Learning Classifier',
      titleTe: 'AI / మెషిన్ లెర్నింగ్ మోడల్',
      descEn: 'TF-IDF n-grams (1,2) with stylometric scoring (sensationalism index, uppercase screaming ratio).',
      descTe: 'శిక్షణ పొందిన మోడల్ ద్వారా భాషా శైలి, సంచలనాత్మకతను లెక్కించి వర్గీకరిస్తుంది.',
      tab: 'metrics',
      icon: Cpu,
    },
    {
      titleEn: 'Source & Domain Credibility',
      titleTe: 'మూలాల విశ్వసనీయత పరిశీలన',
      descEn: 'Examines publisher reputation (Tier 1 Wires, Official Gov/Edu, Satire, Tabloid domains).',
      descTe: 'ప్రచురణకర్త డొమైన్, అధికారికత మరియు నివేదికల వాస్తవికతను పరీక్షిస్తుంది.',
      tab: 'explorer',
      icon: ShieldCheck,
    },
    {
      titleEn: 'Supporting & Contradicting Evidence',
      titleTe: 'ఆధారాలు & రిఫరెన్సులు',
      descEn: 'Displays real clickable links to wire reports and official fact-checking registries (Snopes, PIB).',
      descTe: 'నిజనిర్ధారణ లింకులు మరియు మద్దతు లేదా వ్యతిరేక ఆధారాలను స్పష్టంగా చూపిస్తుంది.',
      tab: 'explorer',
      icon: Layers,
    },
    {
      titleEn: 'Plain-English / Telugu Explanation',
      titleTe: 'స్పష్టమైన కారణ వివరణ',
      descEn: 'Explains exactly why a news item appears real, fake, or unverified in simple language.',
      descTe: 'వార్త ఎందుకు నకిలీ లేదా నిజమో సరళమైన భాషలో కారణాలను వివరిస్తుంది.',
      tab: 'verifier',
      icon: BookOpen,
    },
    {
      titleEn: 'Calibrated Confidence Score',
      titleTe: 'కాన్ఫిడెన్స్ స్కోరు',
      descEn: 'Displays model confidence percentage with transparent disclaimer on factual accuracy vs style.',
      descTe: 'మోడల్ కాన్ఫిడెన్స్ శాతాన్ని మరియు స్పష్టమైన నిరాకరణ (Disclaimer)ను అందిస్తుంది.',
      tab: 'metrics',
      icon: TrendingUp,
    },
    {
      titleEn: 'History & Downloadable PDF Report',
      titleTe: 'చరిత్ర & రిపోర్ట్ డౌన్‌లోడ్',
      descEn: 'Saves past investigations locally with 1-click Download Dossier (PDF/Print/JSON) options.',
      descTe: 'మునుపటి పరిశీలనల చరిత్రను భద్రపరుస్తుంది మరియు అధికారిక రిపోర్ట్‌ను డౌన్‌లోడ్ చేసుకునే అవకాశం.',
      tab: 'history',
      icon: Download,
    },
  ];

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-4 shadow-xs">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>{t.hero.badge}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
          {language === 'te' ? (
            <>ఈ వార్త <span className="text-emerald-600">నిజమా</span> లేక <span className="text-red-600">అబద్ధమా?</span></>
          ) : (
            <>Is This News <span className="text-emerald-600">Real</span> or <span className="text-red-600">Fake?</span></>
          )}
        </h1>

        <p className="mt-4 text-base sm:text-xl text-slate-600 leading-relaxed font-normal">
          {t.hero.subtitle}
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={() => onNavigate('verifier')}
            className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-extrabold text-sm sm:text-base shadow-lg shadow-blue-600/25 flex items-center gap-2.5 transition-all cursor-pointer"
          >
            <Search className="w-5 h-5 stroke-[2.5]" />
            <span>{language === 'te' ? 'వార్తను తనిఖీ చేయండి' : 'Open News Verifier'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigate('explorer')}
            className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-sm sm:text-base shadow-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <Globe2 className="w-4 h-4 text-blue-600" />
            <span>{language === 'te' ? 'ఫ్యాక్ట్ చెక్ ఎక్స్‌ప్లోరర్' : 'Fact-Check Explorer'}</span>
          </button>

          <button
            onClick={() => onNavigate('history')}
            className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-sm sm:text-base shadow-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <History className="w-4 h-4 text-slate-600" />
            <span>{language === 'te' ? 'రిపోర్టులు & హిస్టరీ' : 'Reports & History'}</span>
          </button>
        </div>
      </div>

      {/* 12/12 Website Feature Checklist Grid */}
      <div className="mb-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-extrabold text-xs">
                12 / 12 Features Implemented
              </span>
              <span className="text-xs font-semibold text-slate-500">
                B.Tech CSE Project Scope
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              {language === 'te' ? 'ప్రాజెక్ట్ ఫీచర్స్ జాబితా (Feature Checklist)' : 'Complete Feature Architecture'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 sm:mt-0 max-w-md">
            {language === 'te'
              ? 'ఈ ప్రాజెక్ట్‌లో 12 ప్రధాన ఫీచర్లు సమగ్రంగా అమలు చేయబడ్డాయి.'
              : 'Every core requirement is fully operational with multi-page navigation and bilingual support.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {checklistItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                onClick={() => onNavigate(item.tab)}
                className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Active
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {language === 'te' ? item.titleTe : item.titleEn}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-600 leading-relaxed font-normal">
                    {language === 'te' ? item.descTe : item.descEn}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
                  <span>{language === 'te' ? 'పేజీకి వెళ్ళండి' : 'Open Feature'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Architecture Callout */}
      <div className="p-8 rounded-3xl bg-linear-to-br from-slate-900 via-blue-950 to-slate-900 text-white shadow-xl">
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 block mb-2">
            Why TruthCheck AI is Unique
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
            Not Confined to Old Datasets — Live Internet Verification
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
            Traditional machine learning projects check news only against fixed training records. TruthCheck AI solves the zero-day news challenge by coupling TF-IDF stylometric classifiers with live Google Search grounding and Wikipedia encyclopedia verification.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate('verifier')}
              className="px-6 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              Verify News Now
            </button>
            <button
              onClick={() => onNavigate('metrics')}
              className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all cursor-pointer border border-white/20"
            >
              Inspect Model Metrics (93.6% Accuracy)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
