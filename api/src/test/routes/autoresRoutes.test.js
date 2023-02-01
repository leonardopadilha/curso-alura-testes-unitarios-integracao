import app from '../../app.js';
import request from "supertest";
import { describe, expect, it, jest } from '@jest/globals';

let server;

let endpoint = request(app);

beforeEach(() => {
    const port = 3000;
    server = app.listen(port);
});

afterEach(() => {
    server.close();
});

describe('GET em /autores', () => {
    it('Deve retornar os autores cadastrados', async () => {
        const resposta = await endpoint
            .get('/autores')
            .set('Accept', 'application/json')
            .expect('content-type', /json/)
            .expect(200);
    });
});

let idAutor;
describe('POST em /autores', () => {
    it('Deve adicionar novo autor', async () => {
        const resposta = await endpoint
            .post('/autores')
            .send({
                nome:'Eduardo Felipe',
                nacionalidade: 'Brasileira'
            })
            .expect(201);

        idAutor = resposta.body.content.id;
    });
});

describe('GET em /autores/id', () => {
    it('Deve retornar apenas o autor informado via id', async () => {
        const resposta = await endpoint
            .get(`/autores/${idAutor}`)
            .expect(200);

        expect(resposta.body.nome).toEqual('Eduardo Felipe');
    });
});



