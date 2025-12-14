"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ListaDenuncias({ filtro }: { filtro?: string }) {
  const { user } = useAuthStore();
  const router = useRouter();
  const [denuncias, setDenuncias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

const fetchDenuncias = async () => {
  try {
    let data;

    if (user?.roles?.includes("POLICIA")) {
      // 👮 Policía ve TODAS
      data = await api("/denuncias");
    } else {
      // 👤 Civil ve solo las suyas
      data = await api(`/denuncias/usuario/${user.id}`);
    }

    const filtradas =
      !filtro || filtro === "TODAS"
        ? data
        : data.filter(
            (d: any) => d.estado?.toLowerCase() === filtro.toLowerCase()
          );

    setDenuncias(filtradas);
  } catch (err) {
    console.error("Error cargando denuncias", err);
  } finally {
    setLoading(false);
  }
};


    fetchDenuncias();
  }, [user, filtro]);

  if (loading) return <p>Cargando...</p>;

  if (denuncias.length === 0)
    return (
      <p className="text-center mt-6">
        No hay denuncias {filtro?.toLowerCase()}.
      </p>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {denuncias.map((d) => (
        <Card
          key={d.id}
          className="cursor-pointer bg-white hover:bg-gray-50 shadow-sm hover:shadow-lg transition-all duration-200"
          onClick={() => router.push(`/denuncias/${d.id}`)}
        >
          <CardHeader>
            <CardTitle className="text-lg font-semibold">{d.titulo}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600">
            <p>
              <strong>Categoría:</strong> {d.categoria}
            </p>
            <p>
              <strong>Estado:</strong> {d.estado}
            </p>
            <p>
              <strong>Fecha:</strong> {new Date(d.creadoEn).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
