"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "./auth-client";

// For private pages. While the session loads we only report `loading`, so a
// reload never kicks a logged-in user to Login.
export function useRequireAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const { data, isPending } = useSession();
  const user = data?.user ?? null;

  useEffect(() => {
    if (!isPending && !user) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isPending, user, pathname, router]);

  return { user, loading: isPending || !user };
}
