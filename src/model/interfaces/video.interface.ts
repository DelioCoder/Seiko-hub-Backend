import { Document, ObjectId } from 'mongoose';

export interface Video extends Document {

    id: ObjectId;
    title: string;
    videoPath: string;
    description: string;
    categories: string[];
    comments: Comment[];
    likes: Like[];
    user: ObjectId;

}

interface Comment {
    body: string;
    user: string | String | ObjectId;
    createdAt: string;
}

interface Like {
    username: string;
    createdAt: string;
}