# EmployTrack

A simple and efficient web application for tracking job applications throughout your job search journey. Keep all your applications organized in one place with status tracking, stats, and easy management.

## Features

- 🔐 **User Authentication** - Secure registration and login
- ➕ **Add Applications** - Create new job application entries with company name, position, URL, and application date
- 📊 **Status Tracking** - Track applications through different stages:
  - Applied
  - Interviewing
  - Offer
  - Accepted
  - Rejected
- 📈 **Dashboard Stats** - Quick overview of your applications by status
- ✏️ **Edit & Delete** - Update or remove applications as needed
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

## Tech Stack

### Frontend
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful, accessible UI components

### Backend
- **[Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)** - Serverless API endpoints
- **[Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)** - Server-side data mutations

### Database
- **[Neon](https://neon.tech/)** - Serverless PostgreSQL
- **[Drizzle ORM](https://orm.drizzle.team/)** - TypeScript ORM

### Authentication
- **[Better Auth](https://www.better-auth.com/)** - Modern authentication for TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Neon database account (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone <https://github.com/AyoLaww/trackerly>
   cd job-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   DATABASE_URL=your-neon-connection-string
   BETTER_AUTH_SECRET=your-secret-key
   BETTER_AUTH_URL=http://localhost:3000
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

   To generate `BETTER_AUTH_SECRET`:
   ```bash
   # Mac/Linux
   openssl rand -base64 32
   
   # Windows (PowerShell)
   [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:push` - Push database schema changes
- `npm run db:studio` - Open Drizzle Studio (database GUI)

## Database Schema

### Users
- Managed by Better Auth
- Fields: id, email, name, emailVerified, createdAt, updatedAt

### Job Applications
- id (UUID)
- userId (references user)
- companyName
- jobTitle
- applicationUrl (optional)
- status (applied | interviewing | offer | accepted | rejected)
- appliedDate
- createdAt
- updatedAt

## Deployment

This project is ready to deploy on [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.