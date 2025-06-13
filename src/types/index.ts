export interface User {
  id: string;
  email: string;
  name: string;
  role: 'uploader' | 'admin' | 'user';
  avatar?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  reward: number;
  uploaderId: string;
  uploaderName: string;
  status: 'pending' | 'approved' | 'in_progress' | 'submitted' | 'auditing' | 'completed' | 'rejected';
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
  requirements?: string[];
  tags?: string[];
}

export interface TaskSubmission {
  id: string;
  taskId: string;
  userId: string;
  userName: string;
  submissionText?: string;
  screenshotUrl?: string;
  submittedAt: string;
  status: 'submitted' | 'approved' | 'rejected';
  auditNotes?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role: 'uploader' | 'user') => Promise<void>;
  logout: () => void;
  loading: boolean;
}