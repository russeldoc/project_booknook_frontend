import Link from "next/link";

export const metadata = { title: "Page Not Found" };

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <p className="font-display text-8xl font-extrabold text-primary">404</p>
      <h1 className="section-title mt-2">This page isn&apos;t on our shelves</h1>
      <p className="section-lead">
        The link may be broken or the page may have been removed. Head back home to keep
        browsing.
      </p>
      <Link href="/" className="btn btn-primary mt-8">Back to Home</Link>
    </section>
  );
}
