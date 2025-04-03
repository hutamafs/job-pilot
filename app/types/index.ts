export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}
export interface Job {
  id: string;
  title: string;
  description: string;
  requirement: string[];
  desirable: string[];
  benefits: string[];
  jobType?: string;
  jobLevel?: string;
  experience: number;
  education: string;
  jobTags: string[];
  salary: string;
  country: string;
  city: string;
  companyId: string;
  createdAt: Date;
  expiredAt: Date;
  company: Company;
  savedJobs?: SavedJob[];
  applications?: JobApplication[];
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  banner?: string;
  founded: Date;
  description: string;
  benefits: string[];
  industry: string;
  phone: string;
  teamSize: string;
  vision?: string;
  email: string;
  website?: string;
  location: string;
  createdAt: Date;
  jobs: Job[];
  facebook?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
  userId?: string;
  password: string;
  organizationType?: string;
  type: string;
}

export interface SavedJob {
  id: string;
  candidateId: string;
  jobId: string;
}

export interface Candidate {
  id: string;
  name: string;
  password: string;
  role: string;
  bio: string;
  coverLetter?: string;
  dob: Date | string | null;
  nationality: string;
  maritalStatus?: string;
  gender?: string;
  experience: string;
  education: string;
  linkedin?: string;
  facebook?: string;
  location?: string;
  website?: string;
  email: string;
  phone: string;
  resumeUrl: string;
  createdAt: Date;
  profilePicture: string;
  favoriteJobs: Job[];
  appliedJobs: Job[];
  savedJobs: Job[];
  skills: string[];
  savedByCompanies: SavedCandidate[];

  type: string;
}

export interface JobApplication {
  id: string;
  candidateId: string;
  jobId: string;
  status: string;
  appliedAt: string;
  job: Job;
  candidate: Candidate;
}

export interface SettingsProps {
  profilePicture?: string;
  name: string;
  role: string;
  experience: string;
  education: string;
  website: string;
  resumeUrl: string;
  nationality: string;
  dob: string;
  gender: string;
  maritalStatus: string;
  bio: string;
  facebook: string;
  linkedin: string;
  phone: string;
  email: string;
  instagram: string;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  appliedJobs?: string[];
}

export interface JobSearchQuery {
  search: string;
  location: string;
  industry: string[];
  jobType: string[];
  salary: number;
  page?: number;
  company?: string;
}

export interface CompanySearchQuery {
  search?: string;
  location?: string;
  page?: number;
}

export interface CandidateSearchQuery {
  search?: string;
  location?: string;
  page?: number;
}

export interface SavedCandidate {
  id: string;
  createdAt: Date;
  company: Company;
  companyId: string;
  candidate: Candidate;
  candidateId: string;
  note?: string;
}

export interface StepProps {
  data: Partial<Company & { confirmedPassword?: string }>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Company>>>;
}

export interface SessionData {
  user?: (Candidate | Company | null) & { id?: string };
}
