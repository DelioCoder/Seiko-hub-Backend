import { Document, ObjectId } from 'mongoose';

export interface User extends Document {
    
    _doc: any;
    id: ObjectId;
    name: string;
    lastname: string;
    username: string;
    photo: string;
    email: string;
    followers: [
        {
            followerId: ObjectId;
        }
    ];
    password: string;
    isAdmin: boolean;
    encrypPassword(password: string): Promise<string>;
    validatePassword(password: string): Promise<boolean>;

}