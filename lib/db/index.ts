import {
  INITIAL_LISTINGS,
  INITIAL_REQUESTS,
  INITIAL_EVENTS,
  Listing,
  CampusRequest,
  CampusEvent,
  EventBooking,
  ExchangeProposal,
  CategoryType,
  ExchangeMode,
} from './mock-data';
import { MOCK_STUDENTS, MockStudentProfile } from '../auth/mock';

export interface ExvoraUser {
  id: string;
  srm_subject_id: string;
  email: string;
  name: string;
  department: string;
  year: string;
  campus?: string;
  avatar?: string;
  passwordHash?: string;
  created_at: string;
  updated_at: string;
}

// Global persistent in-memory store across hot-reloads in Next.js development
declare global {
  var __exvora_db:
    | {
        users: Map<string, ExvoraUser>;
        listings: Listing[];
        requests: CampusRequest[];
        events: CampusEvent[];
        bookings: EventBooking[];
        proposals: ExchangeProposal[];
      }
    | undefined;
}

function initDb() {
  if (!globalThis.__exvora_db) {
    const usersMap = new Map<string, ExvoraUser>();

    // Seed mock students into Exvora User Database
    MOCK_STUDENTS.forEach((student) => {
      const userId = `usr_${student.srmSubjectId.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
      usersMap.set(student.srmSubjectId, {
        id: userId,
        srm_subject_id: student.srmSubjectId,
        email: student.email,
        name: student.name,
        department: student.department,
        year: student.year,
        campus: student.campus,
        avatar: student.avatar,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    });

    globalThis.__exvora_db = {
      users: usersMap,
      listings: [...INITIAL_LISTINGS],
      requests: [...INITIAL_REQUESTS],
      events: [...INITIAL_EVENTS],
      bookings: [
        {
          id: 'bkg_1',
          eventId: 'evt_1',
          eventTitle: 'Milan 2026 — Annual National Cultural Fest Pro-Night',
          eventDate: 'Sep 18, 2026',
          eventVenue: 'Dr. T.P. Ganesan Auditorium Main Hall',
          eventTime: '6:30 PM - 10:30 PM',
          ticketType: 'VIP Pro-Night Student Pass',
          totalPrice: 299,
          userId: 'usr_srm_ktr_ra2311029010077',
          userName: 'Krishna',
          userEmail: 'krishna@srmist.edu.in',
          userDept: 'Cyber Security',
          userSubjectId: 'RA2311029010077',
          ticketCount: 1,
          bookingCode: 'EXV-MILAN-99201',
          bookedAt: '2026-08-25T11:50:00Z',
          status: 'confirmed',
        },
        {
          id: 'bkg_2',
          eventId: 'evt_2',
          eventTitle: 'HackSRM 5.0 — 36-Hour National Campus Hackathon',
          eventDate: 'Oct 02 - 04, 2026',
          eventVenue: 'Tech Park FabLab & 7th Floor Computing Labs',
          eventTime: 'Starts Friday 9:00 AM',
          ticketType: 'Hackathon Delegate Pass (Food & Kit)',
          totalPrice: 199,
          userId: 'usr_srm_ktr_ra2311029010077',
          userName: 'Krishna',
          userEmail: 'krishna@srmist.edu.in',
          userDept: 'Cyber Security',
          userSubjectId: 'RA2311029010077',
          ticketCount: 1,
          bookingCode: 'EXV-HACKS-44109',
          bookedAt: '2026-08-25T12:00:00Z',
          status: 'confirmed',
        },
      ],
      proposals: [
        {
          id: 'prop_1',
          listingId: 'list_1',
          listingTitle: 'Introduction to Algorithms (CLRS 3rd Ed) + Handwritten DSA Notes',
          senderId: 'usr_srm_rmp_ra2311026010055',
          senderName: 'Rohan Patel',
          senderEmail: 'rp1102@srmist.edu.in',
          senderDept: 'AIML',
          recipientId: 'usr_srm_ktr_ra2211003010142',
          message: 'Hey Aarav, I have the Silberschatz Operating Systems book in mint condition! Would love to trade for your CLRS book at TP 3rd floor food court.',
          offeredItemOrSkill: 'Silberschatz OS 9th Edition',
          contactNumber: '+91 98765 43210',
          status: 'pending',
          createdAt: '2026-08-25T11:00:00Z',
        },
      ],
    };
  }
  return globalThis.__exvora_db;
}

const db = initDb();

export const UsersDB = {
  async findBySubjectId(srmSubjectId: string): Promise<ExvoraUser | null> {
    return db.users.get(srmSubjectId) || null;
  },

  async findById(id: string): Promise<ExvoraUser | null> {
    for (const user of db.users.values()) {
      if (user.id === id) return user;
    }
    return null;
  },

  async findByEmailOrRegNo(identifier: string): Promise<ExvoraUser | null> {
    const q = identifier.trim().toLowerCase();
    for (const user of db.users.values()) {
      if (
        user.email.toLowerCase() === q ||
        user.srm_subject_id.toLowerCase() === q ||
        user.srm_subject_id.toLowerCase().includes(q)
      ) {
        return user;
      }
    }
    return null;
  },

  async register(params: {
    name: string;
    email: string;
    department: string;
    year: string;
    srmSubjectId: string;
    campus?: string;
    avatar?: string;
    password?: string;
  }): Promise<ExvoraUser> {
    const now = new Date().toISOString();
    const cleanSubjectId = params.srmSubjectId.trim().toUpperCase();
    const cleanId = cleanSubjectId.replace(/[^a-zA-Z0-9]/g, '');
    const userId = `usr_${cleanSubjectId.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;

    const avatarUrl =
      params.avatar ||
      `https://api.dicebear.com/7.x/bottts/svg?seed=${cleanId}&backgroundColor=b6e3f4,c0aede,d1d4f9`;

    const newUser: ExvoraUser = {
      id: userId,
      srm_subject_id: cleanSubjectId,
      email: params.email.trim().toLowerCase(),
      name: params.name.trim(),
      department: params.department.trim(),
      year: params.year.trim(),
      campus: params.campus || 'Kattankulathur (Main Campus)',
      avatar: avatarUrl,
      passwordHash: params.password ? `hashed_${params.password}` : undefined,
      created_at: now,
      updated_at: now,
    };

    db.users.set(cleanSubjectId, newUser);

    const existingIndex = MOCK_STUDENTS.findIndex(
      (s) => s.srmSubjectId.toUpperCase() === cleanSubjectId
    );
    const mockProfile: MockStudentProfile = {
      srmSubjectId: cleanSubjectId,
      name: newUser.name,
      email: newUser.email,
      department: newUser.department,
      year: newUser.year,
      campus: newUser.campus || 'Kattankulathur (Main Campus)',
      avatar: newUser.avatar || avatarUrl,
    };

    if (existingIndex >= 0) {
      MOCK_STUDENTS[existingIndex] = mockProfile;
    } else {
      MOCK_STUDENTS.unshift(mockProfile);
    }

    return newUser;
  },

  async upsertFromSrmIdentity(identity: {
    srmSubjectId: string;
    email?: string;
    name?: string;
    department?: string;
    year?: string;
  }): Promise<ExvoraUser> {
    const existing = db.users.get(identity.srmSubjectId);
    const now = new Date().toISOString();

    if (existing) {
      const updated: ExvoraUser = {
        ...existing,
        email: identity.email || existing.email,
        name: identity.name || existing.name,
        department: identity.department || existing.department,
        year: identity.year || existing.year,
        updated_at: now,
      };
      db.users.set(identity.srmSubjectId, updated);
      return updated;
    }

    const cleanId = identity.srmSubjectId.replace(/[^a-zA-Z0-9]/g, '');
    const newUser: ExvoraUser = {
      id: `usr_${identity.srmSubjectId.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
      srm_subject_id: identity.srmSubjectId,
      email: identity.email || 'student@srmist.edu.in',
      name: identity.name || 'SRM Student',
      department: identity.department || 'Department not specified',
      year: identity.year || 'Undergraduate',
      campus: 'Kattankulathur Campus',
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${cleanId}&backgroundColor=b6e3f4,c0aede,d1d4f9`,
      created_at: now,
      updated_at: now,
    };

    db.users.set(identity.srmSubjectId, newUser);
    return newUser;
  },
};

export const ListingsDB = {
  async getAll(filter?: { category?: string; search?: string; exchangeType?: string }): Promise<Listing[]> {
    let result = [...db.listings];

    if (filter?.category && filter.category !== 'All') {
      result = result.filter((item) => item.category === filter.category);
    }

    if (filter?.exchangeType && filter.exchangeType !== 'All') {
      result = result.filter((item) => item.exchangeType === filter.exchangeType);
    }

    if (filter?.search && filter.search.trim().length > 0) {
      const q = filter.search.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q) ||
          item.sellerDept.toLowerCase().includes(q) ||
          (item.skillDetails && item.skillDetails.topics.some((t) => t.toLowerCase().includes(q)))
      );
    }

    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async getById(id: string): Promise<Listing | null> {
    return db.listings.find((item) => item.id === id) || null;
  },

  async getBySellerId(sellerId: string): Promise<Listing[]> {
    return db.listings.filter((item) => item.sellerId === sellerId);
  },

  async create(listing: Omit<Listing, 'id' | 'createdAt' | 'status'>): Promise<Listing> {
    const newListing: Listing = {
      ...listing,
      id: `list_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    db.listings.unshift(newListing);
    return newListing;
  },

  async updateStatus(id: string, status: 'active' | 'reserved' | 'completed'): Promise<Listing | null> {
    const item = db.listings.find((l) => l.id === id);
    if (!item) return null;
    item.status = status;
    return item;
  },

  async delete(id: string, sellerId: string): Promise<boolean> {
    const idx = db.listings.findIndex((l) => l.id === id && l.sellerId === sellerId);
    if (idx === -1) return false;
    db.listings.splice(idx, 1);
    return true;
  },
};

export const RequestsDB = {
  async getAll(filter?: { category?: string; search?: string; urgency?: string }): Promise<CampusRequest[]> {
    let result = [...db.requests];

    if (filter?.category && filter.category !== 'All') {
      result = result.filter((r) => r.category === filter.category);
    }

    if (filter?.urgency && filter.urgency !== 'All') {
      result = result.filter((r) => r.urgency === filter.urgency);
    }

    if (filter?.search && filter.search.trim().length > 0) {
      const q = filter.search.toLowerCase();
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.location.toLowerCase().includes(q) ||
          r.requesterDept.toLowerCase().includes(q)
      );
    }

    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async getById(id: string): Promise<CampusRequest | null> {
    return db.requests.find((r) => r.id === id) || null;
  },

  async getByRequesterId(requesterId: string): Promise<CampusRequest[]> {
    return db.requests.filter((r) => r.requesterId === requesterId);
  },

  async create(req: Omit<CampusRequest, 'id' | 'createdAt' | 'status' | 'responsesCount'>): Promise<CampusRequest> {
    const newReq: CampusRequest = {
      ...req,
      id: `req_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      status: 'open',
      responsesCount: 0,
      createdAt: new Date().toISOString(),
    };
    db.requests.unshift(newReq);
    return newReq;
  },

  async incrementResponses(id: string): Promise<void> {
    const r = db.requests.find((item) => item.id === id);
    if (r) r.responsesCount += 1;
  },

  async delete(id: string, requesterId: string): Promise<boolean> {
    const idx = db.requests.findIndex((r) => r.id === id && r.requesterId === requesterId);
    if (idx === -1) return false;
    db.requests.splice(idx, 1);
    return true;
  },
};

export const EventsDB = {
  async getAll(filter?: { category?: string; search?: string }): Promise<CampusEvent[]> {
    let result = [...db.events];

    if (filter?.category && filter.category !== 'All') {
      result = result.filter((e) => e.category === filter.category);
    }

    if (filter?.search && filter.search.trim().length > 0) {
      const q = filter.search.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.venue.toLowerCase().includes(q) ||
          e.organizer.toLowerCase().includes(q)
      );
    }

    return result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  },

  async getById(id: string): Promise<CampusEvent | null> {
    return db.events.find((e) => e.id === id) || null;
  },

  async bookTicket(params: {
    eventId: string;
    userId: string;
    userName: string;
    userEmail: string;
    userDept: string;
    userSubjectId: string;
    ticketCount: number;
  }): Promise<EventBooking> {
    const event = db.events.find((e) => e.id === params.eventId);
    if (!event) {
      throw new Error('Event not found.');
    }

    if (event.availableSeats < params.ticketCount) {
      throw new Error(`Only ${event.availableSeats} tickets remaining for this event.`);
    }

    event.availableSeats -= params.ticketCount;
    if (event.availableSeats === 0) {
      event.status = 'Sold Out';
    }

    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const cleanEventKey = event.title.replace(/[^a-zA-Z]/g, '').slice(0, 5).toUpperCase();
    const bookingCode = `EXV-${cleanEventKey}-${randomSuffix}`;
    const totalPrice = (event.price || 0) * params.ticketCount;

    const booking: EventBooking = {
      id: `bkg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.date,
      eventVenue: event.venue,
      eventTime: event.time,
      ticketType: event.ticketType,
      totalPrice,
      userId: params.userId,
      userName: params.userName,
      userEmail: params.userEmail,
      userDept: params.userDept,
      userSubjectId: params.userSubjectId,
      ticketCount: params.ticketCount,
      bookingCode,
      bookedAt: new Date().toISOString(),
      status: 'confirmed',
    };

    db.bookings.unshift(booking);
    return booking;
  },

  async getBookingsForUser(userId: string): Promise<EventBooking[]> {
    return db.bookings.filter((b) => b.userId === userId);
  },

  async transferBooking(params: {
    bookingId: string;
    currentUserId: string;
    targetIdentifier: string; // email or reg number
    reason?: string;
  }): Promise<{ updatedBooking: EventBooking; recipientUser: ExvoraUser }> {
    const booking = db.bookings.find(
      (b) => b.id === params.bookingId && b.userId === params.currentUserId
    );
    if (!booking) {
      throw new Error('Ticket booking not found or does not belong to you.');
    }

    // Find recipient student
    let recipient = await UsersDB.findByEmailOrRegNo(params.targetIdentifier);
    if (!recipient) {
      // If student isn't registered yet, create verified student placeholder
      const cleanId = params.targetIdentifier.trim().toUpperCase();
      recipient = await UsersDB.register({
        name: cleanId.includes('@') ? cleanId.split('@')[0] : `Student ${cleanId}`,
        email: cleanId.includes('@') ? cleanId : `${cleanId.toLowerCase()}@srmist.edu.in`,
        department: 'Campus Student',
        year: 'Undergraduate',
        srmSubjectId: cleanId,
      });
    }

    if (recipient.id === params.currentUserId) {
      throw new Error('You cannot transfer a ticket pass to yourself.');
    }

    // Transfer ownership
    const oldStudentName = booking.userName;
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const cleanEventKey = booking.eventTitle.replace(/[^a-zA-Z]/g, '').slice(0, 4).toUpperCase();
    
    booking.userId = recipient.id;
    booking.userName = recipient.name;
    booking.userEmail = recipient.email;
    booking.userDept = recipient.department;
    booking.userSubjectId = recipient.srm_subject_id;
    booking.bookingCode = `EXV-PASS-${cleanEventKey}-${randomSuffix}`;
    booking.bookedAt = new Date().toISOString();

    return { updatedBooking: booking, recipientUser: recipient };
  },

  async listPassForExchange(params: {
    bookingId: string;
    user: { id: string; name: string; department: string; year: string; srmSubjectId: string };
    exchangeType: ExchangeMode;
    price?: number;
    preferredExchangeItem?: string;
    notes?: string;
  }): Promise<Listing> {
    const booking = db.bookings.find(
      (b) => b.id === params.bookingId && b.userId === params.user.id
    );
    if (!booking) {
      throw new Error('Ticket booking not found.');
    }

    const event = db.events.find((e) => e.id === booking.eventId);
    const eventImage = event ? event.image : INITIAL_LISTINGS[4].images[0];

    const listingTitle = `[Can't Attend] ${booking.eventTitle} — Student Pass (${booking.ticketCount} Seat${booking.ticketCount > 1 ? 's' : ''})`;
    const listingDesc = params.notes?.trim()
      ? params.notes
      : `Cannot attend this event due to schedule/exams. Passing my ${booking.ticketType} (${booking.eventDate} at ${booking.eventVenue}) to any fellow SRM student!`;

    const newListing = await ListingsDB.create({
      title: listingTitle,
      description: listingDesc,
      category: 'Event Tickets',
      exchangeType: params.exchangeType || 'Give Away',
      price: params.exchangeType === 'Sell' ? Number(params.price) || booking.totalPrice || 0 : 0,
      preferredExchangeItem: params.preferredExchangeItem,
      condition: 'Brand New',
      location: booking.eventVenue,
      images: [eventImage],
      sellerId: params.user.id,
      sellerName: params.user.name,
      sellerDept: params.user.department,
      sellerYear: params.user.year,
      sellerSubjectId: params.user.srmSubjectId,
    });

    return newListing;
  },
};

export const ExchangesDB = {
  async getForUser(userId: string): Promise<{ sent: ExchangeProposal[]; received: ExchangeProposal[] }> {
    const sent = db.proposals.filter((p) => p.senderId === userId);
    const received = db.proposals.filter((p) => p.recipientId === userId);
    return { sent, received };
  },

  async create(proposal: Omit<ExchangeProposal, 'id' | 'status' | 'createdAt'>): Promise<ExchangeProposal> {
    const newProp: ExchangeProposal = {
      ...proposal,
      id: `prop_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    db.proposals.unshift(newProp);

    if (proposal.requestId) {
      await RequestsDB.incrementResponses(proposal.requestId);
    }

    return newProp;
  },

  async updateStatus(
    id: string,
    status: 'accepted' | 'declined',
    recipientId: string
  ): Promise<ExchangeProposal | null> {
    const prop = db.proposals.find((p) => p.id === id && p.recipientId === recipientId);
    if (!prop) return null;
    prop.status = status;
    return prop;
  },
};
