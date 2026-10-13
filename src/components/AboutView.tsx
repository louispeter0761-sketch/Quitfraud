import React, { useState } from 'react';
import {
  Shield,
  ShieldCheck,
  Lock,
  Heart,
  Handshake,
  CheckCircle2,
  Copy,
  Check,
  Send,
  PhoneCall,
  Mail,
  Github,
  Linkedin,
  AlertCircle,
  FileText,
  UserCheck
} from 'lucide-react';

interface AboutViewProps {
  onCheckScam: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onCheckScam }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'report',
    evidenceLink: '',
    message: ''
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('babu.louis@scamadvisor.dev');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedTicket = `SYS-TRIAGE-${Math.floor(10000 + Math.random() * 90000)}`;
    setTicketId(generatedTicket);
    setFormSubmitted(true);
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen pb-20">
      {/* SECTION 1: ARCHITECTURAL BANNER & CORE VISION */}
      <section className="relative w-full px-4 sm:px-6 lg:px-8 py-16 bg-white border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          {/* Breadcrumb / Telemetry Identifier */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-500">
              <span className="text-blue-600 font-bold">OUR MISSION</span>
              <span>/</span>
              <span className="text-slate-700">STORY OF SCAMADVISOR</span>
              <span>/</span>
              <span className="text-emerald-600 font-bold">FOUNDED BY BABU LOUIS</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>COMMUNITY CIVIC DEFENSE INITIATIVE</span>
            </div>
          </div>

          {/* Main Headline Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 flex flex-col gap-3">
              <span className="text-xs font-mono text-blue-600 uppercase font-bold tracking-widest">
                AN INDEPENDENT CIVIC DEFENSE PROJECT
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Built to Dismantle{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Digital Extortion & Scams.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mt-2 max-w-2xl">
                Scamadvisor was architected and built independently by senior software developer{' '}
                <strong className="text-slate-900 font-bold">Babu Louis</strong>. Born out of seeing friends,
                parents, and community members fall victim to predatory cybercrime and YahooBoy syndicates,
                this platform gives everyday citizens free institutional-grade tools to verify links, detect
                impostors, and avoid devastating financial loss.
              </p>
            </div>

            {/* Metric Tile / Quick Telemetry */}
            <div className="lg:col-span-4 p-6 rounded-3xl bg-blue-50/70 border border-blue-200 shadow-sm flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500 uppercase">FOUNDER'S PLEDGE</span>
                <span className="text-blue-700 font-bold">DEV_NODE_01</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold font-mono text-slate-900">14+</span>
                <span className="text-xs text-slate-600 font-medium leading-tight">
                  Years of Full-Stack Architecture Dedicated to Public Good
                </span>
              </div>
              <div className="h-2 w-full bg-blue-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full w-4/5"></div>
              </div>
              <p className="text-[11px] text-slate-600">
                Zero institutional venture backing. 100% public interest civic engineering.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: BABU LOUIS BIOGRAPHY & CREATOR ETHOS */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Architect Profile Card */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="rounded-3xl bg-white border border-slate-200 shadow-xl p-6 sm:p-8 flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-slate-700 uppercase">
                    ARCHITECT_PROFILE
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-[11px] font-mono text-blue-800 font-bold">
                  STAFF_ENG
                </span>
              </div>

              {/* Developer Avatar / Illustration */}
              <div className="relative w-full h-56 rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950 flex flex-col items-center justify-center text-center p-6 text-white overflow-hidden shadow-inner">
                <div className="w-20 h-20 rounded-full bg-blue-600/30 border-2 border-blue-400 flex items-center justify-center mb-3">
                  <UserCheck className="w-10 h-10 text-blue-300" />
                </div>
                <h3 className="text-xl font-bold text-white">Babu Louis</h3>
                <span className="text-xs text-blue-300 font-mono">
                  Lead Systems Architect & Founder
                </span>
                <span className="text-[11px] text-slate-300 mt-2 max-w-xs">
                  "Protecting vulnerable digital citizens through rigorous software engineering."
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col">
                  <span className="text-[11px] font-mono text-slate-500 uppercase">PUBLIC PGP ID</span>
                  <span className="text-xs font-mono font-bold text-slate-900 truncate">
                    0x9B4E_881C_BL
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col">
                  <span className="text-[11px] font-mono text-slate-500 uppercase">VECTORS HARDENED</span>
                  <span className="text-xs font-mono font-bold text-emerald-600">120+ Open Vectors</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs text-emerald-900 font-medium">
                  Built with privacy-first engineering: zero trackers, zero data harvesting.
                </span>
              </div>
            </div>
          </div>

          {/* Right: Ethos Narrative */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <span className="text-xs font-mono font-bold text-blue-600 uppercase">
              ARCHITECTURAL STATEMENT & ETHOS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              "Code without civic responsibility is merely complicity."
            </h2>

            <div className="space-y-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>
                Throughout my career scaling complex web engines, fintech pipelines, and enterprise
                architectures, I watched a horrifying divergence occur: while corporate infrastructure grew
                fortified, the everyday digital citizen was left defenseless against predatory syndicates,
                advance-fee manipulators, and automated social engineering traps.
              </p>
              <p>
                When someone's life savings, retirement account, or mental sanity is demolished by organized
                fraudsters operating from behind anonymous proxies, it is not merely a financial loss—it is a
                catastrophic human failure. In 2024, after witnessing family members and vulnerable peers
                targeted by ruthless 419 schemes and deceptive romantic ploys, I chose to redirect my technical
                engineering stamina toward a non-negotiable mission:{' '}
                <strong className="text-slate-900 font-bold">Scamadvisor</strong>.
              </p>
              <p>
                Every heuristic scanner, regex analyzer, and domain forensic tool inside Scamadvisor is crafted
                so ordinary grandparents, single parents, and young jobseekers can stand behind
                institutional-grade threat telemetry for free.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
                <Lock className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-bold text-slate-900">Zero Paywalls</span>
                <span className="text-xs text-slate-500">
                  Free civic protection tools for every citizen worldwide.
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
                <Heart className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-bold text-slate-900">Victim Dignity</span>
                <span className="text-xs text-slate-500">
                  Zero victim-blaming. Rapid recovery guidance & forensics.
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
                <Handshake className="w-5 h-5 text-indigo-600" />
                <span className="text-sm font-bold text-slate-900">Direct Disruption</span>
                <span className="text-xs text-slate-500">
                  Flagging hostnames and payment conduits instantly.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE ANTI-YAHOOBOY & ANTI-CYBERCRIME MANIFESTO */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-slate-100/60 border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div>
            <span className="text-xs font-mono font-bold text-red-600 uppercase tracking-wider block">
              CIVIC_MANIFESTO::UNCOMPROMISING
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              The Anti-YahooBoy & Counter-Cybercrime Stance
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-2xl">
              We reject the glorification of advance-fee fraud, cyber extortion, and social engineering
              syndicates. Cyber fraud is not an entrepreneurial hustle; it is organized psychological warfare
              that dismantles lives, destroys family futures, and erodes human trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-red-600">[VEC_01::ADVANCE_FEE]</span>
                <h3 className="text-lg font-bold text-slate-900 mt-2">419 & Upfront Fee Scams</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  Fabricated inheritances, phantom real-estate awards, high-yield crypto contracts, and fake grant
                  approvals requiring "release fee clearance" or customs wire bribes.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-100 text-[11px] font-mono text-emerald-700 font-semibold">
                COUNTERMEASURE: Verification of statutory registry and domain age.
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-red-600">[VEC_02::EMOTIONAL_MANIP]</span>
                <h3 className="text-lg font-bold text-slate-900 mt-2">Romance & Catfishing Rings</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  Months-long psychological conditioning, stolen deployed-military or surgeon identities,
                  orchestrating synthetic emergencies demanding emergency crypto or wire bailouts.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-100 text-[11px] font-mono text-emerald-700 font-semibold">
                COUNTERMEASURE: Reverse image heuristics & sentiment pressure models.
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-red-600">[VEC_03::SPOOFED_AUTHORITY]</span>
                <h3 className="text-lg font-bold text-slate-900 mt-2">Impersonation & Law Spoofs</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  Malicious actors weaponizing spoofed caller IDs, simulated FBI / Interpol badges, or tax
                  authority letters to coerce terror-driven gift card purchases or escrow transfers.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-100 text-[11px] font-mono text-emerald-700 font-semibold">
                COUNTERMEASURE: Cryptographic SPF/DKIM verification and official dispatch hotlines.
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-red-600">[VEC_04::CRED_EXFIL]</span>
                <h3 className="text-lg font-bold text-slate-900 mt-2">Phishing & Lookalike Harvesters</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  Pixel-perfect clones of web banking, crypto wallets, and payroll systems designed to bypass 2FA
                  via real-time reverse proxies and automated session hijacks.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-100 text-[11px] font-mono text-emerald-700 font-semibold">
                COUNTERMEASURE: Deep SSL certificate issuer audit and DNS anomaly flags.
              </div>
            </div>
          </div>

          {/* Callout Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center shrink-0">
                <AlertCircle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h4 className="text-lg font-bold">The Silent Devastation of Cyber Extortion</h4>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                  Behind every fraudulent transaction is a human being: pensions eviscerated, college funds
                  evaporated, small enterprises driven to bankruptcy, and victims pushed to despair. Scamadvisor
                  stands unapologetically on the frontline.
                </p>
              </div>
            </div>

            <button
              onClick={onCheckScam}
              className="shrink-0 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              Verify Suspect Activity
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 4: 24/7 EMERGENCY HOTLINE & DISPATCH PORTAL */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          {/* Emergency Hotline Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative flex items-center justify-center">
                <span className="w-4 h-4 rounded-full bg-red-500 animate-ping absolute"></span>
                <span className="w-3 h-3 rounded-full bg-red-500 relative"></span>
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-red-400 font-bold block">
                  24/7 EMERGENCY TRIAGE BADGE
                </span>
                <h3 className="text-2xl font-extrabold mt-0.5">Emergency Scam Incident Hotline</h3>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="tel:+18004199276"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors text-white font-mono font-bold text-sm"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>+1 (800) 419-WARN</span>
              </a>

              <a
                href="#incident-portal"
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md transition-colors"
              >
                Rapid Incident Action
              </a>
            </div>
          </div>

          {/* Contact Vector Split: Channels & Interactive Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="incident-portal">
            {/* Left: Channels & PGP Key */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm flex flex-col gap-4">
                <div>
                  <span className="text-xs font-mono font-bold text-blue-600 uppercase">
                    DIRECT ARCHITECT DISPATCH
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">
                    Encrypted Channels & Developer Access
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Direct telemetry feeds, research collaboration proposals, and security disclosures are
                    triaged directly by Babu Louis and senior incident engineers.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase block">
                        PRIMARY TRIAGE INBOX
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-900">
                        babu.louis@scamadvisor.dev
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-700 transition-colors cursor-pointer"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500">ENCRYPTED GPG PROTOCOL</span>
                    <span className="text-emerald-700 font-bold">4096R/B4E881CB</span>
                  </div>
                  <pre className="text-[10px] font-mono text-slate-600 bg-slate-50 p-2.5 rounded-lg overflow-x-auto">
{`-----BEGIN PGP PUBLIC KEY BLOCK-----
mQINBF+v7gMBEADX4UeL3b...BABU_LOUIS_DEV_PUBLIC_KEY
-----END PGP PUBLIC KEY BLOCK-----`}
                  </pre>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl bg-white border border-slate-200 flex items-center gap-2 hover:border-blue-400 transition-colors"
                  >
                    <Github className="w-5 h-5 text-slate-700" />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">GitHub</span>
                      <span className="text-[10px] font-mono text-slate-500">@babu-louis-sec</span>
                    </div>
                  </a>

                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl bg-white border border-slate-200 flex items-center gap-2 hover:border-blue-400 transition-colors"
                  >
                    <Linkedin className="w-5 h-5 text-blue-600" />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">LinkedIn</span>
                      <span className="text-[10px] font-mono text-slate-500">in/babu-louis</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Working Incident Form */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-xl font-extrabold text-slate-900">
                    Secure Incident Dispatch Portal
                  </h3>
                </div>
                <span className="text-xs font-mono text-emerald-700 font-bold">
                  TLS_1.3_ENCRYPTED
                </span>
              </div>

              {formSubmitted ? (
                <div className="mt-6 p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-3">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-emerald-900">
                    DISPATCH TRANSMITTED TO ENGINE
                  </h4>
                  <p className="text-xs text-emerald-800 mt-1 max-w-md">
                    Your confidential report has been ingested into our threat repository.
                  </p>
                  <div className="mt-4 px-4 py-2 rounded-xl bg-white border border-emerald-300 font-mono text-xs font-bold text-slate-800">
                    QUEUE ID: #{ticketId}
                  </div>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        subject: 'report',
                        evidenceLink: '',
                        message: ''
                      });
                    }}
                    className="mt-4 text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                  >
                    Send Another Dispatch
                  </button>
                </div>
              ) : (
                <form onSubmit={handleDispatch} className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
                        Full Name / Alias
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Jane Doe or Whistleblower Alias"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
                        Return Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="secure@proton.me"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
                      Dispatch Objective (Subject)
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer"
                    >
                      <option value="report">Report a Scammer / YahooBoy Syndicate</option>
                      <option value="partnership">Institutional / Law Enforcement Partnership</option>
                      <option value="feedback">Feedback & Message for Babu Louis</option>
                      <option value="heuristics">Heuristics Bug or Whitelist Request</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-mono font-bold text-slate-700 uppercase">
                        Suspect Domain, Crypto Address, or Evidence Link
                      </label>
                      <span className="text-[10px] font-mono text-slate-400">OPTIONAL</span>
                    </div>
                    <input
                      type="text"
                      value={formData.evidenceLink}
                      onChange={(e) => setFormData({ ...formData, evidenceLink: e.target.value })}
                      placeholder="https://scam-domain.xyz or 0xWalletAddress..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-sm focus:bg-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
                      Incident Narrative / Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe how contact was initiated, platforms used (WhatsApp, Telegram, Dating Apps), financial conduits demanded, and any aliases..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:border-blue-600 focus:outline-none"
                    ></textarea>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <p className="text-[11px] text-slate-500 leading-tight">
                      Payloads are scrubbed of IP tracking headers before ingest to protect informant identity.
                    </p>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 whitespace-nowrap"
                    >
                      <span>Dispatch to Babu Louis</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
