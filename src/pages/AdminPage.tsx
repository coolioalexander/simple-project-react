import { useAppContext } from '../state/AppContext';

export default function AdminPage() {
  const { permissions } = useAppContext();

  return (
    <div className="text-center p-5 text-slate-900">
      <h1 className="text-base font-semibold">Admin Panel</h1>
      <p className="text-sm text-slate-700 mt-1">
        {permissions?.includes('admin') ? 'Permissions granted' : 'Permissions denied'}
      </p>
    </div>
  );
}
