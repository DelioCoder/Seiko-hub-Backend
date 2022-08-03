import { RequestHandler } from "express";
import VideoModel from '../model/video.model';
import { Video } from '../model/interfaces/video.interface';
import path from 'path';
import fs from 'fs-extra'

export const getVideos: RequestHandler = async ( req, res ) => {

    const videos = await VideoModel.find();

    res.status(202).json(videos);

}

export const createVideo: RequestHandler = async ( req, res ) => {

    const { title, description, category } = req.body;

    const { uid } = req;

    console.log(`User id: ${uid}`);

    console.log(req.file?.path);
    
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

}

export const getVideoByUser: RequestHandler = async ( req, res ) => {

    const video = await VideoModel.find({'user': req.params.id}) as Video[];
                                
    res.status(202).json({
        video
    });

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

        res.status(202).json({
            message: 'Succesfully Updated',
            updatedVideo
        });
    }

}