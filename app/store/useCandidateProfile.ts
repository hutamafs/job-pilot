import { create } from "zustand";

interface CandidateStore {
  profilePicture: string;
  name: string;
  role: string;
  experience: string;
  education: string;
  website: string;
  resumeUrl: string[];
  nationality: string;
  dob: Date;
  gender: string;
  maritalStatus: string;
  bio: string;
  facebook: string;
  linkedin: string;
  phone: string;
  email: string;
  password: string;
  newPassword: string;

  setProfilePicture: (url: string) => void;
  setPersonalInfo: (
    info: Partial<
      Omit<
        CandidateStore,
        "profilePicture" | "resumeUrl" | "password" | "newPassword"
      >
    >
  ) => void;
  setSocialLinks: (links: { facebook?: string; linkedin?: string }) => void;
  setPassword: (passwords: { password: string; newPassword: string }) => void;
  setResumeUrl: (urls: string[]) => void;
}

export const useCandidateStore = create<CandidateStore>((set) => ({
  profilePicture: "",
  name: "",
  role: "",
  experience: "",
  education: "",
  website: "",
  resumeUrl: [],
  nationality: "",
  dob: new Date(),
  gender: "",
  maritalStatus: "",
  bio: "",
  facebook: "",
  linkedin: "",
  phone: "",
  email: "",
  password: "",
  newPassword: "",

  setProfilePicture: (url) => set({ profilePicture: url }),

  setPersonalInfo: (info) => set((state) => ({ ...state, ...info })),

  setSocialLinks: (links) => set((state) => ({ ...state, ...links })),

  setPassword: ({ password, newPassword }) => set({ password, newPassword }),

  setResumeUrl: (urls) => set({ resumeUrl: urls }),
}));
