// import { FormEvent } from 'react';
import { Link, NavLink, useSearchParams, useNavigate, Form } from 'react-router-dom';
import { ReactComponent as Logo } from './../logo.svg';

export default function Header() {
  const [searchParams] = useSearchParams();
  // const navigate = useNavigate();

  /*
  const onSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get('search') as string;
    // navigate(`/products?search=${search}`);
  };
*/

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
      <nav className="flex items-center justify-end ml-auto text-sm">
        <NavLink
          to="products"
          className={({ isActive }) =>
            `${isActive ? 'font-bold' : ''} text-white no-underline mx-1`
          }
        >
          Products
        </NavLink>
        <NavLink
          to="admin"
          className={({ isActive }) =>
            `${isActive ? 'font-bold' : ''} text-white no-underline mx-1`
          }
        >
          Admin
        </NavLink>
      </nav>
    </header>
  );
}
