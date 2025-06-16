# 💬 My Chat App

A **real-world full-stack chat application** built with **Next.js 14**, using modern tools and best practices to deliver a fast, scalable, and feature-rich experience.

---

## 🚀 Live Demo

👉 [Try the app here](https://my-chat-app-eta-ruddy.vercel.app/login)

---

## ✨ Features

- 🔐 **Authentication with NextAuth v5**
  - Google OAuth login
  - Secure, session-based access control

- 🧬 **Database Integration with Prisma + PostgreSQL**
  - Fully typed DB access via Prisma ORM
  - Deployed on [Neon.tech](https://neon.tech)

- 📧 **Email verification with Resend**
  - Sends confirmation links when users register
  - Integrated with Next.js server actions

- 💬 **Real-time messaging with Pusher**
  - Instantly receive new messages and typing indicators
  - WebSocket-powered channel system

- 📦 **Form validation with Zod**
  - Type-safe, schema-based input validation

- 🎨 **Responsive UI with TailwindCSS + NextUI**
  - Component-driven layout with accessible design
  - Dark mode and mobile-friendly out-of-the-box

- ⚡️ **Next.js App Router + Server Actions**
  - Optimized routing, layouts, loading states
  - Server mutations without API routes

- 🧱 **Modular, scalable architecture**
  - Organized folder structure with domain-based logic
  - Easy to extend and maintain

- 💅 **Icon support with React Icons**
  - Lightweight and customizable icon set

---

## 🛠️ Tech Stack

| Tech              | Purpose                              |
|-------------------|--------------------------------------|
| **Next.js 15**    | Full-stack React framework (App Router) |
| **NextAuth v5**   | Authentication via Google OAuth      |
| **Prisma ORM**    | Type-safe ORM for PostgreSQL         |
| **PostgreSQL**    | Relational DB (hosted on Neon.tech)  |
| **TailwindCSS**   | Utility-first CSS framework          |
| **NextUI**        | UI library for React + Tailwind      |
| **Pusher**        | Real-time messaging & subscriptions  |
| **Resend**        | Email sending service for verification |
| **Zod**           | Schema validation for forms and inputs |
| **React Icons**   | Icon pack for UI elements            |
| **TypeScript**    | Static typing                        |
| **Vercel**        | Hosting and deployment               |

---

<details>
<summary>📂 Project Structure</summary>
📦 root/
│
├── .env ← Environment variables
├── .env.example ← Example env file
├── package.json ← Project metadata and scripts
├── tailwind.config.ts ← Tailwind CSS setup
├── tsconfig.json ← TypeScript configuration
├── README.md ← Project documentation
│
├── prisma/ ← Prisma ORM setup
│ ├── schema.prisma ← Database schema
│ ├── seed.ts ← Seed data script
│ ├── membersData.ts ← Demo member data
│ └── migrations/ ← DB migration history
│
├── public/ ← Static assets (images, icons, etc.)
│
├── src/
│ ├── app/ ← App routes (Next.js App Router)
│ │ ├── (auth)/ ← Auth pages (login, register, etc.)
│ │ ├── members/ ← Member profiles and chat
│ │ ├── messages/ ← Messaging features
│ │ ├── admin/ ← Admin dashboard
│ │ ├── api/ ← API endpoints
│ │ ├── layout.tsx ← Root layout
│ │ ├── page.tsx ← Main homepage
│ │ ├── globals.css ← Global styles
│ │ └── error.tsx ← Error page
│
│ ├── components/ ← Reusable UI components
│ ├── hooks/ ← Custom React hooks
│ ├── lib/ ← Utilities (mail, prisma, pusher, etc.)
│ ├── types/ ← TypeScript type definitions
│ ├── auth.ts ← NextAuth logic
│ ├── auth.config.ts ← NextAuth configuration
│ ├── middleware.ts ← Middleware setup
│ └── routes.ts ← App route constants
</details>
