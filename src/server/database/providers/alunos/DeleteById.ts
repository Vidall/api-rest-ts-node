import { ETableNames } from '../../ETableNames';
import { knex } from '../../knex';

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const result = await knex(ETableNames.aluno)
      .where('id', id)
      .del();

    if (result > 0) return;

    return new Error('Não foi possivel deletar, aluno não encontrado');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao deletar aluno');
  }
};