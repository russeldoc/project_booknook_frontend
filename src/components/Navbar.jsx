"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaBars } from "react-icons/fa6";
import { toast } from "sonner";
import { signOut, useSession } from "@/lib/auth-client";
import { clearToken } from "@/lib/api";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/books", label: "All Books" },
];
const privateLinks = [
  { href: "/add-book", label: "Add Book" },
  { href: "/my-books", label: "My Books" },
  { href: "/my-borrows", label: "My Borrows" },
];

function closeMenu() {
  document.activeElement?.blur?.();
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data, isPending } = useSession();
  const user = data?.user;

  const links = user ? [...publicLinks, ...privateLinks] : publicLinks;
  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  async function handleLogout() {
    closeMenu();
    await signOut();
    clearToken();
    toast.success("You have been logged out.");
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-40 border-b-2 border-[var(--edge)] bg-base-100">
      <nav className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3" aria-label="Main">
        {/* Mobile menu */}
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle" aria-label="Open menu">
            <FaBars size={20} />
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content paper-card z-50 mt-3 w-56 gap-1 p-2"
          >
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className={`font-display font-bold ${isActive(link.href) ? "bg-secondary text-secondary-content" : ""}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Link href="/" aria-label="BookNook home" className="mr-2">
          <Logo />
        </Link>

        {/* Desktop links */}
        <ul className="hidden flex-1 items-center gap-1 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`rounded-lg px-3 py-2 font-display font-bold transition-colors ${
                  isActive(link.href)
                    ? "bg-secondary text-secondary-content"
                    : "hover:bg-base-200"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <ThemeToggle />

          {isPending ? (
            <div className="h-10 w-24 animate-pulse rounded-lg bg-base-300" aria-hidden="true" />
          ) : user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
                aria-label="Open account menu"
              >
                <div className="w-10 rounded-full border-2 border-[var(--edge)]">
                  {user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={user.image} alt={user.name} referrerPolicy="no-referrer" />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center bg-secondary font-display text-lg font-extrabold text-secondary-content">
                      {user.name?.[0]?.toUpperCase() || "?"}
                    </span>
                  )}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content paper-card z-50 mt-3 w-60 gap-1 p-2"
              >
                <li className="pointer-events-none px-3 py-2">
                  <span className="block font-display text-base font-extrabold leading-tight">
                    {user.name}
                  </span>
                  <span className="block truncate text-sm opacity-70">{user.email}</span>
                </li>
                <li>
                  <Link href="/profile" onClick={closeMenu} className="font-display font-bold">
                    My Profile
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="font-display font-bold text-error">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/login" className="btn btn-sm sm:btn-md bg-[var(--paper)]">
                Login
              </Link>
              <Link href="/register" className="btn btn-sm sm:btn-md btn-primary">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
