import { Request, Response } from 'express';
// Biblioteza yup para validações
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { ICidade } from '../../database/models';
import { CidadesProvider } from '../../database/providers/cidades';

interface IBodyProps extends Omit<ICidade, 'id'> {}// on Omit permite omitir algum atributo na extensão

/*yup.Schema vincula a interface IBodyProps com o bodyValidation*/
/*schema de validação com a lib yup*/
export const createValidator = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3).max(150),
  })),
}));

// create função para criar a cidade
export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {//a tipagem do 2° param é para

  const result = await CidadesProvider.create(req.body);

  if (result instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      }
    });
  }

  return res.status(StatusCodes.ACCEPTED).json(result);
};