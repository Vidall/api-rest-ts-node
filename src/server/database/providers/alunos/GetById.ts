import { ETableNames } from '../../ETableNames';
import { knex } from '../../knex';
import { IAluno } from '../../models';

export const getById = async (id: number): Promise<IAluno | Error> => {
  try {
    const result = await knex(ETableNames.aluno)
      .select('*')
      .where('id', id)
      .first();

    if (result) return result;

    return new Error('Aluno não encontrado');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao buscar aluno');
  }
};