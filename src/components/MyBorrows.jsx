"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { BOOK_PLACEHOLDER } from "@/lib/constants";
import { formatDate } from "@/lib/format";
import { useRequireAuth } from "@/lib/hooks";
import Spinner from "./Spinner";

export default function MyBorrows() {
  const { loading: authLoading } = useRequireAuth();
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [returningId, setReturningId] = useState(null);

  useEffect(() => {
    if (authLoading) return;
    api("/borrows")
      .then(setBorrows)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [authLoading]);

  async function handleReturn(borrow) {
    setReturningId(borrow._id);
    try {
      await api(`/borrows/${borrow._id}`, { method: "DELETE" });
      setBorrows((list) => list.filter((item) => item._id !== borrow._id));
      toast.success(`"${borrow.bookTitle}" has been returned.`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setReturningId(null);
    }
  }

  if (authLoading || loading) return <Spinner />;
  if (error) return <p role="alert" className="paper-card mt-8 p-6 text-error">{error}</p>;

  if (borrows.length === 0) {
    return (
      <div className="paper-card mt-8 p-8 text-center">
        <p className="font-display text-xl font-bold">You have no borrowed books.</p>
        <p className="mt-1">Pick something from the shelf and it will appear here.</p>
        <Link href="/books" className="btn btn-primary mt-4">Browse Books</Link>
      </div>
    );
  }

  return (
    <div className="paper-card mt-8 overflow-x-auto">
      <table className="data-table table min-w-[38rem]">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Borrow Date</th>
            <th>Return Date</th>
            <th className="text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {borrows.map((borrow) => (
            <tr key={borrow._id}>
              <td>
                <div className="h-20 w-14 overflow-hidden rounded-md border-2 border-[var(--edge)] bg-base-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={borrow.bookImage}
                    alt={borrow.bookTitle}
                    className="h-full w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = BOOK_PLACEHOLDER;
                    }}
                  />
                </div>
              </td>
              <td>
                <Link href={`/books/${borrow.bookId}`} className="font-display font-bold hover:underline">
                  {borrow.bookTitle}
                </Link>
              </td>
              <td>{formatDate(borrow.borrowDate)}</td>
              <td>{formatDate(borrow.returnDate)}</td>
              <td>
                <div className="flex justify-end">
                  <button
                    onClick={() => handleReturn(borrow)}
                    disabled={returningId === borrow._id}
                    className="btn btn-sm btn-accent"
                  >
                    {returningId === borrow._id && <span className="loading loading-spinner loading-xs" />}
                    Return Book
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
