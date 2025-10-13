import mongoose, { Document,Schema} from 'mongoose'

export interface IUser extends Document {
    userName:string;
    email:string;
    passwordHash:string;
}

const userSchema = new Schema<IUser>({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
});

export const User = mongoose.model<IUser>('User', userSchema);
