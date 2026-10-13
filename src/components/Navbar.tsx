import React, { useState } from 'react';
import { Shield, ShieldAlert, PhoneCall, Menu, X, CheckCircle2, Activity } from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'scamcheck' | 'threats' | 'about';
  onNavigate: (view: 'home' | 'scamcheck' | 'threats' | 'about') => void;
  onOpenReportModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenReportModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-blue-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Identity */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 text-left group focus:outline-none"
            >
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 p-1 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <img
                  src="https://bcassetcdn.com/public/blog-ms/production/sites/2/2023/06/shield-by-logo-designer-vick-ben-for-the-designify-dribbble.png"
                  alt="Scamadvisor Shield Logo"
                  className="w-full h-full object-contain filter drop-shadow"
                  onError={(e) => {
                    // Fallback to SVG if external image is blocked
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <Shield className="w-5 h-5 text-white absolute" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                  Scamadvisor
                </span>
                <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-blue-600">
                  Say no to YahooBoys
                </span>
              </div>
            </button>

            {/* SOC Status Indicator */}
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[11px] font-mono font-semibold text-emerald-700">
                SOC_MONITOR: ACTIVE
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-xl border border-slate-200/60">
            <button
              onClick={() => onNavigate('home')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                currentView === 'home'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('scamcheck')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-all ${
                currentView === 'scamcheck'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Activity className="w-4 h-4 text-current" />
              ScamCheck Engine
            </button>
            <button
              onClick={() => onNavigate('threats')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                currentView === 'threats'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              Live Threat Stream
            </button>
            <button
              onClick={() => onNavigate('about')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                currentView === 'about'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              About / Babu Louis
            </button>
          </nav>

          {/* CTA & Emergency Hotline */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="tel:+18004199276"
              className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
              title="24/7 Anti-Scam Incident Hotline"
            >
              <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
              <span>+1 (800) 419-WARN</span>
            </a>

            <button
              onClick={() => onNavigate('scamcheck')}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-500/20 hover:shadow-md hover:shadow-blue-500/30 transition-all active:scale-95"
            >
              <ShieldAlert className="w-4 h-4 mr-2" />
              Check a Scam
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => onNavigate('scamcheck')}
              className="p-2 text-blue-600 bg-blue-50 rounded-lg"
              title="Quick Check"
            >
              <ShieldAlert className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
            <span className="text-xs font-mono text-emerald-600 font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> SOC MONITOR ACTIVE
            </span>
            <span className="text-xs font-mono text-slate-500">+1 (800) 419-WARN</span>
          </div>

          <button
            onClick={() => {
              onNavigate('home');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold ${
              currentView === 'home' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => {
              onNavigate('scamcheck');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between ${
              currentView === 'scamcheck' ? 'bg-blue-600 text-white font-bold' : 'text-slate-700'
            }`}
          >
            <span>ScamCheck Intelligence Engine</span>
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded">Scan</span>
          </button>
          <button
            onClick={() => {
              onNavigate('threats');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold ${
              currentView === 'threats' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700'
            }`}
          >
            Live Threat Stream
          </button>
          <button
            onClick={() => {
              onNavigate('about');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold ${
              currentView === 'about' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700'
            }`}
          >
            About / Babu Louis
          </button>

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                onOpenReportModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 transition-colors"
            >
              Dispatch Anonymous Incident
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
