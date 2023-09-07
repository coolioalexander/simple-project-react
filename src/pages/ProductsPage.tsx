import { Link, useSearchParams } from 'react-router-dom';
import { products } from '../data/products';

export default function ProductsPage() {
  const [searchParams] = useSearchParams();

  const filteredProducts = () => {
    const search = searchParams.get('search');
    if (search === null || search === undefined) {
      return products;
    }
    return products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()));
  };

  return (
    <div className="text-center text-xl p-5 text-slate-900">
      <h1 className="">Here are some great tools for React</h1>
      <ul className="list-none m-0 p-0">
        {filteredProducts().map((product) => (
          <li key={product.id}>
            <Link to={`${product.id}`} className="text-base text-slate-700 p-1 hover:underline">
              {product.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
