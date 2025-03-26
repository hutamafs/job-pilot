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

export const companySchema = z.object({
  name: z.string().min(1, "Name is required"),
  founded: z.string().min(1, "Founded date is required"),
  description: z.string().min(1, "Description is required"),
  benefits: z.any(),
  industry: z.string().min(1, "Industry is required"),
  phone: z.string().regex(/^\+?\d{7,15}$/, "Invalid phone number format"),
  teamSize: z.number().min(1, "Team size is required"),
  vision: z.string().min(1, "Vision is required"),
  email: z.string().email("Invalid email address"),
  location: z.string().min(1, "Location is required"),
});

export const companyInfoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  logo: z.string().min(1, "Company Logo is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  phone: z.string().regex(/^\+?\d{7,15}$/, "Invalid phone number format"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const companyFoundingSchema = z.object({
  organizationType: z.string().min(1, "Organization type is required"),
  founded: z.string().min(1, "Founded date is required"),
  industry: z.string().min(1, "Industry is required"),
  teamSize: z.string().min(1, "Team size is required"),
  vision: z.string().min(1, "Vision is required"),
  website: z.string().min(1, "Company website is required"),
  benefits: z.array(z.any()).min(1, "Benefits cannot be an empty"),
});

export const companyContactSchema = z.object({
  location: z.string().min(1, "Location is required"),
  phone: z.string().regex(/^\+?\d{7,15}$/, "Invalid phone number format"),
  email: z.string().email("Invalid email address"),
});

export const jobSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  description: z.string().min(1, "Description is required"),
  requirements: z.array(z.string()).min(1, "Requirements cannot be empty"),
  benefits: z.array(z.string()).min(1, "Benefits cannot be empty"),
  jobType: z.string().min(1, "Job type is required"),
  jobLevel: z.string().min(1, "Job level is required"),
  experience: z.string().min(1, "Experience is required"),
  education: z.string().min(1, "Education is required"),
  salary: z.number().min(1, "Salary is required"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
});
