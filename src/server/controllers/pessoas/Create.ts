import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { IAluno } from '../../database/models';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { alunosProviders } from '../../database/providers/alunos';

interface IBodyProps extends Omit<IAluno, 'id'>{}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nome_completo: yup.string().required(),
    email: yup.string().required().email(),
    cidadeId: yup.number().required(),
  }))
}));

export const create = async (req: Request, res: Response) => {

  const result = await alunosProviders.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.OK).json(result);
};