import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { IAluno } from '../../database/models';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IparamsProps } from '../../database/models/Common';
import { alunosProviders } from '../../database/providers/alunos';

interface IBodyProps extends Omit<IAluno, 'id'> {}

export const UpdateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nome_completo: yup.string().optional(),
    email: yup.string().optional().email(),
    cidadeId: yup.number().optional(),
  })),
  params: getSchema<IparamsProps>(yup.object().shape({
    id: yup.number().required().moreThan(0).integer()
  }))
}));

export const updateById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const alunoUpdate = req.body;
  const result = await alunosProviders.UpdateById(id, alunoUpdate);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.ACCEPTED).json(result);
};