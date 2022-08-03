import { Router } from 'express';
import { signin, signup, tokenRevalidate } from '../controllers/auth.controller';
import { validateJWT } from '../middlewares/ValidateToken';

const router = Router();

router.route('/signin')
    .post( signin );

router.route('/signup')
    .post( signup );

router.route('/renew')
    .post( validateJWT, tokenRevalidate )

export default router;