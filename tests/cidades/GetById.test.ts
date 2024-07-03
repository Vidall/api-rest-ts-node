import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

/*eslint-disable */

describe('cidade - pegar cidade por id', () => {



  it('Pegar uma cidade', async () => {


    const res1 = await testServer
      .post('/cidades')
      .send({nome: 'Angra dos Reis'});


    const resBuscada = await testServer
      .get(`/cidades/${res1.body}`)
      .send()


    expect(resBuscada.statusCode).toEqual(StatusCodes.ACCEPTED)
  });


  it('Pega uma cidade que não existe', async () => {


    const res1 = await testServer
      .post('/cidades')
      .send({nome: 'Angra dos Reis'});


    const resBuscada = await testServer
      .get(`/cidades/9999`)
      .send()


    expect(resBuscada.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(resBuscada.body).toHaveProperty('errors.default')
  });
});