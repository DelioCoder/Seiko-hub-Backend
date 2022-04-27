import { RequestHandler } from "express";
import Video from '../model/video.model';
import path from 'path';
import fs from 'fs-extra'

export const getVideos: RequestHandler = async ( req, res ) => {

    const videos = await Video.find();

    res.status(202).json(videos);

}

export const createVideo: RequestHandler = async ( req, res ) => {

    const { title, description, categories } = req.body;

    console.log(req.file?.path);

    const newVideo = new Video({
        title,
        description,
        categories,
        videoPath: req.file?.path
    });

    await newVideo.save();

    return res.json({
        message: 'Video successfully saved'
    });

}

export const getVideo: RequestHandler = async ( req, res ) => {

    const video = await Video.findById(req.params.id);

    res.status(202).json(video);

}

export const deleteVideo: RequestHandler = async ( req, res ) => {

    const video = await Video.findByIdAndRemove(req.params.id);

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

    const updatedVideo = await Video.findByIdAndUpdate(id, {
        title,
        description
    }, { new: true });

    res.status(202).json({
        message: 'Succesfully Updated',
        updatedVideo
    })

}