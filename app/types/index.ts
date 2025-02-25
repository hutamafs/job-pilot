export interface Job {
  id: string;
  name: string;
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
  location: string;
  companyId: string;
  createdAt: Date;
  company: Company
}

export interface Company {
  id: string;
  name: string;
  profilePicture: string;
  founded: Date;
  description: string;
  benefits: string[];
  industry: string;
  phone: string;
  teamSize: number;
  vision?: string;
  email: string;
  website?: string;
  location: string;
  createdAt: Date;
  jobs: Job[];
}

export interface Candidate {
  id: string;
  name: string;
  role: string;
  bio: string;
  coverLetter: string;
  dob: Date;
  nationality: string;
  maritalStatus: string;
  gender: string;
  experience: number;
  education: string;
  linkedin?: string;
  facebook?: string;
  location: string;
  website?: string;
  email: string;
  phone?: string;
  resumeUrl?: string;
  createdAt: Date;
  profilePicture?: string;
  favoriteJobs: Job[]
  appliedJobs:    Job[]
  savedJobs:      Job[]
  skills?:         string[]
}
