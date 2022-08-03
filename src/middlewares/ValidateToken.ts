import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

export interface Payload {
    uid: string;
    name: string;
    email: string;
}

export const validateJWT: RequestHandler = ( req, res, next ) => {

    const token = req.header('x-token');

    if(!token) {
        return res.status(401).json({
            ok: false,
            msg: 'token error'
        });
    }

    try {
        
        const { uid, name, email } = jwt.verify( token, process.env.SECRET_KEY_SEED! ) as Payload;

        req.uid = uid;
        req.name = name;
        req.email = email;

        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'invalid token'
        });
    }

}