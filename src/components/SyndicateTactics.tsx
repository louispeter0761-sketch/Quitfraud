import React from 'react';
import {
  HeartCrack,
  RefreshCw,
  BadgeAlert,
  Globe2,
  ShieldCheck,
  Lock,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Users2
} from 'lucide-react';

interface SyndicateTacticsProps {
  onCheckScam: (presetQuery?: string) => void;
}

export const SyndicateTactics: React.FC<SyndicateTacticsProps> = ({ onCheckScam }) => {
  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-8 border-b border-slate-200">
          <div>
            <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider block">
              THREAT_INTELL::STREAM_FEED
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Anatomy of Modern Cyber Syndicate Tactics
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-2xl">
              Real-time incident response dossiers detailing advance fee syndicates, catfishing rings,
              impersonators, and fraudulent escrow engines.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>LIVE INTERCEPT SOCKET CONNECTED</span>
          </div>
        </div>

        {/* 4 Threat Vector Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {/* Card 1 */}
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/5 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono font-bold text-red-600 mb-3">
                <span className="px-2 py-0.5 rounded bg-red-100">VECT_ROMANCE_EXTORTION</span>
                <HeartCrack className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Sweetheart Scam & Advance Diplomatic Box Fraud
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-2">
                Perpetrators pose as foreign deployment doctors, contractors, or crypto custodians. Victims are
                seduced over 3–6 weeks before emergency diplomatic consignment clearance or hospital fees are
                demanded via untraceable vouchers.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-500">Avg. Loss Per Strike</span>
              <span className="font-extrabold text-red-600">$18,400 USD</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/5 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono font-bold text-amber-600 mb-3">
                <span className="px-2 py-0.5 rounded bg-amber-100">VECT_FAKE_ESCROW</span>
                <RefreshCw className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Bogus Escrow & Recovery Traps
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-2">
                Second-stage scams where victims are targeted by rogue "asset recovery agents" promising to reverse
                YahooBoy losses in exchange for legal upfront retainer fees.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-500">Secondary Vulnerability</span>
              <span className="font-extrabold text-amber-600">88% Unvetted</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/5 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono font-bold text-indigo-600 mb-3">
                <span className="px-2 py-0.5 rounded bg-indigo-100">VECT_SPOOFED_AUTHORITY</span>
                <BadgeAlert className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Impersonation & Law Enforcement Spoofs
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-2">
                Malicious actors weaponizing simulated caller IDs, fake Interpol or FBI badges, and tax inspector
                letters to coerce terror-driven gift card purchases or wire transfers.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-500">Target Demographics</span>
              <span className="font-extrabold text-indigo-600">Elderly & Parents</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/5 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono font-bold text-blue-600 mb-3">
                <span className="px-2 py-0.5 rounded bg-blue-100">VECT_CRED_EXFIL</span>
                <Globe2 className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Phishing & Lookalike Harvesters
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-2">
                Pixel-perfect clones of web banking, crypto wallets, and payroll systems designed to bypass 2FA
                via real-time reverse proxies and automated session hijacks.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-500">Blacklisted Hosts</span>
              <span className="font-extrabold text-blue-600">1,420 Domains</span>
            </div>
          </div>
        </div>

        {/* Protection Lifecycle Grid */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="text-xs font-mono font-bold text-blue-600 uppercase">
              CYBER PROTECTION LIFECYCLE
            </span>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              Custody, Payment Escrows, and Phishing Immunity.
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Scamadvisor deploys continuous cryptographic validation to verify counterparty authenticity before
              you transfer a single dollar, seed phrase, or contract signature.
            </p>

            <div className="space-y-3 mt-2">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Payment Intercept Guards</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Validates beneficiary names, routing codes, and crypto destination reputations against international syndicate registries.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Deepfake & Impersonator Profiler</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Cross-examines identity photos against thousands of stock stolen romance profiles used by YahooBoy networks.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Automated Incident Submissions</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    One-click push routing to Interpol, EFCC, and federal wire fraud investigative divisions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-3xl bg-blue-50/70 border border-blue-200 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono font-bold text-blue-700 uppercase">SECURE_CUSTODY</span>
                <h4 className="text-lg font-bold text-slate-900 mt-1">Asset Custody Shield</h4>
                <p className="text-xs text-slate-600 mt-2">
                  Automated smart contract simulation protects decentralized reserves from approval-draining scripts.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-blue-200">
                <div className="h-2 w-full bg-blue-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full w-4/5"></div>
                </div>
                <span className="text-[11px] font-mono text-slate-600 mt-2 block font-semibold">
                  $4.2B+ Total Capital Protected
                </span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono font-bold text-red-400 uppercase">419_THREAT_WATCH</span>
                <h4 className="text-lg font-bold text-white mt-1">YahooBoy Blacklist</h4>
                <p className="text-xs text-slate-300 mt-2">
                  Live machine-learning sync indexing fraudulent syndicate bank drops, money-mule networks, and IP subnets.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800">
                <span className="text-2xl font-mono font-bold text-red-400">128,498</span>
                <span className="text-[11px] font-mono text-slate-400 block mt-0.5">Flagged Mule Accounts</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono font-bold text-slate-600 uppercase">ID_ATTESTATION</span>
                <h4 className="text-lg font-bold text-slate-900 mt-1">Identity Attestation</h4>
                <p className="text-xs text-slate-600 mt-2">
                  Zero-knowledge proof verification verifying whether your counterparty has an authentic government-backed identity.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200">
                <span className="text-xs font-mono font-semibold text-emerald-600">0.02s Biometric Validation</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono font-bold text-emerald-800 uppercase">INSTANT_ESCROW</span>
                <h4 className="text-lg font-bold text-slate-900 mt-1">Guaranteed Escrow</h4>
                <p className="text-xs text-slate-600 mt-2">
                  Multi-sig vaulting ensures merchants and independent clients receive funds only once deliverables are validated.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-emerald-200">
                <span className="text-xs font-mono font-bold text-emerald-700">100% Insolvency Immune</span>
              </div>
            </div>
          </div>
        </div>

        {/* Protection Banner Callout */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0">
              <Users2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-xs font-mono text-blue-200 font-bold uppercase tracking-wider block">
                STAND TOGETHER AGAINST FRAUD
              </span>
              <h3 className="text-2xl font-bold mt-0.5">Protect yourself and loved ones.</h3>
              <p className="text-sm text-blue-100 mt-1 max-w-xl">
                Have you been contacted by someone suspicious? Don't send wire transfers or gift cards. Run their
                profile through our threat matrix in seconds.
              </p>
            </div>
          </div>

          <button
            onClick={() => onCheckScam()}
            className="shrink-0 px-6 py-3.5 rounded-xl bg-white hover:bg-blue-50 text-blue-700 font-extrabold text-sm shadow-md transition-all cursor-pointer active:scale-95"
          >
            Launch ScamCheck Free
          </button>
        </div>
      </div>
    </section>
  );
};
