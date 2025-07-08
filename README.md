# 💬 My Chat App

A **real-world full-stack chat application** built with **Next.js 15**, using modern tools and best practices to deliver a fast, scalable, and feature-rich experience.

---

## 🚀 Live Demo

🌐 Check out the app in action:

[![Visit Live Demo](https://img.shields.io/badge/🚀%20Live%20App-Click%20to%20Open-brightgreen?style=for-the-badge&logo=vercel)](https://my-chat-app-eta-ruddy.vercel.app/login)


---

## ✨ Features

- 🔐 **Authentication with AuthJS**
  - Google OAuth login
  - Secure, session-based access control

- 🧬 **Database Integration with Prisma + PostgreSQL**
  - Fully typed DB access via Prisma ORM
  - Querying and mutating data via server actions
  - Deployed on [Neon.tech](https://neon.tech)

- 📧 **Email verification with Resend**
  - Sends confirmation links when users register
  - Integrated with Next.js server actions  
  > 💡 When a user creates an account for the first time, a verification email will be sent from the domain **my-chat-app.space** (a domain owned by the app creator) to confirm the provided email address.  
  > This functionality is powered by **Resend** and made possible thanks to domain configuration through **GoDaddy**.

- 💬 **Real-time messaging with Pusher**
  - Instantly receive new messages and typing indicators
  - WebSocket-powered channel system

- 📦 **Form validation with Zod**
  - Type-safe, schema-based input validation

- 📨 Email verification + Forgot Password
    - Sends confirmation links when users register
    - Password reset with secure email flow

    💡 When a user creates an account for the first time, a verification email will be sent from the domain my-chat-app.space (a domain owned by the app creator) to confirm the        provided email address.
     This functionality is powered by Resend and made possible thanks to domain configuration through GoDaddy.

- 📸 Image Uploading
     - Upload and manage user avatars and media


- 🎨 **Responsive UI with TailwindCSS + HeroUI**
  - Beautiful components and layouts using TailwindCSS and HeroUI
  - Fully responsive, mobile-first design
  - Dark mode supported

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
| **HeroUI**        |  UI library for React + Tailwind  |
| **Pusher**        | Real-time messaging & subscriptions  |
| **Resend**        | Email sending service for verification |
| **Zod**           | Schema validation for forms and inputs |
| **React Icons**   | Icon pack for UI elements            |
| **TypeScript**    | Static typing                        |
| **Vercel**        | Hosting and deployment               |

---

<details>
<summary>📂 Project Structure</summary>
<div>📦 root/</div>
<div>│</div>
<div>├── 🔒 .env # Environment variables</div>
<div>├── 📄 .env.example # Example environment file</div>
<div>├── 📄 package.json # Project metadata and scripts</div>
<div>├── 📄 tailwind.config.ts # Tailwind CSS configuration</div>
<div>├── 📄 tsconfig.json # TypeScript configuration</div>
<div>├── 📄 README.md # Project documentation</div>
<div>│</div>
<div>├── 📂 prisma/ # Prisma ORM files</div>
<div>│ ├── 📄 schema.prisma # Database schema definition</div>
<div>│ ├── 📄 seed.ts # Seed data scripts</div>
<div>│ ├── 📄 membersData.ts # Sample members data</div>
<div>│ └── 📂 migrations/ # Database migration history</div>
<div>│</div>
<div>├── 📂 public/ # Static assets (images, icons, etc.)</div>
<div>│</div>
<div>├── 📂 src/ # Source code</div>
<div>│ ├── 📂 app/ # Next.js App Router (pages & routes)</div>
<div>│ │ ├── 📂 (auth)/ # Authentication related pages</div>
<div>│ │ ├── 📂 members/ # Member profiles and chats</div>
<div>│ │ ├── 📂 messages/ # Messaging features</div>
<div>│ │ ├── 📂 admin/ # Admin dashboard and tools</div>
<div>│ │ ├── 📂 api/ # API endpoints</div>
<div>│ │ ├── 📄 layout.tsx # Root layout component</div>
<div>│ │ ├── 📄 page.tsx # Main homepage</div>
<div>│ │ ├── 📄 globals.css # Global CSS styles</div>
<div>│ │ └── 📄 error.tsx # Custom error page</div>
<div>│ │</div>
<div>│ ├── 📂 components/ # Reusable UI components</div>
<div>│ ├── 📂 hooks/ # Custom React hooks</div>
<div>│ ├── 📂 lib/ # Utilities and helpers</div>
<div>│ ├── 📂 types/ # TypeScript type definitions</div>
<div>│ ├── 📄 auth.ts # NextAuth logic</div>
<div>│ ├── 📄 auth.config.ts # NextAuth configuration</div>
<div>│ ├── 📄 middleware.ts # Middleware logic</div>
<div>│ └── 📄 routes.ts # Route constants</div>

</details>
