import { User } from './../data/authenticate';

type Props = {
  user: User | undefined;
};

export default function HomePage({ user }: Props) {
  return (
    <div className="text-center p-5 text-slate-900">
      <h1 className="text-base font-semibold">Welcome</h1>
      <p className="text-sm text-slate-700 mt-1">
        {user ? `Hello ${user.name}` : 'Please sign in'}
      </p>
    </div>
  );
}
