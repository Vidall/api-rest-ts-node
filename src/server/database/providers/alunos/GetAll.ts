import { ETableNames } from '../../ETableNames';
import { knex } from '../../knex';
import { IAluno } from '../../models';

export const getAll = async (page: number, limit: number, filter: string, id: number): Promise<IAluno[] | Error> => {
  try {
    const result = await knex(ETableNames.aluno)
      .select('*')
      .where('id', Number(id))
      .orWhere('nome_completo', 'like', `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    if (id > 0 && result.every(item => item.id !== id)){
      const resulById = await knex(ETableNames.aluno)
        .select('*')
        .where('id', id)
        .first();

      if (resulById) return [...result, resulById];
    }

    return result;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao buscar os registros de alunos');
  }

};