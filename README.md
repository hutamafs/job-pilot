# 💼 JobPilot – Your Next Opportunity Awaits

JobPilot is a modern job portal platform built for **candidates** and **employers**, enabling seamless job applications, intuitive talent management, and a professional hiring experience — all from one place.

> 🚀 Built with Next.js 15 (App Router), Typescript, Prisma, Supabase Auth, Tailwind CSS, PostgreSQL, AWS s3, and DnD Kit.

---

## 🌐 Live Demo

🔗 [Visit JobPilot](https://job-pilot.vercel.app/)  
📁 [Frontend Repo](https://github.com/hutamafs/job-pilot)

---

## ✨ Features

### 👨‍💻 Candidates

- 🔍 Browse jobs and filter by location, job type, industry, and salary
- 📄 Apply to jobs with resume and cover letter
- 💾 Save jobs to review later
- 👤 Build a complete candidate profile
- 📬 Get discovered by companies
- 👤 Edit Candidate Profile

### 🧑‍💼 Companies

- 📝 Post jobs with rich descriptions, benefits, and requirements
- 📋 View all job applications with a **drag-and-drop kanban** style board (applied, shortlisted, interviewed, rejected)
- 💾 Save promising candidates for later
- 📊 Manage all job listings in one dashboard
- 👤 Edit your own company profile

---

## ⚙️ Tech Stack

---

| Layer        | Technology                                      |     |
| ------------ | ----------------------------------------------- | --- |
| Frontend     | Next.js 15 App Router, TypeScript, Tailwind CSS |
| Backend      | Prisma, PostgreSQL                              |
| Auth         | Supabase Auth                                   |
| State/Data   | React Hooks, TanStack Query                     |
| UI/UX        | Responsive Design, Modal, Skeleton Loading      |
| Drag & Drop  | DnD Kit                                         |
| Deployment   | Vercel                                          |
| File Storage | AWS                                             |

---

## 🧩 Folder Structure (Simplified)

📦 jobpilot
├── app/ # Next.js App Router
├── components/ # UI Components
├── utils/ # API calls, helpers
├── prisma/ # DB schema and seeding
├── public/ # Static assets
└── styles/ # Global styles (Tailwind)

---

## 📦 Getting Started (Local Dev)

```bash
git clone https://github.com/hutamafs/jobpilot
cd jobpilot
npm install

# Set up environment
cp .env.example .env

# Setup DB
npx prisma db push
npx prisma db seed

# Start Dev
npm run dev

🔐 Authentication
	•	Supabase is used for:
	•	Sign-up/sign-in
	•	Role-based auth (CANDIDATE vs COMPANY)
	•	Middleware enforces role-based page access
	•	Token logic is handled securely

⸻

💡 Why I Built This

As a developer seeking an internship or junior role, I wanted to create a real-world, full-stack platform that mirrors actual tech company hiring flows. JobPilot is my demonstration of:

	•	Full-stack skills (frontend + backend)
	•	Practical UI/UX thinking
	•	Authentication & role protection
	•	Drag & drop interactivity
	•	Deployment and project management

⸻

🛠️ Future Improvements (If Time Allows)
	•	✅ reset password
	•	✅ Session expiry logic
	•	✅ CV Parser using OpenAI
	•	🔔 Notification system for candidates/employers
	•	✅ Migrate the current db using postgresql for pure query with golang

⸻

📫 Contact

If you’re interested in the project, want to collaborate, or are hiring — feel free to reach out:
	📧 hutama.fs@gmail.com
⸻
```
