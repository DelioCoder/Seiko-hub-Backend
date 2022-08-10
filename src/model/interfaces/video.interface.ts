import { Document, ObjectId } from 'mongoose';
import { User } from './user.interface';

export interface Video extends Document {
    _doc : any;
    id: ObjectId;
    title: string;
    videoPath: string;
    description: string;
    category: string;
    views: number;
    comments: Comment[];
    likes: Like[];
    user: ObjectId | User;

}

interface Comment {
    id      : string | String | ObjectId;
    body    : string;
    user    : string | String | ObjectId;
    createdAt: string;
}

interface Like {
    username: string;
    createdAt: string;
}