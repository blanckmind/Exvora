import { CARTOON_SVGS, EVENT_CARTOON_SVGS } from '../cartoon-images';

export type CategoryType =
  | 'Textbooks'
  | 'Electronics'
  | 'Notes & Study Material'
  | 'Event Tickets'
  | 'Skills'
  | 'Give Away';

export type ExchangeMode = 'Exchange' | 'Share' | 'Give Away' | 'Sell';

export interface Listing {
  id: string;
  title: string;
  description: string;
  category: CategoryType;
  exchangeType: ExchangeMode;
  price?: number;
  preferredExchangeItem?: string;
  shareDuration?: string;
  skillDetails?: {
    topics: string[];
    format: '1-on-1 Meetup' | 'Online / Discord' | 'Library Study Group';
    availability: string;
  };
  condition?: 'Brand New' | 'Like New' | 'Good' | 'Fair';
  location: string;
  images: string[];
  sellerId: string;
  sellerName: string;
  sellerDept: string;
  sellerYear: string;
  sellerSubjectId: string;
  status: 'active' | 'reserved' | 'completed';
  createdAt: string;
}

export interface CampusRequest {
  id: string;
  title: string;
  description: string;
  category: CategoryType;
  urgency: 'Urgent (Today)' | 'This Week' | 'General';
  preferredMode: ExchangeMode;
  location: string;
  requesterId: string;
  requesterName: string;
  requesterDept: string;
  requesterYear: string;
  requesterSubjectId: string;
  status: 'open' | 'fulfilled';
  responsesCount: number;
  createdAt: string;
}

export interface ExchangeProposal {
  id: string;
  listingId?: string;
  listingTitle?: string;
  requestId?: string;
  requestTitle?: string;
  senderId: string;
  senderName: string;
  senderEmail: string;
  senderDept: string;
  recipientId: string;
  message: string;
  offeredItemOrSkill?: string;
  contactNumber?: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
}

export interface CampusEvent {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  organizer: string;
  totalSeats: number;
  availableSeats: number;
  ticketType: string;
  price: number;
  image: string;
  status: 'Upcoming' | 'Filling Fast' | 'Sold Out';
  createdAt: string;
}

export interface EventBooking {
  id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventVenue: string;
  eventTime: string;
  ticketType: string;
  totalPrice?: number;
  userId: string;
  userName: string;
  userEmail: string;
  userDept: string;
  userSubjectId: string;
  ticketCount: number;
  bookingCode: string;
  bookedAt: string;
  status: 'confirmed';
}

export const INITIAL_LISTINGS: Listing[] = [
  {
    id: 'list_0',
    title: 'Cryptography & Network Security (William Stallings) + Kali Linux Practical Notes',
    description: 'Core textbook for 2nd/3rd year Cyber Security and CSE. In crisp condition with colored highlight notes for RSA, AES, Diffie-Hellman, and Wireshark packet capture labs.',
    category: 'Textbooks',
    exchangeType: 'Exchange',
    preferredExchangeItem: 'Operating Systems (Silberschatz) or Web Security Reference Book',
    condition: 'Like New',
    location: 'Tech Park (TP) 6th Floor / Central Library',
    images: [CARTOON_SVGS.cybersecurity],
    sellerId: 'usr_srm_ktr_ra2311029010077',
    sellerName: 'Krishna',
    sellerDept: 'Cyber Security',
    sellerYear: '2nd Year',
    sellerSubjectId: 'RA2311029010077',
    status: 'active',
    createdAt: '2026-08-25T11:45:00Z',
  },
  {
    id: 'list_1',
    title: 'Introduction to Algorithms (CLRS 3rd Ed) + Handwritten DSA Notes',
    description: 'Complete Cormen book in great condition with no marked pages. Includes handwritten notes covering SRM CSE DSA syllabus, recurrence relations, and graph algorithms.',
    category: 'Textbooks',
    exchangeType: 'Exchange',
    preferredExchangeItem: 'Operating Systems (Silberschatz) or Computer Networks (Tanenbaum)',
    condition: 'Like New',
    location: 'Tech Park (TP) 7th Floor / Central Library',
    images: [CARTOON_SVGS.textbooks],
    sellerId: 'usr_srm_ktr_ra2211003010142',
    sellerName: 'Aarav Sharma',
    sellerDept: 'Computer Science and Engineering',
    sellerYear: '3rd Year',
    sellerSubjectId: 'RA2211003010142',
    status: 'active',
    createdAt: '2026-08-20T10:30:00Z',
  },
  {
    id: 'list_2',
    title: 'Anker USB-C 7-in-1 Hub with 4K HDMI & SD Card Reader',
    description: 'Barely used USB-C hub with HDMI, 3x USB 3.0, and 100W PD pass-through. Great for MacBooks / ultrabooks during lab presentations.',
    category: 'Electronics',
    exchangeType: 'Share',
    shareDuration: 'Available for short-term borrow (1-2 weeks)',
    condition: 'Like New',
    location: 'Paari / Kaari Hostel Block',
    images: [CARTOON_SVGS.electronics],
    sellerId: 'usr_srm_ktr_ra2111004010088',
    sellerName: 'Diya Sundaram',
    sellerDept: 'Electronics & Communication',
    sellerYear: '4th Year',
    sellerSubjectId: 'RA2111004010088',
    status: 'active',
    createdAt: '2026-08-22T14:15:00Z',
  },
  {
    id: 'list_3',
    title: 'Operating Systems & Microprocessors Exam Cram Notes (Comprehensive PDF + Booklet)',
    description: 'Clean color-coded handwritten summaries with process scheduling algorithms, paging formulas, memory diagrams, and 8086 assembly snippets.',
    category: 'Notes & Study Material',
    exchangeType: 'Give Away',
    condition: 'Like New',
    location: 'University Building (UB) Ground Floor',
    images: [CARTOON_SVGS.notes],
    sellerId: 'usr_srm_rmp_ra2311026010055',
    sellerName: 'Rohan Patel',
    sellerDept: 'Artificial Intelligence & Machine Learning',
    sellerYear: '2nd Year',
    sellerSubjectId: 'RA2311026010055',
    status: 'active',
    createdAt: '2026-08-23T09:00:00Z',
  },
  {
    id: 'list_4',
    title: 'Milan 2026 Pro-Night VIP Student Pass (Unused)',
    description: 'Got an extra pass for the Milan cultural fest pro-night musical concert because my project team has our review on the same evening.',
    category: 'Event Tickets',
    exchangeType: 'Exchange',
    preferredExchangeItem: 'Arduino Mega board or Raspberry Pi module',
    condition: 'Brand New',
    location: 'TP Food Court / Java Green',
    images: [CARTOON_SVGS.tickets],
    sellerId: 'usr_srm_vdp_ra2211008010210',
    sellerName: 'Ananya Reddy',
    sellerDept: 'Biotechnology & Genetic Engineering',
    sellerYear: '3rd Year',
    sellerSubjectId: 'RA2211008010210',
    status: 'active',
    createdAt: '2026-08-24T16:20:00Z',
  },
  {
    id: 'list_5',
    title: 'Can Teach Python Fundamentals, Data Analysis & Pandas Basics',
    description: 'Offering 1-on-1 tutoring sessions to help juniors or non-CS students master Python scripting, data structures, Jupyter notebooks, and Pandas for mini-projects.',
    category: 'Skills',
    exchangeType: 'Share',
    skillDetails: {
      topics: ['Python Syntax & OOP', 'Pandas & NumPy', 'Mini-Project Debugging', 'Git & GitHub Basics'],
      format: '1-on-1 Meetup',
      availability: 'Weekday evenings (5 PM - 7 PM) at Tech Park or Central Library',
    },
    location: 'Central Library / Tech Park 3rd Floor',
    images: [CARTOON_SVGS.skills],
    sellerId: 'usr_srm_ktr_ra2211003010142',
    sellerName: 'Aarav Sharma',
    sellerDept: 'Computer Science and Engineering',
    sellerYear: '3rd Year',
    sellerSubjectId: 'RA2211003010142',
    status: 'active',
    createdAt: '2026-08-25T08:00:00Z',
  },
  {
    id: 'list_6',
    title: 'Biotech Practical Lab Coat (Size M) + Sterile Dissection Box',
    description: 'Passing on my 2nd-year practical lab kit to any junior in Biotechnology, Biomedical, or Chemistry who needs it.',
    category: 'Give Away',
    exchangeType: 'Give Away',
    condition: 'Good',
    location: 'Biotech Block 3rd Floor / Java Hostel',
    images: [CARTOON_SVGS.giveaway],
    sellerId: 'usr_srm_vdp_ra2211008010210',
    sellerName: 'Ananya Reddy',
    sellerDept: 'Biotechnology & Genetic Engineering',
    sellerYear: '3rd Year',
    sellerSubjectId: 'RA2211008010210',
    status: 'active',
    createdAt: '2026-08-25T10:45:00Z',
  },
];

export const INITIAL_REQUESTS: CampusRequest[] = [
  {
    id: 'req_0',
    title: 'Need a HackRF One SDR or Wi-Fi Penetration Testing Adapter',
    description: 'Looking to borrow a compatible network adapter (Alfa AWUS036ACH or similar) for our Cyber Security semester CTF lab practical.',
    category: 'Electronics',
    preferredMode: 'Share',
    urgency: 'This Week',
    location: 'Tech Park 6th Floor / Paari Hostel',
    requesterId: 'usr_srm_ktr_ra2311029010077',
    requesterName: 'Krishna',
    requesterDept: 'Cyber Security',
    requesterYear: '2nd Year',
    requesterSubjectId: 'RA2311029010077',
    status: 'open',
    responsesCount: 1,
    createdAt: '2026-08-25T11:40:00Z',
  },
  {
    id: 'req_1',
    title: 'Looking for Engineering Graphics Drafter & Mini-Drafter Kit',
    description: 'Freshman looking for a used EG drafting board and clips for the upcoming drawing lab practicals this week.',
    category: 'Give Away',
    preferredMode: 'Share',
    urgency: 'This Week',
    location: 'University Building (UB) / Fresher Hostel Quad',
    requesterId: 'usr_srm_rmp_ra2311026010055',
    requesterName: 'Rohan Patel',
    requesterDept: 'AIML',
    requesterYear: '2nd Year',
    requesterSubjectId: 'RA2311026010055',
    status: 'open',
    responsesCount: 2,
    createdAt: '2026-08-24T11:00:00Z',
  },
  {
    id: 'req_2',
    title: 'Need Digital Signal Processing (Proakis & Manolakis) 4th Edition',
    description: 'Looking to borrow or exchange for this semester for ECE theory and DSP MATLAB simulations.',
    category: 'Textbooks',
    preferredMode: 'Exchange',
    urgency: 'This Week',
    location: 'Tech Park 8th Floor / Kaari Hostel',
    requesterId: 'usr_srm_ktr_ra2111004010088',
    requesterName: 'Diya Sundaram',
    requesterDept: 'ECE',
    requesterYear: '4th Year',
    requesterSubjectId: 'RA2111004010088',
    status: 'open',
    responsesCount: 1,
    createdAt: '2026-08-25T09:30:00Z',
  },
  {
    id: 'req_3',
    title: 'Need a Mentor / Tutor for Figma UI/UX Design for Hackathon Prototype',
    description: 'We are participating in the upcoming campus hackathon and need 1-2 hours of guidance on auto-layout and prototyping in Figma.',
    category: 'Skills',
    preferredMode: 'Share',
    urgency: 'Urgent (Today)',
    location: 'Tech Park FabLab / Online Discord',
    requesterId: 'usr_srm_ktr_ra2211003010142',
    requesterName: 'Aarav Sharma',
    requesterDept: 'Computer Science',
    requesterYear: '3rd Year',
    requesterSubjectId: 'RA2211003010142',
    status: 'open',
    responsesCount: 3,
    createdAt: '2026-08-25T10:15:00Z',
  },
];

export const INITIAL_EVENTS: CampusEvent[] = [
  {
    id: 'evt_1',
    title: 'Milan 2026 — Annual National Cultural Fest Pro-Night',
    description: 'The biggest national cultural extravaganza at SRMIST featuring celebrity musical performances, battle of the bands, EDM night, and visual drone lasers.',
    category: 'Concert / Pro-Night',
    date: 'Sep 18, 2026',
    time: '6:30 PM - 10:30 PM',
    venue: 'Dr. T.P. Ganesan Auditorium Main Hall',
    organizer: 'SRM Directorate of Student Affairs',
    totalSeats: 3500,
    availableSeats: 420,
    ticketType: 'VIP Pro-Night Student Pass',
    price: 299,
    image: EVENT_CARTOON_SVGS.festConcert,
    status: 'Filling Fast',
    createdAt: '2026-08-20T10:00:00Z',
  },
  {
    id: 'evt_2',
    title: 'HackSRM 5.0 — 36-Hour National Campus Hackathon',
    description: '36 hours of non-stop coding, hardware prototyping, and pitching to industry leaders with ₹3,00,000+ prize pool across AI, Web3, Healthcare, and Cyber Security tracks.',
    category: 'Technical / Hackathon',
    date: 'Oct 02 - 04, 2026',
    time: 'Starts Friday 9:00 AM',
    venue: 'Tech Park FabLab & 7th Floor Computing Labs',
    organizer: 'IEEE SRM Student Branch',
    totalSeats: 600,
    availableSeats: 85,
    ticketType: 'Hackathon Delegate Pass (Food & Kit)',
    price: 199,
    image: EVENT_CARTOON_SVGS.hackathon,
    status: 'Filling Fast',
    createdAt: '2026-08-21T12:00:00Z',
  },
  {
    id: 'evt_3',
    title: 'SRM CyberDef CTF 2026 — Offensive Security Challenge',
    description: 'Jeopardy-style capture the flag competition testing reverse engineering, binary exploitation, web vulnerabilities, cryptography, and network forensics.',
    category: 'Technical / Hackathon',
    date: 'Sep 26, 2026',
    time: '10:00 AM - 6:00 PM',
    venue: 'Tech Park 6th Floor Cyber Defense Center',
    organizer: 'Cyber Security Student Society',
    totalSeats: 250,
    availableSeats: 34,
    ticketType: 'CTF Competitor Pass',
    price: 149,
    image: CARTOON_SVGS.cybersecurity,
    status: 'Filling Fast',
    createdAt: '2026-08-22T08:30:00Z',
  },
  {
    id: 'evt_4',
    title: 'Hands-on Autonomous AI Agents & LangChain Workshop',
    description: 'Interactive live coding session on multi-agent orchestrations, RAG pipelines, and local LLM tool calling. Includes GPU compute credits and certificate.',
    category: 'Workshop / Seminar',
    date: 'Sep 22, 2026',
    time: '2:00 PM - 5:30 PM',
    venue: 'University Building (UB) Mini Hall 1',
    organizer: 'AI & Data Science Student Chapter',
    totalSeats: 180,
    availableSeats: 16,
    ticketType: 'Workshop Pass + Certificate',
    price: 249,
    image: EVENT_CARTOON_SVGS.workshop,
    status: 'Filling Fast',
    createdAt: '2026-08-23T14:00:00Z',
  },
  {
    id: 'evt_5',
    title: 'Aarush 2026 — National Techno-Management Fest Opening & Laser Show',
    description: 'The grand inaugural night of Aarush featuring international keynote speakers, robotics exhibits, autonomous vehicle showcases, and illuminated 3D laser projection mapping.',
    category: 'Cultural Fest',
    date: 'Oct 10, 2026',
    time: '5:00 PM - 9:30 PM',
    venue: 'Main Sports Complex & Open Air Amphitheatre',
    organizer: 'Team Aarush & Student Affairs',
    totalSeats: 4000,
    availableSeats: 650,
    ticketType: 'Aarush All-Access Fest Pass',
    price: 199,
    image: EVENT_CARTOON_SVGS.aarush,
    status: 'Filling Fast',
    createdAt: '2026-08-24T09:00:00Z',
  },
  {
    id: 'evt_6',
    title: 'SRM E-Sports Arena — Valorant & BGMI Inter-College Championship',
    description: 'High-octane collegiate esports tournament on 240Hz gaming rigs with live caster commentary, prize pool of ₹75,000, and campus viewing lounge.',
    category: 'Sports / E-Sports',
    date: 'Sep 28 - 29, 2026',
    time: '11:00 AM - 7:00 PM',
    venue: 'Tech Park 8th Floor Gaming & VR Arena',
    organizer: 'SRM Gaming & E-Sports Guild',
    totalSeats: 320,
    availableSeats: 48,
    ticketType: 'Gamer Tournament Entry Pass',
    price: 99,
    image: EVENT_CARTOON_SVGS.esports,
    status: 'Filling Fast',
    createdAt: '2026-08-24T14:00:00Z',
  },
  {
    id: 'evt_7',
    title: 'RoboWars 2026 — Combat Robotics & Drone Racing Arena',
    description: 'Heavyweight combat robots clash in a bulletproof steel cage with spinning blades, flame throwers, and high-speed FPV drone obstacle courses.',
    category: 'Technical / Hackathon',
    date: 'Oct 14, 2026',
    time: '10:00 AM - 5:00 PM',
    venue: 'Mechanical Sciences Quad & Heavy Lab',
    organizer: 'Robotics Club SRM (RCS)',
    totalSeats: 500,
    availableSeats: 92,
    ticketType: 'RoboWars Spectator & Pit Pass',
    price: 129,
    image: EVENT_CARTOON_SVGS.robowars,
    status: 'Filling Fast',
    createdAt: '2026-08-25T08:00:00Z',
  },
  {
    id: 'evt_8',
    title: 'Mastering UI/UX & Product Design with Figma Sprint Workshop',
    description: 'Fast-paced design sprint covering Figma components, auto-layout mastery, design tokens, and user testing for hackathon finalists.',
    category: 'Workshop / Seminar',
    date: 'Sep 30, 2026',
    time: '2:00 PM - 6:00 PM',
    venue: 'Tech Park 3rd Floor Design Lab',
    organizer: 'Google Developer Student Club (GDSC SRM)',
    totalSeats: 120,
    availableSeats: 18,
    ticketType: 'Design Pass + Assets Kit',
    price: 149,
    image: EVENT_CARTOON_SVGS.designFigma,
    status: 'Filling Fast',
    createdAt: '2026-08-25T09:30:00Z',
  },
];
