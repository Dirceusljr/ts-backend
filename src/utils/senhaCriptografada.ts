import crypto from "crypto";

const criaSenhaCriptografada = (senha: string) => {
    const salt = crypto.randomBytes(8).toString("hex");
    const hash = crypto.createHmac("sha256",salt);
    hash.update(senha);
    return hash.digest("hex")
}

export default criaSenhaCriptografada;