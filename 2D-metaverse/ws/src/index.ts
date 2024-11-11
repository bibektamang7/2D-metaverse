import { WebSocketServer } from "ws";
import { User } from "./User";
import dotenv from 'dotenv';

dotenv.config({
    path: ".env"
});

console.log(process.env.TOKEN_SECRET);
const wss = new WebSocketServer({ port: 8001 });



wss.on('connection', function connection(ws, req) {
    ws.on("error", console.error);
    const user = new User(ws);
    ws.on("close", () => {
        user.leaveRoom();
    })
});
