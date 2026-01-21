import { useEffect, useState } from 'react';
import './App.css';

type Product = {
  id: number;
  name: string;
};

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(async (res) => {
        if (!res.ok) {
          throw new Error('Failed to load products');
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setError(null);
      })
      .catch(() => {
        setError('Failed to load products');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <div data-testid="products-error" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;


