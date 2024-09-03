import * as yup from "yup";
import { NextFunction, Request, Response } from "express";
import { TypeRequestBodyAdotante } from "../../types/typesAdotante";

const schemaBodyAdotante: yup.ObjectSchema<Omit<TypeRequestBodyAdotante, "endereco">> = yup.object({
    nome: yup.string().defined().required(),
    celular: yup.string().defined().required(),
    senha: yup.string().defined().required().min(6),
    foto: yup.string().optional()
})

const middlewareAdotanteRequestBody = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schemaBodyAdotante.validate(req.body, { abortEarly: false });
            next();
        } catch (error) {
            const yupErrors = error as yup.ValidationError;

            const validationErrors:Record<string, string> = {};
            yupErrors.inner.forEach((error) => {
                if(!error.path) return;
                validationErrors[error.path] = error.message;
            })
            return res.status(400).json({ erro: validationErrors });
        }
}

export { middlewareAdotanteRequestBody };