import * as yup from "yup";
import { NextFunction, Request, Response } from "express";
import { TypeRequestBodyPet } from "../../types/typesPet";
import { pt } from "yup-locale-pt";
import EnumEspecie from "../../enum/EnumEspecie";
import EnumPorte from "../../enum/EnumPorte";

yup.setLocale(pt);

const schemaBodyPet: yup.ObjectSchema<Omit<TypeRequestBodyPet, "adotante">> = yup.object({
    nome: yup.string().defined().required(),
    especie: yup.string().oneOf(Object.values(EnumEspecie)).defined().required(),
    porte: yup.string().oneOf(Object.values(EnumPorte)).defined().required(),
    dataDeNascimento: yup.date().defined().required(),
    adotado: yup.boolean().defined().required()    
})

const middlewarePetRequestBody = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schemaBodyPet.validate(req.body, { abortEarly: false });
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

export { middlewarePetRequestBody };