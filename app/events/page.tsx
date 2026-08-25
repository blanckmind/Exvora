'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  MapPin,
  Ticket,
  Search,
  Users,
  ShieldCheck,
  Sparkles,
  QrCode,
  ArrowRight,
  Flame,
  CheckCircle2,
  Share2,
  Tag,
  Gift,
  ArrowRightLeft,
} from 'lucide-react';
import BookingModal from '@/components/BookingModal';
import PassTicketModal from '@/components/PassTicketModal';
import ExchangeModal from '@/components/ExchangeModal';
import EmptyState3D from '@/components/EmptyState3D';
import { CampusEvent, EventBooking, Listing } from '@/lib/db/mock-data';

const CATEGORIES = [
  'All',
  'Concert / Pro-Night',
  'Technical / Hackathon',
  'Workshop / Seminar',
  'Cultural Fest',
  'Sports / E-Sports',
];

function EventsContent() {
  const [events, setEvents] = useState<CampusEvent[]>([]);
  const [passListings, setPassListings] = useState<Listing[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  // Modals state
  const [activeModalEvent, setActiveModalEvent] = useState<CampusEvent | null>(null);
  const [activePassToTransfer, setActivePassToTransfer] = useState<EventBooking | null>(null);
  const [activeExchangeItem, setActiveExchangeItem] = useState<Listing | null>(null);
  
  const [myBookings, setMyBookings] = useState<EventBooking[]>([]);
  const [showMyPasses, setShowMyPasses] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const fetchEvents = () => {
    setIsLoading(true);
    const params = new URLSearchParams();
    if (selectedCategory !== 'All') params.set('category', selectedCategory);
    if (searchQuery.trim()) params.set('search', searchQuery.trim());

    fetch(`/api/events?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.events || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  const fetchStudentPasses = () => {
    fetch('/api/listings?category=Event+Tickets')
      .then((res) => res.json())
      .then((data) => {
        setPassListings(data.listings || []);
      })
      .catch(() => {});
  };

  const fetchMyBookings = () => {
    fetch('/api/events/my-bookings')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.bookings) {
          setMyBookings(data.bookings);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.authenticated) {
          setCurrentUser(data.user);
          fetchMyBookings();
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchEvents();
    fetchStudentPasses();
  }, [selectedCategory]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchEvents();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-extrabold">
            <Ticket className="w-4 h-4 text-pink-400" />
            <span>Campus Event Box Office &amp; Pass Exchange</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
            Campus Events &amp; Student Passes
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Reserve official passes for Milan, Aarush, HackSRM, and E-Sports, or pass on unused tickets to fellow students if you can't attend!
          </p>
        </div>

        {currentUser && (
          <div className="flex items-center gap-3 z-10">
            <button
              onClick={() => setShowMyPasses(!showMyPasses)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-lg transition-all"
            >
              <QrCode className="w-4 h-4" />
              <span>{showMyPasses ? 'Hide My Passes' : `My Passes (${myBookings.length})`}</span>
            </button>
          </div>
        )}
      </div>

      {/* MY BOOKED PASSES & TRANSFER DRAWER */}
      {showMyPasses && (
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 border border-indigo-500/30 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <QrCode className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-black tracking-tight">My Confirmed Student Entry Passes</h2>
            </div>
            <span className="text-xs text-amber-300 font-semibold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              💡 Can't attend an event? Click "Pass to Student" to transfer or trade!
            </span>
          </div>

          {myBookings.length === 0 ? (
            <p className="text-xs text-slate-400 py-4">You haven't booked any event passes yet. Browse below to reserve your slot.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myBookings.map((bkg) => (
                <div
                  key={bkg.id}
                  className="bg-slate-950 p-5 rounded-2xl border border-indigo-900/60 flex flex-col justify-between space-y-4 relative overflow-hidden"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-black tracking-widest text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                        {bkg.ticketType}
                      </span>
                      <span className="text-xs font-mono font-bold text-indigo-300">{bkg.bookingCode}</span>
                    </div>

                    <h3 className="font-extrabold text-sm text-white">{bkg.eventTitle}</h3>

                    <div className="text-xs text-slate-300 space-y-1">
                      <p className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span>{bkg.eventDate} • {bkg.eventTime}</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="truncate">{bkg.eventVenue}</span>
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-900 flex items-center justify-between gap-2">
                    <span className="text-xs text-slate-400">
                      Paid: <span className="text-emerald-400 font-bold">₹{bkg.totalPrice || 0}</span> ({bkg.ticketCount} Seat{bkg.ticketCount > 1 ? 's' : ''})
                    </span>

                    {/* CAN'T ATTEND PASS BUTTON */}
                    <button
                      onClick={() => setActivePassToTransfer(bkg)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-black shadow-md transition-all group"
                    >
                      <Share2 className="w-3.5 h-3.5 text-amber-300 group-hover:scale-110 transition-transform" />
                      <span>Pass to Student</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* STUDENT PASS EXCHANGE (CAN'T ATTEND HAND-OFFS) */}
      {passListings.length > 0 && (
        <div className="bg-gradient-to-br from-amber-50/70 via-orange-50/50 to-amber-100/40 rounded-3xl border border-amber-200/80 p-6 sm:p-8 space-y-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-amber-500 text-slate-950 rounded-lg">
                  <Share2 className="w-4 h-4" />
                </span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  Student Pass Hand-Offs (Can't Attend)
                </h2>
              </div>
              <p className="text-xs text-slate-600">
                Passes put up by students who have exam or schedule conflicts and are passing them to peers
              </p>
            </div>

            <Link
              href="/explore?category=Event+Tickets"
              className="text-xs font-bold text-amber-900 hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              <span>View all on Marketplace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {passListings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-2xl border border-amber-200 p-5 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md transition-all"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300/60">
                      {listing.exchangeType === 'Give Away'
                        ? 'Free Pass'
                        : listing.exchangeType === 'Exchange'
                        ? 'Barter Trade'
                        : `₹${listing.price || 0}`}
                    </span>
                    <span className="text-[11px] text-slate-500 font-bold">
                      {listing.sellerName} ({listing.sellerDept.split(' ')[0]})
                    </span>
                  </div>

                  <h3 className="font-extrabold text-sm text-slate-900 leading-snug line-clamp-2">
                    {listing.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {listing.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-500 truncate">
                    📍 {listing.location}
                  </span>

                  <button
                    onClick={() => setActiveExchangeItem(listing)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-sm transition-all"
                  >
                    <span>Request Pass</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SEARCH AND CATEGORY FILTERS */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          <form onSubmit={handleSearchSubmit} className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search campus events (Milan, Aarush, HackSRM, RoboWars, E-Sports, Figma, CTF)..."
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

          {/* Category Filter Horizontal Scroll */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2.5 rounded-2xl text-xs font-extrabold transition-all whitespace-nowrap ${
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
      </div>

      {/* EVENTS BOX OFFICE GRID */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 animate-pulse">
              <div className="h-44 bg-slate-100 rounded-2xl" />
              <div className="h-5 bg-slate-100 rounded w-1/2" />
              <div className="h-4 bg-slate-100 rounded w-3/4" />
            </div>
          ))}
        </div>
      ) : events.length === 0 ? (
        <EmptyState3D
          title="No campus events found"
          description="Check back soon or search with different keywords for upcoming fests and workshops."
          actionText="Browse Marketplace"
          actionHref="/explore"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((evt) => {
            const seatsPercent = Math.round(((evt.totalSeats - evt.availableSeats) / evt.totalSeats) * 100);
            return (
              <div
                key={evt.id}
                className="bg-white rounded-3xl border border-slate-200 hover:border-blue-500/80 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Event Visual Banner */}
                  <div className="h-52 relative overflow-hidden bg-slate-950">
                    <img
                      src={evt.image}
                      alt={evt.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider bg-slate-900/90 text-amber-400 px-3 py-1 rounded-full backdrop-blur-md border border-slate-700">
                        {evt.category}
                      </span>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider bg-rose-500 text-white px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                        <Flame className="w-3 h-3" /> {evt.status}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-white text-xs">
                      <span className="font-bold flex items-center gap-1.5 bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-md">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        {evt.date}
                      </span>
                      <span className="font-mono text-[11px] bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-md text-cyan-300">
                        {evt.time}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                          {evt.organizer}
                        </span>
                        <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
                          {evt.ticketType}
                        </span>
                      </div>

                      <h3 className="font-black text-lg text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                        {evt.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {evt.description}
                      </p>
                    </div>

                    <div className="space-y-2.5 pt-2">
                      <div className="flex items-center text-xs text-slate-600 gap-1.5">
                        <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span className="truncate">{evt.venue}</span>
                      </div>

                      {/* Capacity Progress Bar */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3 text-slate-400" />
                            <span>{seatsPercent}% Booked</span>
                          </span>
                          <span className="font-bold text-slate-700">
                            {evt.availableSeats} passes left
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              seatsPercent > 80 ? 'bg-rose-500' : 'bg-blue-600'
                            }`}
                            style={{ width: `${seatsPercent}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Student Ticket Price</span>
                    <span className="text-lg font-black text-emerald-700">
                      ₹{evt.price} <span className="text-xs text-slate-400 font-medium">/ pass</span>
                    </span>
                  </div>

                  <button
                    onClick={() => setActiveModalEvent(evt)}
                    disabled={evt.availableSeats === 0}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all group-hover:scale-105 disabled:opacity-50"
                  >
                    <Ticket className="w-4 h-4 text-amber-300" />
                    <span>{evt.availableSeats === 0 ? 'Sold Out' : `Book for ₹${evt.price}`}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Booking Modal */}
      <BookingModal
        event={activeModalEvent}
        isOpen={!!activeModalEvent}
        onClose={() => setActiveModalEvent(null)}
        onSuccess={() => {
          fetchEvents();
          fetchMyBookings();
        }}
      />

      {/* Pass Ticket Modal (Transfer / Can't Attend) */}
      <PassTicketModal
        booking={activePassToTransfer}
        isOpen={!!activePassToTransfer}
        onClose={() => setActivePassToTransfer(null)}
        onSuccess={() => {
          fetchMyBookings();
          fetchStudentPasses();
        }}
      />

      {/* Exchange Modal (Claim Pass from Student) */}
      <ExchangeModal
        listing={activeExchangeItem}
        isOpen={!!activeExchangeItem}
        onClose={() => setActiveExchangeItem(null)}
        onSuccess={() => {
          fetchStudentPasses();
        }}
      />
    </div>
  );
}

export default function EventsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
        </div>
      }
    >
      <EventsContent />
    </Suspense>
  );
}
