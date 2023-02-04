import app from '../../app.js';
import request from "supertest";
import { describe, expect, it } from '@jest/globals';

let server;

let endpoint = request(app);

beforeEach(() => {
    const port = 300;
    server = app.listen(port);
});

afterEach(() => {
    server.close();
});

describe('GET em /livros', () => {
    it('Deve retornar todos os livros cadastrados', async() => {
        const resposta = endpoint
            .get('/livros')
            .expect(200);
    });
});