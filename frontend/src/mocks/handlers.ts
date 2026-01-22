import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/products', () => {
    return HttpResponse.json(
      [
        { id: 1, name: 'Backpack', price: 29.99 },
        { id: 2, name: 'T-Shirt', price: 15.99 },
        { id: 3, name: 'Jacket', price: 49.99 },
      ],
      { status: 200 }
    );
  }),
];
