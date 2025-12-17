"use client";

import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState<number | "">(0);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const numVerif = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;

    const thisNum = valor.replace(/\D/g, "");

    if (thisNum.length <= 9) {
      setTelefono(thisNum ? Number(thisNum) : 0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await api("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          nombre,
          apellido,
          email,
          telefono,
          password,
        }),
      });

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex w-full min-h-screen items-center justify-center bg-zinc-100 dark:bg-black px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-lg space-y-5"
      >
        <h1 className="text-2xl font-semibold text-center text-zinc-800 dark:text-zinc-100">
          Crear cuenta
        </h1>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Nombre
          </label>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            type="text"
            required
            placeholder="Daniel"
            className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Apellido
          </label>
          <input
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            type="text"
            required
            placeholder="Agama"
            className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Correo electrónico
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            placeholder="ejemplo@gmail.com"
            className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Teléfono
          </label>
          <input
            value={telefono}
            onChange={(e) => numVerif(e)}
            type="text"
            placeholder="+51 987 654 321"
            className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Contraseña
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            placeholder="••••••••"
            className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
        >
          Registrarme
        </button>

        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          ¿Ya tienes una cuenta? {error && error}
          <a href="/auth/login" className="text-blue-600 hover:underline">
            Inicia sesión
          </a>
        </p>
      </form>
    </div>
  );
}
