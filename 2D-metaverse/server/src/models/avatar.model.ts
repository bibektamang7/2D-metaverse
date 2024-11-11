import mongoose, {Schema} from "mongoose";

const avatarSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    imageUrl: {
        type: String,
        required: true,
    },
}, { timestamps: true });


export const Avatar = mongoose.model("Avatar", avatarSchema);