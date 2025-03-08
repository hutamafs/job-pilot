import { z } from "zod";

export const candidateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  dob: z.string().min(1, "Date of Birth is required"),
  role: z.string().min(1, "Job title is required"),
  bio: z.string().min(1, "Biography is required"),
  nationality: z.string().min(1, "Nationality is required"),
  gender: z.enum(["male", "female"]),
  experience: z.string().min(1, "Experience is required"),
  education: z.string().min(1, "Education is required"),
  phone: z.string().regex(/^\+?\d{7,15}$/, "Invalid phone number format"),
  resumeUrl: z.string().url("Resume is required"),
});
