import jwt from 'jsonwebtoken';
import { User } from '../model/interfaces/user.interface';

const generateJWT = ( user: User ): string => {
    return jwt.sign({
        uid: user.id,
        name: user.name
    }, process.env.SECRET_KEY_SEED || '',{ expiresIn: '1h' });
}

export default generateJWT;