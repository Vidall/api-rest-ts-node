import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

/*eslint-disable*/

describe('cidade - create', () => {

  it('criar registro', async () => {

    const res1 = await testServer
      .post('/cidades')
      .send(Headers)
      .send({nome: 'angra dos reis'});

    expect(res1.statusCode).toEqual(StatusCodes.ACCEPTED);
    expect(typeof res1.body).toEqual('number');

  });

  it('tenta criar nome curto', async () => {

    const res1 = await testServer
      .post('/cidades')
      .send({nome: 'ca'});

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.nome');

  });
});
