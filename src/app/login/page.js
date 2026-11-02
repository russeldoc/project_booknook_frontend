import { Suspense } from "react";
import LoginForm from "@/components/LoginForm";
import Spinner from "@/components/Spinner";

export const metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-12">
      <Suspense fallback={<Spinner />}>
        <LoginForm />
      </Suspense>
    </section>
  );
}
