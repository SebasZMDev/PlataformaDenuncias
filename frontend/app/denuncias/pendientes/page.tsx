import RequireAuth from "@/components/auth/RequireAuth";
import ListaDenuncias from "@/components/denuncias/ListaDenuncias";
import VolverButton from "@/components/ui/BackBtn";

export default function PendientesPage() {
  return (
    <RequireAuth>
      <div className="p-6">
        <VolverButton to="/dashboard" label="Regresar al Panel" />
        <h1 className="text-2xl font-bold mb-4">Denuncias Pendientes</h1>
        <ListaDenuncias filtro="pendiente" />
      </div>
    </RequireAuth>
  );
}
