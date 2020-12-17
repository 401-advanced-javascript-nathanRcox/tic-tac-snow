'use strict';

const { server } = require('../src/server');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

describe('api v1', () => {
    
    let id = 0;

    it('adds an item to the DB and returns an object with the added item', async () => {
        let object = { name: 'apple', calories: 50, type: 'fruit' };
        let expected = { name: 'apple', calories: 50, type: 'FRUIT' };
        const response = await mockRequest.post('/api/v1/food').send(object); 
        id = response.body._id;
        expect(response.status).toBe(201);
        expect(response.body).toMatchObject(expected);
    });

    it('can get a list of items from the db', async () => {
        const response = await mockRequest.get('/api/v1/food');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
    });

    it('can update return a single, updated item by ID', async () => {
        let object = { _id: id, name: 'orange', calories: 15, type: 'fruit' };
        let expected = { name: 'orange', calories: 15, type: 'FRUIT' };
        const response = await mockRequest.put(`/api/v1/food/${id}`).send(object);
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(expected);
    })
});