import * as yup from "yup";
import { NextFunction, Request, Response } from "express";
import EnderecoEntity from "../../entities/EnderecoEntity";
import { pt } from "yup-locale-pt";

yup.setLocale(pt);

const schemaBodyEndereco: yup.ObjectSchema<Omit<EnderecoEntity, "id">> = yup.object({
    cidade: yup.string().defined().required(),
    estado: yup.string().defined()
})

const middlewareEnderecoRequestBody = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schemaBodyEndereco.validate(req.body, { abortEarly: false });
            next();
        } catch (erros) {
            const yupErrors = erros as yup.ValidationError;

            const validationErrors:Record<string, string> = {};
            yupErrors.inner.forEach((erro) => {
                if(!erro.path) return;
                validationErrors[erro.path] = erro.message;
            })
            return res.status(400).json({ erro: validationErrors });
        }
}

export { middlewareEnderecoRequestBody};