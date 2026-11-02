"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useRequireAuth } from "@/lib/hooks";
import { uploadImage } from "@/lib/imgbb";
import BookFields from "./BookFields";
import Spinner from "./Spinner";

export default function AddBookForm() {
  const router = useRouter();
  const { user, loading } = useRequireAuth();
  const [saving, setSaving] = useState(false);

  if (loading) return <Spinner />;

  async function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSaving(true);

    try {
      const file = form.get("image");
      const image = await uploadImage(file);

      await api("/books", {
        method: "POST",
        body: {
          title: form.get("title"),
          author: form.get("author"),
          category: form.get("category"),
          description: form.get("description"),
          totalCopies: Number(form.get("totalCopies")),
          image,
        },
      });

      toast.success("Book added to the shelf.");
      router.push("/my-books");
    } catch (error) {
      toast.error(error.message);
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="paper-card mx-auto mt-8 grid max-w-2xl gap-6 p-6 sm:p-8">
      <BookFields imageRequired idPrefix="add" />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="add-user-name">Your Name</label>
          <input id="add-user-name" value={user.name} readOnly className="input w-full bg-base-200" />
        </div>
        <div>
          <label className="field-label" htmlFor="add-user-email">Your Email</label>
          <input id="add-user-email" value={user.email} readOnly className="input w-full bg-base-200" />
        </div>
      </div>

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving && <span className="loading loading-spinner loading-sm" />}
        {saving ? "Adding book" : "Add Book"}
      </button>
    </form>
  );
}
