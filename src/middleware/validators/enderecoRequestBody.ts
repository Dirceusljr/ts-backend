import * as yup from "yup";
import { NextFunction, Request, Response } from "express";
import EnderecoEntity from "../../entities/EnderecoEntity";
import { pt } from "yup-locale-pt";
import tratarErroValidacaoYup from "../../utils/tratarErroValidacaoYup";

yup.setLocale(pt);

const schemaBodyEndereco: yup.ObjectSchema<Omit<EnderecoEntity, "id">> = yup.object({
    cidade: yup.string().defined().required(),
    estado: yup.string().defined()
})

const middlewareEnderecoRequestBody = async (req: Request, res: Response, next: NextFunction) => {
    tratarErroValidacaoYup(schemaBodyEndereco, req, res, next);
}

export { middlewareEnderecoRequestBody};