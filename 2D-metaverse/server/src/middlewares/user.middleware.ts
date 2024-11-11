import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'


const userMiddleware = async (req:Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        res.status(403).json({ message: "unauthorized access" });
        return;
    }
    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as { role: string, id: string };
        
        req.userId = decodedToken.id;
        next();
    } catch (error: any) {
        console.log(error.message);
        res.status(401).json({ message: "unauthorized" });
        return;
    }
}


export {
    userMiddleware
}