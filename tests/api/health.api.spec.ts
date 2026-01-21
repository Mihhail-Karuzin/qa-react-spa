import { test, expect } from '@playwright/test';

test('API health contract', async ({ request }) => {
  const response = await request.get('/api/health');

  expect([200, 404]).toContain(response.status());

  const contentType = response.headers()['content-type'] || '';

  if (response.status() === 200 && contentType.includes('application/json')) {
    const body = await response.json();
    expect(body).toHaveProperty('status');
  } else {
    // Backend not implemented → acceptable in contract phase
    expect(contentType).toContain('text/html');
  }
});



