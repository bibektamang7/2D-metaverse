import mongoose, {Schema} from "mongoose";

export interface IElement {
    _id: mongoose.ObjectId,
    width: number,
    height: number,
    imageUrl: string,
    static: boolean,
}

const elementSchema: Schema<IElement> = new Schema({
    width: {
        type: Number,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true
    },
    static: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

export const Element = mongoose.model("Element", elementSchema);