"use client";

import RequireAuth from "@/components/auth/RequireAuth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import useAuthStore from "@/store/authStore";
import dynamic from "next/dynamic";
import { ArrowLeft } from "lucide-react";
import ModalEvidencia from "@/components/denuncias/ModalEvidencia";

const MapaDenuncia = dynamic(
  () => import("@/components/denuncias/MapaDenuncias"),
  { ssr: false }
);

export default function NuevaDenunciaPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [anonimo, setAnonimo] = useState(false);
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalEvidenciaOpen, setModalEvidenciaOpen] = useState(false);

  const [evidencias, setEvidencias] = useState<
    { titulo: string; url: string }[]
  >([]);




const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (lat === null || lng === null) {
    setError("Debes seleccionar una ubicación en el mapa");
    return;
  }

  setLoading(true);
  setError("");

  const body = {
    titulo,
    descripcion,
    categoria,
    anonimo,
    ubicacion: { lat, lng, direccion: "" },
  };

  try {

    const denuncia = await api(`/denuncias/usuario/${user?.id}`, {
      method: "POST",
      body: JSON.stringify(body),
    });

    for (const ev of evidencias) {
      await api(
        `/evidencias/denuncia/${denuncia.id}?tipo=${ev.titulo}&url=${encodeURIComponent(ev.url)}`,
        { method: "POST" }
      );
    }


    router.push("/denuncias");
  } catch (err) {
    setError("Error al crear la denuncia");
  } finally {
    setLoading(false);
  }
};


  return (
    <RequireAuth>
      <div className="max-w-xl mx-auto p-4">
        <button
          onClick={() => router.push("/denuncias")}
          className="flex items-center gap-2 text-blue-600 hover:underline mb-4"
        >
          <ArrowLeft size={20} />
          Volver
        </button>
        <h1 className="text-2xl font-bold mb-4">Nueva Denuncia</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            className="border p-2 rounded"
          />
          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
            className="border p-2 rounded"
          />
          <label>
            Categoría
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              required
              className="border p-2 rounded w-full"
            >
              <option value="">Selecciona una categoría</option>
              <option value="robo">Robo / Hurto</option>
              <option value="vandalismo">Vandalismo / Daños</option>
              <option value="violencia">Violencia / Agresión</option>
              <option value="corrupcion">Corrupción</option>
              <option value="drogas">Tráfico de drogas</option>
              <option value="medio_ambiente">Terrorismo</option>
              <option value="accidente">Accidente de tránsito</option>
              <option value="medio_ambiente">
                Contaminación / Medio ambiente
              </option>
              <option value="otros">Otros</option>
            </select>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={anonimo}
              onChange={(e) => setAnonimo(e.target.checked)}
            />
            Denunciar como anónimo
          </label>
          {evidencias.length > 0 && (
            <div className="text-sm text-gray-700">
              <p className="font-medium">Evidencias adjuntas:</p>
              <ul>
                {evidencias.map((e, i) => (
                  <li key={i}>• {e.titulo}</li>
                ))}
              </ul>
            </div>
          )}

          <button
            type="button"
            onClick={() => setModalEvidenciaOpen(true)}
            className="border border-blue-600 text-blue-600 px-3 py-2 rounded hover:bg-blue-50"
          >
            Adjuntar evidencia
          </button>

          <div className="h-64">
            <MapaDenuncia lat={lat} lng={lng} setLat={setLat} setLng={setLng} />
          </div>

          {lat && lng && (
            <p className="text-sm text-gray-600">
              Ubicación seleccionada: {lat.toFixed(6)}, {lng.toFixed(6)}
            </p>
          )}

          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            {loading ? "Enviando..." : "Crear Denuncia"}
          </button>
        </form>
        {modalEvidenciaOpen && (
          <ModalEvidencia
            onClose={() => setModalEvidenciaOpen(false)}
            onAdd={(titulo, url) =>
              setEvidencias([...evidencias, { titulo, url }])
            }
          />
        )}
      </div>
    </RequireAuth>
  );
}
