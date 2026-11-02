# BookNook

**A small online library. Add a book, borrow a book, return a book.**

**Live site:** https://your-booknook-site.vercel.app  <!-- replace with your deployed client URL -->
**API (backend repo):** https://your-booknook-api.vercel.app  <!-- replace with your deployed server URL -->

## Features

- **Share and borrow books.** Any member can add books to the shared shelf and borrow books other members added.
- **Home page with Swiper slider.** Three slides with a "Browse Books" button, the six newest books, "How Borrowing Works" and "Top Categories" sections.
- **Email/password and Google login.** Authentication uses BetterAuth with the MongoDB adapter. Private pages send you to Login and bring you back after you sign in, and reloading a private page keeps you logged in.
- **Full CRUD on books.** Add a book (with image upload to imgbb), edit it from My Books, and delete it after a confirm modal.
- **Copy tracking.** Each book has Total Copies. Borrowing takes a copy, returning gives it back, and a book with no copies left shows a disabled "Not Available" button.
- **No double borrow.** The same user cannot borrow the same book twice at the same time.
- **JWT-protected API.** The Express server verifies a BetterAuth-issued JWT on every private route.
- **Light and dark theme**, toast messages for every success and error, loading spinners, a custom 404 page, and a page title on every route.

## Tech stack

Next.js (App Router, JavaScript) · Tailwind CSS v4 + DaisyUI · BetterAuth + MongoDB adapter · Swiper · Framer Motion · Sonner (toasts)

The Express + MongoDB API lives in the separate **booknook-backend** repository.

## Getting started

```bash
npm install
cp .env.example .env.local     # then fill in the values
npm run dev                    # http://localhost:3000
```

Start the backend too (see its README), and make sure `NEXT_PUBLIC_API_URL` points to it.

### Environment variables

| Variable | What it is |
|---|---|
| `MONGODB_URI`, `MONGODB_DB` | MongoDB connection. Use the same cluster and database as the backend. |
| `BETTER_AUTH_SECRET` | Long random string. Generate with `openssl rand -base64 32`. |
| `BETTER_AUTH_URL` | Public URL of this app, no trailing slash. |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | From Google Cloud Console > Credentials > OAuth client (Web). |
| `NEXT_PUBLIC_API_URL` | URL of the Express API. |
| `NEXT_PUBLIC_IMGBB_API_KEY` | Free key from https://api.imgbb.com/ |

**Google OAuth:** add `<BETTER_AUTH_URL>/api/auth/callback/google` as an authorized redirect URI (for example `http://localhost:3000/api/auth/callback/google` and your live URL).

## Deploy (Vercel)

1. Import this repository in Vercel and add every variable above.
2. Set `BETTER_AUTH_URL` to your live URL, and add the live Google redirect URI.
3. In MongoDB Atlas, allow network access from anywhere (`0.0.0.0/0`) so Vercel can connect.
4. Put the live URL in the backend's `FRONTEND_URL` and redeploy the backend.

## How login and the API fit together

BetterAuth runs inside this Next.js app and keeps the session cookie. When the browser needs the Express API, it asks `/api/auth/token` for a short-lived JWT and sends it as `Authorization: Bearer <token>`. The backend checks the signature against this app's public keys at `/api/auth/jwks`.

## Notes

- Email verification and "forgot password" are intentionally not implemented, as the assignment brief asks. The "Forget Password?" link shows an info toast.
- A borrowed book is due back 7 days after the borrow date.
