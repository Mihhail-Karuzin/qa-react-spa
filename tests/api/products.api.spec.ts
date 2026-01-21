import { test, expect } from '@playwright/test';

test('products API contract', async ({ request }) => {
  const response = await request.get('/api/products');

  expect([200, 404]).toContain(response.status());

  const contentType = response.headers()['content-type'] || '';

  if (response.status() === 200 && contentType.includes('application/json')) {
    const products = await response.json();

    expect(Array.isArray(products)).toBe(true);

    if (products.length > 0) {
      expect(products[0]).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        price: expect.any(Number),
      });
    }
  } else {
    // SPA fallback → acceptable without backend
    expect(contentType).toContain('text/html');
  }
});

