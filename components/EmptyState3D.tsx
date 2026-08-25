import React from 'react';
import Link from 'next/link';
import { PlusCircle, Compass, Sparkles } from 'lucide-react';

interface EmptyState3DProps {
  title?: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
  onAction?: () => void;
}

export default function EmptyState3D({
  title = 'Nothing here yet.',
  description = 'Be the first student to share something with your campus community.',
  actionText = 'Share Something',
  actionHref = '/share',
  onAction,
}: EmptyState3DProps) {
  return (
    <div className="text-center py-16 px-6 bg-gradient-to-b from-white to-slate-50 rounded-3xl border border-slate-200/80 shadow-sm max-w-lg mx-auto space-y-6">
      {/* 3D Isometric Empty Box Illustration */}
      <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
        {/* Subtle Ambient Glow */}
        <div className="absolute inset-0 bg-blue-500/15 blur-2xl rounded-full" />

        {/* 3D Isometric Box SVG */}
        <svg
          viewBox="0 0 160 160"
          className="w-28 h-28 drop-shadow-xl relative z-10 transition-transform duration-500 hover:scale-105"
        >
          <defs>
            <linearGradient id="topFace" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#93C5FD" />
              <stop offset="100%" stopColor="#60A5FA" />
            </linearGradient>
            <linearGradient id="leftFace" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#1E3A8A" />
            </linearGradient>
            <linearGradient id="rightFace" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
            <linearGradient id="accentToken" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>

          {/* Cube Left Face */}
          <polygon points="80,85 25,55 25,115 80,145" fill="url(#leftFace)" />
          {/* Cube Right Face */}
          <polygon points="80,85 135,55 135,115 80,145" fill="url(#rightFace)" />
          {/* Cube Top Face */}
          <polygon points="80,25 135,55 80,85 25,55" fill="url(#topFace)" />

          {/* Floating Gold Exvora Orb hovering above the open box */}
          <circle cx="80" cy="38" r="14" fill="url(#accentToken)" className="animate-bounce" />
          <path
            d="M74,38 L86,38 M80,32 L80,44"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-black text-slate-900 tracking-tight">{title}</h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
          {description}
        </p>
      </div>

      <div>
        {onAction ? (
          <button
            onClick={onAction}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md shadow-blue-900/20 transition-all hover:scale-[1.02]"
          >
            <PlusCircle className="w-4 h-4 text-amber-300" />
            <span>{actionText}</span>
          </button>
        ) : (
          <Link
            href={actionHref}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md shadow-blue-900/20 transition-all hover:scale-[1.02]"
          >
            <PlusCircle className="w-4 h-4 text-amber-300" />
            <span>{actionText}</span>
          </Link>
        )}
      </div>
    </div>
  );
}
