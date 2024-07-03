import { ETableNames } from '../../ETableNames';
import { knex } from '../../knex';
import { IAluno } from '../../models';

export const UpdateById = async (id: number, aluno: IAluno): Promise<void | Error> => {
  try {
    const result = await knex(ETableNames.aluno)
      .update(aluno)
      .where('id', id);

    if ( result > 0) return;

    return new Error('Erro ao atualizar aluno');

  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar aluno');
  }
};