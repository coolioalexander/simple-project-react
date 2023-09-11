import { Link, NavLink, useSearchParams, useNavigate, Form } from 'react-router-dom';
import { ReactComponent as Logo } from './../logo.svg';
import { User } from './../data/authenticate';
import { ReactComponent as UserIcon } from './../user.svg';

type Props = {
  user: User | undefined;
  onSignIn: () => void;
  loading: boolean;
};

export default function Header({ user, onSignIn, loading }: Props) {
  const [searchParams] = useSearchParams();

  return (
    <header className="flex items-center justify-between text-slate-50 bg-slate-900 h-10 p-5">
      <div className="flex items-center justify-center">
        <Link to="">
          <Logo className="inline-block h-5" />
        </Link>
        <Link to="">
          <h2 className="text-l font-bold mx-5">React Tools</h2>
        </Link>
      </div>
      <Form className="flex items-center w-1/5 mx-10" action="/products">
        {/* onSubmit={onSearch} */}
        <input
          type="search"
          id="search"
          name="search"
          defaultValue={searchParams.get('search') ?? ''}
          className="w-full px-2 py-0.5 text-xs bg-white text-gray-700 rounded"
        />
      </Form>
      <nav className="flex items-center justify-end ml-auto mr-6 text-sm">
        <NavLink
          to="products"
          className={({ isActive }) =>
            `${isActive ? 'font-semibold' : ''} text-white no-underline mx-1`
          }
        >
          Products
        </NavLink>
        <NavLink
          to="admin"
          className={({ isActive }) =>
            `${isActive ? 'font-semibold' : ''} text-white no-underline mx-1`
          }
        >
          Admin
        </NavLink>
      </nav>
      <div className="flex items-center justify-end">
        {user ? (
          <>
            <span className="text-xs text-slate-300">{user.name}</span>
            <UserIcon className="inline-block h-5 px-1" />
          </>
        ) : (
          <button
            onClick={onSignIn}
            className="border border-transparent rounded-md text-xs text-slate-300 bg-transparent hover:bg-slate-700 font-semibold px-2 py-1 cursor-pointer"
          >
            {loading ? '...' : 'Sign in'}
          </button>
        )}
      </div>
    </header>
  );
}
