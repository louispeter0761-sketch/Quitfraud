import React, { useState } from 'react';
import { ShieldCheck, Search, ArrowRight, ShieldAlert, Cpu, Lock, CheckCircle2, AlertTriangle, FileCode } from 'lucide-react';
import { LottiePlayer } from './LottiePlayer';

interface HeroSectionProps {
  onStartScan: (query: string, tab?: 'url' | 'file' | 'folder' | 'phone' | 'crypto') => void;
  onNavigateAbout: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartScan, onNavigateAbout }) => {
  const [quickInput, setQuickInput] = useState('');

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickInput.trim()) {
      onStartScan(quickInput.trim(), 'url');
    } else {
      onStartScan('', 'url');
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-white to-slate-50 pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-200">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#1e40af" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headlines & Quick Action */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            {/* Mission Identifier Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-900 w-fit shadow-xs">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span className="text-xs font-mono font-bold tracking-wider uppercase">
                SCAMADVISOR COUNTER-FRAUD UNIT • V4.28
              </span>
            </div>

            {/* Main Title */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                Say no to{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 underline decoration-blue-300 decoration-wavy underline-offset-8">
                  YahooBoys
                </span>
                .
              </h1>
              <p className="mt-4 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl">
                Protect yourself, your family, and your business from online fraud. Analyze dubious links,
                audio voice clones, deceptive files, payment escrow traps, and impersonation schemes with
                institutional AI forensics.
              </p>
            </div>

            {/* Quick Hero Interactive Inspection Bar */}
            <form onSubmit={handleQuickSubmit} className="relative mt-2 max-w-2xl">
              <div className="flex flex-col sm:flex-row items-center gap-2 p-2 bg-white rounded-2xl shadow-xl shadow-blue-500/10 border-2 border-blue-200/80 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100 transition-all">
                <div className="flex items-center flex-1 w-full pl-3 pr-2 py-2">
                  <Search className="w-5 h-5 text-blue-600 shrink-0 mr-3" />
                  <input
                    type="text"
                    value={quickInput}
                    onChange={(e) => setQuickInput(e.target.value)}
                    placeholder="Paste suspect URL, phone number, wallet, or payment handle..."
                    className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 font-medium text-sm sm:text-base focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold rounded-xl shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap"
                >
                  <span>Analyze Target</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Quick suggestion chips */}
              <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-slate-500 font-medium">
                <span className="font-semibold text-slate-700">Quick tests:</span>
                <button
                  type="button"
                  onClick={() => onStartScan('https://secure-western-verify.auth-login.top/account', 'url')}
                  className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 transition-colors cursor-pointer"
                >
                  🚨 Fake Western Union
                </button>
                <button
                  type="button"
                  onClick={() => onStartScan('https://www.youtube.com', 'url')}
                  className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 transition-colors cursor-pointer"
                >
                  ✅ Official YouTube
                </button>
                <button
                  type="button"
                  onClick={() => onStartScan('urgent-wire-release-fee.pdf', 'file')}
                  className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-amber-50 hover:text-amber-700 border border-slate-200 transition-colors cursor-pointer"
                >
                  📁 419 Wire Letter
                </button>
              </div>
            </form>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onStartScan('', 'url')}
                className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 shadow-md shadow-blue-600/25 flex items-center gap-2 transition-all cursor-pointer"
              >
                <ShieldCheck className="w-5 h-5" />
                Launch Full ScamCheck Engine
              </button>
              <button
                onClick={onNavigateAbout}
                className="px-6 py-3 rounded-xl bg-white text-slate-700 hover:text-blue-700 font-bold text-sm border border-slate-200 hover:border-blue-300 shadow-xs hover:bg-slate-50 transition-all cursor-pointer"
              >
                Founder's Story & Mission
              </button>
            </div>
          </div>

          {/* Right Column: Hero Lottie Animation & Live Defense Status */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-md lg:max-w-none bg-white rounded-3xl p-6 sm:p-8 border border-blue-100 shadow-2xl shadow-blue-500/10 flex flex-col items-center overflow-hidden">
              {/* Subtle top indicator bar */}
              <div className="w-full flex items-center justify-between pb-4 border-b border-slate-100 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="text-xs font-mono font-bold text-slate-800">
                    REAL-TIME FRAUD INTERCEPTION
                  </span>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold">
                  HEURISTICS ACTIVE
                </span>
              </div>

              {/* User requested Lottie Animation in Hero Section */}
              <div className="w-full h-64 sm:h-72 rounded-2xl bg-gradient-to-b from-blue-50/50 to-white flex items-center justify-center p-2 relative">
                <LottiePlayer
                  src="https://lottie.host/embed/f9792c5d-cf87-4db8-bcde-2995fef35840/vv1CgDIlOq.lottie"
                  title="Scamadvisor Protection Animation"
                  className="w-full h-full"
                />
              </div>

              {/* Security Telemetry Under Lottie */}
              <div className="grid grid-cols-2 gap-3 w-full mt-4">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col">
                  <span className="text-xs font-mono text-slate-500 uppercase">Detection Ratio</span>
                  <span className="text-xl font-bold font-mono text-slate-900 mt-0.5">99.8%</span>
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3 h-3" /> Institutional Grade
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col">
                  <span className="text-xs font-mono text-slate-500 uppercase">Latency Speed</span>
                  <span className="text-xl font-bold font-mono text-blue-600 mt-0.5">~140ms</span>
                  <span className="text-[11px] text-slate-500 font-medium mt-1">
                    Zero-Knowledge Sandbox
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Metric Live Telemetry Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 pt-8 border-t border-slate-200/80">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <div className="text-2xl font-extrabold font-mono text-slate-900">45,210+</div>
              <div className="text-xs font-medium text-slate-500">Phishing Links & 419 Traps Neutralized</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
              <Cpu className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-extrabold font-mono text-slate-900">Multimodal AI</div>
              <div className="text-xs font-medium text-slate-500">Audio, Video, Images, Folders & Links</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center shrink-0">
              <Lock className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <div className="text-2xl font-extrabold font-mono text-slate-900">100% Free Forever</div>
              <div className="text-xs font-medium text-slate-500">Public Civic Defense by Babu Louis</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
