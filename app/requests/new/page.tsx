'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  HelpCircle,
  PlusCircle,
  ArrowLeft,
  ShieldCheck,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import SuccessState3D from '@/components/SuccessState3D';
import { CategoryType, ExchangeMode } from '@/lib/db/mock-data';

const CATEGORIES: CategoryType[] = [
  'Textbooks',
  'Electronics',
  'Notes & Study Material',
  'Event Tickets',
  'Skills',
  'Give Away',
];

const LOCATIONS = [
  'Tech Park (TP) - 7th Floor / Central Plaza',
  'University Building (UB) - Ground Floor',
  'Central Library Entrance',
  'Java Green / TP Food Court',
  'Paari / Kaari Hostel Gate',
  'Oori / Adhiyaman Hostel Quad',
  'Biotechnology Block 3rd Floor',
  'Mechanical Sciences Block',
  'Main Gate / Arch (GST Road)',
  'Ramapuram Campus - Main Block',
  'Vadapalani Campus - Auditorium',
];

export default function NewRequestPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<CategoryType>('Textbooks');
  const [urgency, setUrgency] = useState<'Urgent (Today)' | 'This Week' | 'General'>('This Week');
  const [location, setLocation] = useState(LOCATIONS[0]);
  const [customLocation, setCustomLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.authenticated) {
          setCurrentUser(data.user);
        } else {
          router.push('/login?redirect=/requests/new');
        }
      })
      .catch(() => router.push('/login?redirect=/requests/new'));
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const finalLocation = customLocation.trim() || location;

    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          category,
          urgency,
          preferredMode: 'Exchange',
          location: finalLocation,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit request.');
      }

      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16">
        <SuccessState3D
          title="Your campus request is live."
          subtitle={`We've broadcasted your request for "${title}" to verified SRM students across campus.`}
          primaryActionText="View Requests Board"
          primaryActionHref="/requests"
          secondaryActionText="Explore Marketplace"
          secondaryActionHref="/explore"
        />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-6">
      {/* Back Link */}
      <Link
        href="/requests"
        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Requests Board</span>
      </Link>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 space-y-8">
        <div className="space-y-2 border-b border-slate-100 pb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-50 text-rose-800 text-xs font-bold">
            <HelpCircle className="w-4 h-4 text-rose-600" />
            <span>Campus "I Need" Request</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Post What You're Looking For
          </h1>
          <p className="text-xs text-slate-500">
            Describe the book, equipment, notes, fest ticket, or skill mentor you need. Fellow SRM students can view and reach out directly.
          </p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Request Title */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
              What do you need? *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Looking for Silberschatz Operating Systems (9th Ed) / Need USB-C to HDMI adapter"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          {/* Category & Urgency */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                Urgency Level *
              </label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value as any)}
                className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
              >
                <option value="Urgent (Today)">Urgent (Needed Today)</option>
                <option value="This Week">Needed This Week</option>
                <option value="General">General Semester Need</option>
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
              Preferred Campus Meetup Spot *
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none mb-1.5"
            >
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Or specify custom spot (e.g. TP 8th floor AI lab / Java Green)"
              value={customLocation}
              onChange={(e) => setCustomLocation(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
              Details / Course / Context *
            </label>
            <textarea
              required
              rows={4}
              placeholder="Explain why you need it, for how long, and what you can offer in return (e.g. borrow for 3 days, barter exchange, or study group)..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <Link
              href="/requests"
              className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-900 hover:bg-blue-950 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-xl transition-all disabled:opacity-50"
            >
              <PlusCircle className="w-4 h-4 text-amber-400" />
              <span>{isSubmitting ? 'Posting Request...' : 'Publish Request'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
