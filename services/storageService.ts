import { ReportSubmission, UserProfile, SeverityLevel, Badge } from '../types';

const STORAGE_KEYS = {
  USERS: 'civic_lens_users_db_v2',      // Bumped version to force clear old bad data if needed
  REPORTS: 'civic_lens_reports_db_v2',  
  CURRENT_USER: 'civic_lens_session_v2' 
};

// Initial Badges
const BADGES: Badge[] = [
  { id: '1', name: 'New Citizen', icon: '🌱', description: 'Joined the platform', earnedDate: new Date().toISOString() },
  { id: '2', name: 'Road Warrior', icon: '🛣️', description: 'Reported 5 road issues' },
  { id: '3', name: 'Clean City', icon: '🧹', description: 'Reported 5 garbage issues' },
  { id: '4', name: 'Guardian', icon: '🛡️', description: 'Earned 500 points' },
];

// Mock Data
const MOCK_USERS: UserProfile[] = [
  { id: 'm1', name: "Arjun Reddy", emailOrPhone: "9999999991", avatarUrl: "https://api.dicebear.com/7.x/notionists/svg?seed=Arjun", stats: { points: 2450, reportsSubmitted: 45, currentStreak: 5, rank: 'City Legend', badges: [] } },
  { id: 'm2', name: "Sneha Kapur", emailOrPhone: "9999999992", avatarUrl: "https://api.dicebear.com/7.x/notionists/svg?seed=Sneha", stats: { points: 2100, reportsSubmitted: 38, currentStreak: 3, rank: 'Guardian', badges: [] } },
  { id: 'm3', name: "Mohammed Ali", emailOrPhone: "9999999993", avatarUrl: "https://api.dicebear.com/7.x/notionists/svg?seed=Mohammed", stats: { points: 1850, reportsSubmitted: 30, currentStreak: 12, rank: 'Super Citizen', badges: [] } },
  { id: 'm4', name: "Priya Sharma", emailOrPhone: "9999999994", avatarUrl: "https://api.dicebear.com/7.x/notionists/svg?seed=Priya", stats: { points: 950, reportsSubmitted: 15, currentStreak: 1, rank: 'Contributor', badges: [] } },
  { id: 'm5', name: "Ananya Singh", emailOrPhone: "9999999995", avatarUrl: "https://api.dicebear.com/7.x/notionists/svg?seed=Ananya", stats: { points: 3100, reportsSubmitted: 52, currentStreak: 20, rank: 'City Legend', badges: [] } },
];

// --- Database Helpers ---

const getDBUsers = (): Record<string, UserProfile> => {
  let users: Record<string, UserProfile> = {};
  const usersStr = localStorage.getItem(STORAGE_KEYS.USERS);
  
  if (usersStr) {
    try {
      users = JSON.parse(usersStr);
    } catch (e) {
      console.error("Error parsing users DB", e);
    }
  }

  // Ensure Mocks Exist (Merge logic)
  let changed = false;
  MOCK_USERS.forEach(mock => {
    if (!users[mock.emailOrPhone]) {
      users[mock.emailOrPhone] = mock;
      changed = true;
    }
  });

  if (changed) {
    saveDBUsers(users);
  }

  return users;
};

const saveDBUsers = (users: Record<string, UserProfile>) => {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

const getDBReports = (): ReportSubmission[] => {
  const reports = localStorage.getItem(STORAGE_KEYS.REPORTS);
  return reports ? JSON.parse(reports) : [];
};

const saveDBReports = (reports: ReportSubmission[]) => {
  localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
};

// --- Service Methods ---

export const StorageService = {
  // Authentication
  loginUser: (phoneOrEmail: string): UserProfile | null => {
    const users = getDBUsers();
    return users[phoneOrEmail] || null;
  },

  registerUser: (user: UserProfile): UserProfile => {
    const users = getDBUsers();
    if (users[user.emailOrPhone]) {
      throw new Error("User already exists");
    }
    users[user.emailOrPhone] = user;
    saveDBUsers(users);
    return user;
  },

  updateUser: (updatedUser: UserProfile) => {
    const users = getDBUsers();
    // Update the record
    users[updatedUser.emailOrPhone] = updatedUser;
    saveDBUsers(users);
    
    // Update session if needed
    const currentSession = StorageService.getSession();
    if (currentSession && currentSession.emailOrPhone === updatedUser.emailOrPhone) {
      StorageService.saveSession(updatedUser);
    }
  },

  getAllUsers: (): UserProfile[] => {
    const users = getDBUsers();
    return Object.values(users).sort((a, b) => b.stats.points - a.stats.points);
  },

  saveSession: (user: UserProfile) => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  },

  getSession: (): UserProfile | null => {
    const session = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return session ? JSON.parse(session) : null;
  },

  clearSession: () => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },

  // Reports
  getReports: (): ReportSubmission[] => {
    return getDBReports();
  },

  addReport: (report: ReportSubmission) => {
    const reports = getDBReports();
    const updatedReports = [report, ...reports];
    saveDBReports(updatedReports);
    
    // Also update the user's stats in the user DB
    const users = getDBUsers();
    const user = users[report.userId];
    if (user) {
        user.stats.reportsSubmitted += 1;
        user.stats.points += 50;
        
        // Rank Upgrade Logic
        if (user.stats.points >= 3000) user.stats.rank = 'City Legend';
        else if (user.stats.points >= 1000) user.stats.rank = 'Civic Guardian';
        else if (user.stats.points >= 200) user.stats.rank = 'Active Citizen';
        
        saveDBUsers(users);
        StorageService.saveSession(user);
    }

    return updatedReports;
  },

  getAllBadges: (): Badge[] => BADGES,
};