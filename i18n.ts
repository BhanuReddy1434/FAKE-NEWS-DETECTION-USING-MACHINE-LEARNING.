/**
 * TruthCheck AI - Internationalization & Telugu/English Language Dictionaries
 */

export type SupportedLanguage = 'en' | 'te';

export interface Translations {
  appName: string;
  tagline: string;
  projectBadge: string;
  nav: {
    home: string;
    verifier: string;
    explorer: string;
    metrics: string;
    history: string;
    about: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    trySample: string;
  };
  tabs: {
    url: string;
    headline: string;
    article: string;
    upload: string;
  };
  placeholders: {
    url: string;
    headline: string;
    article: string;
    uploadTitle: string;
    uploadSub: string;
  };
  buttons: {
    verify: string;
    verifying: string;
    clear: string;
    downloadReport: string;
    printReport: string;
    exportJson: string;
    checkAnother: string;
    viewDetails: string;
    tryExample: string;
  };
  verdicts: {
    real: string;
    fake: string;
    unverified: string;
    mixed: string;
  };
  labels: {
    why: string;
    mlSignal: string;
    webEvidence: string;
    confidence: string;
    sensationalism: string;
    attribution: string;
    claims: string;
    supporting: string;
    contradicting: string;
    sources: string;
    limitations: string;
    advice: string;
    extractedText: string;
    evidenceStrength: string;
    disclaimer: string;
  };
}

export const TRANSLATIONS: Record<SupportedLanguage, Translations> = {
  en: {
    appName: 'TruthCheck AI',
    tagline: 'Check Any News. Verify the Facts.',
    projectBadge: 'B.Tech CSE (AI & ML) Project',
    nav: {
      home: 'Home',
      verifier: 'News Verifier',
      explorer: 'Fact Explorer',
      metrics: 'Model Performance',
      history: 'History & Reports',
      about: 'About Project',
    },
    hero: {
      badge: 'Dual-Engine: Machine Learning + Live Internet Search',
      title: 'Is This News Real or Fake?',
      subtitle: 'Verify any news URL, headline, full article, or screenshot from the internet using machine learning and reliable fact-checking sources.',
      trySample: 'Try Quick Test Cases:',
    },
    tabs: {
      url: '1. News URL',
      headline: '2. Headline',
      article: '3. Full Article',
      upload: '4. Screenshot / Document',
    },
    placeholders: {
      url: 'https://example.com/article... Paste any news article link',
      headline: 'Paste any news headline or breaking claim (English or Telugu)...',
      article: 'Paste complete news article body text here to analyze...',
      uploadTitle: 'Upload News Screenshot or Document',
      uploadSub: 'Supports PNG, JPG, WebP screenshots (WhatsApp forwards, newspaper clippings) or TXT files',
    },
    buttons: {
      verify: 'Verify News',
      verifying: 'Investigating News...',
      clear: 'Clear',
      downloadReport: 'Download PDF Report',
      printReport: 'Print Dossier',
      exportJson: 'Export JSON',
      checkAnother: 'Verify Another News',
      viewDetails: 'View Full Analysis',
      tryExample: 'Load Example',
    },
    verdicts: {
      real: 'LIKELY REAL / SUPPORTED',
      fake: 'LIKELY FAKE / CONTRADICTED',
      unverified: 'UNVERIFIED / INSUFFICIENT EVIDENCE',
      mixed: 'MIXED EVIDENCE',
    },
    labels: {
      why: 'Why? Verification Summary',
      mlSignal: 'Machine Learning Model Signal',
      webEvidence: 'Live Web Evidence Assessment',
      confidence: 'Confidence Score',
      sensationalism: 'Sensationalism Score',
      attribution: 'Journalistic Attribution Score',
      claims: 'Main Factual Claims Identified',
      supporting: 'Supporting Evidence',
      contradicting: 'Contradicting Evidence & Debunks',
      sources: 'Verified Clickable Sources',
      limitations: 'System Limitations',
      advice: 'Suggestions for Further Verification',
      extractedText: 'Extracted Text from Screenshot / Document',
      evidenceStrength: 'Evidence Strength',
      disclaimer: 'Note: ML confidence score reflects linguistic pattern similarity to benchmark datasets; live evidence is used to confirm real-world truth.',
    },
  },
  te: {
    appName: 'ట్రూత్ చెక్ AI (TruthCheck AI)',
    tagline: 'ఏ వార్తనైనా తనిఖీ చేయండి. నిజాలను నిర్ధారించండి.',
    projectBadge: 'B.Tech CSE (AI & ML) ప్రాజెక్ట్',
    nav: {
      home: 'హోమ్ (Home)',
      verifier: 'న్యూస్ వెరిఫైయర్ (Verifier)',
      explorer: 'ఫ్యాక్ట్ ఎక్స్‌ప్లోరర్ (Explorer)',
      metrics: 'మోడల్ కొలమానాలు (Metrics)',
      history: 'చరిత్ర & రిపోర్టులు (History)',
      about: 'ప్రాజెక్ట్ గురించి (About)',
    },
    hero: {
      badge: 'ద్విముఖ వ్యవస్థ: మెషిన్ లెర్నింగ్ + లైవ్ ఇంటర్నెట్ సెర్చ్',
      title: 'ఈ వార్త నిజమా లేక అబద్ధమా?',
      subtitle: 'ఇంటర్నెట్‌లోని ఏ వార్త లింక్, హెడ్‌లైన్, పూర్తి వ్యాసం లేదా స్క్రీన్‌షాట్‌నైనా మెషిన్ లెర్నింగ్ మరియు విశ్వసనీయ ఆధారాలతో తనిఖీ చేయండి.',
      trySample: 'త్వరిత పరీక్ష నమూనాలు:',
    },
    tabs: {
      url: '1. వార్త URL',
      headline: '2. హెడ్‌లైన్ (Headline)',
      article: '3. పూర్తి వ్యాసం (Full Article)',
      upload: '4. స్క్రీన్‌షాట్ / పత్రం అప్‌లోడ్',
    },
    placeholders: {
      url: 'https://example.com/article... ఏదైనా వార్తా కథనం లింక్ పేస్ట్ చేయండి',
      headline: 'ఏదైనా వార్తా హెడ్‌లైన్ లేదా ప్రచారాన్ని ఇక్కడ పేస్ట్ చేయండి (తెలుగు లేదా ఇంగ్లీష్)...',
      article: 'విశ్లేషించడానికి పూర్తి వార్తా కథనం లేదా వాట్సాప్ సందేశాన్ని ఇక్కడ పేస్ట్ చేయండి...',
      uploadTitle: 'వార్తా స్క్రీన్‌షాట్ లేదా పత్రాన్ని అప్‌లోడ్ చేయండి',
      uploadSub: 'వాట్సాప్ ఫార్వర్డ్ స్క్రీన్‌షాట్‌లు, వార్తాపత్రిక కటింగ్‌లు (PNG, JPG, WebP, TXT) సపోర్ట్ చేస్తుంది',
    },
    buttons: {
      verify: 'వార్తను తనిఖీ చేయండి (Verify News)',
      verifying: 'పరిశీలిస్తోంది... (Verifying)',
      clear: 'తుడిచివేయండి (Clear)',
      downloadReport: 'రిపోర్ట్ డౌన్‌లోడ్ చేయండి (PDF)',
      printReport: 'ప్రింట్ తీసుకోండి (Print)',
      exportJson: 'JSON ఎగుమతి',
      checkAnother: 'మరొక వార్తను తనిఖీ చేయండి',
      viewDetails: 'పూర్తి వివరాలు చూడండి',
      tryExample: 'నమూనా ఎంచుకోండి',
    },
    verdicts: {
      real: 'నిజమైనదిగా నిర్ధారించబడింది (LIKELY REAL)',
      fake: 'నకిలీ / ఖండించబడింది (LIKELY FAKE)',
      unverified: 'ఆధారాలు సరిపోవు (UNVERIFIED)',
      mixed: 'మిశ్రమ ఆధారాలు (MIXED EVIDENCE)',
    },
    labels: {
      why: 'ఎందుకు? పరిశీలన సారాంశం (Why?)',
      mlSignal: 'మెషిన్ లెర్నింగ్ మోడల్ సంకేతం',
      webEvidence: 'లైవ్ ఇంటర్నెట్ ఆధారాల పరిశీలన',
      confidence: 'విశ్వసనీయత స్కోరు (Confidence Score)',
      sensationalism: 'సంచలనాత్మకత స్కోరు (Sensationalism)',
      attribution: 'జర్నలిస్టిక్ ఆధారాల స్కోరు',
      claims: 'గుర్తించిన ముఖ్యమైన వాస్తవాలు',
      supporting: 'మద్దతునిచ్చే ఆధారాలు',
      contradicting: 'ఖండించే ఆధారాలు & నిజనిర్ధారణలు',
      sources: 'క్లిక్ చేయదగిన విశ్వసనీయ లింకులు',
      limitations: 'పరిమితులు',
      advice: 'తదుపరి తనిఖీకి సూచనలు',
      extractedText: 'స్క్రీన్‌షాట్ నుండి సేకరించిన టెక్స్ట్ (Extracted Text)',
      evidenceStrength: 'ఆధారాల బలం',
      disclaimer: 'గమనిక: ML కాన్ఫిడెన్స్ స్కోరు అనేది వాస్తవానికి అబద్ధాల శైలి పోలికను మాత్రమే సూచిస్తుంది; లైవ్ ఆధారాల ద్వారా మాత్రమే నిజాలు ధృవీకరించబడతాయి.',
    },
  },
};
