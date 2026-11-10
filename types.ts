/**
 * TruthCheck AI - System Type Definitions
 */

export type InputMode = 'url' | 'headline' | 'article' | 'upload';

export type VerdictCategory =
  | 'LIKELY REAL / SUPPORTED'
  | 'LIKELY FAKE / CONTRADICTED'
  | 'UNVERIFIED / INSUFFICIENT EVIDENCE'
  | 'MIXED EVIDENCE';

export interface MLPredictionResult {
  predictedLabel: 'Likely Real' | 'Likely Fake' | 'Uncertain / Borderline';
  confidenceScore: number; // 0 to 100
  fakeProbability: number; // 0 to 1
  realProbability: number; // 0 to 1
  stylometricSignals: {
    sensationalismScore: number; // 0 to 100
    uppercaseRatio: number; // 0 to 1
    exclamationDensity: number;
    journalisticAttributionScore: number; // 0 to 100
    hedgingDensity: number;
    linguisticRedFlags: string[];
    journalisticMarkers: string[];
    isAuthoritySpoofing?: boolean;
  };
  topFeatures: {
    term: string;
    weight: number;
    indication: 'Real' | 'Fake';
  }[];
}

export interface GroundedSource {
  title: string;
  url: string;
  publisher?: string;
  publishDate?: string;
  snippet?: string;
  stance?: 'supports' | 'contradicts' | 'neutral' | 'mentions';
  credibilityTier?: 'Tier 1 (Wire/Official)' | 'Tier 2 (Major Media)' | 'Tier 3 (Web/Blog)';
}

export interface OnlineEvidenceResult {
  status: 'SUPPORTED' | 'CONTRADICTED' | 'UNVERIFIED_INSUFFICIENT' | 'MIXED';
  summary: string;
  searchQueriesUsed: string[];
  mainClaimsIdentified: string[];
  supportingEvidence: {
    claim: string;
    explanation: string;
    sources: GroundedSource[];
  }[];
  contradictingEvidence: {
    claim: string;
    explanation: string;
    sources: GroundedSource[];
  }[];
  allSources: GroundedSource[];
  consensusSummary: string;
  evidenceStrength: 'Strong' | 'Moderate' | 'Weak' | 'None';
  searchServiceActive: boolean;
}

export interface VerificationResult {
  id: string;
  timestamp: string;
  inputMode: InputMode;
  originalInput: string;
  extractedMetadata?: {
    headline?: string;
    publisher?: string;
    publishDate?: string;
    author?: string;
    canonicalUrl?: string;
    wordCount?: number;
  };
  finalVerdict: VerdictCategory;
  verdictExplanation: string;
  mlResult: MLPredictionResult;
  evidenceResult: OnlineEvidenceResult;
  divergenceNotes?: string;
  language?: 'en' | 'te';
  uploadedImagePreview?: string;
  ocrExtractedText?: string;
  limitations: string[];
  recommendedActions: string[];
}

export interface MLModelMetrics {
  bestModelName: string;
  datasetName: string;
  totalTrainedSamples: number;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  rocAuc: number;
  confusionMatrix: {
    truePositives: number;
    trueNegatives: number;
    falsePositives: number;
    falseNegatives: number;
  };
  topPredictiveFeatures: {
    fakeIndicators: { term: string; weight: number }[];
    realIndicators: { term: string; weight: number }[];
  };
}

export interface SampleNewsItem {
  id: string;
  title: string;
  category: 'Breaking News' | 'Viral Hoax' | 'Health/Science' | 'Debunked Claim' | 'Unverified Rumor';
  type: InputMode;
  headline: string;
  content: string;
  sourceUrl?: string;
  expectedVerdict: VerdictCategory;
  description: string;
}

export interface UserFeedback {
  id: string;
  verificationId: string;
  rating: 'accurate' | 'inaccurate' | 'partially';
  comment?: string;
  timestamp: string;
}
