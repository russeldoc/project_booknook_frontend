import { Suspense } from "react";
import RegisterForm from "@/components/RegisterForm";
import Spinner from "@/components/Spinner";

export const metadata = { title: "Register" };

export default function RegisterPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-12">
      <Suspense fallback={<Spinner />}>
        <RegisterForm />
      </Suspense>
    </section>
  );
}
