"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import RequireAuth from "@/components/auth/RequireAuth";
import useAuthStore from "@/store/authStore";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import {
  FileWarning,
  BarChart3,
  MapPinned,
  CheckCircle,
  LogOut,
  User,
} from "lucide-react";

export default function DashboardPolicia() {
  const router = useRouter();
  const { user } = useAuthStore();

  const [stats, setStats] = useState({
    total: 0,
    pendientes: 0,
    enProgreso: 0,
    finalizadas: 0,
  });

  useEffect(() => {
    if (!user?.roles?.includes("POLICIA")) {
      router.replace("/dashboard/ciudadano");
      return;
    }

    const loadStats = async () => {
      const data = await api("/denuncias/stats");
      setStats({
        total: data.total,
        pendientes: data.pendientes,
        enProgreso: data.enProceso,
        finalizadas: data.resueltas,
      });
    };

    loadStats();
  }, [user]);

  const logout = async () => {
    await api("/auth/logout", { method: "POST" });
    router.replace("/auth/login");
  };

  return (
    <RequireAuth>
      <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900">
        <header className="bg-white dark:bg-zinc-800 shadow px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Panel Policial</h1>

          <button
            onClick={logout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            <LogOut size={18} />
            Salir
          </button>
        </header>

        <main className="p-8">
          <h2 className="text-3xl font-bold mb-8">
            Bienvenido, agente {user?.nombre} 👮‍♂️
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            <Card
              onClick={() => router.push("/denuncias")}
              className="bg-white dark:bg-zinc-800 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-semibold">
                  Total denuncias
                </CardTitle>
                <FileWarning size={26} className="text-blue-500" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-blue-600">
                  {stats.total}
                </p>
              </CardContent>
            </Card>

            <Card
              onClick={() => router.push("/denuncias/pendientes")}
              className="bg-white dark:bg-zinc-800 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-semibold">
                  Pendientes
                </CardTitle>
                <BarChart3 size={26} className="text-yellow-500" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-yellow-600">
                  {stats.pendientes}
                </p>
              </CardContent>
            </Card>

            <Card
              onClick={() => router.push("/denuncias/en-progreso")}
              className="bg-white dark:bg-zinc-800 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-semibold">
                  En progreso
                </CardTitle>
                <MapPinned size={26} className="text-orange-500" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-orange-600">
                  {stats.enProgreso}
                </p>
              </CardContent>
            </Card>

            <Card
              onClick={() => router.push("/denuncias/finalizadas")}
              className="bg-white dark:bg-zinc-800 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-semibold">
                  Finalizadas
                </CardTitle>
                <User size={26} className="text-green-500" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600">
                  {stats.finalizadas}
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </RequireAuth>
  );
}
