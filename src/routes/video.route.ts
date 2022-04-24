import { Router } from 'express';
import { createVideo } from '../controllers/video.controller';
import { videoUpload } from '../libs/multer';

const router = Router();

router.route('/')
    .post( videoUpload.single('video'), createVideo );

export default router;