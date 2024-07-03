import { PassWordCrypto } from '../../../shared/services';
import { ETableNames } from '../../ETableNames';
import { IUsuario } from '../../models';
import { knex } from '../../knex';

export const create = async (usuario: Omit<IUsuario, 'id'>): Promise<object | Error> => {
  try {
    const hashedPassword = await PassWordCrypto.hashPassword(usuario.senha!);

    const [result]  = await knex(ETableNames.usuario).insert({...usuario, senha: hashedPassword}).returning('id');

    if (typeof result === 'object') {
      return {...result};
    }

    return new Error('Erro ao cadastrar a usuario');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar a usuario');
  }
};