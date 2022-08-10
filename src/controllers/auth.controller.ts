import { RequestHandler } from 'express';
import User from '../model/user';
import { Jwt, Numbers } from '../utils';

// (Iniciar sesión)
export const signin: RequestHandler = async ( req, res ) => {

    const { email, password } = req.body;

    const user = await User.findOne({'email': email});

    if (!user) {

        res.status(401).json({ message: 'Wrong credentials' });

    } else {

        const match = await user.validatePassword(password);

        if(!match) {
            res.status(401).json({ message: 'Wrong credentials!' })
        }

        const token = Jwt(user);

        res.status(202).json({
            id: user.id,
            username: user.username,
            email: user.email,
            photoUser: user.photo,
            token
        });

    }
    

}

// (Registrarse)

export const signup: RequestHandler = async ( req, res ) => {

    const { name, lastname, email, password } = req.body;

    const emailExist = await User.findOne({'email': email});

    if ( emailExist ) {

        res.status(400).json({
            message: 'Email already taken'
        });

    }

    const numbers = Numbers();

    const username = `${ name + '.' + lastname + '.' + numbers }`;

    try {
        
        const newUser = new User({
            name,
            lastname,
            username,
            email,
            password
        });

        newUser.password = await newUser.encrypPassword(newUser.password);
        
        const savedUser = await newUser.save();

        const token = Jwt(savedUser);

        res.json({
            id: newUser.id,
            name: newUser.name,
            lastname: newUser.lastname,
            email: newUser.email,
            username: newUser.username,
            token
        });

    } catch ( ex ) {
        res.status(401).json(ex);
    }

}

export const tokenRevalidate: RequestHandler = async( req, res ) =>{

    const { uid, name, email } = req;

    const dbUser = await User.findById(uid);

    if (dbUser) {
        const token = Jwt( dbUser );

        return res.json({
            ok: true,
            uid,
            name,
            email,
            token
        });
    } else {
        return res.json({
            ok: false
        });
    }

}