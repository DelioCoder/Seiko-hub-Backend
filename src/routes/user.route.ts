import { Router } from 'express';
import { validateJWT } from '../middlewares/ValidateToken';
import { 
    followUser,
    unfollowUser,
    getUserContentInfo,
    updateProfile, 
    updatePreferences}
from '../controllers/user.controller';
import { deleteUserFromDB } from '../controllers/user.controller';

const router = Router();

router.route('/:id')
    .delete( deleteUserFromDB );

router.route('/content/:id/:kindInfo')
    .get( getUserContentInfo );

router.route('/info/:id')
    .get( validateJWT, getUserContentInfo )
    .put( validateJWT, updateProfile );

router.route('/info/preferences/:id')
    .put( updatePreferences )

router.route('/follow')
    .put( validateJWT, followUser );

router.route('/unfollow')
    .put( validateJWT, unfollowUser );

export default router;