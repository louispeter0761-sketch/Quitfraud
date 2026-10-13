import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ScamAnalyzer } from './components/ScamAnalyzer';
import { SyndicateTactics } from './components/SyndicateTactics';
import { AboutView } from './components/AboutView';
import { LiveThreatStream } from './components/LiveThreatStream';
import { ReportModal } from './components/ReportModal';
import { Footer } from './components/Footer';
import { ActiveTab } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'scamcheck' | 'threats' | 'about'>('home');
  const [prefilledQuery, setPrefilledQuery] = useState('');
  const [prefilledTab, setPrefilledTab] = useState<ActiveTab>('url');
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportTarget, setReportTarget] = useState('');

  const handleStartScan = (query: string = '', tab: ActiveTab = 'url') => {
    setPrefilledQuery(query);
    setPrefilledTab(tab);
    setCurrentView('scamcheck');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenReportModal = (target: string = '') => {
    setReportTarget(target);
    setReportModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenReportModal={() => handleOpenReportModal()}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {currentView === 'home' && (
          <>
            <HeroSection
              onStartScan={handleStartScan}
              onNavigateAbout={() => {
                setCurrentView('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* In-Home ScamCheck Engine Section */}
            <div className="bg-slate-50 py-12 border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
                  <span className="text-xs font-mono font-bold uppercase text-blue-700">
                    CONSOLE::SCANNER_V3 • HEURISTIC PAYLOAD VALIDATION
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Inspect Suspect URLs, Files, Wallets, or Audio Notes
                </h2>
              </div>
              <ScamAnalyzer
                initialQuery={prefilledQuery}
                initialTab={prefilledTab}
                onOpenReportModal={handleOpenReportModal}
              />
            </div>

            <SyndicateTactics
              onCheckScam={(target) => handleStartScan(target || '', 'url')}
            />
          </>
        )}

        {currentView === 'scamcheck' && (
          <div className="py-8 bg-slate-50 min-h-[calc(100vh-140px)]">
            <ScamAnalyzer
              initialQuery={prefilledQuery}
              initialTab={prefilledTab}
              onOpenReportModal={handleOpenReportModal}
            />
          </div>
        )}

        {currentView === 'threats' && (
          <div className="py-6 bg-slate-50 min-h-[calc(100vh-140px)]">
            <LiveThreatStream
              onCheckScam={(target) => handleStartScan(target, 'url')}
              onOpenReportModal={() => handleOpenReportModal()}
            />
          </div>
        )}

        {currentView === 'about' && (
          <AboutView
            onCheckScam={() => handleStartScan()}
          />
        )}
      </main>

      {/* Anonymous Report Modal */}
      <ReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        defaultTarget={reportTarget}
      />

      {/* Global Corporate Footer */}
      <Footer
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
