export interface Denuncia {
  id: number;
  titulo: string;
  descripcion: string;
  categoria: string;
  estado: string;
  anonimo: boolean;
  creadoEn: string;
  usuarioId?: number;
  ubicacion?: Ubicacion;
  evidencias?: Evidencia[];
}

export interface CrearDenunciaRequest {
  titulo: string;
  descripcion: string;
  categoria: string;
  anonimo: boolean;
  ubicacion?: {
    lat: number;
    lng: number;
    direccion?: string;
  };
}
