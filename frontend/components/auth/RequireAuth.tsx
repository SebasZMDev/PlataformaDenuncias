"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, fetchUser } = useAuthStore();

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const load = async () => {
      await fetchUser();
      setChecking(false);
    };
    load();
  }, []);

  if (checking) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    router.push("/auth/login");
    return null;
  }

  return <>{children}</>;
}
