import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

/*eslint-disable*/

describe('Aluno - create', () => {

  it('criar aluno', async () => {
    const res1 = await testServer
      .post('/alunos')
      .send({
        'nome_completo': 'juliana vidal',
        'email': 'julianaa@gmail.com',
        'cidadeId' : 10
      });

      expect(res1.statusCode).toEqual(StatusCodes.OK)
      expect(typeof res1.body).toEqual("number")

  });

  it('Criar aluno com email inválido', async () => {
    const res2 = await testServer
      .post('/alunos')
      .send({
        nome_completo: 'juliana vidal',
        email: '@gmail.com',
        cidadeId : 10
      })

      expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST)
      expect(res2.body).toHaveProperty('errors.body.email')
  })


});