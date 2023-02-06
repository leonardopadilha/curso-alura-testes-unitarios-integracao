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
        const resposta = await endpoint
            .get('/livros')
            .set('Accept', 'application/json')
            .expect('content-type', /json/)
            .expect(200);
    });
});

let idLivros;
describe('POST em /livros', () => {
    it('Deve cadastrar livro com suceso', async() => {
        let resposta = await endpoint
            .post('/livros')
            .send({
                titulo: "A Natureza da Terra-Média",
                paginas: 512,
                editora_id: 1,
                autor_id: 1
            })
            .expect(201);

        expect(resposta.body.message).toEqual('livro criado')

        idLivros = resposta.body.content.id;
    });
});

describe('GET em /livros/id', () => {
    it('Deve retornar o livro solicitado via id', async() => {
        const resposta = await endpoint
            .get(`/livros/${idLivros}`)
            .expect(200);

        expect(resposta.body.id).toEqual(idLivros)
        expect(resposta.body.titulo).toEqual("A Natureza da Terra-Média");
    });
});

describe('PUT em /livros', () => {
    it('Deve alterar o título do livro', async() => {
        const resposta = await endpoint
            .put(`/livros/${idLivros}`)
            .send({titulo: 'O Silmarillion'})
            .expect(204);
    });
});