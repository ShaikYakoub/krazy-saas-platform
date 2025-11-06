# Krazy SaaS Platform

A full-stack, subscription-based "Notes" application built with the T3 stack (Next.js, TypeScript, Tailwind, tRPC) and more. This project demonstrates a complete SaaS feature loop, from authentication to gated "Pro" features.

## Features

* **Full Authentication:** Users can sign in using GitHub (via Auth.js).
* **Protected Routes:** Dashboard and API routes are protected by middleware.
* **Subscription Gating:**
    * **Free Plan:** Users can create up to 3 notes.
    * **Pro Plan:** (Mock) subscription unlocks unlimited note creation.
* **Full CRUD:** Users can create, read, and (in the future) delete their own notes.
* **Server Actions:** All logic (creating notes, subscribing) is handled by modern Next.js Server Actions.

## Tech Stack

This project is a showcase of a modern, professional full-stack build.

* **Frontend:** Next.js 14+ (App Router), React, TypeScript
* **Styling:** Tailwind CSS & shadcn/ui
* **Backend:** Next.js Server Actions, Node.js
* **Database:** PostgreSQL (on Supabase) with Prisma ORM
* **Authentication:** Auth.js (NextAuth v5)
* **Data Validation:** Zod
* **Payments:** Mocked payment flow (simulating a gateway like Razorpay/Stripe)

## How to Run Locally

1.  Clone the repository: `git clone <your-repo-url>`
2.  Install dependencies: `npm install`
3.  Set up your `.env` file (copy `.env.example`). You will need:
    * A Supabase PostgreSQL `DATABASE_URL`
    * `AUTH_GITHUB_ID` and `AUTH_GITHUB_SECRET`
    * An `AUTH_SECRET` (generate with `npx auth secret`)
4.  Run database migration: `npx prisma migrate dev`
5.  Run the dev server: `npm run dev`