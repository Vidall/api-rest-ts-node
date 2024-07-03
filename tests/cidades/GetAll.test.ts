import { StatusCodes } from 'http-status-codes';
import {testServer} from '../jest.setup';

/*eslint-disable */

describe('cidades - pegar todas', () => {



  it('Buscar todos os registros', async() => {

    const res1 = await testServer
      .post('/cidades')
      .send({nome: 'Angra dos Reis'});

    const resBuscada = await testServer
      .get('/cidades')
      .send();


      expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0)
      expect(resBuscada.statusCode).toEqual(StatusCodes.OK)
      // expect(resBuscada.body.length).toBeGreaterThan(0)
  });


});