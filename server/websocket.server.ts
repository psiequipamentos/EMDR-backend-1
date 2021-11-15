import { Server as SocketServer } from "socket.io";
import { createServer, Server } from "http";
import * as dotenv from "dotenv";
import MovementWebSocketEvents from "../src/websocket/frontend/events/movement.websocket-events";

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
    new MovementWebSocketEvents(this.io).listenEvents();
    this.server.listen(this.port, () =>
      console.log(
        `🤝 [websocket server]: WebSocket server running at :${this.port}`
      )
    );
  };
}
