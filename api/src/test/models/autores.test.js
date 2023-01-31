import { describe, expect, it, jest } from "@jest/globals";
import Autor from "../../models/autor.js";

describe('Testando modelo Autor', () => {
    const objetoAutor = {
        nome: 'Joao Paulo Maida',
        nacionalidade: 'Brasileiro',
    };

    it('Deve instanciar um novo autor', () => {
        const autor = new Autor(objetoAutor);

        expect(autor).toEqual(
            expect.objectContaining(objetoAutor)
        );
    })
});