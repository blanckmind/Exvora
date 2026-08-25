'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  X,
  Send,
  Share2,
  Gift,
  ArrowRightLeft,
  Tag,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  QrCode,
  Calendar,
  MapPin,
  Sparkles,
  UserCheck,
} from 'lucide-react';
import { EventBooking } from '@/lib/db/mock-data';
import { MOCK_STUDENTS } from '@/lib/auth/mock';

interface PassTicketModalProps {
  booking: EventBooking | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PassTicketModal({
  booking,
  isOpen,
  onClose,
  onSuccess,
}: PassTicketModalProps) {
  if (!isOpen || !booking) return null;

  const [mode, setMode] = useState<'direct' | 'marketplace'>('direct');
  
  // Direct Transfer state
  const [targetIdentifier, setTargetIdentifier] = useState('');
  const [transferReason, setTransferReason] = useState('Schedule clash / Exam prep — giving my pass to you!');

  // Marketplace listing state
  const [exchangeType, setExchangeType] = useState<'Give Away' | 'Exchange' | 'Sell'>('Give Away');
  const [resalePrice, setResalePrice] = useState<number>(booking.totalPrice || 0);
  const [preferredItem, setPreferredItem] = useState('');
  const [marketplaceNotes, setMarketplaceNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<any>(null);

  const handleDirectTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/events/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: booking.id,
          targetIdentifier,
          reason: transferReason,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to transfer ticket.');
      }

      setSuccessData({
        type: 'direct',
        message: data.message,
        booking: data.updatedBooking,
      });
      onSuccess();
    } catch (err: any) {
      setErrorMsg(err.message || 'Could not transfer pass.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMarketplacePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/events/list-pass', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: booking.id,
          exchangeType,
          price: exchangeType === 'Sell' ? resalePrice : 0,
          preferredExchangeItem: exchangeType === 'Exchange' ? preferredItem : undefined,
          notes: marketplaceNotes,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to post to exchange.');
      }

      setSuccessData({
        type: 'marketplace',
        message: data.message,
        listing: data.listing,
      });
      onSuccess();
    } catch (err: any) {
      setErrorMsg(err.message || 'Could not list pass on exchange.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* MODAL HEADER */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-950 to-indigo-950 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight">
                Can't Attend? Pass Ticket to Fellow Student
              </h2>
              <p className="text-xs text-slate-300">
                Transfer your confirmed pass directly or list on campus exchange
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* TICKET SUMMARY STRIP */}
        <div className="bg-slate-50 border-b border-slate-200 p-4 px-6 flex items-center justify-between gap-4">
          <div className="space-y-0.5 min-w-0">
            <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
              {booking.ticketType}
            </span>
            <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 truncate">
              {booking.eventTitle}
            </h4>
            <p className="text-[11px] text-slate-500 flex items-center gap-2">
              <span>{booking.eventDate} • {booking.eventTime}</span>
              <span>•</span>
              <span className="font-mono text-blue-600 font-bold">{booking.bookingCode}</span>
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <span className="text-xs font-bold text-slate-700 block">
              {booking.ticketCount} Pass{booking.ticketCount > 1 ? 'es' : ''}
            </span>
            <span className="text-xs font-extrabold text-emerald-700">₹{booking.totalPrice || 0}</span>
          </div>
        </div>

        {/* MODAL BODY */}
        <div className="p-6 overflow-y-auto space-y-5">
          {errorMsg && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-2.5 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successData ? (
            <div className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900">Pass Transferred Successfully!</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">{successData.message}</p>
              </div>

              {successData.type === 'direct' && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left max-w-sm mx-auto text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">New Ticket Holder:</span>
                    <span className="font-bold text-slate-900">{successData.booking.userName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Register Number:</span>
                    <span className="font-mono text-slate-800">{successData.booking.userSubjectId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">New Pass QR Code:</span>
                    <span className="font-mono font-extrabold text-blue-700">{successData.booking.bookingCode}</span>
                  </div>
                </div>
              )}

              {successData.type === 'marketplace' && (
                <div className="pt-2">
                  <Link
                    href="/explore"
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-blue-700 text-white rounded-xl font-bold text-xs shadow-md"
                  >
                    <span>View in Campus Marketplace</span>
                  </Link>
                </div>
              )}

              <div className="pt-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs rounded-xl transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* MODE SELECTOR */}
              <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl gap-1">
                <button
                  type="button"
                  onClick={() => setMode('direct')}
                  className={`py-2.5 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 ${
                    mode === 'direct'
                      ? 'bg-white text-blue-700 shadow-sm border border-slate-200/80'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transfer to Student</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMode('marketplace')}
                  className={`py-2.5 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 ${
                    mode === 'marketplace'
                      ? 'bg-white text-blue-700 shadow-sm border border-slate-200/80'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Share2 className="w-3.5 h-3.5 text-amber-500" />
                  <span>Post to Campus Exchange</span>
                </button>
              </div>

              {/* OPTION 1: DIRECT STUDENT TRANSFER */}
              {mode === 'direct' && (
                <form onSubmit={handleDirectTransfer} className="space-y-4">
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                      Recipient Student Register No. or SRM Email *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. RA2211003010142 or student@srmist.edu.in"
                      value={targetIdentifier}
                      onChange={(e) => setTargetIdentifier(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  {/* Quick Student Suggestions */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-500">Quick Select Classmate:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {MOCK_STUDENTS.slice(0, 4).map((s) => (
                        <button
                          key={s.srmSubjectId}
                          type="button"
                          onClick={() => setTargetIdentifier(s.srmSubjectId)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 border border-slate-200 rounded-lg text-[11px] font-medium text-slate-700 transition-colors"
                        >
                          {s.name} ({s.department.split(' ')[0]})
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                      Transfer Note / Message (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={transferReason}
                      onChange={(e) => setTransferReason(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-800 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>
                      Pass ownership will transfer immediately. Your existing QR pass will be invalidated and a fresh entry code will be assigned to the recipient student.
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !targetIdentifier.trim()}
                    className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Transferring Pass...' : 'Transfer Pass Instantly'}</span>
                  </button>
                </form>
              )}

              {/* OPTION 2: POST ON CAMPUS EXCHANGE */}
              {mode === 'marketplace' && (
                <form onSubmit={handleMarketplacePost} className="space-y-4">
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                      Exchange Mode
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setExchangeType('Give Away')}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          exchangeType === 'Give Away'
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-1 ring-emerald-600'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <Gift className="w-4 h-4 mx-auto mb-1 text-emerald-600" />
                        <span className="font-extrabold text-xs block">Free Giveaway</span>
                        <span className="text-[10px] text-slate-500">To any student</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setExchangeType('Exchange')}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          exchangeType === 'Exchange'
                            ? 'border-blue-600 bg-blue-50 text-blue-800 ring-1 ring-blue-600'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <ArrowRightLeft className="w-4 h-4 mx-auto mb-1 text-blue-600" />
                        <span className="font-extrabold text-xs block">Barter / Trade</span>
                        <span className="text-[10px] text-slate-500">For notes/items</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setExchangeType('Sell')}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          exchangeType === 'Sell'
                            ? 'border-amber-600 bg-amber-50 text-amber-800 ring-1 ring-amber-600'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <Tag className="w-4 h-4 mx-auto mb-1 text-amber-600" />
                        <span className="font-extrabold text-xs block">Student Price</span>
                        <span className="text-[10px] text-slate-500">Cost recovery</span>
                      </button>
                    </div>
                  </div>

                  {exchangeType === 'Sell' && (
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                        Selling Price (₹) *
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={booking.totalPrice || 500}
                        value={resalePrice}
                        onChange={(e) => setResalePrice(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono font-bold"
                      />
                    </div>
                  )}

                  {exchangeType === 'Exchange' && (
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                        What would you like in exchange? *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Operating Systems textbook or Arduino kit"
                        value={preferredItem}
                        onChange={(e) => setPreferredItem(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                      Why can't you attend? (Student Note)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Have a lab test on Saturday evening, passing pass on to someone who can attend."
                      value={marketplaceNotes}
                      onChange={(e) => setMarketplaceNotes(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>{isSubmitting ? 'Publishing...' : 'List on Campus Pass Marketplace'}</span>
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
