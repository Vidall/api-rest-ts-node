import { Request, Response } from 'express';
// Biblioteza yup para validações
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { ICidade } from '../../database/models';
import { CidadesProvider } from '../../database/providers/cidades';

interface IParamProps {
  id?: number
}

interface IBodyProps extends Omit<ICidade, 'id'> {}

/*yup.Schema vincula a interface ICidade com o bodyValidation*/
/*schema de validação com a lib yup*/
export const UpdateByIdValidator = validation((getSchema) => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3),
  }))
}));

// create função para pegar todas cidades
export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {//a tipagem do 2° param é para
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parametro id precisa ser informado'
      }
    });
  }

  const result = await CidadesProvider.updateByid(req.params.id, req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.NO_CONTENT).json(result);
};