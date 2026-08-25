'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  PlusCircle,
  ShieldCheck,
  Filter,
  Sparkles,
  BookOpen,
  Cpu,
  FileText,
  Ticket,
  Lightbulb,
  Gift,
  MapPin,
  Layers,
} from 'lucide-react';
import ItemCard from '@/components/ItemCard';
import ExchangeModal from '@/components/ExchangeModal';
import EmptyState3D from '@/components/EmptyState3D';
import { Listing } from '@/lib/db/mock-data';

const CATEGORIES = [
  'All',
  'Textbooks',
  'Electronics',
  'Notes & Study Material',
  'Event Tickets',
  'Skills',
  'Give Away',
];

const MODES = ['All', 'Exchange', 'Share', 'Give Away', 'Sell'];

function ExploreContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [listings, setListings] = useState<Listing[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedMode, setSelectedMode] = useState('All');
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [isLoading, setIsLoading] = useState(true);
  const [activeModalListing, setActiveModalListing] = useState<Listing | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const fetchListings = () => {
    setIsLoading(true);
    const params = new URLSearchParams();
    if (selectedCategory !== 'All') params.set('category', selectedCategory);
    if (selectedMode !== 'All') params.set('type', selectedMode);
    if (searchQuery.trim()) params.set('search', searchQuery.trim());

    fetch(`/api/listings?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setListings(data.listings || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.authenticated) {
          setCurrentUser(data.user);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchListings();
  }, [selectedCategory, selectedMode]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchListings();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Student Welcome / Session Strip */}
      {currentUser ? (
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Verified SRM Student Session</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Explore Campus Resources
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Logged in as <span className="font-bold text-white">{currentUser.name}</span> ({currentUser.department})
            </p>
          </div>

          <div className="flex items-center gap-3 z-10">
            <Link
              href="/share"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-lg transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Share Something</span>
            </Link>
            <Link
              href="/requests"
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-2xl border border-slate-700 transition-all"
            >
              Campus Requests
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Explore Campus Resources
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Discover textbooks, hardware, study guides, event tickets, and peer skills across SRMIST.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Sign in with SRM</span>
            </Link>
            <Link
              href="/share"
              className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-4 py-2.5 rounded-xl"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Share</span>
            </Link>
          </div>
        </div>
      )}

      {/* SEARCH AND FILTERS */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, subject, Arduino, notes, Python skills, or campus location..."
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

          {/* Mode Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {MODES.map((mode) => (
              <button
                key={mode}
                onClick={() => setSelectedMode(mode)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap ${
                  selectedMode === mode
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {mode === 'Give Away' ? 'Free Giveaway' : mode}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                selectedCategory === cat
                  ? 'bg-blue-700 text-white shadow-md shadow-blue-700/25'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span>{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* LISTINGS GRID / 3D EMPTY STATE */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-3xl border border-slate-200 p-5 space-y-4 animate-pulse">
              <div className="h-44 bg-slate-100 rounded-2xl" />
              <div className="h-4 bg-slate-100 rounded w-3/4" />
              <div className="h-3 bg-slate-100 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : listings.length === 0 ? (
        <EmptyState3D
          title="No resources found"
          description="Try broadening your search term or exploring a different category."
          actionText="Clear Filters"
          onAction={() => {
            setSelectedCategory('All');
            setSelectedMode('All');
            setSearchQuery('');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <ItemCard
              key={listing.id}
              listing={listing}
              onSelect={(selected) => setActiveModalListing(selected)}
            />
          ))}
        </div>
      )}

      {/* Interactive Exchange Proposal Modal */}
      <ExchangeModal
        listing={activeModalListing}
        isOpen={!!activeModalListing}
        onClose={() => setActiveModalListing(null)}
      />
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
        </div>
      }
    >
      <ExploreContent />
    </Suspense>
  );
}
