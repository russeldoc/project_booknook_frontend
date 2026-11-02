import Link from "next/link";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import Logo from "./Logo";

const social = [
  { href: "https://x.com", label: "X", Icon: FaXTwitter },
  { href: "https://facebook.com", label: "Facebook", Icon: FaFacebookF },
  { href: "https://instagram.com", label: "Instagram", Icon: FaInstagram },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t-2 border-[var(--edge)] bg-base-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" aria-label="BookNook home">
            <Logo />
          </Link>
          <p className="mt-4 max-w-xs">
            A small online library where readers add the books they own and borrow the ones they
            want to read next.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg font-extrabold">Explore</h3>
          <ul className="mt-3 space-y-1">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/books" className="hover:underline">All Books</Link></li>
            <li><Link href="/add-book" className="hover:underline">Add a Book</Link></li>
            <li><Link href="/my-borrows" className="hover:underline">My Borrows</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-extrabold">Contact</h3>
          <address className="mt-3 space-y-1 not-italic">
            <p>hello@booknook.app</p>
            <p>+880 1700 000 000</p>
            <p>House 47, Road 5, Uttara, Dhaka</p>
          </address>
        </div>

        <div>
          <h3 className="font-display text-lg font-extrabold">Follow us</h3>
          <ul className="mt-3 flex gap-3">
            {social.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="btn btn-circle bg-[var(--paper)]"
                >
                  <Icon size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t-2 border-[var(--edge)] py-4 text-center text-sm">
        &copy; {new Date().getFullYear()} BookNook. All rights reserved.
      </div>
    </footer>
  );
}
