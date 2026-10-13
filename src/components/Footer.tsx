import React from 'react';
import { Shield, PhoneCall, AlertTriangle, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'home' | 'scamcheck' | 'threats' | 'about') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-slate-900 text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <Shield className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-white">
                  Scamadvisor
                </span>
                <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-blue-400">
                  Say no to YahooBoys
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mt-1">
              National counter-fraud cyber platform and verification directory. Empowering digital citizens
              against cybercrime syndicates, romantic manipulators, and advance fee fraud.
            </p>

            <span className="text-[11px] font-mono text-slate-400 mt-2">
              Architected & Engineered by <strong className="text-slate-200">Babu Louis</strong>
            </span>
          </div>

          {/* Hotline Strip */}
          <div className="md:col-span-5 p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-xs font-mono uppercase font-bold tracking-wider text-red-400">
                Anti-Scam Awareness & Incident Hotline
              </span>
            </div>

            <div className="flex flex-wrap items-baseline gap-3 mt-1">
              <span className="text-xl font-mono font-black text-emerald-400">
                +1 (800) 419-WARN
              </span>
              <span className="text-xs text-slate-400 font-mono">
                24/7 Priority Emergency Triage Desk
              </span>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
              Direct encrypted routing to cybercrime investigation units and financial compliance authorities.
            </p>
          </div>

          {/* Quick Routing */}
          <div className="md:col-span-3 flex flex-col gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
              Quick Routing
            </span>
            <div className="flex flex-col gap-2 text-xs font-medium text-slate-400 pt-1">
              <button
                onClick={() => onNavigate('home')}
                className="text-left hover:text-white transition-colors cursor-pointer"
              >
                Platform Home
              </button>
              <button
                onClick={() => onNavigate('scamcheck')}
                className="text-left hover:text-white transition-colors cursor-pointer text-blue-400 font-bold"
              >
                ScamCheck Intelligence Engine
              </button>
              <button
                onClick={() => onNavigate('threats')}
                className="text-left hover:text-white transition-colors cursor-pointer"
              >
                Live Threat Stream & Logs
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="text-left hover:text-white transition-colors cursor-pointer"
              >
                About Scamadvisor & Babu Louis
              </button>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 text-[11px] font-mono text-slate-500">
          <p className="max-w-3xl leading-relaxed">
            LEGAL DISCLAIMER: Risk analyses, threat indices, and verification assessments are generated via heuristic telemetry, domain forensics, and reported scam catalogs. Data does not constitute legal or statutory financial warranty. Immediate reporting of extortion attempts or fraudulent solicitation is recommended.
          </p>

          <p className="shrink-0 whitespace-nowrap">
            © 2025–2026 Scamadvisor. Mission Protocol: Say No To YahooBoys.
          </p>
        </div>
      </div>
    </footer>
  );
};
