'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Repeat,
  Package,
  Inbox,
  Send,
  PlusCircle,
  ShieldCheck,
  MapPin,
  Trash2,
  CheckCircle,
  Clock,
  Phone,
  MessageSquare,
  Ticket,
  Calendar,
  Share2,
  Sparkles,
} from 'lucide-react';
import { Listing, CampusRequest, ExchangeProposal, EventBooking } from '@/lib/db/mock-data';
import PassTicketModal from '@/components/PassTicketModal';
import EmptyState3D from '@/components/EmptyState3D';

export default function MyExchangesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'received' | 'listings' | 'passes' | 'sent'>('received');
  const [myListings, setMyListings] = useState<Listing[]>([]);
  const [receivedRequests, setReceivedRequests] = useState<ExchangeProposal[]>([]);
  const [sentRequests, setSentRequests] = useState<ExchangeProposal[]>([]);
  const [myBookings, setMyBookings] = useState<EventBooking[]>([]);
  const [activePassToTransfer, setActivePassToTransfer] = useState<EventBooking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  const fetchExchangeData = () => {
    setIsLoading(true);
    fetch('/api/exchanges/my')
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401) {
            router.push('/login?redirect=/my-exchanges');
            return null;
          }
          throw new Error('Failed to fetch data');
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setMyListings(data.myListings || []);
          setReceivedRequests(data.received || []);
          setSentRequests(data.sent || []);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
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
          setUser(data.user);
        } else {
          router.push('/login?redirect=/my-exchanges');
        }
      });

    fetchExchangeData();
    fetchMyBookings();
  }, [router]);

  const handleDeleteListing = async (listingId: string) => {
    if (!confirm('Are you sure you want to delete this listing?')) return;
    try {
      const res = await fetch(`/api/listings/${listingId}`, { method: 'DELETE' });
      if (res.ok) {
        setMyListings((prev) => prev.filter((l) => l.id !== listingId));
      }
    } catch (err) {
      console.error('Delete error', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-black tracking-widest text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded">
              Activity Hub
            </span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
            My Exchanges &amp; Passes
          </h1>
          <p className="text-xs text-slate-500">
            Track student barter offers, resource listings, and event passes you can transfer.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-pink-50 hover:bg-pink-100 text-pink-700 font-extrabold text-xs rounded-xl border border-pink-200 shadow-sm transition-all"
          >
            <Ticket className="w-4 h-4 text-pink-500" />
            <span>Event Passes ({myBookings.length})</span>
          </Link>

          <Link
            href="/share"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-700/20 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Share Resource / Skill</span>
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-px">
        <button
          onClick={() => setActiveTab('received')}
          className={`pb-3 px-4 font-black text-xs sm:text-sm flex items-center gap-2 transition-colors relative whitespace-nowrap ${
            activeTab === 'received'
              ? 'text-blue-700 border-b-2 border-blue-700'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Inbox className="w-4 h-4" />
          <span>Received Offers ({receivedRequests.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('passes')}
          className={`pb-3 px-4 font-black text-xs sm:text-sm flex items-center gap-2 transition-colors relative whitespace-nowrap ${
            activeTab === 'passes'
              ? 'text-blue-700 border-b-2 border-blue-700'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Ticket className="w-4 h-4 text-pink-600" />
          <span>My Event Passes ({myBookings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('listings')}
          className={`pb-3 px-4 font-black text-xs sm:text-sm flex items-center gap-2 transition-colors relative whitespace-nowrap ${
            activeTab === 'listings'
              ? 'text-blue-700 border-b-2 border-blue-700'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>My Shared Items ({myListings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('sent')}
          className={`pb-3 px-4 font-black text-xs sm:text-sm flex items-center gap-2 transition-colors relative whitespace-nowrap ${
            activeTab === 'sent'
              ? 'text-blue-700 border-b-2 border-blue-700'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Send className="w-4 h-4" />
          <span>Sent Proposals ({sentRequests.length})</span>
        </button>
      </div>

      {/* TAB CONTENT: MY PASSES */}
      {activeTab === 'passes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">
              Confirmed Digital Entry Passes
            </span>
            <span className="text-xs text-slate-500">
              Can't attend? Transfer directly or list on campus exchange
            </span>
          </div>

          {myBookings.length === 0 ? (
            <EmptyState3D
              title="No event passes booked yet"
              description="Browse the campus events box office to reserve tickets for Milan, HackSRM, RoboWars, and more."
              actionText="Browse Campus Events"
              actionHref="/events"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myBookings.map((bkg) => (
                <div
                  key={bkg.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 relative overflow-hidden"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-black tracking-widest text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                        {bkg.ticketType}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-800">{bkg.bookingCode}</span>
                    </div>

                    <h3 className="font-black text-sm text-slate-900">{bkg.eventTitle}</h3>

                    <div className="text-xs text-slate-500 space-y-1">
                      <p className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-500" />
                        <span>{bkg.eventDate} • {bkg.eventTime}</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-blue-500" />
                        <span className="truncate">{bkg.eventVenue}</span>
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span className="text-xs text-slate-700 font-bold">
                      ₹{bkg.totalPrice || 0} ({bkg.ticketCount} Seat{bkg.ticketCount > 1 ? 's' : ''})
                    </span>

                    <button
                      onClick={() => setActivePassToTransfer(bkg)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white rounded-xl text-xs font-black shadow-sm transition-all"
                    >
                      <Share2 className="w-3.5 h-3.5 text-amber-300" />
                      <span>Pass to Student</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: RECEIVED */}
      {activeTab === 'received' && (
        <div className="space-y-4">
          {receivedRequests.length === 0 ? (
            <EmptyState3D
              title="No exchange offers received yet"
              description="When other students send a barter offer or borrow request on your items, they will appear here."
              actionText="Share More Resources"
              actionHref="/share"
            />
          ) : (
            <div className="space-y-4">
              {receivedRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                        Proposal For:
                      </span>
                      <h4 className="font-extrabold text-sm text-slate-900">
                        {req.listingTitle || 'Resource'}
                      </h4>
                    </div>
                    <span className="text-[11px] font-bold text-slate-500">
                      From: <span className="text-blue-700">{req.senderName}</span> ({req.senderDept})
                    </span>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl space-y-2 text-xs">
                    <p className="text-slate-700 font-medium italic">"{req.message}"</p>
                    {req.offeredItemOrSkill && (
                      <div className="pt-1 flex items-center gap-1 text-blue-700 font-bold">
                        <Repeat className="w-3.5 h-3.5" />
                        <span>Offered: {req.offeredItemOrSkill}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{req.contactNumber || 'Contact shared via SRM email'}</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                      {req.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: MY SHARED LISTINGS */}
      {activeTab === 'listings' && (
        <div className="space-y-4">
          {myListings.length === 0 ? (
            <EmptyState3D
              title="No items listed yet"
              description="Share unused textbooks, electronics, study notes, or skills with your fellow students."
              actionText="Create New Listing"
              actionHref="/share"
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {myListings.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between"
                >
                  <div className="h-40 bg-slate-100 relative">
                    <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] font-extrabold px-2 py-0.5 rounded backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-4 space-y-2">
                    <h3 className="font-extrabold text-sm text-slate-900 line-clamp-1">{item.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{item.description}</p>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="truncate">{item.location}</span>
                    </p>
                  </div>

                  <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-between text-xs mt-2">
                    <span className="font-bold text-blue-700">{item.exchangeType}</span>
                    <button
                      onClick={() => handleDeleteListing(item.id)}
                      className="text-red-500 hover:text-red-700 p-1 rounded transition-colors"
                      title="Delete Listing"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: SENT PROPOSALS */}
      {activeTab === 'sent' && (
        <div className="space-y-4">
          {sentRequests.length === 0 ? (
            <EmptyState3D
              title="No proposals sent yet"
              description="Browse the marketplace and propose an exchange or borrow request on items you need."
              actionText="Explore Marketplace"
              actionHref="/explore"
            />
          ) : (
            <div className="space-y-3">
              {sentRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm"
                >
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-sm text-slate-900">
                      {req.listingTitle || 'Resource'}
                    </h4>
                    <p className="text-xs text-slate-600 italic">"{req.message}"</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-blue-50 text-blue-700 border border-blue-200">
                      {req.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Pass Ticket Modal */}
      <PassTicketModal
        booking={activePassToTransfer}
        isOpen={!!activePassToTransfer}
        onClose={() => setActivePassToTransfer(null)}
        onSuccess={() => {
          fetchMyBookings();
          fetchExchangeData();
        }}
      />
    </div>
  );
}
