import { ETableNames } from '../../ETableNames';
import { knex } from '../../knex';
import { ICidade } from '../../models';

export const getByID = async (id: number): Promise<ICidade | Error> => {
  try {
    const result = await knex(ETableNames.cidade)
      .select('*')
      .where('id', '=', id)
      .first();

    if (result) return result;

    return new Error('Erro ao buscar o registro');

  } catch (error) {
    console.log(error);
    return new Error('Erro ao buscar o registro');
  }
};