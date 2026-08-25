'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ShieldX, RefreshCw, ArrowLeft, Home } from 'lucide-react';

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const errorCode = searchParams.get('error') || 'unknown';

  let title = 'Authentication Failed';
  let message = "We couldn't authenticate your student account. Please try again.";

  switch (errorCode) {
    case 'cancelled':
      title = 'Sign-in Cancelled';
      message = 'Student sign-in was cancelled.';
      break;
    case 'state_mismatch':
      title = 'Session Validation Failed';
      message = 'The security session parameter did not match. Please restart the sign-in flow.';
      break;
    case 'session_expired':
      title = 'Session Expired';
      message = 'Your temporary sign-in session expired. Please sign in again.';
      break;
    default:
      title = 'Sign-in Error';
      message = "We couldn't authenticate you through the student portal. Please try again.";
      break;
  }

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 text-center space-y-6">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
          <ShieldX className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{message}</p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <Link
            href="/login"
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow-md transition-all text-xs sm:text-sm"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs sm:text-sm transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[75vh] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
        </div>
      }
    >
      <AuthErrorContent />
    </Suspense>
  );
}
