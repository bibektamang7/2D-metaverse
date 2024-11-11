import { WebSocket } from "ws";
import { socketManager } from "./SocketManager";
import jwt from "jsonwebtoken";

function getRandomId(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export class User {
  public id: string;
  public userId?: string;
  private spaceId?: string;
  private x?: number;
  private y?: number;
  public ws: WebSocket;
  constructor(ws: WebSocket) {
    this.id = getRandomId(15);
    this.ws = ws;
    this.x = 0;
    this.y = 0;
    this.handleEvents();
  }
  handleEvents() {
    this.ws.on("message", async (event) => {
      const message = JSON.parse(event.toString());
      switch (message.type) {
        case "join":
          const spaceId = message.payload.spaceId;
          const token = message.payload.token;
          const userId = message.payload.userId;
          if (!userId) {
            this.ws.close();
            return;
          }
          this.userId = userId;
          const response = await fetch(
            `http://localhost:8000/api/v1/spaces/space/${spaceId}`,
            {
              method: "GET",
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          const res = await response.json();
          if (!res) {
            this.ws.close();
            return;
          }
          this.spaceId = spaceId;
          socketManager.addUser(this, spaceId);
          const dimensions = res.dimensions.split("x");
          this.x = Math.floor(Math.random() * dimensions[0]);
          this.y = Math.floor(Math.random() * dimensions[1]);
          this.send(
            JSON.stringify({
              type: "space-joined",
              payload: {
                spawn: {
                  x: this.x,
                  y: this.y,
                },
                users: socketManager.rooms
                  .get(spaceId)
                  ?.filter((u) => u.id !== this.id),
              },
            })
          );
          socketManager.broadcast(
            spaceId,
            JSON.stringify({
              type: "user-joined",
              payload: {
                userId: this.userId,
                x: this.x,
                y: this.y,
              },
            }),
            this
          );
          break;
        case "move":
          console.log("aba ta move pani test ");
          const moveX = message.payload.x;
          const moveY = message.payload.y;
          const xDisplacement = Math.abs(this.x! - moveX);
          const yDisplacement = Math.abs(this.y! - moveY);
          if (
            (xDisplacement == 1 && yDisplacement == 0) ||
            (xDisplacement == 0 && yDisplacement == 1)
          ) {
            this.x = moveX;
            this.y = moveY;
            socketManager.broadcast(
              this.spaceId!,
              JSON.stringify({
                type: "movement",
                payload: {
                  x: this.x,
                  y: this.y,
                },
              }),
              this
            );
            return;
          }

          this.ws.send(
            JSON.stringify({
              type: "movement-rejected",
              payload: {
                x: this.x,
                y: this.y,
              },
            })
          );
          break;
      }
    });
  }
  send(message: string) {
    this.ws.send(message);
  }
  leaveRoom() {
    socketManager.broadcast(
      this.spaceId!,
      JSON.stringify({
        type: "user-left",
        payload: {
          userId: this.userId,
        },
      }),
      this
    );
    socketManager.removeUser(this, this.spaceId!);
  }
}
