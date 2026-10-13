export type ThreatLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'SAFE';

export interface SuspiciousReason {
  title: string;
  evidence: string;
  severity: 'critical' | 'high' | 'medium' | 'info';
}

export interface SafeAlternative {
  name: string;
  url: string;
  category: string;
  reason: string;
}

export interface TechnicalIndicators {
  domainAge: string;
  sslStatus: string;
  blacklistHits: string;
  syndicateSignature: string;
}

export interface AnalysisResult {
  legitimacyScore: number;
  scamProbability: number;
  verdict: string;
  riskLevel: ThreatLevel;
  threatCategory: string;
  summary: string;
  suspiciousReasons: SuspiciousReason[];
  safeAlternatives: SafeAlternative[];
  technicalIndicators: TechnicalIndicators;
}

export interface ThreatItem {
  id: string;
  target: string;
  type: string;
  category: string;
  scamPercent: number;
  legitPercent: number;
  status: string;
  timestamp: string;
  location: string;
  details: string;
}

export type ActiveTab = 'url' | 'file' | 'folder' | 'phone' | 'crypto';
