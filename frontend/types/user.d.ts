export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  activo: boolean;
  creadoEn: string;
  roles: string[];
}
