import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';

// ROUTES PATH
import videoRoute from './routes/video.route';
import userRoute from './routes/user.route';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static(path.resolve('uploads')));

// ROUTES
app.use('/api/user', userRoute);
app.use('/api/videoUpload', videoRoute);

app.set('port', process.env.PORT);

export default app;