"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { BOOK_PLACEHOLDER, CATEGORY_STYLES } from "@/lib/constants";
import { formatDate } from "@/lib/format";
import { useRequireAuth } from "@/lib/hooks";
import BorrowModal from "./BorrowModal";
import Spinner from "./Spinner";

export default function BookDetails({ id }) {
  const { user, loading: authLoading } = useRequireAuth();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [borrowOpen, setBorrowOpen] = useState(false);
  const closeBorrow = useCallback(() => setBorrowOpen(false), []);

  useEffect(() => {
    if (authLoading) return;
    api(`/books/${id}`)
      .then((data) => {
        setBook(data);
        document.title = `BookNook | ${data.title}`;
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, authLoading]);

  if (authLoading || loading) return <Spinner />;

  if (error || !book) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="section-title">We couldn&apos;t open that book</h1>
        <p className="section-lead mx-auto">{error || "It may have been removed by its owner."}</p>
        <Link href="/books" className="btn btn-primary mt-6">Back to All Books</Link>
      </div>
    );
  }

  const style = CATEGORY_STYLES[book.category] || CATEGORY_STYLES.Others;
  const available = book.availableCopies > 0;

  return (
    <article className="mx-auto grid max-w-5xl gap-8 px-4 py-10 md:grid-cols-[5fr_7fr]">
      <div className="paper-card relative overflow-hidden pl-3">
        <span
          className="absolute inset-y-0 left-0 w-3 border-r-2 border-[var(--edge)]"
          style={{ background: style.bg }}
          aria-hidden="true"
        />
        <div className="h-96 w-full bg-base-200 md:h-[30rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={book.image}
            alt={book.title}
            className="h-full w-full object-cover"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = BOOK_PLACEHOLDER;
            }}
          />
        </div>
      </div>

      <div>
        <span className="category-tag" style={{ background: style.bg, color: style.fg }}>
          {book.category}
        </span>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight">{book.title}</h1>
        <p className="mt-1 text-lg">by {book.author}</p>

        <p className="mt-6 max-w-[62ch] whitespace-pre-line">{book.description}</p>

        <dl className="paper-card mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 p-5">
          <dt className="font-display font-bold">Added by</dt>
          <dd>{book.addedBy?.name} <span className="opacity-70">({book.addedBy?.email})</span></dd>
          <dt className="font-display font-bold">Added on</dt>
          <dd>{formatDate(book.createdAt)}</dd>
          <dt className="font-display font-bold">Copies</dt>
          <dd>{book.availableCopies} of {book.totalCopies} available</dd>
        </dl>

        <div className="mt-8">
          {available ? (
            <button type="button" onClick={() => setBorrowOpen(true)} className="btn btn-secondary btn-lg">
              Borrow This Book
            </button>
          ) : (
            <button type="button" disabled className="btn btn-lg">Not Available</button>
          )}
        </div>
      </div>

      <BorrowModal
        open={borrowOpen}
        onClose={closeBorrow}
        book={book}
        user={user}
        onBorrowed={() =>
          setBook((current) => ({ ...current, availableCopies: current.availableCopies - 1 }))
        }
      />
    </article>
  );
}
