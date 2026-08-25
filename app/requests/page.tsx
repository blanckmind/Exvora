'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  HelpCircle,
  PlusCircle,
  Search,
  ShieldCheck,
  MapPin,
  Clock,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Filter,
} from 'lucide-react';
import RequestModal from '@/components/RequestModal';
import EmptyState3D from '@/components/EmptyState3D';
import { CampusRequest } from '@/lib/db/mock-data';

const CATEGORIES = [
  'All',
  'Textbooks',
  'Electronics',
  'Notes & Study Material',
  'Event Tickets',
  'Skills',
  'Give Away',
];

const URGENCIES = ['All', 'Urgent (Today)', 'This Week', 'General'];

function RequestsContent() {
  const searchParams = useSearchParams();
  const respondParam = searchParams.get('respond');

  const [requests, setRequests] = useState<CampusRequest[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedUrgency, setSelectedUrgency] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [activeModalRequest, setActiveModalRequest] = useState<CampusRequest | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const fetchRequests = () => {
    setIsLoading(true);
    const params = new URLSearchParams();
    if (selectedCategory !== 'All') params.set('category', selectedCategory);
    if (selectedUrgency !== 'All') params.set('urgency', selectedUrgency);
    if (searchQuery.trim()) params.set('search', searchQuery.trim());

    fetch(`/api/requests?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        const reqList: CampusRequest[] = data.requests || [];
        setRequests(reqList);

        if (respondParam) {
          const match = reqList.find((r) => r.id === respondParam);
          if (match) setActiveModalRequest(match);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.authenticated) setCurrentUser(data.user);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [selectedCategory, selectedUrgency]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRequests();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-extrabold">
            <HelpCircle className="w-4 h-4 text-rose-400" />
            <span>Campus "I Need" Board</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            What Students Need Right Now
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            See what your fellow SRM students are looking for. Have what they need? Click "I Can Help" to connect and trade.
          </p>
        </div>

        <div className="flex items-center gap-3 z-10">
          <Link
            href="/requests/new"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-lg transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post a Request</span>
          </Link>
        </div>
      </div>

      {/* SEARCH AND FILTERS */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search requests for textbooks, lab drafters, SIH UI/UX mentor, calculators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-28 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm"
            />
            <button
              type="submit"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
            >
              Search
            </button>
          </form>

          {/* Urgency Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {URGENCIES.map((urgency) => (
              <button
                key={urgency}
                onClick={() => setSelectedUrgency(urgency)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap ${
                  selectedUrgency === urgency
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {urgency}
              </button>
            ))}
          </div>
        </div>

        {/* Category Horizontal Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-blue-700 text-white shadow-md shadow-blue-700/25'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* REQUESTS LIST / 3D EMPTY STATE */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 animate-pulse">
              <div className="h-6 bg-slate-100 rounded w-1/3" />
              <div className="h-4 bg-slate-100 rounded w-3/4" />
              <div className="h-3 bg-slate-100 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : requests.length === 0 ? (
        <EmptyState3D
          title="No open campus requests found"
          description="Have something you need? Post the first request to ask fellow SRM students."
          actionText="Post What You Need"
          actionHref="/requests/new"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-white rounded-3xl border border-slate-200 hover:border-blue-500/80 shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-blue-50 text-blue-800 px-2.5 py-1 rounded-md border border-blue-100">
                    {req.category}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                      req.urgency === 'Urgent (Today)'
                        ? 'bg-rose-100 text-rose-800 border-rose-200 animate-pulse'
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}
                  >
                    {req.urgency}
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                  {req.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {req.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center text-xs text-slate-500 gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{req.location}</span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-6 h-6 rounded-lg bg-blue-700 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                      {req.requesterName.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-slate-800 truncate">{req.requesterName}</span>
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                      </div>
                      <span className="text-[10px] text-slate-400 block truncate">{req.requesterDept}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveModalRequest(req)}
                    className="px-3.5 py-2 text-xs font-bold rounded-xl bg-blue-700 text-white hover:bg-blue-800 shadow-sm flex-shrink-0 transition-all"
                  >
                    I Can Help &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Response Modal */}
      <RequestModal
        request={activeModalRequest}
        isOpen={!!activeModalRequest}
        onClose={() => setActiveModalRequest(null)}
        onSuccess={() => fetchRequests()}
      />
    </div>
  );
}

export default function RequestsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
        </div>
      }
    >
      <RequestsContent />
    </Suspense>
  );
}
