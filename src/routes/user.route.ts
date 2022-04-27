import { Router } from 'express';
import { signin, signup } from '../controllers/user.controller';
import { imageUpload } from '../libs/multer';

const router = Router();

router.route('/signin')
    .post( signin );

router.route('/signup')
    .post( imageUpload.single('image'), signup );

export default router;