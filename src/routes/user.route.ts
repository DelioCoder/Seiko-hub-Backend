import { Router } from 'express';
import { validateJWT } from '../middlewares/ValidateToken';
import { 
    followUser,
    unfollowUser,
    getUserInfo,
    updateProfile }
from '../controllers/user.controller';
import { imageUpload } from '../libs/multer';

const router = Router();

router.route('/info')
    .get( validateJWT, getUserInfo );

router.route('/info/:id')
    .put( validateJWT, imageUpload.single('image'), updateProfile );

router.route('/follow')
    .put( validateJWT, followUser );

router.route('/unfollow')
    .put( validateJWT, unfollowUser );


export default router;