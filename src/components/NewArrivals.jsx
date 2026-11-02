"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import BookGrid from "./BookGrid";
import Spinner from "./Spinner";

export default function NewArrivals() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api("/books?limit=6", { auth: false })
      .then(setBooks)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 pt-20" aria-labelledby="new-arrivals">
      <h2 id="new-arrivals" className="section-title">New Arrivals</h2>
      <p className="section-lead">The six newest books added by our readers.</p>

      <div className="mt-8">
        {loading ? (
          <Spinner />
        ) : error ? (
          <p role="alert" className="paper-card p-6 text-error">{error}</p>
        ) : books.length === 0 ? (
          <div className="paper-card p-8 text-center">
            <p className="font-display text-xl font-bold">The shelf is empty for now.</p>
            <p className="mt-1">Be the first reader to add a book.</p>
            <Link href="/add-book" className="btn btn-primary mt-4">Add a Book</Link>
          </div>
        ) : (
          <>
            <BookGrid books={books} />
            <div className="mt-10 text-center">
              <Link href="/books" className="btn btn-primary">See All Books</Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
