"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function VolverButton({ to = "/denuncias", label = "Volver" }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(to)}
      className="flex items-center gap-2 text-blue-600 hover:underline mb-4"
    >
      <ArrowLeft size={20} />
      {label}
    </button>
  );
}
