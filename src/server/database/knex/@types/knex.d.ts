import { IAluno, ICidade, IUsuario } from '../../models';

declare module 'knex/types/tables' {
  interface Tables {
    cidade: ICidade
    aluno: IAluno,
    usuario: IUsuario
  }
}