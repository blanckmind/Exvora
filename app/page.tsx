'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  PlusCircle,
  HelpCircle,
  BookOpen,
  Cpu,
  FileText,
  Ticket,
  Lightbulb,
  Gift,
  Search,
  MapPin,
  CheckCircle2,
  Calendar,
  Clock,
} from 'lucide-react';
import Hero3DVisual from '@/components/Hero3DVisual';
import ItemCard from '@/components/ItemCard';
import ExchangeModal from '@/components/ExchangeModal';
import RequestModal from '@/components/RequestModal';
import { Listing, CampusRequest, CampusEvent } from '@/lib/db/mock-data';

export default function HomePage() {
  const [recentListings, setRecentListings] = useState<Listing[]>([]);
  const [recentRequests, setRecentRequests] = useState<CampusRequest[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<CampusEvent[]>([]);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<CampusRequest | null>(null);

  useEffect(() => {
    fetch('/api/listings')
      .then((res) => res.json())
      .then((data) => setRecentListings(data.listings?.slice(0, 3) || []))
      .catch((err) => console.error(err));

    fetch('/api/requests')
      .then((res) => res.json())
      .then((data) => setRecentRequests(data.requests?.slice(0, 3) || []))
      .catch((err) => console.error(err));

    fetch('/api/events')
      .then((res) => res.json())
      .then((data) => setUpcomingEvents(data.events?.slice(0, 2) || []))
      .catch((err) => console.error(err));
  }, []);

  const categories = [
    {
      name: 'Textbooks',
      icon: BookOpen,
      count: 'Books & Reference Guides',
      color: 'from-amber-500/20 to-orange-500/10 text-amber-600 border-amber-200/80',
      description: 'Core semester engineering & sciences textbooks, lab manuals, and guides.',
      href: '/explore?category=Textbooks',
    },
    {
      name: 'Electronics',
      icon: Cpu,
      count: 'Arduino, Hubs, Accessories',
      color: 'from-cyan-500/20 to-blue-500/10 text-cyan-600 border-cyan-200/80',
      description: 'IoT sensors, USB-C adapters, cables, calculators, and hardware modules.',
      href: '/explore?category=Electronics',
    },
    {
      name: 'Notes & Study Material',
      icon: FileText,
      count: 'Handwritten & Summaries',
      color: 'from-purple-500/20 to-pink-500/10 text-purple-600 border-purple-200/80',
      description: 'Exam cram sheets, solved previous year question papers, and diagrams.',
      href: '/explore?category=Notes+%26+Study+Material',
    },
    {
      name: 'Event Tickets',
      icon: Ticket,
      count: 'Fests & Workshops',
      color: 'from-pink-500/20 to-rose-500/10 text-pink-600 border-pink-200/80',
      description: 'Milan, Aarush, pro-nights, hackathon passes, and campus event slots.',
      href: '/events',
    },
    {
      name: 'Skills',
      icon: Lightbulb,
      count: 'Peer Tutoring & Mentorship',
      color: 'from-emerald-500/20 to-teal-500/10 text-emerald-600 border-emerald-200/80',
      description: 'Learn Python, Figma, CAD drafting, web dev, or find hackathon mentors.',
      href: '/explore?category=Skills',
    },
    {
      name: 'Give Away',
      icon: Gift,
      count: 'Free Campus Donations',
      color: 'from-blue-500/20 to-indigo-500/10 text-blue-600 border-blue-200/80',
      description: 'Drafters, lab coats, stationery, and hostel essentials given away freely.',
      href: '/explore?category=Give+Away',
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* 3D HERO SECTION */}
      <section className="relative overflow-hidden pt-12 md:pt-16 pb-16 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-white border-b border-slate-800">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-600/15 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Copy & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-semibold backdrop-blur-md">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Student-Powered Campus Exchange Network</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.1]">
                What you have could be{' '}
                <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-amber-300 bg-clip-text text-transparent">
                  exactly what someone needs.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Exvora connects students with useful resources, skills, study material and event passes within their campus community.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/explore"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold px-8 py-3.5 rounded-2xl shadow-lg shadow-blue-900/40 hover:shadow-blue-600/30 transition-all text-sm group"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Explore Exvora</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/events"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold px-6 py-3.5 rounded-2xl transition-all text-sm shadow-md"
                >
                  <Ticket className="w-4 h-4 text-amber-300" />
                  <span>Book Event Passes</span>
                </Link>

                <Link
                  href="/share"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-800/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold px-6 py-3.5 rounded-2xl transition-all text-sm hover:border-slate-500"
                >
                  <PlusCircle className="w-4 h-4 text-blue-400" />
                  <span>Share</span>
                </Link>
              </div>

              {/* Quick Trust Highlights */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Verified Campus Students</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Zero Password Storage</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>100% Free Campus Exchange</span>
                </span>
              </div>
            </div>

            {/* Right Column: 3D Interactive Ecosystem Canvas */}
            <div className="lg:col-span-5 flex justify-center">
              <Hero3DVisual />
            </div>
          </div>
        </div>
      </section>

      {/* DUAL PURPOSE PILLARS: WHAT CAN I FIND & WHAT CAN I SHARE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pillar 1: What Can I Find? */}
          <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden flex flex-col justify-between space-y-6 border border-blue-800/40">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-400/30">
                <Search className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                What can I find on Exvora?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                Discover previous semester textbooks, spare electronics, handwritten exam summaries, event passes, and fellow students willing to mentor you.
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>Search by subject name, course code, or campus meetup spot</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Post an "I Need" request if you can't find what you are looking for</span>
                </li>
              </ul>
            </div>

            <Link
              href="/explore"
              className="inline-flex items-center gap-2 font-bold text-xs sm:text-sm text-blue-300 hover:text-white transition-colors"
            >
              <span>Browse Campus Marketplace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Pillar 2: What Can I Share? */}
          <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden flex flex-col justify-between space-y-6 border border-indigo-800/40">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-400/30">
                <PlusCircle className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                What can I share with others?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                Pass on items sitting in your hostel room or teach a skill you know. Offer free giveaways or barter for something you need this semester.
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>List semester textbooks, drafters, or lab equipment in under 60 seconds</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Offer peer tutoring in Python, Figma, CAD, or hackathon prep</span>
                </li>
              </ul>
            </div>

            <Link
              href="/share"
              className="inline-flex items-center gap-2 font-bold text-xs sm:text-sm text-amber-300 hover:text-white transition-colors"
            >
              <span>Share Something Today</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CORE CATEGORIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-xs uppercase font-black tracking-widest text-blue-700">Campus Taxonomy</h2>
          <h3 className="text-3xl font-black text-slate-900 tracking-tight">Explore by Category</h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Dedicated spaces designed for real student exchange needs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                href={cat.href}
                className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center border group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-lg text-slate-900 group-hover:text-blue-700 transition-colors">
                      {cat.name}
                    </h4>
                    <span className="text-[11px] font-bold text-slate-400 block mt-0.5">
                      {cat.count}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700">
                  <span>Explore category</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CAMPUS EVENTS & PASSES SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-indigo-500/30 shadow-2xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-900/60 pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-extrabold">
                <Ticket className="w-4 h-4 text-pink-400" />
                <span>Upcoming Campus Events</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                Reserve Free Passes for Fests & Hackathons
              </h3>
            </div>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-black text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-lg transition-all self-start sm:self-auto"
            >
              <span>View All Events ({upcomingEvents.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((evt) => (
              <div
                key={evt.id}
                className="bg-slate-900/90 rounded-2xl p-5 border border-indigo-900/50 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
              >
                <div className="space-y-2 min-w-0 flex-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                    {evt.category}
                  </span>
                  <h4 className="font-extrabold text-base text-white line-clamp-1">{evt.title}</h4>
                  <div className="flex items-center text-xs text-slate-300 gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      {evt.date}
                    </span>
                    <span>•</span>
                    <span className="truncate flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      {evt.venue.split(' ')[0]}
                    </span>
                  </div>
                </div>

                <Link
                  href="/events"
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-sm transition-all whitespace-nowrap"
                >
                  Book Pass &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED LIVE LISTINGS */}
      <section className="bg-slate-100/70 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Live Campus Mesh</span>
              </div>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
                Recent Exchanges on Campus
              </h3>
            </div>
            <Link
              href="/explore"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-blue-700 hover:text-blue-900"
            >
              <span>View all listings</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentListings.map((item) => (
              <ItemCard
                key={item.id}
                listing={item}
                onSelect={(listing) => setSelectedListing(listing)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* LIVE "I NEED" CAMPUS REQUESTS BOARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-800 text-[11px] font-bold">
                <HelpCircle className="w-3.5 h-3.5 text-rose-600" />
                <span>Community Needs</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                Open Campus Requests ("I Need")
              </h3>
              <p className="text-xs text-slate-500">
                Help out fellow SRM students who are searching for specific resources or tutors.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/requests/new"
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-950 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
              >
                + Post What You Need
              </Link>
              <Link
                href="/requests"
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all"
              >
                View All &rarr;
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentRequests.map((req) => (
              <div
                key={req.id}
                className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200 hover:border-blue-400 transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                      {req.category}
                    </span>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                      {req.urgency}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-900 line-clamp-2">
                    {req.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {req.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500">
                    {req.requesterName} ({req.requesterDept})
                  </span>
                  <button
                    onClick={() => setSelectedRequest(req)}
                    className="text-xs font-extrabold text-blue-700 hover:text-blue-900"
                  >
                    I Can Help &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROPOSAL & RESPONSE MODALS */}
      <ExchangeModal
        listing={selectedListing}
        isOpen={!!selectedListing}
        onClose={() => setSelectedListing(null)}
      />

      <RequestModal
        request={selectedRequest}
        isOpen={!!selectedRequest}
        onClose={() => setSelectedRequest(null)}
      />
    </div>
  );
}
