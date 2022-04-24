import { RequestHandler } from "express";

export const createVideo: RequestHandler = ( req, res ) => {

    console.log('Saving video');
    console.log(req.body);

    return res.json({
        message: 'Video successfully saved'
    });

}