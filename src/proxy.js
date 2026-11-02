import { NextResponse } from "next/server";

// BetterAuth's session cookie (the "__Secure-" prefix is used on https).
const SESSION_COOKIES = ["better-auth.session_token", "__Secure-better-auth.session_token"];

// Private routes: visitors without a session cookie go to Login, then come back.
// Because this only checks that the cookie exists, a logged-in user reloading a
// private page is never bounced to Login. The page itself still waits for the
// session to load before it decides anything.
export function proxy(request) {
  const hasSession = SESSION_COOKIES.some((name) => request.cookies.has(name));

  if (!hasSession) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname + request.nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/add-book", "/my-books", "/my-borrows", "/profile", "/books/:id+"],
};
