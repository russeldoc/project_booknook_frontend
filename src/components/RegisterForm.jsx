"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { signUp } from "@/lib/auth-client";
import { safeRedirect, validatePassword } from "@/lib/format";
import GoogleButton from "./GoogleButton";

export default function RegisterForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = safeRedirect(params.get("redirect"));

  const [values, setValues] = useState({ name: "", email: "", image: "", password: "" });
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (key) => (event) => {
    setValues((current) => ({ ...current, [key]: event.target.value }));
    if (key === "password") setPasswordError("");
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError("");

    const problem = validatePassword(values.password);
    if (problem) {
      setPasswordError(problem);
      return;
    }

    setLoading(true);
    const { error } = await signUp.email({
      name: values.name.trim(),
      email: values.email.trim(),
      password: values.password,
      image: values.image.trim() || undefined,
    });

    if (error) {
      const message = error.message || "We couldn't create your account. Please try again.";
      setFormError(message);
      toast.error(message);
      setLoading(false);
      return;
    }

    toast.success("Account created. Please log in.");
    router.push(redirectTo === "/" ? "/login" : `/login?redirect=${encodeURIComponent(redirectTo)}`);
  }

  return (
    <div className="paper-card mx-auto w-full max-w-md p-6 sm:p-8">
      <h1 className="section-title">Create your account</h1>
      <p className="mt-1 opacity-80">Join BookNook to add books and borrow from other readers.</p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4" noValidate>
        {formError && (
          <p role="alert" className="rounded-lg border-2 border-error bg-error/10 p-3 text-sm text-error">
            {formError}
          </p>
        )}

        <div>
          <label className="field-label" htmlFor="reg-name">Name</label>
          <input id="reg-name" required autoComplete="name" value={values.name} onChange={set("name")} className="input w-full" />
        </div>

        <div>
          <label className="field-label" htmlFor="reg-email">Email</label>
          <input id="reg-email" type="email" required autoComplete="email" value={values.email} onChange={set("email")} className="input w-full" />
        </div>

        <div>
          <label className="field-label" htmlFor="reg-photo">Photo URL</label>
          <input
            id="reg-photo"
            type="url"
            placeholder="https://..."
            value={values.image}
            onChange={set("image")}
            className="input w-full"
          />
        </div>

        <div>
          <label className="field-label" htmlFor="reg-password">Password</label>
          <input
            id="reg-password"
            type="password"
            required
            autoComplete="new-password"
            value={values.password}
            onChange={set("password")}
            aria-invalid={!!passwordError}
            aria-describedby="reg-password-hint"
            className="input w-full"
          />
          {passwordError ? (
            <p id="reg-password-hint" role="alert" className="field-error">{passwordError}</p>
          ) : (
            <p id="reg-password-hint" className="mt-1 text-sm opacity-70">
              At least 6 characters, with an uppercase and a lowercase letter.
            </p>
          )}
        </div>

        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading && <span className="loading loading-spinner loading-sm" />}
          Register
        </button>
      </form>

      <div className="my-5 flex items-center gap-3 text-sm opacity-70">
        <span className="h-px flex-1 bg-base-300" /> or <span className="h-px flex-1 bg-base-300" />
      </div>

      <GoogleButton callbackURL="/" />

      <p className="mt-6 text-center">
        Already have an account?{" "}
        <Link
          href={redirectTo === "/" ? "/login" : `/login?redirect=${encodeURIComponent(redirectTo)}`}
          className="font-bold underline underline-offset-2"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
