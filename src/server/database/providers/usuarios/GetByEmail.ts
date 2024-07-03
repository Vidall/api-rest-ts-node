import { ETableNames } from '../../ETableNames';
import { knex } from '../../knex';
import { IUsuario } from '../../models';

export const getByEmail = async (email: string): Promise<IUsuario | Error> => {
  try {
    const result = await knex(ETableNames.usuario)
      .select('*')
      .where('email', '=', email)
      .first();

    if (result) return result;

    return new Error('Erro ao buscar o registro');

  } catch (error) {
    console.log(error);
    return new Error('Erro ao buscar o registro');
  }
};