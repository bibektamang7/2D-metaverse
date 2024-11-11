import { SignInSchema, SignUpSchema, UpdateMetaDataSchema } from "../helpers/validation";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model";
import { Avatar } from "../models/avatar.model";
import { Request,Response } from "express";
import jwt from "jsonwebtoken";

const generateToken = (user: any) => {
    return jwt.sign({
        id: user._id,
        role: user.role,
    }, process.env.TOKEN_SECRET!, {expiresIn: process.env.TOKEN_EXPIRES})
}
const signUpUser = async (req: Request, res: Response) => {
    const parsedData = SignUpSchema.safeParse(req.body);

    if (!parsedData.success) {
        res.status(403).json({ message: "Validation Error" });
        return;
    }
    const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);
    try {
        const user = await User.create({
            username: parsedData.data.username,
            password: hashedPassword,
            role: parsedData.data.role,
        });
        
        res.status(200).json({ userId: user._id, message: "Register Successfully"});
    } catch (error) {
        res.status(400).json({ message: "User already exists" });            
    }

};

const signInUser = async (req: Request, res: Response) => {
    const parsedData = SignInSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(401).json({ message: "Validation Error" });
        return;
    }

    const createdUser = await User.findOne({
        username: parsedData.data.username,
    });
    if (!createdUser) {
        res.status(400).json({ message: "User not found" });
        return;         
    }
    const isPasswordCorrect = await bcrypt.compare(parsedData.data.password, createdUser.password);
    if (!isPasswordCorrect) {
        res.status(400).json({ message: "Incorrect Password" });
        return;
    }
    const token = generateToken(createdUser);
    if (!token) {
        res.status(500).json({ message: "Unable to generate token" });
        return;
    }

    res.status(200).json({ token, message:"user logged in successfully"});
    
};
// controller to update meta-data of user i.e avatarId

const updateMetaData = async (req: Request, res: Response) => {
    console.log(req.body);
    console.log("metadata");
    const parsedData = UpdateMetaDataSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(403).json({ message: "Validation Failed" });
        return;
    }
    const createdAvatar = await Avatar.findById(parsedData.data.avatarId);
    if (!createdAvatar) {
        console.log("User not found");
        res.status(400).json({ message: "Avatar not found" });
        return;
    };
    await User.findByIdAndUpdate(req.userId, {
        $set: {
            avatarId: createdAvatar._id,
        }
    });
    res.status(200).json({ message: "Metadata Updated" });
}

// better to move this controller
const getAvatars = async (req: Request, res: Response) => {
    const avatars = await Avatar.find();
    if (!avatars) {
        res.status(400).json({ message: "Avatar not available" });
        return;
    }

    res.status(200).json({ avatars });
}



export {
    signUpUser,
    signInUser,
    getAvatars,
    updateMetaData,
}