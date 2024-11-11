import { Request, Response } from "express";
import {
  CreateAvatarSchema,
  CreateElementSchema,
  CreateMapSchema,
  UpdateElementSchema,
} from "../helpers/validation";
import { Element } from "../models/element.model";
import { Avatar } from "../models/avatar.model";
import { Map, MapElement } from "../models/map.model";
import mongoose from "mongoose";

const createElement = async (req: Request, res: Response): Promise<void> => {
  const parsedData = CreateElementSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(403).json({ message: "Validation Error" });
    return;
  }
  const element = await Element.create({
    width: parsedData.data.width,
    height: parsedData.data.height,
    imageUrl: parsedData.data.imageUrl,
    static: parsedData.data.static,
  });
  if (!element) {
    res.status(400).json({ message: "Couldn't create element" });
    return;
  }
  res
    .status(200)
    .json({ id: element._id, message: "Element created Successfullt" });
};

const updateElement = async (req: Request, res: Response): Promise<void> => {
  const parsedData = UpdateElementSchema.safeParse(req.body);
  console.log(req.body)
  if (!parsedData.success) {
    res.status(403).json({ message: "Validation Error" });
    return;
  }

  //TODO:Cannot edit dimensions once created feature but can be change in editable
  console.log(req.params.elementId)
  const updatedElement = await Element.findByIdAndUpdate(
    req.params.elementId,
    {
      $set: {
        imageUrl: parsedData.data.imageUrl,
      },
    },
    {
      $new: true,
    }
  );
  if (!updatedElement) {
    res.status(400).json({ message: "Unable to update the element" });
    return;
  }

  res.status(200).json({ message: "Element Updated Successfully" });
};

const createAvatar = async (req: Request, res: Response): Promise<void> => {
  const parsedData = CreateAvatarSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(403).json({ message: "validation Error" });
    return;
  }

  const avatar = await Avatar.create({
    name: parsedData.data.name,
    imageUrl: parsedData.data.imageUrl,
  });
  if (!avatar) {
    res.status(400).json({ message: "Couldn't create avatar" });
    return;
  }

  res
    .status(200)
    .json({ message: "Created Avatar Successfully", avatarId: avatar._id });
};

const createMap = async (req: Request, res: Response): Promise<void> => {

  const parsedData = CreateMapSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(403).json({ message: "Validation Error" });
    return;
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const map = await Map.create(
      [
        {
          width: parseInt(parsedData.data.dimensions.split("x")[0]),
          height: parseInt(parsedData.data.dimensions.split("x")[1]),
          thumbnail: parsedData.data.thumbnail,
          name: parsedData.data.name,
        },
      ],
      { session }
    );

    const mapElements = await MapElement.bulkWrite(
      parsedData.data.defaultElements.map((element) => ({
        insertOne: {
          document: {
            mapId: map[0]._id,
            elementId: element.elementId,
            x: element.x,
            y: element.y,
          },
        },
      })),
      { session }
    );
    const mapElementIds = mapElements.insertedIds;

    await Map.findByIdAndUpdate(
      map[0]._id,
      {
        mapElements: Object.values(mapElementIds),
      },
      { session }
    );

    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ message: "Map created successfully", id: map[0]._id });
  } catch (error: any) {
    console.log(error.message);
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ message: "Unable to create Map" });
  }

};

export { createElement, createAvatar, createMap, updateElement };
