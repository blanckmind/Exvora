'use client';

import React from 'react';
import { Listing } from '@/lib/db/mock-data';
import { CARTOON_SVGS } from '@/lib/cartoon-images';
import { MapPin, ShieldCheck, Tag, Sparkles, BookOpen, Cpu, FileText, Ticket, Lightbulb, Gift } from 'lucide-react';

interface ItemCardProps {
  listing: Listing;
  onSelect: (listing: Listing) => void;
}

export default function ItemCard({ listing, onSelect }: ItemCardProps) {
  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case 'Textbooks':
        return {
          icon: BookOpen,
          badge: 'bg-amber-100 text-amber-900 border-amber-200',
          fallbackImg: CARTOON_SVGS.textbooks,
        };
      case 'Electronics':
        return {
          icon: Cpu,
          badge: 'bg-cyan-100 text-cyan-900 border-cyan-200',
          fallbackImg: CARTOON_SVGS.electronics,
        };
      case 'Notes & Study Material':
        return {
          icon: FileText,
          badge: 'bg-purple-100 text-purple-900 border-purple-200',
          fallbackImg: CARTOON_SVGS.notes,
        };
      case 'Event Tickets':
        return {
          icon: Ticket,
          badge: 'bg-pink-100 text-pink-900 border-pink-200',
          fallbackImg: CARTOON_SVGS.tickets,
        };
      case 'Skills':
        return {
          icon: Lightbulb,
          badge: 'bg-emerald-100 text-emerald-900 border-emerald-200',
          fallbackImg: CARTOON_SVGS.skills,
        };
      case 'Give Away':
        return {
          icon: Gift,
          badge: 'bg-blue-100 text-blue-900 border-blue-200',
          fallbackImg: CARTOON_SVGS.giveaway,
        };
      default:
        return {
          icon: Sparkles,
          badge: 'bg-slate-100 text-slate-800 border-slate-200',
          fallbackImg: CARTOON_SVGS.textbooks,
        };
    }
  };

  const theme = getCategoryTheme(listing.category);
  const CategoryIcon = theme.icon;
  const displayImage = listing.images?.[0] || theme.fallbackImg;

  const getExchangeTypeBadge = () => {
    switch (listing.exchangeType) {
      case 'Give Away':
        return <span className="bg-emerald-500 text-white font-black text-[10px] uppercase px-2.5 py-1 rounded-full tracking-wider shadow-sm">FREE GIVEAWAY</span>;
      case 'Share':
        return <span className="bg-cyan-600 text-white font-black text-[10px] uppercase px-2.5 py-1 rounded-full tracking-wider shadow-sm">STUDY SHARE / BORROW</span>;
      case 'Exchange':
        return <span className="bg-amber-600 text-white font-black text-[10px] uppercase px-2.5 py-1 rounded-full tracking-wider shadow-sm">BARTER TRADE</span>;
      case 'Sell':
        return <span className="bg-slate-900 text-white font-black text-[10px] uppercase px-2.5 py-1 rounded-full tracking-wider shadow-sm">{listing.price ? `₹${listing.price}` : 'STUDENT PRICE'}</span>;
      default:
        return <span className="bg-blue-600 text-white font-black text-[10px] uppercase px-2.5 py-1 rounded-full tracking-wider shadow-sm">EXCHANGE</span>;
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 hover:border-blue-500/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group relative">
      {/* 3D Cartoon Header Banner */}
      <div className="relative h-48 bg-slate-950 overflow-hidden">
        <img
          src={displayImage}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border shadow-sm backdrop-blur-md ${theme.badge}`}>
            <CategoryIcon className="w-3 h-3" />
            <span>{listing.category}</span>
          </span>
          {listing.condition && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-900/80 text-white backdrop-blur-md border border-slate-700">
              {listing.condition}
            </span>
          )}
        </div>

        {/* Bottom Mode Pill */}
        <div className="absolute bottom-3 left-3 z-10">
          {getExchangeTypeBadge()}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="font-extrabold text-base text-slate-900 line-clamp-2 group-hover:text-blue-700 transition-colors leading-snug">
            {listing.title}
          </h3>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {listing.description}
          </p>

          {/* Special metadata for Skills or Preferred Exchange */}
          {listing.category === 'Skills' && listing.skillDetails && (
            <div className="flex flex-wrap gap-1 pt-1">
              {listing.skillDetails.topics.slice(0, 3).map((topic, i) => (
                <span key={i} className="text-[10px] bg-emerald-50 text-emerald-800 font-medium px-2 py-0.5 rounded border border-emerald-200">
                  {topic}
                </span>
              ))}
            </div>
          )}

          {listing.preferredExchangeItem && (
            <div className="p-2 bg-amber-50 rounded-xl border border-amber-200/80 text-[11px] text-amber-900 font-medium">
              Looking for: <span className="font-bold">{listing.preferredExchangeItem}</span>
            </div>
          )}

          {listing.shareDuration && (
            <div className="p-2 bg-cyan-50 rounded-xl border border-cyan-200/80 text-[11px] text-cyan-900 font-medium">
              Duration: <span className="font-bold">{listing.shareDuration}</span>
            </div>
          )}
        </div>

        <div className="pt-3 border-t border-slate-100 space-y-3">
          {/* Pickup / Campus Location */}
          <div className="flex items-center text-xs text-slate-500 gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">{listing.location}</span>
          </div>

          {/* Student Identity & Connect CTA */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-lg bg-blue-700 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                {listing.sellerName.charAt(0)}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-slate-800 truncate">{listing.sellerName}</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                </div>
                <span className="text-[10px] text-slate-400 block truncate">{listing.sellerDept}</span>
              </div>
            </div>

            <button
              onClick={() => onSelect(listing)}
              className="px-3.5 py-2 text-xs font-bold rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-700 hover:text-white transition-all shadow-sm flex-shrink-0 group-hover:bg-blue-700 group-hover:text-white"
            >
              {listing.category === 'Skills' ? 'Learn / Connect' : listing.exchangeType === 'Give Away' ? 'Claim Resource' : 'Exchange'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
