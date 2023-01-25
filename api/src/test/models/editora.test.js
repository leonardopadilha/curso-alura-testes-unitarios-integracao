import { describe } from "@jest/globals";
import Editora from "../../models/editora.js";

describe('Testando o modelo Editora', () => {
    const objetoEditora = {
        nome: 'CD',
        cidade: 'Sao Paulo',
        email: 'c@c.com'
    };

    it('Deve instanciar uma nova editora', () => {
        const editora = new Editora(objetoEditora);

        expect(editora).toEqual(
            expect.objectContaining(objetoEditora),
        );
    });

    it('Deve salvar editora no BD', () => {
        const editora = new Editora(objetoEditora);

        editora.salvar().then((dados) => {
            expect(dados.nome).toBe('CDC');
        });
    })
});