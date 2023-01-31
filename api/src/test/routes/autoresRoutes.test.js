import app from '../../app.js';
import request from "supertest";
import { describe, expect, it, jest } from '@jest/globals';

let server;

const endpoint = request(app);

beforeEach(() => {
    const port = 3000;
    server = app.listen(port);
});

afterEach(() => {
    server.close();
});


describe('GET em /autores', () => {
    it('Deve retornar uma lista de autores', async () => {
        const resposta = await endpoint
            .get('/autores')
            .set('Accept', 'application/json')
            .expect('content-type', /json/)
            .expect(200);

        expect(resposta.body[0].nome).toEqual('JRR Tolkien');
    });
});