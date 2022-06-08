'use strict';
const { app } = require('../src/server');  
const supertest = require('supertest');
const mockRequest = supertest(app);

const { db } = require('../src/models/index');

beforeAll(async () => {
  await db.sync();
});

describe('Web server', () => {
  ////fot testing food models:
  it('Should respond with 404 status on an invalid route', async () => {
    const response = await mockRequest.get('/abc');
    expect(response.status).toBe(404);
  });
  // it('Should respond with 500 status on an invalid route', async () => {
  //   const response = await mockRequest.get('/foods');
  //   expect(response.status).toBe(500);
  // });
  it('Should respond with 404 status on an invalid method', async () => {
    const response = await mockRequest.patch('/food');
    expect(response.status).toBe(404);
  });
  it('can add a food item', async () => {
    const response = await mockRequest.post('/food').send({
        foodName: 'mansaf',
        foodtype: 'eastern',
        foodPrice: 30
    });
    expect(response.status).toBe(201);
  });
  it('can get all food items', async () => {
    const response = await mockRequest.get('/food');
    expect(response.status).toBe(200);
  });
  it('can get one record', async () => {
    const response = await mockRequest.get('/food/1');
    expect(response.status).toBe(200);
  });
  it('can update a record', async () => {
    const response = await mockRequest.put('/food/1');
    expect(response.status).toBe(201);
  });
  it('can delete a record', async () => {
    const response = await mockRequest.delete('/food/1');
    expect(response.status).toBe(204);
  });

   ////fot testing clothe models:
   it('Should respond with 404 status on an invalid route', async () => {
    const response = await mockRequest.get('/clothe');
    expect(response.status).toBe(404);
  });
  it('Should respond with 404 status on an invalid method', async () => {
    const response = await mockRequest.patch('/clothes');
    expect(response.status).toBe(404);
  });
  it('can add a clothes item', async () => {
    const response = await mockRequest.post('/clothes').send({
      clotheName: "dress",
      clotheSize: "large",
      clotheColor: "red"
    });
    expect(response.status).toBe(201);
  });
  it('can get all clothes items', async () => {
    const response = await mockRequest.get('/clothes');
    expect(response.status).toBe(200);
  });
  it('can get one record', async () => {
    const response = await mockRequest.get('/clothes/1');
    expect(response.status).toBe(200);
  });
  it('can update a record', async () => {
    const response = await mockRequest.put('/clothes/1');
    expect(response.status).toBe(201);
  });
  it('can delete a record', async () => {
    const response = await mockRequest.delete('/clothes/1');
    expect(response.status).toBe(204);
  });

});
afterAll(async () => {
  await db.drop();
});