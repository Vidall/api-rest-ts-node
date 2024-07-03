// Importando todas as variaveis de ./Create como create
import * as create from './Create';
import * as getAll from './GetAll';
import * as getById from './GetById';
import * as deleteById from './DeleteById';
import * as updateById from './UpdateById';

// usado o operadro spreed para pegar tudo que esta sendo exportado de ./Create
export const cidadesControllers = {
  ...create,
  ...getAll,
  ...getById,
  ...updateById,
  ...deleteById
};
