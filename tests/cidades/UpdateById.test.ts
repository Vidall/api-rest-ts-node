import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

/*eslint-disable */

describe('cidades - atualizar', () => {


  it('atualizar cidade', async () => {

    const res1 = await testServer
      .post('/cidades')
      .send({nome: 'Angra'})

    const resEditado = await testServer
      .put(`/cidades/${res1.body}`)
      .send({
        nome: 'Angra Editado'
      })


      expect(resEditado.statusCode).toEqual(StatusCodes.NO_CONTENT)
  })


})