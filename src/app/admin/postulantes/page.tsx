import AdminLayout from '@/components/layouts/AdminLayout';

export default function Page() {
  return (
    <AdminLayout section="postulantes">
      <div className="surface px-4 py-16 text-center">
        <h2 className="text-[15px] font-semibold text-slate-900">Postulantes</h2>
        <p className="mx-auto mt-1 max-w-sm text-[13px] text-slate-500">
          Esta sección todavía no está maquetada en la demo.
        </p>
      </div>
    </AdminLayout>
  );
}
