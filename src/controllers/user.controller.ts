import { RequestHandler } from 'express';
import UserModel from '../model/user';
import { User } from '../model/interfaces/user.interface';

export const getUserInfo: RequestHandler = async(req, res) => {

    const {id} = req.params;

    const userDB = await UserModel.findById(id) as User;

    if(userDB) {
        return res.json({
            name: userDB.name,
            username: userDB.username,
            userPhoto: userDB.photo,
        });
    } else {
        return res.json({
            ok: false,
            message: `channel not found`
        })
    }

}

export const updateProfile: RequestHandler = async(req, res) => {

    const { id } = req.params;
    const { name, lastname, username } = req.body;

    const photo = req.file?.path;

    if(id) {
        const userUpdated = await UserModel.findByIdAndUpdate(id, {
            name,
            lastname,
            username,
            photo
        }, { new: true });

        res.status(202).json(userUpdated);

    } else {
        res.status(401).json({
            ok: false,
            message: `Not allowed`
        })
    }

}

export const followUser: RequestHandler = async( req, res ) => {

    const { id } = req.params;
    const { userId } = req.body;

    const userDB = await UserModel.findById(id) as User;

    if( !userDB ){
        return res.json({
            ok: false,
            message: 'User not exist'
        });
    } 

    userDB.followers.unshift({
        followerId: userId
    });

    await userDB.save();

    return res.json(userDB.followers[0]);

}

export const unfollowUser: RequestHandler = async(req, res) => {

    const { id } = req.params;
    const { userId } = req.body;

    const userDB = await UserModel.findById(id) as User;

    if( !userDB ){
        return res.json({
            ok: false,
            message: 'User not exist'
        });
    } 

    const followIndex = userDB.followers.findIndex((c) => c.followerId === userId);

    if(userDB.followers[followIndex].followerId === userId) {

        userDB.followers.splice(followIndex, 1);
        await userDB.save();
        return res.json({
            ok: true,
            message: 'unfollowed'
        });

    } else {
        return res.status(401).json({
            ok: true,
            message: 'not allowed'
        });
    }

}