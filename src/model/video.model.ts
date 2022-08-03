import { Schema, model } from 'mongoose';
import { Video } from './interfaces/video.interface';

const videoSchema = new Schema({

    title: { type: String, required: true },
    videoPath: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    views: { type: Number, default: 0 },
    comments: [
        {
            body: String,
            user: { type: Schema.Types.ObjectId },
            createdAt: String,
            
        }
    ],
    likes: [
        {
            username: String,
            createdAt: String
        }
    ],
    user: { type: Schema.Types.ObjectId }

},{
    timestamps: true
});

export default model<Video>('Video', videoSchema);