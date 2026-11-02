"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { clearToken } from "@/lib/api";
import { signIn } from "@/lib/auth-client";
import { safeRedirect } from "@/lib/format";
import GoogleButton from "./GoogleButton";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = safeRedirect(params.get("redirect"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError("");
    setLoading(true);

    const { error } = await signIn.email({ email, password });
    if (error) {
      const message = error.message || "We couldn't log you in. Check your email and password.";
      setFormError(message);
      toast.error(message);
      setLoading(false);
      return;
    }

    clearToken();
    toast.success("Welcome back!");
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <div className="paper-card mx-auto w-full max-w-md p-6 sm:p-8">
      <h1 className="section-title">Login</h1>
      <p className="mt-1 opacity-80">Log in to borrow books and manage your shelf.</p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4" noValidate>
        {formError && (
          <p role="alert" className="rounded-lg border-2 border-error bg-error/10 p-3 text-sm text-error">
            {formError}
          </p>
        )}

        <div>
          <label className="field-label" htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="input w-full"
          />
        </div>

        <div>
          <label className="field-label" htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="input w-full"
          />
          <button
            type="button"
            onClick={() => toast.info("Password reset is coming soon.")}
            className="mt-2 text-sm font-semibold underline underline-offset-2"
          >
            Forget Password?
          </button>
        </div>

        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading && <span className="loading loading-spinner loading-sm" />}
          Login
        </button>
      </form>

      <div className="my-5 flex items-center gap-3 text-sm opacity-70">
        <span className="h-px flex-1 bg-base-300" /> or <span className="h-px flex-1 bg-base-300" />
      </div>

      <GoogleButton callbackURL={redirectTo} />

      <p className="mt-6 text-center">
        New to BookNook?{" "}
        <Link
          href={redirectTo === "/" ? "/register" : `/register?redirect=${encodeURIComponent(redirectTo)}`}
          className="font-bold underline underline-offset-2"
        >
          Register
        </Link>
      </p>
    </div>
  );
}
