'use client';

import React, { useState } from 'react';
import { Listing } from '@/lib/db/mock-data';
import { CARTOON_SVGS } from '@/lib/cartoon-images';
import { X, Send, ShieldCheck, MapPin, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

interface ExchangeModalProps {
  listing: Listing | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function ExchangeModal({
  listing,
  isOpen,
  onClose,
  onSuccess,
}: ExchangeModalProps) {
  const [message, setMessage] = useState('');
  const [offeredItem, setOfferedItem] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !listing) return null;

  const displayImage = listing.images?.[0] || CARTOON_SVGS.textbooks;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/exchanges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listingId: listing.id,
          listingTitle: listing.title,
          recipientId: listing.sellerId,
          message,
          offeredItemOrSkill: offeredItem,
          contactNumber,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          window.location.href = '/login?redirect=/explore';
          return;
        }
        throw new Error(data.error || 'Failed to submit proposal.');
      }

      setIsSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base">
              {listing.category === 'Skills' ? 'Connect with Skill Mentor' : 'Connect & Propose Exchange'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">Exchange Proposal Sent!</h4>
            <p className="text-xs sm:text-sm text-slate-600">
              We notified <span className="font-semibold text-slate-800">{listing.sellerName}</span> ({listing.sellerDept}). You can track responses in your <span className="font-semibold text-slate-800">My Exchanges</span> tab.
            </p>
            <button
              onClick={() => {
                setIsSuccess(false);
                onClose();
              }}
              className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-bold text-sm shadow-md transition-all"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Listing Summary Card */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex gap-3.5">
              <img
                src={displayImage}
                alt={listing.title}
                className="w-16 h-16 object-cover rounded-xl flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-sm text-slate-900 line-clamp-1">{listing.title}</h4>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span className="truncate">{listing.location}</span>
                </p>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                    {listing.category}
                  </span>
                  <span className="text-[10px] font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                    {listing.exchangeType}
                  </span>
                </div>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-xs text-red-700">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Form Fields */}
            {listing.exchangeType === 'Exchange' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  What item / book / skill are you offering in exchange?
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Operating Systems book / Digital Electronics kit"
                  value={offeredItem}
                  onChange={(e) => setOfferedItem(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Message & Campus Meetup Proposal
              </label>
              <textarea
                required
                rows={3}
                placeholder="e.g. Hi, I'm interested in this resource! Can we meet at Tech Park ground floor or Java Green tomorrow around 4 PM?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                WhatsApp / Mobile Number (Optional for fast response)
              </label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-md disabled:opacity-50 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Sending...' : 'Send Request'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
