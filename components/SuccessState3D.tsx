import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface SuccessState3DProps {
  title?: string;
  subtitle?: string;
  primaryActionText?: string;
  primaryActionHref?: string;
  secondaryActionText?: string;
  secondaryActionHref?: string;
}

export default function SuccessState3D({
  title = "You're live on Exvora.",
  subtitle = 'Your resource is now discoverable to the entire campus community.',
  primaryActionText = 'Explore Marketplace',
  primaryActionHref = '/explore',
  secondaryActionText = 'View My Exchanges',
  secondaryActionHref = '/my-exchanges',
}: SuccessState3DProps) {
  return (
    <div className="text-center py-12 px-6 bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-200">
      {/* 3D Success Sphere with Orbiting Sparkles */}
      <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
        <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full" />
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 flex items-center justify-center text-white shadow-xl shadow-emerald-600/30 transform rotate-6 hover:rotate-0 transition-transform">
          <CheckCircle2 className="w-10 h-10 drop-shadow-md" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Published to SRMIST Campus</span>
        </div>
        <h3 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href={primaryActionHref}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all"
        >
          <span>{primaryActionText}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href={secondaryActionHref}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all"
        >
          <span>{secondaryActionText}</span>
        </Link>
      </div>
    </div>
  );
}
