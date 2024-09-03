import * as yup from "yup";
import { NextFunction, Request, Response } from "express";
import EnderecoEntity from "../../entities/EnderecoEntity";

const schemaBodyEndereco: yup.ObjectSchema<Omit<EnderecoEntity, "id">> = yup.object({
    cidade: yup.string().defined().required(),
    estado: yup.string().defined()
})

const middlewareEnderecoRequestBody = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schemaBodyEndereco.validate(req.body, { abortEarly: false });
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

export { middlewareEnderecoRequestBody};