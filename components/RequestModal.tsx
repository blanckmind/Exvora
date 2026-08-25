'use client';

import React, { useState } from 'react';
import { CampusRequest } from '@/lib/db/mock-data';
import { X, Send, ShieldCheck, MapPin, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

interface RequestModalProps {
  request: CampusRequest | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function RequestModal({
  request,
  isOpen,
  onClose,
  onSuccess,
}: RequestModalProps) {
  const [message, setMessage] = useState('');
  const [offeredItemOrSkill, setOfferedItemOrSkill] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !request) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/requests/${request.id}/respond`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          offeredItemOrSkill,
          contactNumber,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) {
          window.location.href = '/login?redirect=/requests';
          return;
        }
        throw new Error(data.error || 'Failed to submit response.');
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
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-sm sm:text-base">I Can Help / I Have This</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">Offer Sent to {request.requesterName}!</h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Your response has been delivered. You can track communication in your <span className="font-semibold text-slate-800">My Exchanges</span> tab.
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
            {/* Request Summary */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                  {request.category}
                </span>
                <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  {request.urgency}
                </span>
              </div>
              <h4 className="font-bold text-sm text-slate-900">{request.title}</h4>
              <p className="text-xs text-slate-600 line-clamp-2">{request.description}</p>
              <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Requested by {request.requesterName} ({request.requesterDept})</span>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-xs text-red-700">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Offer Inputs */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                What do you have / what can you provide?
              </label>
              <input
                type="text"
                required
                placeholder="e.g. I have the Cormen 3rd edition textbook in good condition / I can mentor on Figma auto-layout"
                value={offeredItemOrSkill}
                onChange={(e) => setOfferedItemOrSkill(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Message & Meetup Details
              </label>
              <textarea
                required
                rows={3}
                placeholder="e.g. Hi! I'm free today after 4 PM around Tech Park or Central Library. Let me know if you want to meet up."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                WhatsApp / Mobile Number (Optional for faster response)
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
                <span>{isSubmitting ? 'Sending Offer...' : 'Send Campus Offer'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
