"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import RequireAuth from "@/components/auth/RequireAuth";
import dynamic from "next/dynamic";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MapPin, Clock, User2 } from "lucide-react";
import VolverButton from "@/components/ui/BackBtn";
import ModalImagen from "@/components/denuncias/ModalImagen";
import useAuthStore from "@/store/authStore";

const MapaDenuncia = dynamic(
  () => import("@/components/denuncias/MapaDenuncias"),
  { ssr: false }
);

export default function DenunciaDetallePage() {
  const { id } = useParams();
  const { user } = useAuthStore();
  const esPolicia = user?.roles?.includes("POLICIA");
  const [imagenSeleccionada, setImagenSeleccionada] = useState<string | null>(
    null
  );
  const [evidencias, setEvidencias] = useState<any[]>([]);
  const [denuncia, setDenuncia] = useState<any>(null);
  const [loading, setLoading] = useState(true);




  const isImg = (titulo: string) => titulo?.toLowerCase().startsWith("img");

  useEffect(() => {
    const fetchDenuncia = async () => {
      try {
        const data = await api(`/denuncias/${id}`);
        setDenuncia(data);
      } catch (err) {
        console.error("Error cargando denuncia:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDenuncia();
  }, [id]);

  useEffect(() => {
    if (!id) return;

    const fetchEvidencias = async () => {
      try {
        const data = await api(`/evidencias/denuncia/${id}`);
        setEvidencias(data);
        console.log(data);
      } catch (err) {
        console.error("Error cargando evidencias:", err);
      }
    };

    fetchEvidencias();
  }, [id]);

  if (loading)
    return (
      <div className="p-6 text-center text-gray-600">Cargando denuncia...</div>
    );

  if (!denuncia)
    return (
      <div className="p-6 text-center text-red-500">
        No se encontró la denuncia.
      </div>
    );

  const {
    titulo,
    descripcion,
    categoria,
    estado,
    anonimo,
    creadoEn,
    ubicacion,
    usuario,
  } = denuncia;

  return (
    <RequireAuth>
      <div className="max-w-3xl mx-auto p-4 space-y-6 animate-fadeIn">
        <VolverButton to="/denuncias" label="Regresar al Panel" />
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">{titulo}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium
                ${
                  estado === "pendiente"
                    ? "bg-yellow-100 text-yellow-800"
                    : estado === "procesando"
                    ? "bg-blue-100 text-blue-800"
                    : estado === "cerrado"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {estado?.toUpperCase()}
              </span>
            </div>

{esPolicia && (
  <div className="mt-4">
    <label className="block text-sm font-semibold mb-2">
      Cambiar estado
    </label>

    <select
      value={estado}
      onChange={async (e) => {
        const nuevoEstado = e.target.value;

        try {
          await api(`/denuncias/${id}/estado?estado=${nuevoEstado}`, {
            method: "PUT",
          });

          setDenuncia((prev: any) => ({
            ...prev,
            estado: nuevoEstado,
          }));
        } catch (err) {
          console.error("Error cambiando estado", err);
        }
      }}
      className="border rounded-lg px-3 py-2 bg-white"
    >
      <option value="PENDIENTE">Pendiente</option>
      <option value="EN_PROGRESO">En progreso</option>
      <option value="FINALIZADA">Finalizada</option>
    </select>
  </div>
)}


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl">
                <User2 className="text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Denunciante</p>
                  <p className="font-semibold">
                    {anonimo
                      ? "Anónimo"
                      : `${usuario?.nombre} ${usuario?.apellido}`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl">
                <Clock className="text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Fecha</p>
                  <p className="font-semibold">
                    {new Date(creadoEn).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-xl">
              <p className="text-xs text-blue-600 font-semibold">Categoría</p>
              <p className="text-lg font-semibold">{categoria}</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Descripción</h3>
              <p className="text-gray-700 whitespace-pre-line">{descripcion}</p>
            </div>
          </CardContent>
        </Card>

        <CardContent>
          {evidencias.length === 0 ? (
            <p className="text-gray-500">No se adjuntaron evidencias.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {evidencias.map((ev: any, idx: number) => (
                <div
                  key={idx}
                  className="border rounded-lg p-3 bg-slate-50 space-y-2"
                >
                  <p className="font-semibold">{ev.tipo}</p>

                  {isImg(ev.tipo) ? (
                    <img
                      src={ev.url}
                      alt={ev.tipo}
                      className="w-full h-40 object-cover rounded cursor-pointer hover:opacity-80 transition"
                      onClick={() => setImagenSeleccionada(ev.url)}
                    />
                  ) : (
                    <a
                      href={ev.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline break-all"
                    >
                      Ver evidencia
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>

        {ubicacion && (
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin /> Ubicación del incidente
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="h-64 rounded-lg overflow-hidden">
                <MapaDenuncia
                  lat={ubicacion.lat}
                  lng={ubicacion.lng}
                  readOnly={true}
                />
              </div>

              {ubicacion.direccion && (
                <p className="text-sm text-gray-600 mt-3">
                  Dirección: {ubicacion.direccion}
                </p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
      {imagenSeleccionada && (
        <ModalImagen
          url={imagenSeleccionada}
          onClose={() => setImagenSeleccionada(null)}
        />
      )}
    </RequireAuth>
  );
}
