import * as yup from 'yup';
import { IparamsProps } from '../../database/models/Common';
import { validation } from '../../shared/middleware';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { alunosProviders } from '../../database/providers/alunos';

export const deletByIdValidation = validation((getSchema) => ({
  params: getSchema<IparamsProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0)
  }))
}));

export const deleteById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const result = await alunosProviders.deleteById(id);

  if (result instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.OK).json(result);
};