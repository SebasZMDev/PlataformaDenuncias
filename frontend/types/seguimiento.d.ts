export interface Seguimiento {
  id: number;
  denunciaId: number;
  usuarioId: number;
  mensaje: string;
  estado?: string;
  creadoEn: string;
}
