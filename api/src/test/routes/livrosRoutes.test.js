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

it.each([
    ['paginas', {paginas : 2400}],
    ['editora_id', {editora_id: 2}],
    ['autor_id', {autor_id: 3}]
]) ('Deve alterar os livros em %s', async(chave, params) => {
    const resposta = await endpoint
        .put(`/livros/${idLivros}`)
        .send(params)
        .expect(204);
});

describe('GET em /livros', () => {
    it('Deve validar a alteração realizada no passo anterior', async() => {
        const resposta = await endpoint
            .get(`/livros/${idLivros}`)
            .expect(200);
        
        expect(resposta.body.titulo).toEqual("O Silmarillion");
        expect(resposta.body.paginas).toEqual(2400);
        expect(resposta.body.editora_id).toEqual(2);
        expect(resposta.body.autor_id).toEqual(3);
    });
});

describe('DELETE em /livros', () => {
    it('Deve excluir o livro informado através do id', async() => {
        const resposta = await endpoint
            .delete(`/livros/${idLivros}`)
            .expect(200);
        
        expect(resposta.body.message).toEqual('livro excluído');
    });
});