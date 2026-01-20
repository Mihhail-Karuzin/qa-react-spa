import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
};

export default function App() {
  const [page, setPage] = useState<"login" | "products">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  async function handleLogin() {
    setError(null);
    setLoading(true);

    await new Promise((r) => setTimeout(r, 800)); // simulate backend delay

    if (username !== "standard_user" || password !== "secret_sauce") {
      setError("Invalid credentials");
      setLoading(false);
      return;
    }

    setPage("products");
    setLoading(false);
  }

  useEffect(() => {
    if (page === "products") {
      setLoading(true);
      setProducts([]);

      setTimeout(() => {
        setProducts([
          { id: 1, name: "Backpack", price: 29.99 },
          { id: 2, name: "T-Shirt", price: 15.99 },
          { id: 3, name: "Jacket", price: 49.99 },
        ]);
        setLoading(false);
      }, 1000);
    }
  }, [page]);

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1 data-testid="app-title">QA React SPA</h1>

      {page === "login" && (
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

      {page === "products" && (
        <div data-testid="products-page">
          <h2>Products</h2>

          {loading && <p data-testid="products-loading">Loading products…</p>}

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

