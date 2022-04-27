import { Document, ObjectId } from 'mongoose';

export interface User extends Document {
    
    id: ObjectId;
    name: string;
    username: string;
    photo: string;
    email: string;
    password: string;
    isAdmin: boolean;
    encrypPassword(password: string): Promise<string>;
    validatePassword(password: string): Promise<boolean>;

}