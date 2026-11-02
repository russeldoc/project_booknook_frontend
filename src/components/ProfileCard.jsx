"use client";

import { useState } from "react";
import { toast } from "sonner";
import { updateUser } from "@/lib/auth-client";
import { useRequireAuth } from "@/lib/hooks";
import Spinner from "./Spinner";

export default function ProfileCard() {
  const { user, loading } = useRequireAuth();
  const [saving, setSaving] = useState(false);

  if (loading) return <Spinner />;

  async function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSaving(true);
    const { error } = await updateUser({
      name: String(form.get("name")).trim(),
      image: String(form.get("image")).trim() || undefined,
    });
    setSaving(false);
    if (error) toast.error(error.message || "We couldn't update your profile.");
    else toast.success("Profile updated.");
  }

  return (
    <div className="paper-card mx-auto mt-8 max-w-xl p-6 sm:p-8">
      <div className="flex items-center gap-4">
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-[var(--edge)] bg-secondary">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.image} alt={user.name} referrerPolicy="no-referrer" className="h-full w-full object-cover" />
          ) : (
            <span className="flex h-full w-full items-center justify-center font-display text-3xl font-extrabold text-secondary-content">
              {user.name?.[0]?.toUpperCase()}
            </span>
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate font-display text-2xl font-extrabold">{user.name}</p>
          <p className="truncate opacity-70">{user.email}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
        <div>
          <label className="field-label" htmlFor="profile-name">Name</label>
          <input id="profile-name" name="name" required defaultValue={user.name} className="input w-full" />
        </div>
        <div>
          <label className="field-label" htmlFor="profile-photo">Photo URL</label>
          <input id="profile-photo" name="image" type="url" defaultValue={user.image || ""} placeholder="https://..." className="input w-full" />
        </div>
        <div>
          <label className="field-label" htmlFor="profile-email">Email</label>
          <input id="profile-email" value={user.email} readOnly className="input w-full bg-base-200" />
        </div>
        <button type="submit" disabled={saving} className="btn btn-primary">
          {saving && <span className="loading loading-spinner loading-sm" />}
          Save changes
        </button>
      </form>
    </div>
  );
}
