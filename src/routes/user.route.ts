import { Router } from 'express';
import { validateJWT } from '../middlewares/ValidateToken';
import { 
    followUser,
    unfollowUser,
    getUserContentInfo,
    updateProfile }
from '../controllers/user.controller';
import { imageUpload } from '../libs/multer';

const router = Router();

router.route('/content')
    .get( validateJWT, getUserContentInfo );

router.route('/info/:id')
    .get( validateJWT, getUserContentInfo )
    .put( validateJWT, imageUpload.single('image'), updateProfile );

router.route('/follow')
    .put( validateJWT, followUser );

router.route('/unfollow')
    .put( validateJWT, unfollowUser );


export default router;