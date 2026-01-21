import { useEffect, useState } from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
};

export default function App() {
  const [page, setPage] = useState<'login' | 'products'>('login');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsError, setProductsError] = useState<string | null>(null);

  // --------------------
  // Login
  // --------------------
  async function handleLogin() {
    setError(null);
    setLoading(true);

    await new Promise((r) => setTimeout(r, 800));

    if (username !== 'standard_user' || password !== 'secret_sauce') {
      setError('Invalid credentials');
      setLoading(false);
      return;
    }

    setPage('products');
    setLoading(false);
  }

  function handleLogout() {
    setUsername('');
    setPassword('');
    setProducts([]);
    setProductsError(null);
    setError(null);
    setPage('login');
  }

  // --------------------
  // Products API
  // --------------------
  useEffect(() => {
    if (page !== 'products') return;

    setLoading(true);
    setProducts([]);
    setProductsError(null);

    const apiUrl = `${window.location.origin}/api/products`;

    fetch(apiUrl)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error('Failed to load products');
        }
        return res.json();
      })
      .then((data: Product[]) => {
        setProducts(data);
      })
      .catch(() => {
        setProductsError('Failed to load products');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page]);

  // --------------------
  // UI
  // --------------------
  return (
    <div style={{ padding: 24, fontFamily: 'system-ui' }}>
      <h1 data-testid="app-title">QA React SPA</h1>

      {page === 'login' && (
        <div data-testid="login-page">
          <input
            data-testid="username-input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br /><br />

          <input
            data-testid="password-input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br /><br />

          <button
            data-testid="login-button"
            onClick={handleLogin}
            disabled={loading}
          >
            Login
          </button>

          {loading && <p data-testid="login-loading">Logging in…</p>}
          {error && <p data-testid="login-error">{error}</p>}
        </div>
      )}

      {page === 'products' && (
        <div data-testid="products-page">
          <h2 data-testid="products-title">Products</h2>

          <button data-testid="logout-button" onClick={handleLogout}>
            Logout
          </button>

          {loading && (
            <p data-testid="products-loading">Loading products…</p>
          )}

          {productsError && (
            <p data-testid="products-error">{productsError}</p>
          )}

          <ul data-testid="products-list">
            {products.map((p) => (
              <li key={p.id} data-testid={`product-${p.id}`}>
                {p.name} — ${p.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}


