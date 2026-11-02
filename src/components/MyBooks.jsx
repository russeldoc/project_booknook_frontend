"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { BOOK_PLACEHOLDER, CATEGORY_STYLES } from "@/lib/constants";
import { useRequireAuth } from "@/lib/hooks";
import { uploadImage } from "@/lib/imgbb";
import BookFields from "./BookFields";
import Modal from "./Modal";
import Spinner from "./Spinner";

export default function MyBooks() {
  const { loading: authLoading } = useRequireAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [removing, setRemoving] = useState(false);

  const closeEdit = useCallback(() => setEditing(null), []);
  const closeDelete = useCallback(() => setDeleting(null), []);

  useEffect(() => {
    if (authLoading) return;
    api("/books?mine=true")
      .then(setBooks)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [authLoading]);

  async function handleUpdate(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSaving(true);
    try {
      const body = {
        title: form.get("title"),
        author: form.get("author"),
        category: form.get("category"),
        description: form.get("description"),
        totalCopies: Number(form.get("totalCopies")),
      };
      const file = form.get("image");
      if (file && file.size > 0) body.image = await uploadImage(file);

      const updated = await api(`/books/${editing._id}`, { method: "PATCH", body });
      setBooks((list) => list.map((book) => (book._id === updated._id ? updated : book)));
      toast.success("Book updated.");
      setEditing(null);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    setRemoving(true);
    try {
      await api(`/books/${deleting._id}`, { method: "DELETE" });
      setBooks((list) => list.filter((book) => book._id !== deleting._id));
      toast.success("Book deleted.");
      setDeleting(null);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setRemoving(false);
    }
  }

  if (authLoading || loading) return <Spinner />;
  if (error) return <p role="alert" className="paper-card mt-8 p-6 text-error">{error}</p>;

  if (books.length === 0) {
    return (
      <div className="paper-card mt-8 p-8 text-center">
        <p className="font-display text-xl font-bold">You haven&apos;t added any books yet.</p>
        <p className="mt-1">Add one and it will show up here, where you can edit or delete it.</p>
        <Link href="/add-book" className="btn btn-primary mt-4">Add a Book</Link>
      </div>
    );
  }

  return (
    <>
      <div className="paper-card mt-8 overflow-x-auto">
        <table className="data-table table min-w-[40rem]">
          <thead>
            <tr>
              <th>Cover</th>
              <th>Book</th>
              <th>Category</th>
              <th>Copies</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => {
              const style = CATEGORY_STYLES[book.category] || CATEGORY_STYLES.Others;
              return (
                <tr key={book._id}>
                  <td>
                    <div className="h-20 w-14 overflow-hidden rounded-md border-2 border-[var(--edge)] bg-base-200">
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
                  </td>
                  <td>
                    <Link href={`/books/${book._id}`} className="font-display font-bold hover:underline">
                      {book.title}
                    </Link>
                    <p className="text-sm opacity-70">by {book.author}</p>
                  </td>
                  <td>
                    <span className="category-tag" style={{ background: style.bg, color: style.fg }}>
                      {book.category}
                    </span>
                  </td>
                  <td>{book.availableCopies} / {book.totalCopies}</td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setEditing(book)} className="btn btn-sm bg-[var(--paper)]">Edit</button>
                      <button onClick={() => setDeleting(book)} className="btn btn-sm btn-error">Delete</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal open={!!editing} onClose={closeEdit} title="Edit book">
        {editing && (
          <form onSubmit={handleUpdate} className="grid gap-5">
            <BookFields book={editing} idPrefix="edit" />
            <div className="flex justify-end gap-3">
              <button type="button" onClick={closeEdit} className="btn bg-[var(--paper)]">Cancel</button>
              <button type="submit" disabled={saving} className="btn btn-primary">
                {saving && <span className="loading loading-spinner loading-sm" />}
                Save changes
              </button>
            </div>
          </form>
        )}
      </Modal>

      <Modal open={!!deleting} onClose={closeDelete} title="Delete this book?">
        <p>
          <strong>{deleting?.title}</strong> will be removed from the shelf, along with any
          borrow records for it. This can&apos;t be undone.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={closeDelete} className="btn bg-[var(--paper)]">Keep book</button>
          <button type="button" onClick={handleDelete} disabled={removing} className="btn btn-error">
            {removing && <span className="loading loading-spinner loading-sm" />}
            Delete book
          </button>
        </div>
      </Modal>
    </>
  );
}
