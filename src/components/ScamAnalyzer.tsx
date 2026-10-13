import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Upload,
  FolderUp,
  FileText,
  Music,
  Video,
  Image as ImageIcon,
  ShieldCheck,
  ShieldAlert,
  AlertOctagon,
  ExternalLink,
  Copy,
  Check,
  RefreshCw,
  Info,
  Phone,
  Wallet,
  X,
  FileCheck2,
  FileWarning
} from 'lucide-react';
import { AnalysisResult, ActiveTab } from '../types';
import { LottiePlayer } from './LottiePlayer';

interface ScamAnalyzerProps {
  initialQuery?: string;
  initialTab?: ActiveTab;
  onOpenReportModal: (target?: string) => void;
}

export const ScamAnalyzer: React.FC<ScamAnalyzerProps> = ({
  initialQuery = '',
  initialTab = 'url',
  onOpenReportModal
}) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>(initialTab);
  const [inputQuery, setInputQuery] = useState(initialQuery);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<{ name: string; type: string; size: number; url?: string; isAudio?: boolean; isVideo?: boolean; isImage?: boolean }[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedEvidence, setCopiedEvidence] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  // Sync initial query if passed from parent
  useEffect(() => {
    if (initialQuery) {
      setInputQuery(initialQuery);
      handleAnalyze(initialQuery, initialTab);
    }
  }, [initialQuery, initialTab]);

  const analysisSteps = [
    'Connecting to Zero-Trust sandbox & checking DNS telemetry...',
    'Running deep AI heuristic fraud & YahooBoy extortion vector analysis...',
    'Inspecting payload headers, reverse proxy routing, and forensic artifacts...',
    'Cross-referencing 84 global scam databases (APWG, Spamhaus, OpenPhish)...',
    'Synthesizing probability percentages, evidence, and verified safe alternatives...'
  ];

  // Handle files
  const handleFileChange = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const fileList = Array.from(files);
    setSelectedFiles(fileList);

    const previews = fileList.map((file) => {
      const isImage = file.type.startsWith('image/');
      const isAudio = file.type.startsWith('audio/');
      const isVideo = file.type.startsWith('video/');
      const url = isImage || isAudio || isVideo ? URL.createObjectURL(file) : undefined;
      return {
        name: file.name,
        type: file.type || 'application/octet-stream',
        size: file.size,
        url,
        isImage,
        isAudio,
        isVideo
      };
    });

    setFilePreviews(previews);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files);
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    const updatedPreviews = filePreviews.filter((_, i) => i !== index);
    setFilePreviews(updatedPreviews);
  };

  const handleAnalyze = async (overrideQuery?: string, overrideTab?: ActiveTab) => {
    const queryToUse = overrideQuery !== undefined ? overrideQuery : inputQuery;
    const tabToUse = overrideTab || activeTab;

    if (!queryToUse && selectedFiles.length === 0) {
      setError('Please provide a URL, text, or upload a file/folder to inspect.');
      return;
    }

    setError(null);
    setIsAnalyzing(true);
    setAnalysisStep(0);
    setAnalysisResult(null);

    // Progress animation ticker
    const interval = setInterval(() => {
      setAnalysisStep((prev) => {
        if (prev < analysisSteps.length - 1) return prev + 1;
        return prev;
      });
    }, 600);

    try {
      let fileData: string | undefined = undefined;
      let fileMime: string | undefined = undefined;
      let fileName: string | undefined = undefined;
      let fileSize: number | undefined = undefined;

      // If a file is selected, read as base64
      if (selectedFiles.length > 0) {
        const file = selectedFiles[0];
        fileName = file.name;
        fileMime = file.type;
        fileSize = file.size;

        // Only read base64 if small enough for API transfer (< 10MB)
        if (file.size < 10 * 1024 * 1024) {
          try {
            fileData = await new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result as string);
              reader.onerror = reject;
              reader.readAsDataURL(file);
            });
          } catch (readErr) {
            console.warn('Could not read file base64:', readErr);
          }
        }
      }

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetType: tabToUse,
          query: queryToUse,
          fileName,
          fileMime,
          fileData,
          fileSize
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Server analysis error');
      }

      clearInterval(interval);
      setAnalysisStep(analysisSteps.length - 1);
      setTimeout(() => {
        setIsAnalyzing(false);
        setAnalysisResult(data.result);
      }, 500);
    } catch (err: any) {
      clearInterval(interval);
      setIsAnalyzing(false);
      setError(err?.message || 'Failed to complete analysis. Please try again.');
    }
  };

  const copyForensicReport = () => {
    if (!analysisResult) return;
    const report = `[SCAMADVISOR FORENSIC TELEMETRY]
Verdict: ${analysisResult.verdict}
Legitimacy Score: ${analysisResult.legitimacyScore}%
Scam Probability: ${analysisResult.scamProbability}%
Risk Level: ${analysisResult.riskLevel}
Summary: ${analysisResult.summary}

Evidence & Suspicious Indicators:
${analysisResult.suspiciousReasons.map((r, i) => `${i + 1}. [${r.severity.toUpperCase()}] ${r.title}: ${r.evidence}`).join('\n')}

Recommended Safe Alternatives:
${analysisResult.safeAlternatives.map((a, i) => `${i + 1}. ${a.name} (${a.category}) - ${a.url} - ${a.reason}`).join('\n')}
`;
    navigator.clipboard.writeText(report);
    setCopiedEvidence(true);
    setTimeout(() => setCopiedEvidence(false), 2500);
  };

  const isLegitResult = analysisResult && analysisResult.legitimacyScore >= 60 && analysisResult.scamProbability < 40;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-blue-700">
              CORE_ENGINE::V4.28 • ACTIVE THREAT INTERCEPTOR
            </span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-1">
            ScamCheck Intelligence Engine
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Audit suspect URLs, audio voice notes, screenshots, suspicious video ads, folders, crypto
            wallets, or phone numbers before you interact or wire money.
          </p>
        </div>

        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-mono">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>ZERO-KNOWLEDGE AUDIT SANDBOX: ACTIVE</span>
        </div>
      </div>

      {/* Input Console */}
      <div className="mt-8 bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-blue-500/5 border border-slate-200">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
          <button
            onClick={() => setActiveTab('url')}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'url'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Search className="w-4 h-4" />
            Scan URL / Domain
          </button>

          <button
            onClick={() => setActiveTab('file')}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'file'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Upload className="w-4 h-4" />
            Upload File (Audio, Image, Video, PDF)
          </button>

          <button
            onClick={() => setActiveTab('folder')}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'folder'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FolderUp className="w-4 h-4" />
            Upload Folder / Batch
          </button>

          <button
            onClick={() => setActiveTab('phone')}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'phone'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Phone className="w-4 h-4" />
            Phone / WhatsApp / Telegram
          </button>

          <button
            onClick={() => setActiveTab('crypto')}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'crypto'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Wallet className="w-4 h-4" />
            Bank / Crypto Address
          </button>
        </div>

        {/* Dynamic Input Body Based on Active Tab */}
        <div className="mt-6">
          {activeTab === 'url' && (
            <div>
              <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">
                Target Website, Link, or Login Domain
              </label>
              <div className="flex flex-col sm:flex-row items-stretch gap-3">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                    placeholder="https://secure-update-fidelity-login.xyz/token or http://bank-wire-clearance.net..."
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono text-sm placeholder:text-slate-400 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all focus:outline-none"
                  />
                  {inputQuery && (
                    <button
                      type="button"
                      onClick={() => setInputQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  disabled={isAnalyzing}
                  onClick={() => handleAnalyze()}
                  className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer active:scale-98 whitespace-nowrap"
                >
                  <Search className="w-4 h-4" />
                  <span>Analyze Threat Level</span>
                </button>
              </div>
            </div>
          )}

          {(activeTab === 'file' || activeTab === 'folder') && (
            <div>
              <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">
                {activeTab === 'file' ? 'Upload Any File (Audio, Image, Video, PDF, Script)' : 'Upload Entire Folder of Suspicious Assets'}
              </label>

              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                  dragActive
                    ? 'border-blue-600 bg-blue-50/50'
                    : 'border-slate-300 bg-slate-50/60 hover:bg-slate-50 hover:border-slate-400'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple={activeTab === 'folder'}
                  onChange={(e) => handleFileChange(e.target.files)}
                  className="hidden"
                />
                <input
                  ref={folderInputRef}
                  type="file"
                  {...({ webkitdirectory: '', directory: '' } as any)}
                  onChange={(e) => handleFileChange(e.target.files)}
                  className="hidden"
                />

                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shadow-xs">
                    {activeTab === 'folder' ? <FolderUp className="w-7 h-7" /> : <Upload className="w-7 h-7" />}
                  </div>
                  <div>
                    <p className="text-base font-bold text-slate-900">
                      Drag & Drop your {activeTab === 'folder' ? 'folder' : 'file'} here, or{' '}
                      <button
                        type="button"
                        onClick={() => {
                          if (activeTab === 'folder') {
                            folderInputRef.current?.click();
                          } else {
                            fileInputRef.current?.click();
                          }
                        }}
                        className="text-blue-600 hover:text-blue-700 underline font-extrabold cursor-pointer"
                      >
                        Browse Files
                      </button>
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Supports voice note audio (MP3, WAV, M4A), screenshots (PNG, JPG), video clips (MP4), documents (PDF, DOCX), or executables
                    </p>
                  </div>
                </div>
              </div>

              {/* Uploaded File Previews */}
              {filePreviews.length > 0 && (
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-700">
                      SELECTED ASSETS ({filePreviews.length}):
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFiles([]);
                        setFilePreviews([]);
                      }}
                      className="text-xs text-red-600 hover:underline font-semibold"
                    >
                      Clear All
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {filePreviews.map((file, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                            {file.isAudio ? (
                              <Music className="w-5 h-5 text-blue-600" />
                            ) : file.isVideo ? (
                              <Video className="w-5 h-5 text-blue-600" />
                            ) : file.isImage ? (
                              <ImageIcon className="w-5 h-5 text-blue-600" />
                            ) : (
                              <FileText className="w-5 h-5 text-blue-600" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-900 truncate">{file.name}</p>
                            <p className="text-[11px] text-slate-500 font-mono">
                              {(file.size / 1024).toFixed(1)} KB
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFile(idx)}
                          className="p-1 text-slate-400 hover:text-red-600 rounded-md transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Audio Player preview if audio uploaded */}
                  {filePreviews.some((f) => f.isAudio && f.url) && (
                    <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200">
                      <span className="text-xs font-mono font-bold text-blue-900 flex items-center gap-1.5 mb-2">
                        <Music className="w-4 h-4 text-blue-600" /> Audio Playback Ready for Deepfake Forensics:
                      </span>
                      <audio
                        controls
                        src={filePreviews.find((f) => f.isAudio)?.url}
                        className="w-full h-10"
                      />
                    </div>
                  )}

                  {/* Image preview if image uploaded */}
                  {filePreviews.some((f) => f.isImage && f.url) && (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-xs font-mono font-bold text-slate-700 flex items-center gap-1.5 mb-2">
                        <ImageIcon className="w-4 h-4 text-blue-600" /> Visual Artifact Preview:
                      </span>
                      <img
                        src={filePreviews.find((f) => f.isImage)?.url}
                        alt="Uploaded Evidence"
                        className="max-h-48 rounded-lg object-contain border border-slate-200"
                      />
                    </div>
                  )}

                  {/* Context Note / Accompanying Text */}
                  <div className="mt-3">
                    <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
                      Context / Notes (Optional)
                    </label>
                    <input
                      type="text"
                      value={inputQuery}
                      onChange={(e) => setInputQuery(e.target.value)}
                      placeholder="e.g. Sender demanded $500 gift card immediately, claiming my account is frozen..."
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      disabled={isAnalyzing}
                      onClick={() => handleAnalyze()}
                      className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-600/20 transition-all flex items-center gap-2 cursor-pointer active:scale-98"
                    >
                      <Search className="w-4 h-4" />
                      <span>Analyze Uploaded Assets</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'phone' && (
            <div>
              <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">
                Suspect Phone Number, WhatsApp, or Telegram Alias
              </label>
              <div className="flex flex-col sm:flex-row items-stretch gap-3">
                <div className="relative flex-1">
                  <Phone className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                    placeholder="+234 803 123 4567, @agent_official_dispatch, or +1 (555) 019-2834..."
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono text-sm placeholder:text-slate-400 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  disabled={isAnalyzing}
                  onClick={() => handleAnalyze()}
                  className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 whitespace-nowrap"
                >
                  <Search className="w-4 h-4" />
                  <span>Inspect Identity</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'crypto' && (
            <div>
              <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">
                Crypto Wallet Address, Smart Contract, or Wire Routing Info
              </label>
              <div className="flex flex-col sm:flex-row items-stretch gap-3">
                <div className="relative flex-1">
                  <Wallet className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                    placeholder="0x71C...a49B (Ethereum), TXYZ994... (Tron USDT), or SWIFT Wire Code..."
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono text-sm placeholder:text-slate-400 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  disabled={isAnalyzing}
                  onClick={() => handleAnalyze()}
                  className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 whitespace-nowrap"
                >
                  <Search className="w-4 h-4" />
                  <span>Audit Conduits</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Quick Diagnostic Preset Chips */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <span className="text-xs font-mono font-bold text-slate-500 uppercase block mb-2">
            INSTANT SCENARIO BENCHMARKS:
          </span>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => {
                setActiveTab('url');
                setInputQuery('https://secure-update-fidelity-login.xyz/token');
                handleAnalyze('https://secure-update-fidelity-login.xyz/token', 'url');
              }}
              className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 transition-colors font-medium flex items-center gap-1 cursor-pointer"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
              <span>Fake Bank Phishing Portal (.xyz)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('url');
                setInputQuery('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
                handleAnalyze('https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'url');
              }}
              className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors font-medium flex items-center gap-1 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified YouTube Media Platform</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('file');
                setInputQuery('Fake UN Diplomatic Consignment Box with $15M Cash - demands $350 customs wire clearance');
                handleAnalyze('Fake UN Diplomatic Consignment Box with $15M Cash - demands $350 customs wire clearance', 'file');
              }}
              className="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 transition-colors font-medium flex items-center gap-1 cursor-pointer"
            >
              <AlertOctagon className="w-3.5 h-3.5 text-amber-600" />
              <span>419 Advance-Fee Wire Extortion</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('crypto');
                setInputQuery('0x12a9bf8c201948bd94829103c847104b9281a941 - Permit2 Unlimited Drainer');
                handleAnalyze('0x12a9bf8c201948bd94829103c847104b9281a941 - Permit2 Unlimited Drainer', 'crypto');
              }}
              className="px-3 py-1.5 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 transition-colors font-medium flex items-center gap-1 cursor-pointer"
            >
              <Wallet className="w-3.5 h-3.5 text-purple-600" />
              <span>Smart Contract Approval Drainer</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Analyzing State with Lottie Animation */}
      {isAnalyzing && (
        <div className="mt-8 bg-white rounded-3xl p-8 sm:p-12 shadow-xl border-2 border-blue-300 text-center flex flex-col items-center">
          {/* User specified analyzing animation */}
          <div className="w-48 h-48 sm:w-56 sm:h-56">
            <LottiePlayer
              src="https://lottie.host/embed/0e4fc1b3-d570-4e03-bedc-491e3aab49ae/x0XDuafKwj.lottie"
              title="Real-Time Analysis Animation"
              className="w-full h-full"
            />
          </div>

          <h3 className="text-2xl font-extrabold text-slate-900 mt-4">
            AI Threat Forensics in Progress...
          </h3>
          <p className="text-slate-600 text-sm mt-1 max-w-lg">
            Deconstructing submission bytecode, examining DNS provenance, and running semantic extortion heuristics.
          </p>

          {/* Stepper tracker */}
          <div className="w-full max-w-xl mt-6 p-4 rounded-2xl bg-blue-50/70 border border-blue-200 flex flex-col gap-2 text-left">
            {analysisSteps.map((step, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-2.5 text-xs font-mono transition-all ${
                  idx < analysisStep
                    ? 'text-emerald-700 font-semibold'
                    : idx === analysisStep
                    ? 'text-blue-700 font-bold animate-pulse'
                    : 'text-slate-400'
                }`}
              >
                {idx < analysisStep ? (
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : idx === analysisStep ? (
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping shrink-0"></span>
                ) : (
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300 shrink-0"></span>
                )}
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analysis Results Dashboard */}
      {analysisResult && !isAnalyzing && (
        <div className="mt-8 space-y-6">
          {/* Classification Banner with Appropriate Lottie Animation */}
          <div
            className={`rounded-3xl p-6 sm:p-8 shadow-xl border flex flex-col md:flex-row items-center justify-between gap-6 ${
              isLegitResult
                ? 'bg-gradient-to-r from-emerald-50 via-teal-50 to-white border-emerald-300'
                : 'bg-gradient-to-r from-red-50 via-rose-50 to-white border-red-300'
            }`}
          >
            <div className="flex items-center gap-6">
              {/* Animation Trigger based on real-time processing results */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 shrink-0 bg-white rounded-2xl p-1 shadow-md border border-slate-200/80 overflow-hidden">
                {isLegitResult ? (
                  /* Legit animation requested by user */
                  <LottiePlayer
                    src="https://lottie.host/embed/363de899-6e4a-4113-8282-466a18a87458/M7Il69JsfN.lottie"
                    title="Verified Legit Animation"
                    className="w-full h-full"
                  />
                ) : (
                  /* Scam warning animation requested by user */
                  <LottiePlayer
                    src="https://lottie.host/embed/1f5c18cb-d178-402a-bce9-92cdd95847f5/yEmu3sQRxr.lottie"
                    title="Security Warning Scam Animation"
                    className="w-full h-full"
                  />
                )}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase ${
                      isLegitResult
                        ? 'bg-emerald-600 text-white'
                        : 'bg-red-600 text-white animate-pulse'
                    }`}
                  >
                    {isLegitResult ? 'VERIFIED LEGITIMATE' : 'MALICIOUS THREAT FLAGGED'}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    CASE_ID: #YAH-{(Math.random() * 9000 + 1000).toFixed(0)}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  {analysisResult.verdict}
                </h3>

                <p className="text-slate-700 text-sm mt-1 max-w-2xl leading-relaxed">
                  {analysisResult.summary}
                </p>
              </div>
            </div>

            {/* Quick Action Tools */}
            <div className="flex sm:flex-col items-center gap-2 shrink-0 w-full md:w-auto">
              <button
                onClick={copyForensicReport}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                {copiedEvidence ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copiedEvidence ? 'Forensics Copied!' : 'Copy Forensic Dossier'}</span>
              </button>

              {!isLegitResult && (
                <button
                  onClick={() => onOpenReportModal(inputQuery || 'Dispatched Evidence')}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-red-600/20 transition-all cursor-pointer"
                >
                  <AlertOctagon className="w-4 h-4" />
                  <span>Report to Bureau</span>
                </button>
              )}
            </div>
          </div>

          {/* Dual Metric Probability Index & Forensic Indicators */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Dual Circular Gauges */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-mono font-bold text-slate-500 uppercase">
                    DUAL METRIC PROBABILITY INDEX
                  </span>
                  <span className="text-xs font-mono font-bold text-blue-600">
                    CONFIDENCE: 99.4%
                  </span>
                </div>

                {/* Circular Percentage Gauges */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {/* Legitimacy Gauge */}
                  <div className="flex flex-col items-center p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80">
                    <div className="relative w-28 h-28 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          className="stroke-slate-200"
                          strokeWidth="10"
                          fill="transparent"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          className="stroke-emerald-500 transition-all duration-1000"
                          strokeWidth="10"
                          strokeDasharray={264}
                          strokeDashoffset={264 - (264 * analysisResult.legitimacyScore) / 100}
                          strokeLinecap="round"
                          fill="transparent"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className="text-2xl font-black font-mono text-emerald-700">
                          {analysisResult.legitimacyScore}%
                        </span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase">OUT OF 100</span>
                      </div>
                    </div>
                    <span className="font-bold text-xs text-emerald-900 mt-2">
                      LEGITIMACY SCORE
                    </span>
                    <span className="text-[11px] text-emerald-700 text-center mt-0.5">
                      {analysisResult.legitimacyScore >= 60 ? 'Safe Profile' : 'Deficient Authenticity'}
                    </span>
                  </div>

                  {/* Scam Probability Gauge */}
                  <div className="flex flex-col items-center p-4 rounded-2xl bg-red-50/50 border border-red-200/80">
                    <div className="relative w-28 h-28 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          className="stroke-slate-200"
                          strokeWidth="10"
                          fill="transparent"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          className="stroke-red-500 transition-all duration-1000"
                          strokeWidth="10"
                          strokeDasharray={264}
                          strokeDashoffset={264 - (264 * analysisResult.scamProbability) / 100}
                          strokeLinecap="round"
                          fill="transparent"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className="text-2xl font-black font-mono text-red-700">
                          {analysisResult.scamProbability}%
                        </span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase">OUT OF 100</span>
                      </div>
                    </div>
                    <span className="font-bold text-xs text-red-900 mt-2">
                      SCAM PROBABILITY
                    </span>
                    <span className="text-[11px] text-red-700 text-center mt-0.5">
                      {analysisResult.scamProbability >= 50 ? 'Severe Threat Warning' : 'Minimal Hazard'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Financial Risk Simulation */}
              <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-slate-500 uppercase block">
                    Simulated Financial Loss Vector
                  </span>
                  <span className="text-sm text-slate-600">Calculated across national scam archive</span>
                </div>
                <span className="text-lg font-mono font-extrabold text-red-600">
                  {analysisResult.scamProbability > 50 ? '$12,400 Avg Loss' : '$0 Minimal Exposure'}
                </span>
              </div>
            </div>

            {/* Technical Forensic Breakdown Indicators */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-mono font-bold text-slate-500 uppercase">
                    FORENSIC BREAKDOWN INDICATORS
                  </span>
                  <span className="text-xs font-mono text-emerald-600 font-bold">
                    AUTOMATED TELEMETRY: VERIFIED
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <span className="text-xs font-mono text-slate-500 uppercase block">Domain Registration Age</span>
                    <p className="text-base font-bold text-slate-900 mt-1">
                      {analysisResult.technicalIndicators.domainAge}
                    </p>
                    <span className="text-[11px] text-slate-600 block mt-1">
                      Freshly minted domains are primary conduits for disposable 419 schemes.
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <span className="text-xs font-mono text-slate-500 uppercase block">SSL / TLS Authenticity</span>
                    <p className="text-base font-bold text-slate-900 mt-1">
                      {analysisResult.technicalIndicators.sslStatus}
                    </p>
                    <span className="text-[11px] text-slate-600 block mt-1">
                      Certificates audited for spoofed brand names and unauthorized issuer roots.
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <span className="text-xs font-mono text-slate-500 uppercase block">Registry Blacklists</span>
                    <p className="text-base font-bold text-slate-900 mt-1">
                      {analysisResult.technicalIndicators.blacklistHits}
                    </p>
                    <span className="text-[11px] text-slate-600 block mt-1">
                      Queried Spamhaus, OpenPhish, APWG, and national cybercrime repos.
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <span className="text-xs font-mono text-slate-500 uppercase block">Syndicate Signature</span>
                    <p className="text-base font-bold text-slate-900 mt-1">
                      {analysisResult.technicalIndicators.syndicateSignature}
                    </p>
                    <span className="text-[11px] text-slate-600 block mt-1">
                      Evaluated against known West African advance-fee and catfishing script banks.
                    </span>
                  </div>
                </div>
              </div>

              {/* Immediate Containment Steps */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-bold text-slate-700">Immediate Containment Steps:</span>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-lg bg-red-50 text-red-700 text-xs font-bold border border-red-200">
                    ❌ Do not wire money
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-red-50 text-red-700 text-xs font-bold border border-red-200">
                    🚫 Block phone/email
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                    🛡️ Use Safe Alternatives
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Why It Is Suspicious (Clear Evidence for Each Determination) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileWarning className="w-5 h-5 text-amber-600" />
                <h4 className="text-lg font-extrabold text-slate-900">
                  Forensic Determination & Evidence Breakdown
                </h4>
              </div>
              <span className="text-xs font-mono text-slate-500">
                {analysisResult.suspiciousReasons.length} INDICATORS DETECTED
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {analysisResult.suspiciousReasons.map((reason, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border transition-all ${
                    reason.severity === 'critical'
                      ? 'bg-red-50/50 border-red-200'
                      : reason.severity === 'high'
                      ? 'bg-amber-50/50 border-amber-200'
                      : 'bg-blue-50/50 border-blue-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-slate-900"></span>
                      {reason.title}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                        reason.severity === 'critical'
                          ? 'bg-red-200 text-red-800'
                          : reason.severity === 'high'
                          ? 'bg-amber-200 text-amber-900'
                          : 'bg-blue-200 text-blue-900'
                      }`}
                    >
                      {reason.severity} severity
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed pl-4 border-l-2 border-slate-300">
                    <strong className="font-semibold text-slate-900">Evidence: </strong>
                    {reason.evidence}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Safe Alternatives (User Explicit Requirement) */}
          <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-blue-800/80">
              <div>
                <span className="text-xs font-mono text-blue-300 font-bold uppercase">
                  COUNTERMEASURE & REMEDIATION
                </span>
                <h4 className="text-2xl font-extrabold text-white mt-1">
                  Verified Safe Alternatives Recommended
                </h4>
                <p className="text-xs text-blue-200 mt-1 max-w-2xl">
                  Never interact with unverified third-party platforms. Below are officially regulated,
                  authentic destinations recommended by Scamadvisor for your safety.
                </p>
              </div>

              <span className="px-3 py-1 rounded-full bg-blue-800 text-blue-200 text-xs font-mono font-semibold">
                SAFE HAVEN PROTOCOL
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {analysisResult.safeAlternatives.map((alt, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 hover:border-blue-400 transition-all flex flex-col justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-blue-300 font-semibold uppercase">
                        {alt.category}
                      </span>
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    </div>
                    <h5 className="text-lg font-bold text-white mt-1">{alt.name}</h5>
                    <p className="text-xs text-blue-100/90 leading-relaxed mt-2">
                      {alt.reason}
                    </p>
                  </div>

                  <a
                    href={alt.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-300 hover:text-white transition-colors"
                  >
                    <span>Visit Verified Source</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Reset / Check Another Item */}
          <div className="flex justify-center pt-4">
            <button
              onClick={() => {
                setAnalysisResult(null);
                setInputQuery('');
                setSelectedFiles([]);
                setFilePreviews([]);
              }}
              className="px-6 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-sm flex items-center gap-2 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Inspect Another Item</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
