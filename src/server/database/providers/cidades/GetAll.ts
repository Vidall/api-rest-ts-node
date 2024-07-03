import { ETableNames } from '../../ETableNames';
import { knex } from '../../knex';
import { ICidade } from '../../models';

export const getAll = async (page: number, limit: number, filter: string, id: number): Promise<ICidade[] | Error> => {
  try {
    const result = await knex(ETableNames.cidade)
      .select('*')
      .where('id', Number(id))
      .orWhere('nome', 'like', `%${filter}%`)
      .offset((page - 1 ) * limit!)
      .limit(limit!);

    if (id > 0 && result.every(item => item.id !== id)) {
      const resultById = await knex(ETableNames.cidade)
        .select('*')
        .where('id', '=', id)
        .first();

      if (resultById) return [...result, resultById];
    }

    return result;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar o registro');
  }
};