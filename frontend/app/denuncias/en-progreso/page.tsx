import RequireAuth from "@/components/auth/RequireAuth";
import ListaDenuncias from "@/components/denuncias/ListaDenuncias";
import VolverButton from "@/components/ui/BackBtn";

export default function EnProgresoPage() {
  return (
    <RequireAuth>
      <div className="p-6">
        <VolverButton to="/dashboard" label="Regresar al Panel" />
        <h1 className="text-2xl font-bold mb-4">Denuncias en Progreso</h1>
        <ListaDenuncias filtro="en_progreso" />
      </div>
    </RequireAuth>
  );
}
