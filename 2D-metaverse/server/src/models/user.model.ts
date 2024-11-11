import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["Admin", "User"],
        default: "User",
    },
    avatarId: {
        type: Schema.Types.ObjectId,
        ref: "Avatar",
    }
}, { timestamps: true });


export const User = mongoose.model("User", userSchema);