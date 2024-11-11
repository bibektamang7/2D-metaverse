import dotenv from "dotenv"
import { connectDB } from "./db";
dotenv.config({
    path: './.env',
});

import app from "./app";

const port = process.env.PORT || 8000;
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Application is running on port ${port}`);
        
    })
}).catch(e => {
    console.log("Something went wrong on MONGODB connection", e);
});