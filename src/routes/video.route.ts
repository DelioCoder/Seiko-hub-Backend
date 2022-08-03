import { Router } from 'express';
import { createVideo, getVideos, deleteVideo, updateViews, getVideoByUser } from '../controllers/video.controller';
import { videoUpload } from '../libs/multer';
import { validateJWT } from '../middlewares/ValidateToken';

const router = Router();

router.route('/')
    .get(getVideos)
    .post( validateJWT, videoUpload.single('video'), createVideo );

router.route('/:id')
    .get(validateJWT, getVideoByUser)
    .put(updateViews)
    .delete(deleteVideo);

export default router;