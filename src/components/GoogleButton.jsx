"use client";

import { useState } from "react";
import { FaGoogle } from "react-icons/fa6";
import { toast } from "sonner";
import { signIn } from "@/lib/auth-client";

export default function GoogleButton({ callbackURL = "/" }) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    const { error } = await signIn.social({ provider: "google", callbackURL });
    if (error) {
      toast.error(error.message || "Google sign-in failed. Please try again.");
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="btn w-full bg-[var(--paper)]"
    >
      {loading ? (
        <span className="loading loading-spinner loading-sm" />
      ) : (
        <FaGoogle size={16} />
      )}
      Continue with Google
    </button>
  );
}
