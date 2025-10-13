import mongoose, { Document,Schema} from 'mongoose'
import { IUser } from './types.js';

const userSchema = new Schema<IUser>({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
});

export const User = mongoose.model<IUser>('User', userSchema);
