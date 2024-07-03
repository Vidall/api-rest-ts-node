import { Request, Response } from 'express';
// Biblioteza yup para validações
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { CidadesProvider } from '../../database/providers/cidades';

interface IParamProps {
  id?: number
}

/*yup.Schema vincula a interface ICidade com o bodyValidation*/
/*schema de validação com a lib yup*/
export const GetByIdValidator = validation((getSchema) => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}));

// create função para pegar todas cidades
export const getById = async (req: Request<IParamProps, {}, {}>, res: Response) => {//a tipagem do 2° param é para

  const id = req.params.id;
  const result = await CidadesProvider.getByID(id!);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');

  return res.status(StatusCodes.ACCEPTED).json(result);

};