export enum AppState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  REVIEW = 'REVIEW',
  SUBMITTED = 'SUBMITTED',
}

export enum SeverityLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  CRITICAL = 'Critical',
}

export interface CivicIssueData {
  issueType: string;
  severity: SeverityLevel;
  department: string;
  description: string;
  complaintTitle: string;
  complaintBody: string;
  estimatedResolutionDays: number;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedDate?: string;
}

export interface UserStats {
  points: number;
  reportsSubmitted: number;
  currentStreak: number;
  rank: string;
  badges: Badge[];
}

export interface UserProfile {
  id: string;
  name: string;
  emailOrPhone: string;
  password?: string; // Simple auth for hackathon
  avatarUrl?: string;
  stats: UserStats;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface ReportSubmission {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  timestamp: string; // ISO date
  data: CivicIssueData;
  image: string; // base64
  location: string;
  coordinates?: Coordinates; // Geotagging
  status: 'Pending' | 'In Progress' | 'Resolved';
  upvotes: number;
  isUpvoted?: boolean;
}