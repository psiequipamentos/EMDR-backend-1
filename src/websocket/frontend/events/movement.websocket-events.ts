import { Server as SocketServer } from "socket.io";
import Sessions from "../../../models/Sessions";
import SessionRepository from "../../../repository/session-repository";
import Ball from "../ball";
import Movements from "../movements";
import { colors as ballColors } from "../config/ball.config";

export default class MovementWebSocketEvents {
    private io: SocketServer;
    private movements: Movements;
    private rooms: Sessions[];
    private sessionRepository: SessionRepository;
    constructor(io: SocketServer) {
        this.io = io;
        this.movements = new Movements();
        this.rooms = [];
        this.sessionRepository = new SessionRepository();
    }
    listenEvents() {
        this.io.on("connection", (socket: any) => {
            const { id } = socket;
            console.log(
                `👾 [websocket]: User ${id} connected on Websocket Server.`
            );
            /**
             * * Join Session
             */
            socket.on("join-session", async ({ session_id, user }) => {
                try {
                    const session: any =
                        await this.sessionRepository.readOneBySessionId(
                            session_id
                        );
                    if (!session) return false;
                    try {
                        await this.sessionRepository.update(session.id, {
                            [`${user.type}_socket_id`]: id,
                        });
                        console.log("Updated session.");
                        socket.join(session.id);
                    } catch (update_session_error) {
                        console.error(update_session_error);
                        // TODO emit not updated session;
                    }
                    // * emit
                } catch (search_session_error) {
                    console.error(search_session_error); // TODO emit not found session;
                }
            });
            /**
             * * Visibility Handler
             */
            socket.on("Ball-Visibility", ({ room, visibility }) => {
                socket.to(room).emit("Ball-visibility", { visibility });
            });
            socket.on("disconnect", () =>
                console.log(
                    `🚪 [websocket]: User ${id} disconnected from Websocket Server.`
                )
            );
        });
    }
}
