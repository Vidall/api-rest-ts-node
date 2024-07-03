import type { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex): Promise<void> {
  return knex
    .schema
    .createTable(ETableNames.aluno, table => {
      table.bigIncrements('id').primary().index();
      table.string('nome_completo').index().notNullable();
      table.string('email').unique();
      table
        .bigInteger('cidadeId')
        .index()
        .notNullable()
        .references('id')
        .inTable(ETableNames.cidade)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
    })
    .then(() => {
      console.log(`Created table ${ETableNames.aluno}`);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex
    .schema
    .dropTable(ETableNames.aluno)
    .then(() => {
      console.log(`Deleted table ${ETableNames.aluno}`);
    });
}

