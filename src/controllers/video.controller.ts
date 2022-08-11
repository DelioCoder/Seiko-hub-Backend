import { RequestHandler } from "express";
import VideoModel from '../model/video.model';
import { Video } from '../model/interfaces/video.interface';
import path from 'path';
import fs from 'fs-extra'

export const getVideos: RequestHandler = async ( req, res ) => {

    const videos = await VideoModel.find().populate('user') as Video[];

    res.status(202).json(videos);

}

export const createVideo: RequestHandler = async ( req, res ) => {

    const { title, description, category } = req.body;

    const { uid } = req;

    try {
        
        const newVideo = new VideoModel({
            title,
            description,
            category: category,
            videoPath: req.file?.path,
            user: uid
        });
    
        await newVideo.save();
    
        return res.json({
            message: 'Video successfully saved'
        });

    } catch (ex: any) {
        return res.status(401).json({
            message: ex.message
        });
    }
    
    

}

export const getVideoByUser: RequestHandler = async ( req, res ) => {

    const videos = await VideoModel.find({'user': req.params.id}).populate('user').exec() as Video[];
                                
    res.status(202).json(videos);

}

export const getVideoById: RequestHandler = async (req, res) => {

    const { id } = req.params;

    try {

        const video = await VideoModel.findById(id).populate('user').populate('comments.user').exec() as Video;

        res.status(202).json({
            ...video._doc,
            user: {
                id: video._doc.user.id,
                name: video._doc.user.name,
                lastname: video._doc.user.lastname,
                username: video._doc.user.username,
                photo: video._doc.user.photo,
                followers: video._doc.user.followers
            }
        });
        
    } catch (ex: any) {
        return res.status(401).json({
            message: ex.message
        });
    }

}

export const deleteVideo: RequestHandler = async ( req, res ) => {

    const video = await VideoModel.findByIdAndRemove(req.params.id);

    if(video) {
        await fs.unlink(path.resolve(video.videoPath));
    }

    res.status(202).json({
        message: 'Photo Deleted',
        video
    })

}

export const updateVideo: RequestHandler = async( req, res ) => {

    const { id } = req.params;
    const { title, description } = req.body;

    const updatedVideo = await VideoModel.findByIdAndUpdate(id, {
        title,
        description
    }, { new: true });

    res.status(202).json({
        message: 'Succesfully Updated',
        updatedVideo
    })

}

export const updateViews: RequestHandler = async( req, res ) => {

    const { id } = req.params;

    if(id) {
        const updatedVideo = await VideoModel.findByIdAndUpdate(id, { $inc: {'views': 1} }, { new: true });

        res.status(202).json(updatedVideo);
    }

}

export const commentVideo: RequestHandler = async (req, res) => {

    const { id } = req.params;
    const { body, user } = req.body;
    const createdAt: string = new Date().toISOString();

    try {
        
        const video = await VideoModel.findByIdAndUpdate(id, { $push: { comments: { body, user, createdAt } } }, { new: true }).populate('user').exec();

        if(!video) return res.status(401).json({ message: `No video with id ${id}` });

        res.status(202).json({
            ...video._doc,
            user: {
                name: video._doc.user.name,
                lastname: video._doc.user.lastname,
                username: video._doc.user.username,
                photo: video._doc.user.photo,
                followers: video._doc.user.followers
            }
        });

    } catch (ex: any) {
        return res.status(401).json({
            message: ex.message
        });
    }
}

export const deleteComment: RequestHandler = async(req, res) => {

    const { id, commentId } = req.params;

    try {
        
        const video = await VideoModel.findById(id);

        if(video) {
            const commentIndex = video.comments!.findIndex((c) => c.id.toString() === commentId);

            console.log(commentIndex);

            if(video.comments![commentIndex].user.toString() === req.uid) {

                video.comments.splice(commentIndex, 1);

                await video.save();

                return res.status(201).json(commentId);

            } else {
                res.status(401).send({msg: 'Action not allowed'});
            }

        } else {
            res.status(401).send({msg: `Comment not founded`});
        }

    } catch (ex: any) {
        return res.status(401).json({
            message: ex.message
        });
    }

}