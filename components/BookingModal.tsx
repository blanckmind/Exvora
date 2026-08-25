'use client';

import React, { useState } from 'react';
import { CampusEvent, EventBooking } from '@/lib/db/mock-data';
import {
  X,
  Ticket,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Users,
  QrCode,
  CreditCard,
} from 'lucide-react';

interface BookingModalProps {
  event: CampusEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function BookingModal({
  event,
  isOpen,
  onClose,
  onSuccess,
}: BookingModalProps) {
  const [ticketCount, setTicketCount] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<EventBooking | null>(null);

  if (!isOpen || !event) return null;

  const totalPrice = event.price * ticketCount;

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/events/${event.id}/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketCount }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) {
          window.location.href = `/login?redirect=/events`;
          return;
        }
        throw new Error(data.error || 'Failed to book tickets.');
      }

      setConfirmedBooking(data.booking);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setConfirmedBooking(null);
    setTicketCount(1);
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-950 to-indigo-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base">Campus Event Ticket Booking</h3>
          </div>
          <button
            onClick={resetAndClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CONFIRMED DIGITAL PASS VIEW */}
        {confirmedBooking ? (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-black text-slate-900 tracking-tight">
                Ticket Confirmed & Paid!
              </h4>
              <p className="text-xs text-slate-500">
                Your digital student entry pass has been generated.
              </p>
            </div>

            {/* 3D DIGITAL TICKET PASS CARD */}
            <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-6 shadow-xl border border-indigo-500/30 relative overflow-hidden space-y-4">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />

              <div className="flex items-center justify-between border-b border-indigo-900/60 pb-3">
                <span className="text-[10px] uppercase font-black tracking-widest text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                  {confirmedBooking.ticketType}
                </span>
                <span className="text-xs font-mono font-bold text-indigo-300">
                  {confirmedBooking.bookingCode}
                </span>
              </div>

              <div className="space-y-1">
                <h5 className="font-black text-lg text-white leading-snug">
                  {confirmedBooking.eventTitle}
                </h5>
                <div className="flex flex-wrap gap-y-1 gap-x-3 text-xs text-slate-300 pt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    {confirmedBooking.eventDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    {confirmedBooking.eventTime}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-indigo-900/60 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Attendee</span>
                  <span className="font-bold text-slate-200">{confirmedBooking.userName}</span>
                  <span className="text-[10px] text-slate-400 block">{confirmedBooking.userDept}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block uppercase">Amount Paid</span>
                  <span className="font-extrabold text-emerald-400 text-sm">
                    {confirmedBooking.totalPrice ? `₹${confirmedBooking.totalPrice}` : 'FREE'} ({confirmedBooking.ticketCount} Pass{confirmedBooking.ticketCount > 1 ? 'es' : ''})
                  </span>
                </div>
              </div>

              {/* Digital QR Code Placeholder */}
              <div className="pt-3 flex items-center justify-between bg-black/40 p-3 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2">
                  <QrCode className="w-8 h-8 text-amber-400 flex-shrink-0" />
                  <div className="text-[10px] text-slate-300">
                    <span>Show this pass at venue entrance</span>
                    <span className="block font-mono text-[9px] text-slate-400">SRM Student Gate Verified</span>
                  </div>
                </div>
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
            </div>

            <button
              onClick={resetAndClose}
              className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-2xl font-extrabold text-xs sm:text-sm shadow-md transition-all"
            >
              Done & Return to Events
            </button>
          </div>
        ) : (
          /* BOOKING SELECTION FORM */
          <form onSubmit={handleBook} className="p-6 space-y-5">
            {/* Event Summary */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex gap-3.5">
              <img
                src={event.image}
                alt={event.title}
                className="w-18 h-18 object-cover rounded-xl flex-shrink-0"
              />
              <div className="min-w-0 flex-1 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                  {event.category}
                </span>
                <h4 className="font-extrabold text-sm text-slate-900 line-clamp-1 mt-1">
                  {event.title}
                </h4>
                <div className="flex items-center text-xs text-slate-500 gap-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {event.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 truncate">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {event.venue.split(' ')[0]}
                  </span>
                </div>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Ticket Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
                  Select Number of Passes
                </label>
                <span className="text-xs text-slate-400">₹{event.price} / ticket</span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setTicketCount(count)}
                    className={`py-3 rounded-2xl font-black text-sm border-2 transition-all ${
                      ticketCount === count
                        ? 'border-blue-700 bg-blue-50 text-blue-800 shadow-sm'
                        : 'border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {count} {count === 1 ? 'Pass' : 'Passes'}
                  </button>
                ))}
              </div>
            </div>

            {/* Pricing Summary Card */}
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-950">{event.ticketType}</span>
                <span className="font-semibold text-emerald-800">
                  ₹{event.price} &times; {ticketCount} {ticketCount === 1 ? 'ticket' : 'tickets'}
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-emerald-200/70 pt-2">
                <div>
                  <span className="text-xs text-emerald-700 font-medium block">Total Payable</span>
                  <span className="text-[10px] text-emerald-600">Verified SRM Student Rate</span>
                </div>
                <span className="text-xl font-black text-emerald-900">
                  ₹{totalPrice}
                </span>
              </div>
            </div>

            {/* Availability Note */}
            <div className="flex items-center justify-between text-xs text-slate-500 px-1">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span>Available capacity</span>
              </span>
              <span className="font-bold text-slate-700">
                {event.availableSeats} of {event.totalSeats} seats remaining
              </span>
            </div>

            {/* Submit */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={resetAndClose}
                className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || event.availableSeats < ticketCount}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-900 hover:bg-blue-950 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-xl disabled:opacity-50 transition-all"
              >
                <CreditCard className="w-4 h-4 text-amber-300" />
                <span>{isSubmitting ? 'Reserving...' : `Pay ₹${totalPrice} & Book`}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
