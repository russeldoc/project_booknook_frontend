"use client";

import { useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import Modal from "./Modal";

export default function BorrowModal({ open, onClose, book, user, onBorrowed }) {
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    try {
      await api("/borrows", { method: "POST", body: { bookId: book._id } });
      toast.success(`"${book.title}" is yours for 7 days.`);
      onBorrowed();
      onClose();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Borrow this book">
      <form onSubmit={handleSubmit} className="grid gap-4">
        <p>
          You are borrowing <strong>{book.title}</strong>. Please return it within 7 days.
        </p>
        <div>
          <label className="field-label" htmlFor="borrow-name">Your Name</label>
          <input id="borrow-name" value={user.name} readOnly className="input w-full bg-base-200" />
        </div>
        <div>
          <label className="field-label" htmlFor="borrow-email">Your Email</label>
          <input id="borrow-email" value={user.email} readOnly className="input w-full bg-base-200" />
        </div>
        <div className="mt-2 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="btn bg-[var(--paper)]">Cancel</button>
          <button type="submit" disabled={saving} className="btn btn-primary">
            {saving && <span className="loading loading-spinner loading-sm" />}
            Confirm Borrow
          </button>
        </div>
      </form>
    </Modal>
  );
}
