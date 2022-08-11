import { RequestHandler } from 'express';
import path from 'path';
import fs from 'fs-extra'
import UserModel from '../model/user';
import { User } from '../model/interfaces/user.interface';
import videoModel from '../model/video.model';

export const getUserContentInfo: RequestHandler = async(req, res) => {

    const {id, kindInfo} = req.params;

    const userDB = await UserModel.findById(id) as User;

    if(userDB) {

        switch (kindInfo) {
            case 'profile':
                return res.json(userDB);
        
            case 'show':
                return res.status(200).json({
                    id: userDB.id,
                    name: userDB.name,
                    username: userDB.username,
                    photo: userDB.photo,
                    followers: userDB.followers
                });

            default:
                return {};
        }

    }

}

export const updateProfile: RequestHandler = async(req, res) => {

    const { id } = req.params;
    const { name, lastname, username, email, password } = req.body;

    const user = await UserModel.findOne({'email': email});

    if (!user) return res.status(401).json({ message: 'Wrong email' });

    const match = await user.validatePassword(password);

    if(!match) return res.status(401).json({ message: 'Wrong password!' });

    const photo = req.file?.path;

    if(id) {
        const userUpdated = await UserModel.findByIdAndUpdate(id, {
            name,
            lastname,
            username,
            photo
        }, { new: true });

        return res.json(userUpdated);

    } else {
        return res.json({
            message: `Not allowed`
        })
    }

}

export const followUser: RequestHandler = async( req, res ) => {

    const { id, userId } = req.body;

    const userDB = await UserModel.findById(id) as User;

    if( !userDB ){
        return res.json({
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

    const { id, userId } = req.body;

    const userDB = await UserModel.findById(id) as User;

    if( !userDB ){
        return res.json({
            message: 'User not exist'
        });
    } 

    const followIndex: number = userDB.followers!.findIndex((c) => c.followerId.toString() === userId);

    if(userDB.followers![followIndex].followerId.toString() === userId) {

        userDB.followers.splice(followIndex, 1);
        await userDB.save();
        return res.json(userId);

    } else {
        return res.status(401).json({
            message: 'not allowed'
        });
    }

}

export const updatePreferences:RequestHandler = async(req, res) => {

    const { id } = req.params;
    const { categories } = req.body;

    if(!categories) {
        return res.json({
            ok: false,
            message: `Categories can't be null`
        })
    }

    try {
        
        const userUpdated = await UserModel.findByIdAndUpdate(id, {
            videoCategories: categories
        }, {new: true});
    
        if(userUpdated) {
            return res.json({
                ok: true,
                message: `preferences saved`
            });
        }

    } catch (ex: any) {
        
        return res.status(401).json({
            message: ex.message
        });

    }

}

export const deleteUserFromDB:RequestHandler = async(req, res) => {

    try {
        
        const { id } = req.params;

        if(!id) return res.send(`User not found`);

        const video = await videoModel.findOneAndRemove({'user': id});

        if(!video) return res.send(`Video not found`);

        await fs.unlink(path.resolve(video.videoPath));

        await UserModel.findByIdAndRemove(id);

        return res.send(`User ${id} has been deleted`);

    } catch (ex: any) {
        return res.status(401).json({
            message: ex.message
        });
    }

}