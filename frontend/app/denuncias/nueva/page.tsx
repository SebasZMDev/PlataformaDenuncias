"use client";

import RequireAuth from "@/components/auth/RequireAuth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { api } from "@/lib/api";
import { Usuario } from "@/types/user";

const iconRetinaUrl =
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png";
const iconUrl =
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png";
const shadowUrl =
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

function ClickableMap({ lat, lng, setLat, setLng }: any) {
  useMapEvents({
    click(e) {
      setLat(e.latlng.lat);
      setLng(e.latlng.lng);
    },
  });

  return lat && lng ? <Marker position={[lat, lng]} /> : null;
}

export default function NuevaDenunciaPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [anonimo, setAnonimo] = useState(false);
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true); // To handle loading state for user data

  useEffect(() => {
    const loadUser = async () => {
      try {
        console.log("🔹 Cargando usuario...");
        const me = await api("/usuarios/me");
        console.log("✅ Usuario cargado:", me);
        setUsuario(me);
      } catch (err) {
        console.error("❌ Error al cargar usuario:", err);
        router.push("/auth/login");
      } finally {
        setIsLoadingUser(false);
      }
    };
    loadUser();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🔹 Submit iniciado");

    if (lat === null || lng === null) {
      setError("Debes seleccionar una ubicación en el mapa");
      console.log("❌ No hay ubicación seleccionada");
      return;
    }

    setLoading(true);
    setError("");

    const body = {
      titulo,
      descripcion,
      categoria,
      anonimo,
      ubicacion: lat && lng ? { lat, lng, direccion: "" } : null,
    };

    console.log("🔹 Datos a enviar al backend:", body);
    console.log("🔹 Usuario actual:", usuario);

    try {
      const response = await api(`/denuncias/usuario/${usuario?.id}`, {
        method: "POST",
        body: JSON.stringify(body),
      });
      console.log("✅ Respuesta del backend:", response);
      router.push("/denuncias");
    } catch (err: any) {
      console.error("❌ Error al crear la denuncia:", err);
      setError(err.response?.data?.message || "Error al crear la denuncia");
    } finally {
      setLoading(false);
    }
  };

  if (isLoadingUser) {
    return <div>Cargando usuario...</div>;
  }

  return (
    <RequireAuth>
      <div className="max-w-xl mx-auto p-4">
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
              <option value="accidente">Accidente de tránsito</option>
              <option value="medio_ambiente">Contaminación / Medio ambiente</option>
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

          <div className="h-64">
            <MapContainer
              center={[-9.19, -75.0152]} // Centro aproximado de Perú
              zoom={5}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <ClickableMap lat={lat} lng={lng} setLat={setLat} setLng={setLng} />
            </MapContainer>
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
      </div>
    </RequireAuth>
  );
}
