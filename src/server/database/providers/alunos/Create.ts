import { ETableNames } from '../../ETableNames';
import { knex } from '../../knex';
import { IAluno } from '../../models';

export const create = async (aluno: Omit<IAluno, 'id'>): Promise<number | Error> => {
  try {
    const [{ count }] = await knex(ETableNames.cidade)
      .where('id', aluno.cidadeId)
      .count<[{ count: number}]>('* as count');

    if ( count === 0) {
      return new Error('Cidade usada no cadastro não foi encontrada');
    }

    const [result] = await knex(ETableNames.aluno)
      .insert(aluno)
      .returning('id');

    if (typeof result === 'object') {
      return result.id!;
    } else if (typeof result === 'number'){
      console.log(result);
      return result;
    }

    return new Error('Erro ao cadastrar aluno');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar aluno');
  }
};