import { useParams } from 'react-router-dom';
import { products } from './../data/products';

type Params = {
  id: string | undefined;
};

export default function ProductPage() {
  const { id } = useParams<Params>();
  const productId = id === undefined ? undefined : parseInt(id);
  const product = products.find((product) => product.id === productId);
  return (
    <div className="text-center p-5 text-xl text-slate-900">
      {product === undefined ? (
        <h2>Unknown product</h2>
      ) : (
        <>
          <h2>{product.name}</h2>
          <p className="text-base text-slate-800">{product.description}</p>
          <p className="text-base text-slate-800">
            {new Intl.NumberFormat('en-US', {
              currency: 'USD',
              style: 'currency',
            }).format(product.price)}
          </p>
        </>
      )}
    </div>
  );
}
