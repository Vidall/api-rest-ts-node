import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

/*eslint-disable*/

describe('usuário - signUp', () => {

  it('Cadastrar usuário', async () => {
    const res1 = await testServer
      .post('/cadastrar')
      .send({
        nome: 'luan vidal',
        email: 'luan@gmail.com',
        senha: 'senha123'
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

  });
});