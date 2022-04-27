import { Router } from 'express';
import { createVideo, getVideos, deleteVideo } from '../controllers/video.controller';
import { videoUpload } from '../libs/multer';

const router = Router();

router.route('/')
    .get(getVideos)
    .post( videoUpload.single('video'), createVideo );

router.route('/:id')
    .delete(deleteVideo);

export default router;