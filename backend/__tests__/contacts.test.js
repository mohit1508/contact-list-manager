const request = require('supertest');
const app = require('../app');
const pool = require('../db');

// Reset DB before all tests
beforeAll(async () => {
  await pool.query('DELETE FROM contacts');
});

// Closes all DB connection after tests
afterAll(() => pool.end());

describe('Contacts API', () => {
  it('POST /api/contacts - should create a new contact', async () => {
    const res = await request(app).post('/api/contacts').send({
      name: 'Test User',
      email: 'test@example.com'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Test User');
  });

  it('GET /api/contacts - should return the contact list', async () => {
    const res = await request(app).get('/api/contacts?search=&limit=10&offset=0');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('PUT /api/contacts/:id - should update contact', async () => {
    const updated = await request(app).put('/api/contacts/1').send({
      name: 'Updated User',
      email: 'updated@example.com'
    });

    expect(updated.statusCode).toBe(200);
    expect(updated.body.name).toBe('Updated User');
  });

  it('DELETE /api/contacts/:id - should delete contact', async () => {
    const deleted = await request(app).delete('/api/contacts/1');
    expect(deleted.statusCode).toBe(204);
  });
});
