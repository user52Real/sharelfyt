// __tests__/api/contact.test.ts
import { createMocks } from 'node-mocks-http';
import { POST } from '@/app/api/contact/route';

describe('Contact API', () => {
  it('validates input correctly', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name: 'Test User',
        email: 'invalid-email',
        message: 'Test message',
      },
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.code).toBe('BAD_REQUEST');
  });
});[5]