import * as create from './Create';
import * as updateById from './UpdateById';
import * as getAll from './GetAll';
import * as getById from './GetById';
import * as deleteById from './DeleteById';

export const alunosControllers = {
  ...create,
  ...updateById,
  ...getAll,
  ...getById,
  ...deleteById
};