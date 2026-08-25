'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  Cpu,
  FileText,
  Ticket,
  Lightbulb,
  Gift,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  Sparkles,
  AlertCircle,
  Eye,
  Plus,
} from 'lucide-react';
import SuccessState3D from '@/components/SuccessState3D';
import ItemCard from '@/components/ItemCard';
import { CategoryType, ExchangeMode, Listing } from '@/lib/db/mock-data';
import { CARTOON_SVGS, CARTOON_PRESETS } from '@/lib/cartoon-images';

const CATEGORY_OPTIONS: { type: CategoryType; icon: any; label: string; subtext: string; defaultImg: string }[] = [
  { type: 'Textbooks', icon: BookOpen, label: 'Textbook', subtext: 'Engineering & science reference books, manuals', defaultImg: CARTOON_SVGS.textbooks },
  { type: 'Electronics', icon: Cpu, label: 'Electronics', subtext: 'Arduino, microcontrollers, hubs, chargers, calculators', defaultImg: CARTOON_SVGS.electronics },
  { type: 'Notes & Study Material', icon: FileText, label: 'Notes & Study Material', subtext: 'Handwritten summaries, formula sheets, practical files', defaultImg: CARTOON_SVGS.notes },
  { type: 'Event Tickets', icon: Ticket, label: 'Event Ticket', subtext: 'Cultural fest passes, hackathon tickets, workshop slots', defaultImg: CARTOON_SVGS.tickets },
  { type: 'Skills', icon: Lightbulb, label: 'Offer a Skill', subtext: 'Tutoring, programming, UI/UX, CAD, guitar, mentoring', defaultImg: CARTOON_SVGS.skills },
  { type: 'Give Away', icon: Gift, label: 'Give Away', subtext: 'Free donation (lab coats, drafters, stationery, hostel items)', defaultImg: CARTOON_SVGS.giveaway },
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

export default function SharePage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Form State
  const [category, setCategory] = useState<CategoryType>('Textbooks');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [exchangeType, setExchangeType] = useState<ExchangeMode>('Exchange');
  const [price, setPrice] = useState('0');
  const [preferredExchangeItem, setPreferredExchangeItem] = useState('');
  const [shareDuration, setShareDuration] = useState('Available for the semester');
  const [condition, setCondition] = useState<'Brand New' | 'Like New' | 'Good' | 'Fair'>('Like New');
  const [location, setLocation] = useState(LOCATIONS[0]);
  const [customLocation, setCustomLocation] = useState('');
  const [selectedImage, setSelectedImage] = useState(CARTOON_SVGS.textbooks);

  // Skill specific
  const [skillTopics, setSkillTopics] = useState('Python OOP, Pandas, Project Setup');
  const [skillFormat, setSkillFormat] = useState<'1-on-1 Meetup' | 'Online / Discord' | 'Library Study Group'>('1-on-1 Meetup');
  const [skillAvailability, setSkillAvailability] = useState('Weekday evenings (5 PM - 7 PM)');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [publishedListing, setPublishedListing] = useState<Listing | null>(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.authenticated) {
          setCurrentUser(data.user);
        } else {
          router.push('/login?redirect=/share');
        }
      })
      .catch(() => router.push('/login?redirect=/share'));
  }, [router]);

  const handleSelectCategory = (cat: CategoryType) => {
    setCategory(cat);
    const matchedOption = CATEGORY_OPTIONS.find((c) => c.type === cat);
    if (matchedOption) {
      setSelectedImage(matchedOption.defaultImg);
    }
    if (cat === 'Give Away') {
      setExchangeType('Give Away');
    } else if (cat === 'Skills') {
      setExchangeType('Share');
    } else if (cat === 'Notes & Study Material') {
      setExchangeType('Give Away');
    } else if (cat === 'Electronics') {
      setExchangeType('Share');
    } else {
      setExchangeType('Exchange');
    }
    setStep(2);
  };

  const handlePublish = async () => {
    setIsSubmitting(true);
    setError(null);

    const finalLocation = customLocation.trim() || location;

    const payload: any = {
      title,
      description,
      category,
      type: exchangeType,
      exchangeType,
      price: exchangeType === 'Sell' ? Number(price) : 0,
      condition,
      location: finalLocation,
      images: [selectedImage],
      preferredExchangeItem: exchangeType === 'Exchange' ? preferredExchangeItem : undefined,
      shareDuration: exchangeType === 'Share' ? shareDuration : undefined,
    };

    if (category === 'Skills') {
      payload.skillDetails = {
        topics: skillTopics.split(',').map((t) => t.trim()).filter(Boolean),
        format: skillFormat,
        availability: skillAvailability,
      };
    }

    try {
      const res = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to publish listing.');
      }

      setPublishedListing(data.listing);
      setStep(4);
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Progress Indicator */}
      {step < 4 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-extrabold text-slate-500">
            <span className={step >= 1 ? 'text-blue-700 font-black' : ''}>1. Choose Category</span>
            <span className={step >= 2 ? 'text-blue-700 font-black' : ''}>2. Resource Details</span>
            <span className={step >= 3 ? 'text-blue-700 font-black' : ''}>3. Live Preview & Confirmation</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full transition-all duration-300 rounded-full"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* STEP 1: WHAT ARE YOU SHARING? */}
      {step === 1 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="text-center max-w-lg mx-auto space-y-2">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              What are you sharing today?
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Select what best describes the resource or skill you want to share with the campus.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
            {CATEGORY_OPTIONS.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.type}
                  onClick={() => handleSelectCategory(item.type)}
                  className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all duration-200 text-left space-y-3 group hover:scale-[1.02]"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 group-hover:text-blue-700 transition-colors">
                      {item.label}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {item.subtext}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 2: ENTER INFORMATION */}
      {step === 2 && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 space-y-8 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                Category: {category}
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
                Tell us about what you're sharing
              </h2>
            </div>
            <button
              onClick={() => setStep(1)}
              className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" /> Change
            </button>
          </div>

          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                Title / Name *
              </label>
              <input
                type="text"
                required
                placeholder={
                  category === 'Skills'
                    ? 'e.g. Can Teach Python Scripting & Pandas for Mini-Projects'
                    : 'e.g. Introduction to Algorithms (CLRS 3rd Edition)'
                }
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            {/* Exchange Mode */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                  Exchange Type *
                </label>
                <select
                  value={exchangeType}
                  onChange={(e) => setExchangeType(e.target.value as any)}
                  className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                >
                  <option value="Exchange">Barter / Item Exchange</option>
                  <option value="Share">Study Share / Temporary Borrow</option>
                  <option value="Give Away">Free Give Away / Donation</option>
                  <option value="Sell">Direct Student Sale (INR)</option>
                </select>
              </div>

              {exchangeType === 'Exchange' && (
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                    What would you like in exchange?
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Operating Systems book / Raspberry Pi"
                    value={preferredExchangeItem}
                    onChange={(e) => setPreferredExchangeItem(e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              )}

              {exchangeType === 'Share' && (
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                    Share / Borrow Duration
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. For 2 weeks / For this semester"
                    value={shareDuration}
                    onChange={(e) => setShareDuration(e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              )}

              {exchangeType === 'Sell' && (
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                    Student Price (INR ₹)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 400"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              )}
            </div>

            {/* Condition & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                  Item Condition
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as any)}
                  className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                >
                  <option value="Brand New">Brand New (Unused)</option>
                  <option value="Like New">Like New (Mint)</option>
                  <option value="Good">Good (Minor wear)</option>
                  <option value="Fair">Fair (Functional)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                  Campus Hand-off Location *
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
              </div>
            </div>

            {/* Skill Specific Details */}
            {category === 'Skills' && (
              <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-2xl space-y-4">
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-emerald-900">
                  Skill Tutoring & Mentorship Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-emerald-950 mb-1">
                      Topics Covered (comma separated)
                    </label>
                    <input
                      type="text"
                      value={skillTopics}
                      onChange={(e) => setSkillTopics(e.target.value)}
                      placeholder="e.g. Python OOP, Pandas, Jupyter, Git"
                      className="w-full px-3 py-2 text-xs bg-white border border-emerald-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-emerald-950 mb-1">
                      Tutoring Format
                    </label>
                    <select
                      value={skillFormat}
                      onChange={(e) => setSkillFormat(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs bg-white border border-emerald-300 rounded-xl"
                    >
                      <option value="1-on-1 Meetup">1-on-1 Meetup (Tech Park / Library)</option>
                      <option value="Online / Discord">Online / Discord Call</option>
                      <option value="Library Study Group">Library Study Group</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                Description & Semester Relevance *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Include edition, syllabus relevance, condition details, or what students will learn..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            {/* 3D Cartoon Graphic Presets */}
            <div className="space-y-2">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
                Choose 3D Cartoon Style Illustration
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
                {CARTOON_PRESETS.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedImage(img.url)}
                    className={`relative rounded-2xl overflow-hidden border-2 aspect-video bg-slate-900 group transition-all ${
                      selectedImage === img.url
                        ? 'border-blue-600 ring-2 ring-blue-600/40 scale-105 shadow-md'
                        : 'border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                    <span className="absolute inset-x-0 bottom-0 bg-slate-950/80 text-white text-[9px] py-0.5 truncate px-1 text-center font-bold">
                      {img.label.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Proceed to Preview */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-900"
              >
                Back
              </button>

              <button
                type="button"
                disabled={!title.trim() || !description.trim()}
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md disabled:opacity-50 transition-all"
              >
                <span>Continue to Live Preview</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: LIVE PREVIEW & CONFIRMATION */}
      {step === 3 && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 space-y-8 animate-in fade-in duration-200">
          <div className="space-y-1 border-b border-slate-100 pb-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded">
              <Eye className="w-4 h-4" />
              <span>Step 3 of 3: Live Card Preview</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
              Here is how your resource will appear on Exvora
            </h2>
            <p className="text-xs text-slate-500">
              Confirm your details before making it discoverable to SRM students.
            </p>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Render Actual Live Preview ItemCard */}
          <div className="max-w-sm mx-auto">
            <ItemCard
              listing={{
                id: 'preview_id',
                title: title || 'Resource Title',
                description: description || 'Description snippet...',
                category,
                exchangeType,
                price: exchangeType === 'Sell' ? Number(price) : 0,
                preferredExchangeItem: exchangeType === 'Exchange' ? preferredExchangeItem : undefined,
                shareDuration: exchangeType === 'Share' ? shareDuration : undefined,
                condition,
                location: customLocation.trim() || location,
                images: [selectedImage],
                sellerId: currentUser?.id || 'usr_preview',
                sellerName: currentUser?.name || 'Verified SRM Student',
                sellerDept: currentUser?.department || 'Department',
                sellerYear: currentUser?.year || 'Undergraduate',
                sellerSubjectId: currentUser?.srmSubjectId || 'SRM_ID',
                status: 'active',
                createdAt: new Date().toISOString(),
              }}
              onSelect={() => {}}
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-900"
            >
              Edit Details
            </button>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={handlePublish}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-900 hover:bg-blue-950 text-white font-black text-sm rounded-2xl shadow-xl transition-all disabled:opacity-50 hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{isSubmitting ? 'Publishing...' : 'Publish to Campus'}</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: 3D SUCCESS STATE */}
      {step === 4 && publishedListing && (
        <SuccessState3D
          title="You're live on Exvora."
          subtitle={`"${publishedListing.title}" is now discoverable to the entire SRMIST student community.`}
          primaryActionText="Explore Marketplace"
          primaryActionHref="/explore"
          secondaryActionText="Manage in My Exchanges"
          secondaryActionHref="/my-exchanges"
        />
      )}
    </div>
  );
}
