import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express";


const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];
    console.log("this is admin middleware",token);
    if (!token) {
        res.status(403).json({message: "Unauthorized"})
        return;
    }
    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as { role: string, id: string };
        if (decodedToken.role !== 'Admin') {
            res.status(403).json({message: "Unauthorized"})
            return
        }
        req.userId = decodedToken.id;
        next();
    } catch (error) {
        res.status(403).json({message: "Unauthorized"})
        return
    }
}

export {
    adminMiddleware,
}