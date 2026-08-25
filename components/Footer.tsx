import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand & Purpose */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white font-black text-base">
                <span className="text-amber-400">E</span>
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">Exvora</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Student-powered campus exchange network. What you have could be exactly what someone needs.
            </p>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-200 mb-3">Campus Exchange</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/explore" className="hover:text-white transition-colors">
                  Explore Marketplace
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-white transition-colors">
                  Campus Events & Passes
                </Link>
              </li>
              <li>
                <Link href="/requests" className="hover:text-white transition-colors">
                  Campus Requests ("I Need")
                </Link>
              </li>
              <li>
                <Link href="/share" className="hover:text-white transition-colors">
                  Share a Resource or Skill
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-200 mb-3">Categories</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Textbooks & Notes</li>
              <li>Electronics & IoT</li>
              <li>Event & Fest Tickets</li>
              <li>Peer Skill Tutoring</li>
              <li>Free Giveaways</li>
            </ul>
          </div>

          {/* Student Trust & Safety */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-200 mb-3">Campus Safety</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every exchange is between verified campus students. Meet in safe public areas like Tech Park, UB, Central Library, or hostel quads.
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Student Network</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Exvora. Made for the campus community.</p>
          <div className="flex items-center gap-4">
            <Link href="/explore" className="hover:text-slate-300 transition-colors">
              Marketplace
            </Link>
            <span>•</span>
            <Link href="/events" className="hover:text-slate-300 transition-colors">
              Events
            </Link>
            <span>•</span>
            <Link href="/login" className="hover:text-slate-300 transition-colors">
              Student Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
