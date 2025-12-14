"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import RequireAuth from "@/components/auth/RequireAuth";
import useAuthStore from "@/store/authStore";

export default function DashboardRedirect() {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) return;

    if (user.roles?.includes("POLICIA")) {
      router.replace("/dashboard/policia");
    } else {
      router.replace("/dashboard/ciudadano");
    }
  }, [user]);

  return 
  <RequireAuth>
    <div></div>
  </RequireAuth>;
}
