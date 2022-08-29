import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
// ROUTES PATH
import videoRoute from './routes/video.route';
import authRoute from './routes/auth.route';
import userRoute from './routes/user.route';
 
const app = express();

app.use(morgan('common'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// ROUTES
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/video', videoRoute);

export default app;