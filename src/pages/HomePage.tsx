import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export default function HomePage() {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <div className="text-center p-5 text-slate-900">
      <h1 className="text-base font-semibold">Welcome</h1>
      <p className="text-sm text-slate-700 mt-1">
        {user ? `Hello ${user.name}` : 'Please sign in'}
      </p>
    </div>
  );
}
