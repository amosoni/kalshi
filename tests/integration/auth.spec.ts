import { expect, test } from '@playwright/test';

const randomStr = () => Math.random().toString(36).slice(2, 10);

test.describe('Auth/Register/Login', () => {
  const username = `testuser_${randomStr()}`;
  const email = `test_${randomStr()}@example.com`;
  const password = `pw_${randomStr()}!`;

  test('should register a new user', async ({ request }) => {
    const res = await request.post('/api/register', {
      data: { username, email, password },
      headers: { 'Content-Type': 'application/json' },
    });

    expect(res.status()).toBe(201);

    const json = await res.json();

    expect(json).toHaveProperty('id');
    expect(json).toHaveProperty('username', username);
    expect(json).toHaveProperty('email', email);
  });

  test('should login with registered user', async ({ request }) => {
    const res = await request.post('/api/login', {
      data: { usernameOrEmail: email, password },
      headers: { 'Content-Type': 'application/json' },
    });

    expect(res.status()).toBe(200);

    const json = await res.json();

    expect(json).toHaveProperty('success', true);
    expect(json.user).toHaveProperty('email', email);
    expect(json.user).toHaveProperty('username', username);
  });
});
