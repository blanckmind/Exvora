'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  Server,
  Key,
  Layers,
  ArrowLeft,
  FileCode,
  Info,
} from 'lucide-react';
import { SrmReadinessReport } from '@/lib/srm/config';

export default function SsoStatusPage() {
  const [report, setReport] = useState<SrmReadinessReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/sso-diagnostics')
      .then((res) => res.json())
      .then((data) => setReport(data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  const copyToClipboard = (text: string, keyName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyName);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back Button */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Dashboard</span>
      </Link>

      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
              <Server className="w-4 h-4 text-blue-700" />
              <span>Institutional SSO Compliance & Diagnostic Console</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              SRMIST SSO Integration Status
            </h1>
            <p className="text-xs text-slate-500">
              Zero-Assumption Single Sign-On configuration validator and institutional handover specifications.
            </p>
          </div>

          {report && (
            <div className="flex items-center gap-2">
              {report.authMode === 'mock' ? (
                <div className="px-4 py-2 bg-amber-100 border border-amber-300 rounded-xl text-amber-900 text-xs font-extrabold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-700" />
                  <span>AUTH_MODE: MOCK (Dev Sandbox)</span>
                </div>
              ) : report.isReadyForSrmProduction ? (
                <div className="px-4 py-2 bg-emerald-100 border border-emerald-300 rounded-xl text-emerald-900 text-xs font-extrabold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>AUTH_MODE: SRM (OIDC Ready)</span>
                </div>
              ) : (
                <div className="px-4 py-2 bg-red-100 border border-red-300 rounded-xl text-red-900 text-xs font-extrabold flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-700" />
                  <span>AUTH_MODE: SRM (Keys Missing)</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Zero-Assumption Compliance Alert */}
        <div className="p-4 bg-slate-900 text-white rounded-2xl text-xs space-y-2 border border-slate-800">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <Lock className="w-4 h-4" />
            <span>Critical Zero-Assumption Compliance Rule</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            Exvora strictly prohibits guessing, fabricating, scraping, or mocking production SRM institutional endpoints, client IDs, secrets, or user databases. In <code className="text-amber-300 bg-slate-800 px-1 py-0.5 rounded font-mono">AUTH_MODE=mock</code>, development personas are clearly marked. In <code className="text-cyan-300 bg-slate-800 px-1 py-0.5 rounded font-mono">AUTH_MODE=srm</code>, the server-side OIDC pipeline verifies authorized responses directly from SRMIST IdP.
          </p>
        </div>
      </div>

      {/* PARAMETERS CHECKLIST */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-lg font-black text-slate-900">Environment Variables Checklist</h2>
          <p className="text-xs text-slate-500">
            Current values configured in <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">.env.local</code>. Sensitive secrets are masked automatically.
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-3 animate-pulse">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 bg-slate-100 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Configuration Key</th>
                  <th className="py-3 px-4">Current Value / Preview</th>
                  <th className="py-3 px-4">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {report?.fields.map((field) => (
                  <tr key={field.key} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      {field.isSet ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold text-[10px]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Set
                        </span>
                      ) : field.required ? (
                        <span className="inline-flex items-center gap-1 text-red-700 bg-red-50 px-2 py-0.5 rounded-full font-bold text-[10px]">
                          <XCircle className="w-3.5 h-3.5 text-red-600" /> Missing
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full font-medium text-[10px]">
                          Optional
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                      {field.key}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      {field.maskedValue || <span className="text-slate-300 italic">Not set</span>}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {field.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* SPECIFICATION HANDOVER FOR SRM IT / SYSADMINS */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
        <div className="space-y-1 border-b border-slate-100 pb-4">
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Key className="w-5 h-5 text-blue-700" />
            <span>SRMIST IdP Client Registration Specifications</span>
          </h2>
          <p className="text-xs text-slate-500">
            Provide the following exact configuration parameters to SRMIST Identity & Access Management administrators to register Exvora.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Exvora Callback URI */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-slate-700">
                Registered Redirect URI (Callback)
              </span>
              <button
                onClick={() =>
                  copyToClipboard(
                    `${typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'}/api/auth/callback`,
                    'callback'
                  )
                }
                className="inline-flex items-center gap-1 text-xs text-blue-700 font-semibold hover:underline"
              >
                {copiedKey === 'callback' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </>
                )}
              </button>
            </div>
            <p className="font-mono text-xs text-slate-900 bg-white p-2.5 rounded-xl border border-slate-200 break-all">
              {typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'}/api/auth/callback
            </p>
            <p className="text-[11px] text-slate-500">
              For production deployment, replace with your custom domain (e.g. <code className="font-mono text-[10px]">https://exvora.srmist.edu.in/api/auth/callback</code>).
            </p>
          </div>

          {/* Requested Scopes & Flow */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold uppercase text-slate-700 block">
              Protocol & Scopes
            </span>
            <div className="space-y-1 text-xs text-slate-700">
              <p>• <span className="font-semibold">Flow:</span> OpenID Connect Authorization Code + PKCE (S256)</p>
              <p>• <span className="font-semibold">Scopes:</span> <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-[11px]">openid profile email</code></p>
              <p>• <span className="font-semibold">Response Type:</span> <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-[11px]">code</code></p>
            </div>
          </div>
        </div>

        {/* Claims Mapping Table */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Authorized Claims Mapping
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-100 text-slate-600 font-bold">
                <tr>
                  <th className="py-2.5 px-4">SRM OIDC Claim</th>
                  <th className="py-2.5 px-4">Exvora Field</th>
                  <th className="py-2.5 px-4">Requirement</th>
                  <th className="py-2.5 px-4">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                <tr>
                  <td className="py-2.5 px-4 font-mono font-bold text-blue-700">sub</td>
                  <td className="py-2.5 px-4 font-mono">srm_subject_id</td>
                  <td className="py-2.5 px-4 font-bold text-emerald-700">Mandatory</td>
                  <td className="py-2.5 px-4 text-slate-500">Immutable student unique identifier (e.g. Reg Number)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-mono">email</td>
                  <td className="py-2.5 px-4 font-mono">email</td>
                  <td className="py-2.5 px-4 text-slate-600">Recommended</td>
                  <td className="py-2.5 px-4 text-slate-500">Official student email (@srmist.edu.in)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-mono">name / given_name</td>
                  <td className="py-2.5 px-4 font-mono">name</td>
                  <td className="py-2.5 px-4 text-slate-600">Recommended</td>
                  <td className="py-2.5 px-4 text-slate-500">Display name for peer exchange listings</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-mono">department / branch</td>
                  <td className="py-2.5 px-4 font-mono">department</td>
                  <td className="py-2.5 px-4 text-slate-500">Optional</td>
                  <td className="py-2.5 px-4 text-slate-500">Academic branch (e.g. CSE, ECE, Biotech)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-mono">year / batch</td>
                  <td className="py-2.5 px-4 font-mono">year</td>
                  <td className="py-2.5 px-4 text-slate-500">Optional</td>
                  <td className="py-2.5 px-4 text-slate-500">Student year of study</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
