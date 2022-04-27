import { RequestHandler } from 'express';
import User from '../model/user';
import { Jwt, Numbers } from '../utils';

// (Iniciar sesión)
export const signin: RequestHandler = async ( req, res ) => {

    const { email, password } = req.body;

    const user = await User.findOne({'email': email});

    if (!user) {

        res.status(401).json({ msg: 'User not found' });

    } else {

        const match = await user.validatePassword(password);

        if(!match) {
            res.status(401).json({ msg: 'Wrong password!' })
        }

        const token = Jwt(user);

        res.status(202).json({
            ...user._doc,
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
            msg: 'Email already taken'
        });

    }

    const numbers = Numbers();

    const username = `${ name + '.' + lastname + '.' + numbers }`;

    try {
        
        const newUser = new User({
            name,
            lastname,
            username,
            photo: req.file?.path,
            email,
            password
        });

        newUser.password = await newUser.encrypPassword(newUser.password);
        
        const savedUser = await newUser.save();

        const token = Jwt(savedUser);

        res.json({
            ...savedUser._doc,
            token
        });

    } catch ( ex ) {
        res.status(401).json(ex);
    }

}