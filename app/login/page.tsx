'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  UserCheck,
  AlertCircle,
  Sparkles,
  CheckCircle2,
  LogOut,
  Compass,
  UserPlus,
  LogIn,
  KeyRound,
  Mail,
  User,
  GraduationCap,
  Building,
} from 'lucide-react';
import { MOCK_STUDENTS, MockStudentProfile } from '@/lib/auth/mock';

const DEPARTMENTS = [
  'Cyber Security',
  'Computer Science and Engineering',
  'Artificial Intelligence & Machine Learning',
  'Information Technology',
  'Electronics & Communication Engineering',
  'Electrical & Electronics Engineering',
  'Biotechnology & Genetic Engineering',
  'Mechanical Sciences & Aerospace',
  'Civil Engineering',
  'Management Studies & MBA',
];

const YEARS = [
  '1st Year (Freshman)',
  '2nd Year (Batch 2023-27)',
  '3rd Year (Batch 2022-26)',
  '4th Year (Senior)',
  'Postgraduate / Research Scholar',
];

const CAMPUSES = [
  'Kattankulathur (Main Campus)',
  'Ramapuram Campus',
  'Vadapalani Campus',
  'Tiruchirappalli Campus',
  'NCR Delhi Campus',
];

const AVATAR_SEEDS = [
  'CyberHero77',
  'DevBot142',
  'ElectroBot088',
  'AIBot055',
  'BioSpark210',
  'CampusStar99',
  'TechPioneer33',
  'PixelMaster12',
];

function AuthPortalContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [studentList, setStudentList] = useState<MockStudentProfile[]>(MOCK_STUDENTS);

  // Sign In State
  const [emailOrRegNo, setEmailOrRegNo] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Sign Up State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [srmSubjectId, setSrmSubjectId] = useState('');
  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [customDept, setCustomDept] = useState('');
  const [year, setYear] = useState(YEARS[1]);
  const [campus, setCampus] = useState(CAMPUSES[0]);
  const [password, setPassword] = useState('');
  const [selectedAvatarSeed, setSelectedAvatarSeed] = useState(AVATAR_SEEDS[0]);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.authenticated) {
          setCurrentUser(data.user);
        }
      })
      .catch(() => {});

    const err = searchParams.get('error');
    if (err === 'cancelled') {
      setErrorMsg('Sign-in was cancelled.');
    } else if (err) {
      setErrorMsg('Could not authenticate student account. Please try again.');
    }
  }, [searchParams]);

  // Handle Quick Demo Sign In
  const handleQuickSignIn = async (index: number) => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/auth/mock-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentIndex: index }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to sign in.');
      }

      router.push('/explore');
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication error.');
      setIsLoading(false);
    }
  };

  // Handle Custom Credentials Sign In
  const handleCustomLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/auth/custom-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrRegNo, password: loginPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed.');
      }

      router.push('/explore');
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || 'Login error.');
      setIsLoading(false);
    }
  };

  // Handle New Student Registration
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const finalDept = customDept.trim() || department;
    const avatarUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${selectedAvatarSeed}&backgroundColor=b6e3f4,c0aede,d1d4f9`;

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          srmSubjectId,
          department: finalDept,
          year,
          campus,
          avatar: avatarUrl,
          password,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed.');
      }

      setSuccessMsg('Account created successfully! Redirecting...');
      setTimeout(() => {
        router.push('/explore');
        router.refresh();
      }, 700);
    } catch (err: any) {
      setErrorMsg(err.message || 'Registration error.');
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setCurrentUser(null);
    router.refresh();
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-950 via-blue-900 to-indigo-700 flex items-center justify-center text-white mx-auto shadow-xl shadow-blue-950/25">
            <span className="font-black text-2xl text-amber-400">E</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Student Access Portal
          </h2>
          <p className="text-xs text-slate-500">
            Sign in or create your verified SRM campus profile
          </p>
        </div>

        {/* Error or Success Alerts */}
        {errorMsg && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3 text-xs text-emerald-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* AUTH CONTAINER CARD */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          {/* TAB SWITCHER */}
          <div className="grid grid-cols-2 border-b border-slate-200 bg-slate-50/70 p-1.5">
            <button
              onClick={() => {
                setActiveTab('signin');
                setErrorMsg(null);
              }}
              className={`py-3 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                activeTab === 'signin'
                  ? 'bg-white text-blue-700 shadow-sm border border-slate-200/80'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('signup');
                setErrorMsg(null);
              }}
              className={`py-3 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                activeTab === 'signup'
                  ? 'bg-white text-blue-700 shadow-sm border border-slate-200/80'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <UserPlus className="w-4 h-4 text-emerald-600" />
              <span>Create Account</span>
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* CURRENT LOGIN STATUS INDICATOR */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                  Current Session Status
                </span>
                {currentUser ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Active Session
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    Guest
                  </span>
                )}
              </div>

              {currentUser && (
                <div className="space-y-3 pt-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-700 text-white font-black text-sm flex items-center justify-center shadow-sm">
                      {currentUser.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        <span className="font-extrabold text-sm text-slate-900 truncate">
                          {currentUser.name}
                        </span>
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                      </div>
                      <span className="text-xs text-slate-500 block truncate">
                        {currentUser.department}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <Link
                      href="/explore"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
                    >
                      <Compass className="w-4 h-4" />
                      <span>Go to Marketplace</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="px-3.5 py-2.5 bg-white hover:bg-red-50 text-red-600 border border-red-200 font-bold text-xs rounded-xl transition-all"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* TAB 1: SIGN IN */}
            {activeTab === 'signin' && (
              <div className="space-y-6 animate-in fade-in duration-150">
                {/* 1-Click Fast Student Selector */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-800">
                      1-Click Select Verified Profile
                    </span>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      Instant Access
                    </span>
                  </div>

                  <div className="space-y-2">
                    {studentList.map((student, idx) => (
                      <button
                        key={student.srmSubjectId}
                        type="button"
                        onClick={() => handleQuickSignIn(idx)}
                        disabled={isLoading}
                        className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center gap-3 group ${
                          currentUser?.srmSubjectId === student.srmSubjectId
                            ? 'border-emerald-500 bg-emerald-50/50 ring-1 ring-emerald-500/30'
                            : 'border-slate-200 hover:border-blue-400 hover:bg-slate-50'
                        }`}
                      >
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-10 h-10 rounded-xl bg-slate-100 p-0.5 border border-slate-200 flex-shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-extrabold text-xs text-slate-900 truncate">
                              {student.name}
                            </span>
                            {currentUser?.srmSubjectId === student.srmSubjectId ? (
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                                Active
                              </span>
                            ) : (
                              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                            )}
                          </div>
                          <span className="text-[11px] text-slate-500 block truncate">
                            {student.department} • {student.year.split(' ')[0]}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="relative flex items-center justify-center">
                  <div className="border-t border-slate-200 w-full" />
                  <span className="bg-white px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 absolute">
                    Or Sign In with Credentials
                  </span>
                </div>

                {/* Direct Credentials Form */}
                <form onSubmit={handleCustomLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                      SRM Email or Register Number
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. RA2311029010077 or krishna@srmist.edu.in"
                        value={emailOrRegNo}
                        onChange={(e) => setEmailOrRegNo(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                      Password / Security PIN
                    </label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || !emailOrRegNo.trim()}
                    className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all disabled:opacity-50"
                  >
                    {isLoading ? 'Signing In...' : 'Sign In to Exvora'}
                  </button>
                </form>
              </div>
            )}

            {/* TAB 2: CREATE ACCOUNT */}
            {activeTab === 'signup' && (
              <form onSubmit={handleRegister} className="space-y-5 animate-in fade-in duration-150">
                {/* 3D Cartoon Avatar Selector */}
                <div className="space-y-2">
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
                    Choose Your 3D Student Avatar
                  </label>
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {AVATAR_SEEDS.map((seed) => {
                      const avatarSrc = `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9`;
                      return (
                        <button
                          key={seed}
                          type="button"
                          onClick={() => setSelectedAvatarSeed(seed)}
                          className={`w-12 h-12 rounded-2xl p-1 border-2 transition-all flex-shrink-0 bg-slate-50 ${
                            selectedAvatarSeed === seed
                              ? 'border-blue-600 scale-110 shadow-md ring-2 ring-blue-600/30'
                              : 'border-slate-200 hover:border-slate-400'
                          }`}
                        >
                          <img src={avatarSrc} alt="Avatar" className="w-full h-full object-contain" />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name & Register Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Krishna / Priya Sen"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                      SRM Register No. *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. RA2311029010077"
                      value={srmSubjectId}
                      onChange={(e) => setSrmSubjectId(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                {/* SRM Email */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                    SRM Student Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. krishna@srmist.edu.in or ks9920@srmist.edu.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                {/* Department & Year */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                      Department / Branch *
                    </label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    >
                      {DEPARTMENTS.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                      Academic Year *
                    </label>
                    <select
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    >
                      {YEARS.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Campus Location */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                    Campus Location *
                  </label>
                  <select
                    value={campus}
                    onChange={(e) => setCampus(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    {CAMPUSES.map((camp) => (
                      <option key={camp} value={camp}>
                        {camp}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                    Password / PIN (For quick sign in)
                  </label>
                  <input
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !name.trim() || !email.trim() || !srmSubjectId.trim()}
                  className="w-full py-3.5 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>{isLoading ? 'Creating Account...' : 'Create Account & Join Exvora'}</span>
                </button>
              </form>
            )}

            {/* Privacy Guarantee Note */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1 text-xs text-slate-600">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Campus Network</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Your registered student profile enables safe peer-to-peer textbook barter, study borrowing, and event ticket reservations.
              </p>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link href="/" className="text-xs font-semibold text-slate-500 hover:text-slate-900 underline">
            &larr; Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[85vh] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
        </div>
      }
    >
      <AuthPortalContent />
    </Suspense>
  );
}
