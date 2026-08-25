import { UserSession } from './session';

export interface MockStudentProfile {
  srmSubjectId: string;
  name: string;
  email: string;
  department: string;
  year: string;
  campus: string;
  avatar: string;
}

export const MOCK_STUDENTS: MockStudentProfile[] = [
  {
    srmSubjectId: 'SRM_KTR_RA2311029010077',
    name: 'Krishna',
    email: 'krishna@srmist.edu.in',
    department: 'Cyber Security',
    year: '2nd Year (Batch 2023-27)',
    campus: 'Kattankulathur (Main Campus)',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=KrishnaCyber77&backgroundColor=b6e3f4,c0aede,d1d4f9',
  },
  {
    srmSubjectId: 'SRM_KTR_RA2211003010142',
    name: 'Aarav Sharma',
    email: 'as9421@srmist.edu.in',
    department: 'Computer Science and Engineering',
    year: '3rd Year (Batch 2022-26)',
    campus: 'Kattankulathur (Main Campus)',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=AaravDev142&backgroundColor=ffd5dc,d1d4f9',
  },
  {
    srmSubjectId: 'SRM_KTR_RA2111004010088',
    name: 'Diya Sundaram',
    email: 'ds7829@srmist.edu.in',
    department: 'Electronics & Communication Engineering',
    year: '4th Year (Batch 2021-25)',
    campus: 'Kattankulathur (Main Campus)',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=DiyaECE088&backgroundColor=c0aede,b6e3f4',
  },
  {
    srmSubjectId: 'SRM_RMP_RA2311026010055',
    name: 'Rohan Patel',
    email: 'rp1102@srmist.edu.in',
    department: 'Artificial Intelligence & Machine Learning',
    year: '2nd Year (Batch 2023-27)',
    campus: 'Ramapuram Campus',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=RohanAI055&backgroundColor=ffdfbf,ffd5dc',
  },
  {
    srmSubjectId: 'SRM_VDP_RA2211008010210',
    name: 'Ananya Reddy',
    email: 'ar5541@srmist.edu.in',
    department: 'Biotechnology & Genetic Engineering',
    year: '3rd Year (Batch 2022-26)',
    campus: 'Vadapalani Campus',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=AnanyaBio210&backgroundColor=b6e3f4,c0aede',
  },
];

/**
 * Creates a mock session for a student
 */
export function createMockSessionForStudent(profile: MockStudentProfile): UserSession {
  return {
    id: `usr_${profile.srmSubjectId.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
    srmSubjectId: profile.srmSubjectId,
    email: profile.email,
    name: profile.name,
    department: profile.department,
    year: profile.year,
    authProvider: 'mock',
    createdAt: Date.now(),
  };
}
