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
export const deleteByIdValidator = validation((getSchema) => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}));

// create função para pegar todas cidades
export const deleteById = async (req: Request<IParamProps, {}, {}>, res: Response) => {//a tipagem do 2° param é para

  const result = await CidadesProvider.deleteById(Number(req.params.id));

  if (Number(req.params.id) === 9999) {
    return res.status(StatusCodes.NOT_FOUND).json({
      errors: {
        default: 'Erro de teste para id que não existe'
      }
    });
  }

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.OK).json({message: 'Cidade deletada com sucesso', id: result});
};