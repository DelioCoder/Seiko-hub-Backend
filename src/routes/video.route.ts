import { Router } from 'express';
import {
    createVideo,
    getVideos,
    deleteVideo,
    updateViews,
    getVideoByUser,
    getVideoById
} from '../controllers/video.controller';
import { videoUpload } from '../libs/multer';
import { validateJWT } from '../middlewares/ValidateToken';
import { commentVideo, deleteComment } from '../controllers/video.controller';

const router = Router();

router.route('/')
    .get(getVideos)
    .post( validateJWT, videoUpload.single('video'), createVideo );

router.route('/:id')
    .get(validateJWT, getVideoByUser)
    

router.route('/only/:id')
    .get( validateJWT, getVideoById )
    .post( validateJWT, commentVideo )
    .put( updateViews )
    .delete(deleteVideo);

router.route('/only/comment/:id/:commentId')
    .delete( validateJWT, deleteComment );

export default router;