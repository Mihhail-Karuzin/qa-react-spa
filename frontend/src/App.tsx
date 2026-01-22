import { useEffect, useState } from 'react';
import './App.css';

type Product = {
  id: number;
  name: string;
  price: number;
};

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [productsError, setProductsError] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);

  // =========================
  // Load products after login
  // =========================
  useEffect(() => {
    if (!isLoggedIn) return;

    async function loadProducts() {
      setLoading(true);
      setProductsError(null);

      try {
        const res = await fetch('/api/products');

        if (!res.ok) {
          throw new Error('Failed to load products');
        }

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setProductsError('Failed to load products');
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [isLoggedIn]);

  // ==========
  // Login
  // ==========
  function handleLogin() {
    setLoginError(null);

    if (username === 'standard_user' && password === 'secret_sauce') {
      setIsLoggedIn(true);
    } else {
      setLoginError('Invalid username or password');
    }
  }

  // ==========
  // Logout
  // ==========
  function handleLogout() {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setProducts([]);
    setProductsError(null);
    setLoginError(null);
  }

  // =========================
  // LOGIN PAGE
  // =========================
  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <h1>Login</h1>

        <label htmlFor="username">Username</label>
        <input
          id="username"
          aria-label="Username"
          data-testid="username-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          aria-label="Password"
          data-testid="password-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          data-testid="login-button"
          onClick={handleLogin}
        >
          Login
        </button>

        {loginError && (
          <div data-testid="login-error">
            {loginError}
          </div>
        )}
      </div>
    );
  }

  // =========================
  // PRODUCTS ERROR STATE
  // =========================
  if (productsError) {
    return (
      <div className="products-container">
        <h1 data-testid="products-title">Products</h1>

        <div data-testid="products-error">
          {productsError}
        </div>

        <button
          data-testid="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    );
  }

  // =========================
  // PRODUCTS PAGE
  // =========================
  return (
    <div className="products-container">
      <h1 data-testid="products-title">Products</h1>

      {loading && (
        <div data-testid="products-loading">Loading...</div>
      )}

      <ul>
        {products.map((product) => (
          <li
            key={product.id}
            data-testid={`product-${product.id}`}
          >
            {product.name} — ${product.price}
          </li>
        ))}
      </ul>

      <button
        data-testid="logout-button"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default App;


