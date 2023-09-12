import { useState } from 'react';
import { Link, NavLink, useSearchParams, Form } from 'react-router-dom';
import { ReactComponent as Logo } from './../logo.svg';
import { authenticate } from '../auth/authenticate';
import { ReactComponent as UserIcon } from './../user.svg';
import { useSelector, useDispatch } from 'react-redux';
import { authorize } from '../auth/authorize';
import { RootState } from '../store/store';
import {
  authenticateAction,
  authenticatedAction,
  authorizeAction,
  authorizedAction,
} from '../store/userSlice';

export default function Header() {
  const [checked, setChecked] = useState(false);
  const { user, loading } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const handleSignIn = async () => {
    dispatch(authenticateAction());
    const authenticatedUser = await authenticate();
    dispatch(authenticatedAction(authenticatedUser));
    if (authenticatedUser !== undefined) {
      dispatch(authorizeAction());
      const authorizations = await authorize(authenticatedUser.id);
      dispatch(authorizedAction(authorizations));
    }
  };

  return (
    <header
      className={`flex items-center justify-between h-10 p-5 ${
        checked ? 'bg-slate-50 text-slate-900' : 'text-slate-50 bg-slate-900'
      }`}
    >
      <div className="flex items-center justify-center">
        <Link to="">
          <Logo className="inline-block h-5" />
        </Link>
        <Link to="">
          <h2 className="text-l font-bold mx-5">👋 React</h2>
        </Link>
      </div>
      <Form className="flex items-center w-1/5 mx-10" action="/products">
        <input
          type="search"
          id="search"
          name="search"
          defaultValue={searchParams.get('search') ?? ''}
          className="w-full px-2 py-0.5 text-xs bg-white text-gray-700"
        />
      </Form>
      <nav
        className={`flex items-center justify-end ml-auto mr-6 text-sm ${
          checked ? 'text-slate-900' : 'text-white'
        }`}
      >
        <NavLink
          to="products"
          className={({ isActive }) => `${isActive ? 'font-semibold' : ''} no-underline mx-2`}
        >
          Products
        </NavLink>
        <NavLink
          to="blog"
          className={({ isActive }) => `${isActive ? 'font-semibold' : ''} no-underline mx-2`}
        >
          Blog
        </NavLink>
        <NavLink
          to="admin"
          className={({ isActive }) => `${isActive ? 'font-semibold' : ''} no-underline mx-2`}
        >
          Admin
        </NavLink>
      </nav>
      <div className="flex items-center justify-end">
        {user ? (
          <>
            <span className={`text-xs ${checked ? 'text-slate-900' : 'text-slate-300'}`}>
              {user.name}
            </span>
            <UserIcon className="inline-block h-5 px-1" />
          </>
        ) : (
          <button
            onClick={handleSignIn}
            className={`border border-transparent rounded-md text-xs bg-transparent font-semibold px-2 py-1 cursor-pointer ${
              checked ? 'text-slate-700 hover:bg-slate-300' : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            {loading ? '...' : 'Sign in'}
          </button>
        )}
      </div>
      <div className="ml-1">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
            className="sr-only peer"
          />
          <div className="w-5 h-3 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-2 after:w-2 after:transition-all dark:border-gray-600 peer-checked:bg-slate-900"></div>
        </label>
      </div>
    </header>
  );
}
