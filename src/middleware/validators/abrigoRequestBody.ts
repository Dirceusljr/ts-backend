import * as yup from "yup";
import { NextFunction, Request, Response } from "express";
import { TypeRequestBodyAbrigo } from "../../types/typesAbrigo";
import { pt } from "yup-locale-pt";
import tratarErroValidacaoYup from "../../utils/tratarErroValidacaoYup";

yup.setLocale(pt);

const schemaBodyAbrigo: yup.ObjectSchema<Omit<TypeRequestBodyAbrigo, "endereco">> = yup.object({
    nome: yup.string().defined().required(),
    email: yup.string().email().defined().required(),
    celular: yup.string().defined().required().matches(/^(\(?[0-9]{2}\)?)? ?([0-9]{4,5})-?([0-9]{4})$/gm, "Celular inválido"),
    senha: yup.string().defined().required().min(6).matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm, "Senha inválida"),
})

const middlewareAbrigoRequestBody = async (req: Request, res: Response, next: NextFunction) => {
    tratarErroValidacaoYup(schemaBodyAbrigo, req, res, next);
}

export { middlewareAbrigoRequestBody };