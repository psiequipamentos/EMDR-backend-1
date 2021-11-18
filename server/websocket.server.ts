import { Server as SocketServer } from "socket.io";
import { createServer, Server } from "http";
import * as dotenv from "dotenv";
import MovementWebSocketEvents from "../src/websocket/frontend/events/movement.websocket-events";
import WebSocket from "../src/websocket/websocket";
import ChatWebSocketEvents from "../src/websocket/chat/chat.websocket-events";

dotenv.config();

export default class WebsocketServer {
  private readonly port: string;
  private server: Server;
  private io: SocketServer;
  constructor() {
    this.port = process.env.WEBSOCKET_PORT;
    this.server = createServer();
    this.io = new SocketServer(this.server, {
      cors: {
        origin: "*",
      },
    });
  }

  run = () => {
    const web_socket = new WebSocket(this.io);
    web_socket.start().then((socket_session_id) => web_socket.listenEvents());
    this.server.listen(this.port, () =>
      console.log(
        `🤝 [websocket server]: WebSocket server running at :${this.port}`
      )
    );
  };
}
