import React from 'react';
import {
  ShieldCheck,
  Search,
  Cpu,
  Layers,
  ArrowRight,
  Globe2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  BookOpen
} from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Input Ingestion & Validation',
      desc: 'Users submit a news URL, single headline, or pasted article body. URLs are sanitized with SSRF protections, preventing intranet access and timeout hangs.',
      tag: 'Security & Ingestion'
    },
    {
      num: '02',
      title: 'Safe Parsing & Metadata Extraction',
      desc: 'HTML is cleaned of scripts and tracking tags. The engine extracts the headline, publisher domain, byline, publication timestamp, and article text.',
      tag: 'Text Extraction'
    },
    {
      num: '03',
      title: 'Factual Claim Identification',
      desc: 'The system isolates core factual claims (events, people, statistics, dates) from surrounding commentary, rhetoric, or subjective opinions.',
      tag: 'NLP & Information Extraction'
    },
    {
      num: '04',
      title: 'Live Internet Search Grounding',
      desc: 'Formulates multi-phrase search queries targeting primary sources, official portals, wire agencies (Reuters, AP), and fact-checking registries (Snopes, PolitiFact).',
      tag: 'Real-Time Web Search'
    },
    {
      num: '05',
      title: 'Source Credibility & Stance Analysis',
      desc: 'Discovered web pages are classified into credibility tiers (Tier 1: Wire/Gov/Academic, Tier 2: Major Media, Tier 3: Blogs/Social) and cross-referenced for stance.',
      tag: 'Evidence Evaluation'
    },
    {
      num: '06',
      title: 'Machine Learning TF-IDF Classification',
      desc: 'The text is vectorized using TF-IDF n-grams (1,2) and evaluated for stylometric cues: sensationalism score, uppercase screaming ratio, and attribution markers.',
      tag: 'Machine Learning'
    },
    {
      num: '07',
      title: 'Divergence Detection',
      desc: 'Compares the ML stylistic prediction against empirical web evidence. Detects "style traps" (fake news written in polite journalistic style) and urgent breaking news.',
      tag: 'Synthesis Logic'
    },
    {
      num: '08',
      title: 'Transparent Verdict & Clickable Citations',
      desc: 'Outputs one of 4 transparent verdicts with plain-English explanation, clickable real links, and explicit limitations.',
      tag: 'Explainable AI (XAI)'
    }
  ];

  return (
    <div className="py-10 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Title */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>System Architecture & Verification Methodology</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          How TruthCheck AI Works
        </h1>
        <p className="mt-3 text-base text-slate-600 max-w-2xl mx-auto">
          Combining Machine Learning pattern recognition with live internet search grounding to verify unfamiliar and breaking news without dataset limitations.
        </p>
      </div>

      {/* The Core Problem & Solution Highlight */}
      <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-600" />
          The Fundamental Flaw in Pure ML Classifiers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 leading-relaxed">
          <div className="p-4 rounded-xl bg-red-50/50 border border-red-200">
            <h3 className="font-bold text-red-900 mb-2 flex items-center gap-1.5">
              <XCircle className="w-4 h-4 text-red-600" />
              The "Zero-Day News" & "Temporal Shift" Problem
            </h3>
            <p>
              Standard ML models (TF-IDF + SVM/Logistic Regression) only evaluate whether text style resembles old training datasets. A fabricated rumor about a breaking event written in formal Reuters style will fool a purely static ML model. Conversely, urgent genuine disaster warnings can be misclassified as fake due to high exclamations.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200">
            <h3 className="font-bold text-emerald-900 mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              TruthCheck AI's Dual-Layer Architecture
            </h3>
            <p>
              TruthCheck AI treats the ML model as a <em>linguistic stylometry indicator</em>, while giving primary authority on real-world factual claims to <em>real-time internet search grounding</em>. If credible wire agencies or official records contradict a claim, it is flagged as fake regardless of its polished prose.
            </p>
          </div>
        </div>
      </div>

      {/* 8-Step Verification Pipeline */}
      <div className="mb-14">
        <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">
          The 8-Step Verification Pipeline
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {steps.map((st) => (
            <div
              key={st.num}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl font-black text-blue-600">{st.num}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  {st.tag}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">{st.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">{st.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* The 4 Verdict Categories Guide */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          The 4 Transparent Verdict Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40">
            <div className="flex items-center gap-2 mb-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-bold text-emerald-950">
                LIKELY REAL / SUPPORTED
              </span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Assigned when multiple independent, credible sources (Tier 1/2) confirm the central factual claims, timeline, and participants.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-red-200 bg-red-50/40">
            <div className="flex items-center gap-2 mb-1.5">
              <XCircle className="w-4 h-4 text-red-600" />
              <span className="text-sm font-bold text-red-950">
                LIKELY FAKE / CONTRADICTED
              </span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Assigned when reliable fact-checkers, official records, or authoritative reporting directly disprove, debunk, or refute the claim.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40">
            <div className="flex items-center gap-2 mb-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-bold text-amber-950">
                UNVERIFIED / INSUFFICIENT EVIDENCE
              </span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Assigned when an event is too recent, obscure, or lacks independent corroboration. The system avoids forcing a binary true/false answer.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/40">
            <div className="flex items-center gap-2 mb-1.5">
              <Layers className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-bold text-purple-950">
                MIXED EVIDENCE
              </span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Assigned when an article weaves legitimate factual data with out-of-context framing, exaggerated conclusions, or misleading visuals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
