const request = require('supertest');
const app = require('../app');

describe('Events API', () => {
  it('should create a new event', async () => {
    const response = await request(app)
      .post('/events')
      .send({
        title: 'Test Event',
        description: 'A test event description',
        date: '2025-01-15T10:00:00Z',
        category: 'Testing',
      });
    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Test Event');
  });

  it('should retrieve all events', async () => {
    const response = await request(app).get('/events');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should update an event', async () => {
    const response = await request(app)
      .put('/events/1')
      .send({ title: 'Updated Title' });
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Updated Title');
  });

  it('should delete an event', async () => {
    const response = await request(app).delete('/events/1');
    expect(response.status).toBe(204);
  });
});
