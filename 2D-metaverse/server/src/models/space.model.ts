import mongoose, { Schema } from "mongoose";

export interface ISpaceElement{
  _id: mongoose.ObjectId,
  elementId: mongoose.ObjectId,
  spaceId: mongoose.ObjectId,
  x: number,
  y: number,
}
const spaceElementSchema: Schema<ISpaceElement> = new Schema({
  elementId: {
    type: Schema.Types.ObjectId,
    ref: "Element",
    required: true,
  },
  spaceId: {
    type: Schema.Types.ObjectId,
    ref: "Space",
    required: true,
  },
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
});

export interface ISpace{
  _id: mongoose.ObjectId,
  name: string,
  width: number,
  height: number,
  thumbnail: string,
  mapId: mongoose.ObjectId,
  creatorId: mongoose.ObjectId,
  elements: ISpaceElement[]
} 

const spaceSchema: Schema<ISpace> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    thumbnail: {
      type: String,
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    elements: [
      {
        type: Schema.Types.ObjectId,
        ref: "SpaceElement"
      },
    ],
  },
  { timestamps: true }
);

export const SpaceElement = mongoose.model("SpaceElement", spaceElementSchema);
export const Space = mongoose.model("Space", spaceSchema);
