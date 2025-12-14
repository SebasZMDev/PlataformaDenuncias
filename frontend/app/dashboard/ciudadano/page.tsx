"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart3, FileWarning, MapPinned, User, LogOut } from "lucide-react";
import RequireAuth from "@/components/auth/RequireAuth";
import useAuthStore from "@/store/authStore";

export default function Dashboard() {
  const router = useRouter();
  const { user } = useAuthStore();

  const [stats, setStats] = useState({
    total: 0,
    pendientes: 0,
    enProgreso: 0,
    finalizadas: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await api("/denuncias/mis-stats");
        setStats({
          total: data?.total ?? 0,
          pendientes: data?.pendientes ?? 0,
          enProgreso: data?.enProgreso ?? 0,
          finalizadas: data?.finalizadas ?? 0,
        });
      } catch {
        setStats({ total: 0, pendientes: 0, enProgreso: 0, finalizadas: 0 });
      }
    };

    loadStats();
  }, []);

  useEffect(() => {
    if (user?.roles?.includes("POLICIA")) {
      router.push("/dashboard/policia");
    } else {
      router.push("/dashboard/ciudadano");
    }
  }, [user]);

  const handleLogout = async () => {
    await api("/auth/logout", { method: "POST" });
    router.push("/auth/login");
  };

  return (
    <RequireAuth>
      <div className="min-h-screen w-full bg-zinc-100 dark:bg-zinc-900">
        <header className="w-full bg-white dark:bg-zinc-800 shadow-md px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            <LogOut size={20} />
            Cerrar sesión
          </button>
        </header>

        <main className="p-8">
          <h2 className="text-3xl font-bold mb-6">
            Bienvenido, {user?.nombre || "Usuario"} 👋
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

          <div className="mt-10 flex justify-center">
            <button
              onClick={() => router.push("/denuncias/nueva")}
              className="px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md text-lg font-semibold transition"
            >
              Crear nueva denuncia
            </button>
          </div>
        </main>
      </div>
    </RequireAuth>
  );
}
