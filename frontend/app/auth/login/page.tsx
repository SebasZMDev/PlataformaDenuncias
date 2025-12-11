"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login, loading, error } = useAuthStore();

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, password });
    const user = (await (await import("@/store/authStore")).useAuthStore.getState()).user;
    if (user) router.push("/dashboard");
  };


  return (
    <div className="flex w-full min-h-screen items-center justify-center bg-zinc-100 dark:bg-black px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-lg space-y-5"
      >
        <h1 className="text-2xl font-semibold text-center text-zinc-800 dark:text-zinc-100">
          Iniciar sesión
        </h1>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Correo electrónico
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="ejemplo@gmail.com"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Contraseña
          </label>
          <input
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            type="password"
            className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
          />
        </div>

        <button
         disabled={loading}
          type="submit"
          className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
        >
          Entrar
        </button>
        <h3 className="text-red-600">{error && error}</h3>
        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          ¿No tienes cuenta?{" "}
          <a href="/auth/register" className="text-blue-600 hover:underline">
            Regístrate
          </a>
        </p>
      </form>
    </div>
  );
}
