'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, ShieldCheck, ExternalLink } from 'lucide-react';

export default function DevBanner() {
  const [authMode, setAuthMode] = useState<'mock' | 'srm' | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    fetch('/api/sso-diagnostics')
      .then((res) => res.json())
      .then((data) => {
        setAuthMode(data.authMode);
        setIsReady(data.isReadyForSrmProduction);
      })
      .catch(() => {});
  }, []);

  if (!authMode) return null;

  if (authMode === 'mock') {
    return (
      <div className="bg-amber-500/10 border-b border-amber-500/30 text-amber-900 px-4 py-2 text-xs md:text-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-amber-200 text-amber-900 border border-amber-400">
              DEVELOPMENT MOCK MODE
            </span>
            <span className="text-amber-800">
              Simulated SRM student authentication active. Official SRM endpoints are not contacted.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/sso-status"
              className="font-medium underline hover:text-amber-950 flex items-center gap-1"
            >
              SSO Checklist & Config <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (authMode === 'srm' && !isReady) {
    return (
      <div className="bg-red-500/10 border-b border-red-500/30 text-red-900 px-4 py-2 text-xs md:text-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span className="font-semibold text-red-900">SRM SSO Mode Enabled (Configuration Incomplete)</span>
            <span className="text-red-700 hidden md:inline">
              — Fill SRM credentials in .env.local to activate official institutional login.
            </span>
          </div>
          <Link
            href="/admin/sso-status"
            className="font-medium underline text-red-900 hover:text-red-950"
          >
            Inspect Missing Keys
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-emerald-500/10 border-b border-emerald-500/30 text-emerald-900 px-4 py-2 text-xs md:text-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="font-semibold text-emerald-900">Official SRM SSO Integration Mode Active</span>
        </div>
        <Link
          href="/admin/sso-status"
          className="font-medium underline text-emerald-900 hover:text-emerald-950"
        >
          View SSO Telemetry
        </Link>
      </div>
    </div>
  );
}
