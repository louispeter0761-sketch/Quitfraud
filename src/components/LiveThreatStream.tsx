import React, { useState, useEffect } from 'react';
import { ShieldAlert, ShieldCheck, AlertOctagon, Filter, Search, ArrowUpRight, Activity } from 'lucide-react';
import { ThreatItem } from '../types';

interface LiveThreatStreamProps {
  onCheckScam: (target: string) => void;
  onOpenReportModal: () => void;
}

export const LiveThreatStream: React.FC<LiveThreatStreamProps> = ({ onCheckScam, onOpenReportModal }) => {
  const [threats, setThreats] = useState<ThreatItem[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchThreats();
  }, []);

  const fetchThreats = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/threats');
      const data = await res.json();
      if (data.threats) {
        setThreats(data.threats);
      }
    } catch (e) {
      console.warn('Failed to fetch threats', e);
    } finally {
      setLoading(false);
    }
  };

  const filteredThreats = threats.filter((item) => {
    const matchesCategory =
      selectedFilter === 'all' ||
      item.category.toLowerCase().includes(selectedFilter.toLowerCase()) ||
      (selectedFilter === 'scam' && item.scamPercent >= 50);

    const matchesSearch =
      item.target.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.type.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.details.toLowerCase().includes(searchFilter.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-mono font-bold uppercase text-emerald-700">
              LIVE_FEED::GLOBAL_INGEST • SOC_TELEMETRY
            </span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Real-Time Threat Intelligence Stream
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Live machine-learning sync indexing fraudulent syndicate bank drops, credential harvesters, and
            reported 419 conduits across the globe.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchThreats}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
          >
            Refresh Stream
          </button>
          <button
            onClick={onOpenReportModal}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-600/20 transition-all cursor-pointer"
          >
            Report a Scam Target
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {[
            { id: 'all', label: 'All Feeds' },
            { id: 'advance_fee', label: '419 Upfront Fee' },
            { id: 'phishing', label: 'Phishing' },
            { id: 'crypto_drainer', label: 'Crypto Drainers' },
            { id: 'romance', label: 'Romance Catfish' },
            { id: 'legitimate', label: 'Verified Safe' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedFilter(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedFilter === cat.id
                  ? 'bg-blue-600 text-white shadow-xs font-bold'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Filter domains or details..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono focus:border-blue-600 focus:outline-none"
          />
        </div>
      </div>

      {/* Threat Stream List */}
      <div className="mt-6 space-y-3">
        {loading ? (
          <div className="p-12 text-center text-sm font-mono text-slate-500">
            Connecting to SOC intercept queue...
          </div>
        ) : filteredThreats.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
            No threat records match your filter criteria.
          </div>
        ) : (
          filteredThreats.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    item.scamPercent > 50
                      ? 'bg-red-50 border border-red-200 text-red-600'
                      : 'bg-emerald-50 border border-emerald-200 text-emerald-600'
                  }`}
                >
                  {item.scamPercent > 50 ? (
                    <ShieldAlert className="w-5 h-5" />
                  ) : (
                    <ShieldCheck className="w-5 h-5" />
                  )}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-sm font-extrabold text-slate-900">
                      {item.target}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        item.status === 'BLOCKED'
                          ? 'bg-red-100 text-red-800'
                          : item.status === 'DEFLECTED'
                          ? 'bg-amber-100 text-amber-800'
                          : item.status === 'VERIFIED_SAFE'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {item.status}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{item.timestamp}</span>
                  </div>

                  <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
                    {item.details}
                  </p>

                  <div className="flex items-center gap-4 mt-2 text-[11px] font-mono text-slate-500">
                    <span>TYPE: {item.type}</span>
                    <span>•</span>
                    <span>ORIGIN: {item.location}</span>
                  </div>
                </div>
              </div>

              {/* Score & Action Button */}
              <div className="flex sm:flex-col items-end gap-2 shrink-0 self-end md:self-center">
                <div className="text-right">
                  <span
                    className={`font-mono text-lg font-black ${
                      item.scamPercent > 50 ? 'text-red-600' : 'text-emerald-600'
                    }`}
                  >
                    {item.scamPercent > 50
                      ? `${item.scamPercent}% Threat`
                      : `${item.legitPercent}% Safe`}
                  </span>
                </div>

                <button
                  onClick={() => onCheckScam(item.target)}
                  className="px-3.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Forensic Audit</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
