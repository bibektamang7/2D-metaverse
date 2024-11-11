import {
  AddElementSchema,
  CreateSpaceSchema,
  DeleteElementInSpaceSchema,
} from "../helpers/validation";
import { Element } from "../models/element.model";
import { Map } from "../models/map.model";
import { Space, SpaceElement } from "../models/space.model";
import { Request, Response } from "express";
import { MapElement } from "../models/map.model";
import mongoose from "mongoose";

const createSpace = async (req: Request, res: Response) => {
  const parsedData = CreateSpaceSchema.safeParse(req.body);
  if (!parsedData.success) {
    console.log("Invalide space", parsedData);
    console.log(req.body);
    console.log(parsedData.error.issues);
    res.status(403).json({ message: "Validation Error" });
    return;
  }

  if (!parsedData.data.mapId) {
    const space = await Space.create({
      name: parsedData.data.name,
      width: parseInt(parsedData.data.dimensions.split("x")[0]),
      height: parseInt(parsedData.data.dimensions.split("x")[1]),
      creatorId: req.userId,
    });
    res.status(200).json({ spaceId: space._id });
    return;
  }
  const map = await Map.findById(parsedData.data.mapId).populate("mapElements");
  if (!map) {
    res.status(400).json({ message: "Map not found" });
    return;
  }
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Create Space first, so we can associate elements with it
    const space = await Space.create(
      [
        {
          name: parsedData.data.name,
          width: parseInt(parsedData.data.dimensions.split("x")[0]),
          height: parseInt(parsedData.data.dimensions.split("x")[1]),
          creatorId: req.userId,
          thumbnail: map.thumbnail,
        },
      ],
      { session }
    );
    // Now create SpaceElements and associate with the newly created Space
    const spaceElementsData = map.mapElements.map((element: MapElement) => ({
      elementId: element.elementId,
      spaceId: space[0]._id, // Associate element with the newly created space
      x: element.x,
      y: element.y,
    }));

    // Use bulkWrite to create all SpaceElements in one go
    const spaceElements = await SpaceElement.bulkWrite(
      spaceElementsData.map((data) => ({
        insertOne: {
          document: data,
        },
      })),
      { session }
    );

    // If you need to store the created space elements' ids in the space document (for example, in an 'elements' field), you can do so here:
    const spaceElementIds = spaceElements.insertedIds;

    // Update the space document with the newly created element IDs
    await Space.findByIdAndUpdate(
      space[0]._id,
      { elements: Object.values(spaceElementIds) }, // Collect the ids of inserted elements
      { session }
    );

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();
    res
      .status(200)
      .json({ message: "Space Created Successfully", spaceId: space[0]._id });
  } catch (error: any) {
    // Rollback the transaction if something goes wrong
    await session.abortTransaction();
    session.endSession();
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" }); // Re-throw the error to be handled by the caller
  }
};

const deleteSpace = async (req: Request, res: Response) => {
  const space = await Space.findById(req.params.spaceId);
  console.log("K sir");
  if (!space) {
    res.status(400).json({ message: "Space not found" });
    return;
  }
  if (space.creatorId.toString() !== req.userId) {
    res.status(403).json({ message: "Unauthorized, Unable to delete space" });
    return;
  }
  await Space.findByIdAndDelete(space._id);
  res.status(200).json({ message: "Space Deleted Successfully" });
};

const getExistingSpaces = async (req: Request, res: Response) => {
  const existedSpaces = await Space.find({
    creatorId: req.userId,
  });
  if (!existedSpaces) {
    res.status(400).json({ message: "No spaces available" });
    return;
  }
  res
    .status(200)
    .json({ spaces: existedSpaces, message: "Spaces fetched successfully" });
};

const getSpace = async (req: Request, res: Response) => {
  const existedSpace = await Space.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.params.spaceId),
      },
    },
    {
      $lookup: {
        from: "spaceelements",
        localField: "elements",
        foreignField: "_id",
        as: "elements",
        pipeline: [
          {
            $project: {
              _id: 1,
              elementId: 1,
              spaceId: 1,
              x: 1,
              y: 1,
            },
          },
        ],
      },
    },
  ]);
  if (existedSpace.length < 1) {
    res.status(400).json({ message: "Space not exist" });
    return;
  }
  res
    .status(200)
    .json({
      dimensions: `${existedSpace[0].width}x${existedSpace[0].height}`,
      _id: existedSpace[0]._id,
      elements: existedSpace[0].elements,
    });
};

const addElementInSpace = async (req: Request, res: Response) => {
  const parsedData = AddElementSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(403).json({ message: "Validation Error" });
    return;
  }
  const space = await Space.findById(parsedData.data.spaceId).select(
    "width height"
  );
  if (!space) {
    res.status(400).json({ message: "Space not found!!" });
    return;
  }
  if (
    req.body.x < 0 ||
    req.body.y < 0 ||
    space.width < req.body.x ||
    space.height < req.body.y
  ) {
    res.status(400).json({ message: "Cannot add element outside boundary" });
    return;
  }
  const spaceElement = await SpaceElement.create({
    elementId: parsedData.data.elementId,
    spaceId: parsedData.data.spaceId,
    x: parsedData.data.x,
    y: parsedData.data.y,
  });
  if (!spaceElement) {
    res.status(500).json({ message: "Couldn't Create Space Element" });
    return;
  }
  await Space.findByIdAndUpdate(parsedData.data.spaceId, {
    $push: {
      elements: spaceElement,
    },
  });

  res.status(200).json({ message: "Element Added successfully" });
};

const deleteElementFromSpace = async (req: Request, res: Response) => {
  const parsedData = DeleteElementInSpaceSchema.safeParse(req.body);

  if (!parsedData.success) {
    console.log("This is delete from space");
    console.log(req.body);
    console.log(parsedData.error.issues);
    res.status(401).json({ message: "Validation Error" });
    return;
  }

  const element = await SpaceElement.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(parsedData.data.elementId),
      },
    },
    {
      $lookup: {
        from: "spaces",
        localField: "spaceId",
        foreignField: "_id",
        as: "space",
        pipeline: [
          {
            $project: {
              elements: 0,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        space: { $first: "$space" },
      },
    },
  ]);
  if (element.length < 1) {
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }

  if (
    !element[0].space.creatorId ||
    element[0].space.creatorId.toString() !== req.userId.toString()
  ) {
    res
      .status(403)
      .json({ message: "Unauthorized, you cannot delete the element" });
    return;
  }
  const deletedElement = await SpaceElement.findByIdAndDelete(
    parsedData.data.elementId
  );

  await Space.findByIdAndUpdate(parsedData.data.spaceId, {
    $pull: {
      elements: deletedElement?._id,
    },
  });

  res.status(200).json({ message: "Deleted Element from the space" });
};

//TODO:This controller should not be here, move to appropriate file
const getAvailableElements = async (req: Request, res: Response) => {
  const elements = await Element.find();
  res.status(200).json({ elements, message: "Elements Fetched Successfully" });
};

export {
  getAvailableElements,
  deleteElementFromSpace,
  addElementInSpace,
  createSpace,
  deleteSpace,
  getExistingSpaces,
  getSpace,
};
