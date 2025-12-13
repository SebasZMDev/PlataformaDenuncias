import { useState } from "react";

type Props = {
  onClose: () => void;
  onAdd: (titulo: string, url: string) => void;
};

export default function ModalEvidencia({ onClose, onAdd }: Props) {
  const [titulo, setTitulo] = useState("");
  const [url, setUrl] = useState("");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-3">Adjuntar evidencia</h2>

        <input
          type="text"
          placeholder="Título de la evidencia"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />

        <input
          type="url"
          placeholder="URL (Drive, YouTube, imagen, etc.)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 border rounded"
          >
            Cancelar
          </button>

          <button
            onClick={() => {
              if (!titulo || !url) return;
              onAdd(titulo, url);
              onClose();
            }}
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
