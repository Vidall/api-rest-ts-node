import type { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex): Promise<void> {
  return knex
    .schema
    .createTable(ETableNames.usuario, table => {
      table.bigIncrements('id').primary().index();
      table.string('nome').index().notNullable().checkLength('>', 3);
      table.string('email').index().checkLength('>', 6).unique().notNullable();
      table.string('senha').checkLength('>', 6);

      table.comment('Tabela criada para armazenar os usuários do sistema');
    })
    .then(() => {
      console.log(`Created table ${ETableNames.usuario}`);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex
    .schema
    .dropTable(ETableNames.usuario)
    .then(() => {
      console.log(`Deleted table ${ETableNames.usuario}`);
    });
}

