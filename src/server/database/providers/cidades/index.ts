import * as Create from './Create';
import * as DeleteByID from './DeleteById';
import * as GetAll from './GetAll';
import * as Count  from './Count';
import * as GetById from './GetById';
import * as UpdateById from './UpdateById';

export const CidadesProvider = {
  ...Create,
  ...DeleteByID,
  ...GetAll,
  ...Count,
  ...GetById,
  ...UpdateById
};