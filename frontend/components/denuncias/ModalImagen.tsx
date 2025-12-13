"use client";

type Props = {
  url: string;
  onClose: () => void;
};

export default function ModalImagen({ url, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={url}
          alt="Evidencia"
          className="
            max-w-[90vw]
            max-h-[90vh]
            object-contain
            rounded-lg
            shadow-xl
          "
        />
      </div>
    </div>
  );
}
