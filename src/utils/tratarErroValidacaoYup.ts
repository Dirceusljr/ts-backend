import { NextFunction, Request, Response } from "express";
import * as yup from "yup";


const tratarErroValidacaoYup = async (schemaBody: yup.Schema<unknown>, req: Request, res: Response, next: NextFunction) => {
    try {
        await schemaBody.validate(req.body, { abortEarly: false });
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

export default tratarErroValidacaoYup;