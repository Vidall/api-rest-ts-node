import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { IparamsProps } from '../../database/models/Common';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { alunosProviders } from '../../database/providers/alunos';

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IparamsProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0)
  }))
}));

export const getById = async (req: Request<IparamsProps>, res: Response) => {

  const result = await alunosProviders.getById(Number(req.params.id));

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.OK).json(result);
};