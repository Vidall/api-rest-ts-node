import { Request, Response } from 'express';
// Biblioteza yup para validações
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { CidadesProvider } from '../../database/providers/cidades';
import { IQueryProps } from '../../database/models/Common';
import { StatusCodes } from 'http-status-codes';

/*yup.Schema vincula a interface ICidade com o bodyValidation*/
/*schema de validação com a lib yup*/
export const getAllValidator = validation((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    page: yup.number().optional().moreThan(0),
    limit: yup.number().optional().moreThan(0),
    id: yup.number().integer().optional().default(0),
    filter: yup.string().optional()
  })),
}));

// create função para pegar todas cidades
export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {//a tipagem do 2° param é para

  const page = req.query.page;
  const limit = req.query.limit;
  const filter = req.query.filter;
  const id = Number(req.query.id);

  console.log({usuario: req.headers.idUsuario});

  const result = await CidadesProvider.getAll(page || 1, limit || 7, filter || '', id || 0);
  const count = await CidadesProvider.count(filter);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  } else if ( count instanceof Error ) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {default: count.message}
    });
  }

  res.setHeader('access-control-expose-headers', 'x-total-count');
  res.setHeader('x-total-count', count);
  // res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');

  return res.status(StatusCodes.OK).json(result);
};