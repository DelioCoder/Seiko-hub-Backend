import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from './interfaces/user.interface';

const userSchema = new Schema({

    name: String,
    lastname: String,
    username: String,
    photo: String,
    email: String,
    password: String,
    isAdmin: { type: Boolean, default: false },
    followers: [
        {
            _id: false,
            followerId: { type: Schema.Types.ObjectId }
        }
    ],
    videoCategories: [
        {
            type: String
        }
    ]

},{
    timestamps: true
});

userSchema.methods.encrypPassword = async function (password: string): Promise<string> {
    
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hashSync(password, salt);

}

userSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

export default model<User>('User', userSchema);