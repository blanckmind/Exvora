'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  ShieldCheck,
  PlusCircle,
  Repeat,
  LogOut,
  Sparkles,
  User as UserIcon,
  Menu,
  X,
  Compass,
  HelpCircle,
  LogIn,
  CheckCircle2,
  Ticket,
} from 'lucide-react';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  department: string;
  year: string;
  campus?: string;
  srmSubjectId: string;
  authProvider: 'srm' | 'mock';
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => {
        if (res.ok) return res.json();
        return { authenticated: false, user: null };
      })
      .then((data) => {
        if (data.authenticated) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      router.push('/');
      router.refresh();
    } catch (err) {
      console.error('Logout error', err);
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Explore', href: '/explore' },
    { name: 'Requests ("I Need")', href: '/requests' },
    { name: 'Events & Passes', href: '/events' },
    { name: 'Share Something', href: '/share' },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-slate-200/90 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-950 via-blue-900 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-blue-950/20 group-hover:scale-105 transition-transform">
                <span className="font-black text-xl tracking-tight text-amber-400">E</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-xl tracking-tight text-slate-900">Exvora</span>
                  <span className="text-[10px] uppercase font-extrabold tracking-widest px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 border border-blue-200">
                    CAMPUS
                  </span>
                </div>
                <span className="text-[10px] font-medium text-slate-500 -mt-0.5">
                  Student Resource Network
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href === '/explore' && pathname === '/dashboard');
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                      isActive
                        ? 'text-blue-700 bg-blue-50/90 font-extrabold'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {user && (
                <Link
                  href="/my-exchanges"
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                    pathname === '/my-exchanges'
                      ? 'text-blue-700 bg-blue-50/90 font-extrabold'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                  }`}
                >
                  My Exchanges
                </Link>
              )}
            </div>
          </div>

          {/* Right Action Area — Login Status */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/share"
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-blue-900/20 hover:shadow-lg transition-all"
            >
              <PlusCircle className="w-4 h-4 text-amber-300" />
              <span>Share</span>
            </Link>

            {isLoading ? (
              <div className="w-24 h-9 rounded-xl bg-slate-100 animate-pulse" />
            ) : user ? (
              /* Signed In Login Status Component */
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pl-2.5 pr-3 rounded-2xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors shadow-sm bg-white"
                >
                  {/* Status Indicator Dot */}
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>

                  <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                    {user.name.charAt(0)}
                  </div>

                  <div className="text-left">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-extrabold text-slate-900 line-clamp-1">{user.name}</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                    <span className="text-[10px] text-emerald-700 font-bold block -mt-0.5">
                      Signed In • {user.department.split(' ')[0]}
                    </span>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/70">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Active Student
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {user.srmSubjectId.split('_').pop()}
                        </span>
                      </div>
                      <p className="font-extrabold text-sm text-slate-900 mt-1.5">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                      <p className="text-xs text-slate-600 mt-1 font-medium">{user.department}</p>
                      <p className="text-[11px] text-slate-400">{user.year}</p>
                    </div>

                    <div className="py-1 text-xs">
                      <Link
                        href="/explore"
                        className="flex items-center gap-2 px-4 py-2.5 text-slate-700 hover:bg-slate-50 font-medium"
                      >
                        <Compass className="w-4 h-4 text-slate-400" /> Explore Marketplace
                      </Link>
                      <Link
                        href="/events"
                        className="flex items-center gap-2 px-4 py-2.5 text-slate-700 hover:bg-slate-50 font-medium"
                      >
                        <Ticket className="w-4 h-4 text-slate-400" /> Campus Events & Passes
                      </Link>
                      <Link
                        href="/requests"
                        className="flex items-center gap-2 px-4 py-2.5 text-slate-700 hover:bg-slate-50 font-medium"
                      >
                        <HelpCircle className="w-4 h-4 text-slate-400" /> Campus Requests ("I Need")
                      </Link>
                      <Link
                        href="/my-exchanges"
                        className="flex items-center gap-2 px-4 py-2.5 text-slate-700 hover:bg-slate-50 font-medium"
                      >
                        <Repeat className="w-4 h-4 text-slate-400" /> My Listings & Offers
                      </Link>
                      <Link
                        href="/login"
                        className="flex items-center gap-2 px-4 py-2.5 text-blue-700 hover:bg-blue-50 font-semibold"
                      >
                        <UserIcon className="w-4 h-4 text-blue-600" /> Switch Student Profile
                      </Link>
                    </div>

                    <div className="border-t border-slate-100 pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs text-red-600 hover:bg-red-50 font-bold"
                      >
                        <LogOut className="w-4 h-4 text-red-500" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Signed Out Login Status Component */
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400 font-semibold hidden lg:inline flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  Not signed in
                </span>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-950 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all"
                >
                  <LogIn className="w-4 h-4 text-amber-400" />
                  <span>Sign In</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-100"
            >
              {link.name}
            </Link>
          ))}

          {user && (
            <Link
              href="/my-exchanges"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-100"
            >
              My Exchanges
            </Link>
          )}

          {user ? (
            <div className="pt-3 border-t border-slate-100">
              <div className="px-3 py-2.5 bg-emerald-50 border border-emerald-200 rounded-xl mb-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Signed in as {user.name}</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">{user.department}</p>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="pt-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center py-2.5 bg-blue-900 text-white font-bold rounded-xl text-sm"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
