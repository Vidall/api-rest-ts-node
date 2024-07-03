import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

/*eslint-disable*/

describe('Alunos - UpdateById', () => {

  it('Atualizar aluno', async () => {
    const res1 = await testServer
      .post('/alunos')
      .send({
        nome_completo: 'juliana vidal',
        email: 'julianaa@gmail.com',
        cidadeId: 10
      });

      const res1Editado = await testServer
        .put(`/alunos/${res1.body}`)
        .send({
          nome_completo: 'juliana editado',
        })

        expect(res1Editado.statusCode).toEqual(StatusCodes.ACCEPTED)
  });
});
