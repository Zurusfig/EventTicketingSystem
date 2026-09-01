# The Performers

A ticket request platform for live events, built with Next.js. Visitors browse upcoming events, members request tickets and manage their requests, and admins create and maintain the event listings.

The app is frontend only. All data comes from a separate REST backend that this project talks to over `NEXT_PUBLIC_API_URL`.

## Features

- Browse upcoming events with poster images, dates, venues, and descriptions
- Request tickets for an event, then edit or cancel the request later
- Email and password accounts with registration and login handled by NextAuth
- Role based access: admins manage events, members request tickets
- Admin pages for creating, editing, and deleting events
- Profile page showing account details and role
- Light and dark themes, saved to local storage
- Responsive layout with a mobile menu

## Tech Stack

- Next.js 15 (App Router) with Turbopack in development
- React 19 and TypeScript
- Tailwind CSS 4 with CSS custom properties for theming
- NextAuth v4 using the Credentials provider
- MUI, Base UI, and Lucide for icons and UI pieces
- Inter and Unbounded via Fontsource

## Getting Started

Install dependencies:

```bash
npm install
```

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXTAUTH_SECRET=some-long-random-string
NEXTAUTH_URL=http://localhost:3000
```

`NEXT_PUBLIC_API_URL` should point at the backend that serves the `/api/v1` routes. Generate a secret with `openssl rand -base64 32`.

Run the development server:

```bash
npm run dev
```

Then open http://localhost:3000.

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # lint the project
```

## Project Structure

```
src/
  app/                 routes (App Router)
    admin/             event management, create and edit pages
    api/auth/          NextAuth route handler and options
    events/            event list and event detail
    request-tickets/   ticket request form
    edit-ticket/       edit an existing request
    tickets/           the signed in user's tickets
    login/ signup/     auth pages
    profile/           account details
    unauthorized/      shown when a role check fails
  components/          UI grouped by feature
  hooks/               login and register form logic
  libs/                backend API calls
  providers/           NextAuth session provider
  middleware.ts        auth and role guards
```

## Backend API

Every request goes to `${NEXT_PUBLIC_API_URL}/api/v1`. The endpoints used are:

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/auth/register` | create an account |
| POST | `/auth/login` | log in and receive a JWT |
| GET | `/auth/me` | current user, including role |
| GET | `/events` | list events |
| GET | `/events/:id` | single event |
| POST | `/events` | create an event (admin) |
| PUT | `/events/:id` | update an event (admin) |
| DELETE | `/events/:id` | delete an event (admin) |
| GET | `/ticketing` | the current user's ticket requests |
| POST | `/ticketing` | create a ticket request |
| PUT | `/ticketing/:id` | change the ticket amount |
| DELETE | `/ticketing/:id` | cancel a request |

Authenticated calls send the backend JWT as `Authorization: Bearer <token>`. The token is stored in the NextAuth session and read from `session.user.token`.

## Authentication and Roles

Login goes through the NextAuth Credentials provider, which calls the backend login endpoint and keeps the returned user and JWT in a JWT session. The custom sign in page is `/login`.

`src/middleware.ts` protects `/tickets`, `/profile`, `/request-tickets`, and everything under `/admin`. Anyone without a session is sent to the sign in page. For the role gated routes the middleware calls `/auth/me` and redirects to `/unauthorized` when the role does not match: admins cannot open `/request-tickets`, and non admins cannot open `/admin`.

## Images

Event posters are uploaded straight from the admin forms to Cloudinary using an unsigned upload preset, and only the returned URL is sent to the backend. The cloud name and preset are currently hardcoded at the top of `CreateEventForm.tsx` and `EditEventForm.tsx`, so change them there if you point the app at a different Cloudinary account.

Remote images are loaded through `next/image`, so any new image host has to be added to `images.domains` in `next.config.ts`. Google Drive and Cloudinary are already allowed. Events without a poster fall back to `public/images/default.jpg`.

## Theming

Colors, gradients, and fonts are defined as CSS variables in `src/app/globals.css`, with a `.dark` block overriding them. The toggle in the top menu adds the `light` or `dark` class to the root element and remembers the choice in local storage.
