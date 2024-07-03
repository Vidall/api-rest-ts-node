import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

/*eslint-disable*/

describe('usuarios - Signin', () => {

  it('Entrar com email e senha', async () => {
    const res1 = await testServer
      .post('/cadastrar')
      .send({
        nome: 'luan vidal',
        email: 'luan@gmail.com',
        senha: 'senha123'
      });

    const resEntrar = await testServer
      .post('/entrar')
      .send({
        email: 'luan@gmail.com',
        senha: 'senha123'
      });

    expect(resEntrar.statusCode).toEqual(StatusCodes.OK);
    expect(resEntrar.body).toHaveProperty('accessToken');

  });
});