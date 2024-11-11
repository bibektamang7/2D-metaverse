import { WebSocket } from "ws";
import { User } from "./User";

class SocketManager {
  public rooms: Map<string, User[]>;
  static instance: SocketManager;
  constructor() {
    this.rooms = new Map();
  }
  static getInstance() {
    if (SocketManager.instance) {
      return SocketManager.instance;
    }
    SocketManager.instance = new SocketManager();
    return SocketManager.instance;
  }
  addUser(user: User, roomId: string) {
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, [user]);
      return;
    }
    this.rooms.set(roomId, [...(this.rooms.get(roomId) || []), user]);
  }
  removeUser(user: User, roomId: string) {
    if (!this.rooms.has(roomId)) {
      return;
    }

    const room = this.rooms.get(roomId) || [];
    const remainingUsers = room.filter((u: User): boolean => u.id !== user.id);
    this.rooms.set(roomId, remainingUsers);
    if (this.rooms.get(roomId)?.length === 0) {
      this.rooms.delete(roomId);
    }
  }
  broadcast(roomId: string, message: string, user: User) {
    if (!this.rooms.has(roomId)) {
      return;
    }
    const users = this.rooms.get(roomId);
    users?.forEach((u) => {
      if (u.id !== user.id) {
        u.ws.send(message);
      }
    });
  }
}

export const socketManager = SocketManager.getInstance();
