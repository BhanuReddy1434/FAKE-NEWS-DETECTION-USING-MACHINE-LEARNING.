import React, { useState } from 'react';
import {
  Globe2,
  Search,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  Filter,
  Sparkles,
  Layers
} from 'lucide-react';
import { SupportedLanguage, TRANSLATIONS } from '../lib/i18n';

interface ExplorerPageProps {
  onSelectClaim: (headline: string) => void;
  language: SupportedLanguage;
}

interface FactCheckRecord {
  id: string;
  claim: string;
  claimTe?: string;
  verdict: 'FAKE' | 'REAL' | 'MIXED';
  factChecker: string;
  category: 'Health' | 'Tech' | 'Politics' | 'Science' | 'Social Media';
  explanationEn: string;
  explanationTe: string;
  sourceUrl: string;
  date: string;
}

export const ExplorerPage: React.FC<ExplorerPageProps> = ({
  onSelectClaim,
  language,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const factRecords: FactCheckRecord[] = [
    {
      id: 'fc-1',
      claim: 'Boiled lemon peel water cures stage 4 cancer in 48 hours without chemotherapy',
      claimTe: 'నిమ్మకాయ రసం తాగితే 48 గంటల్లో క్యాన్సర్ పూర్తిగా నయమవుతుంది',
      verdict: 'FAKE',
      factChecker: 'Snopes & American Cancer Society',
      category: 'Health',
      explanationEn: 'Thoroughly disproven medical hoax. Clinical trials show citrus has antioxidants but cannot cure malignant tumors or replace oncology therapy.',
      explanationTe: 'వైద్య నిపుణులు మరియు క్యాన్సర్ సంస్థలచే ఖండించబడిన నకిలీ వార్త. నిమ్మరసం క్యాన్సర్‌ను నయం చేయదు.',
      sourceUrl: 'https://www.snopes.com/fact-check/lemon-cancer-cure/',
      date: 'Archived Fact Check'
    },
    {
      id: 'fc-2',
      claim: 'James Webb Space Telescope captures high-resolution infrared images of 13-billion-year-old galaxies',
      claimTe: 'జేమ్స్ వెబ్ టెలిస్కోప్ ద్వారా 13 బిలియన్ సంవత్సరాల పురాతన గెలాక్సీల ఛాయాచిత్రాలు',
      verdict: 'REAL',
      factChecker: 'NASA & Nature Journal',
      category: 'Science',
      explanationEn: 'Peer-reviewed astrophysical imaging confirmed by NASA, ESA, and international astronomical teams in Nature journal.',
      explanationTe: 'నాసా మరియు నేచర్ జర్నల్ ద్వారా ధృవీకరించబడిన వాస్తవ సైన్స్ పరిశోధన.',
      sourceUrl: 'https://www.nasa.gov/mission_pages/webb/main/index.html',
      date: 'Recent Peer-Reviewed'
    },
    {
      id: 'fc-3',
      claim: 'Government announces complete cancellation of 500 rupee banknotes by next Monday',
      claimTe: 'రూ. 500 నోట్లను ప్రభుత్వం మళ్లీ రద్దు చేయనుందనే ప్రచారం',
      verdict: 'FAKE',
      factChecker: 'PIB Fact Check India & RBI',
      category: 'Politics',
      explanationEn: 'PIB Fact Check confirmed no such proposal exists. The Reserve Bank of India has issued no demonetization notifications for Rs 500 notes.',
      explanationTe: 'ప్రెస్ ఇన్ఫర్మేషన్ బ్యూరో (PIB) మరియు రిజర్వ్ బ్యాంక్ ఈ వార్తను పూర్తిగా ఖండించాయి.',
      sourceUrl: 'https://factcheck.pib.gov.in/',
      date: 'Verified Gazette Audit'
    },
    {
      id: 'fc-4',
      claim: 'WHO and CDC release updated seasonal influenza & respiratory syncytial virus vaccination guidance',
      claimTe: 'ఫ్లూ మరియు శ్వాసకోశ వ్యాక్సిన్లపై WHO నూతన మార్గదర్శకాలు',
      verdict: 'REAL',
      factChecker: 'World Health Organization',
      category: 'Health',
      explanationEn: 'Published in official WHO epidemiological bulletin following global surveillance review.',
      explanationTe: 'ప్రపంచ ఆరోగ్య సంస్థ అధికారికంగా విడుదల చేసిన పబ్లిక్ హెల్త్ గైడ్‌లైన్స్.',
      sourceUrl: 'https://www.who.int/',
      date: 'Official Release'
    },
    {
      id: 'fc-5',
      claim: 'Cell phone towers emit high-frequency hypnotic waves to control citizen voting behavior',
      claimTe: 'మొబైల్ టవర్ల ద్వారా ప్రజల మెదడును నియంత్రించే తరంగాలు వస్తున్నాయనే పుకారు',
      verdict: 'FAKE',
      factChecker: 'Reuters Fact Check',
      category: 'Tech',
      explanationEn: 'Telecommunications engineers confirm cellular radio frequencies (0.7-3.8 GHz) are non-ionizing and have zero neural modulation capabilities.',
      explanationTe: 'టెలికాం ఇంజనీర్లు మరియు సైంటిస్టులు ఖండించిన నకిలీ సాంకేతిక ప్రచారం.',
      sourceUrl: 'https://www.reuters.com/fact-check/',
      date: 'Debunked'
    },
    {
      id: 'fc-6',
      claim: 'ISRO successfully launches indigenous oceanographic satellite from Sriharikota spaceport',
      claimTe: 'ఇస్రో శ్రీహరికోట నుంచి సరికొత్త సమాచార ఉపగ్రహ ప్రయోగం విజయవంతం',
      verdict: 'REAL',
      factChecker: 'ISRO Official Press Release',
      category: 'Science',
      explanationEn: 'Confirmed by Indian Space Research Organisation with official telecast and orbital insertion data.',
      explanationTe: 'ఇస్రో అధికారిక పత్రికా ప్రకటన మరియు లైవ్ టెలికాస్ట్ ద్వారా ధృవీకరించబడిన ప్రయోగం.',
      sourceUrl: 'https://www.isro.gov.in/',
      date: 'Official Statement'
    }
  ];

  const filtered = factRecords.filter((rec) => {
    const matchesCategory = selectedCategory === 'All' || rec.category === selectedCategory;
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      rec.claim.toLowerCase().includes(query) ||
      (rec.claimTe && rec.claimTe.includes(query)) ||
      rec.factChecker.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-8 sm:py-12 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-3">
          <Globe2 className="w-3.5 h-3.5" />
          <span>Real-World Fact-Check Database & Archive</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {language === 'te' ? 'ఫ్యాక్ట్ చెక్ ఎక్స్‌ప్లోరర్' : 'Fact-Check Explorer & Verified Claims'}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600">
          {language === 'te'
            ? 'ప్రపంచవ్యాప్తంగా మరియు ప్రాంతీయంగా నిపుణులచే పరిశీలించబడిన నిజాలు మరియు అబద్ధాల సమాహారం.'
            : 'Explore real-world claims investigated by certified fact-checkers, wire agencies, and institutional registries.'}
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="mb-8 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={language === 'te' ? 'వార్త లేదా క్లెయిమ్ వెతకండి...' : 'Search claims, topics, or fact-checkers...'}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {['All', 'Health', 'Science', 'Politics', 'Tech'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Claims Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${
                    item.verdict === 'REAL'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {item.verdict === 'REAL' ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 text-red-600" />
                  )}
                  <span>{item.verdict === 'REAL' ? 'VERIFIED REAL' : 'CONFIRMED FAKE'}</span>
                </span>

                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {item.category}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 leading-snug mb-1">
                {language === 'te' && item.claimTe ? item.claimTe : item.claim}
              </h3>

              {language === 'te' && item.claimTe && (
                <p className="text-xs text-slate-400 italic mb-2">
                  En: {item.claim}
                </p>
              )}

              <p className="text-xs text-slate-600 leading-relaxed font-normal mt-2">
                {language === 'te' ? item.explanationTe : item.explanationEn}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="text-[11px] text-slate-500">
                <span>By: </span>
                <span className="font-bold text-slate-700">{item.factChecker}</span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-50 transition-colors"
                  title="View original fact-check"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  onClick={() => onSelectClaim(language === 'te' && item.claimTe ? item.claimTe : item.claim)}
                  className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Verify in Studio</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
