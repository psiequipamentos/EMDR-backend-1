import { Server as SocketServer, Socket } from "socket.io";
import Sessions from "../../../models/Sessions";
import SessionRepository from "../../../repository/session.repository";
import Movements from "../movements";

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
        this.io.on("connection", (socket: Socket) => {
            const { id } = socket;
            let socket_session_id: string = "";
            console.log(
                `👾 [websocket]: User ${id} connected on Websocket Server.`
            );
            /**
             * * Join Session
             */
            socket.on("join-session", async ({ session_id, user }) => {
                if (!session_id || !user) {
                    console.error("lacks information");
                    return false;
                }
                try {
                    const session: any =
                        await this.sessionRepository.readOneBySessionId(
                            session_id
                        );
                    if (!session) {
                        console.error("not found");
                        return false;
                    }
                    try {
                        await this.sessionRepository.update(session.id, {
                            [`${user.type}_socket_id`]: id,
                        });
                        console.log("Updated session.");
                        socket_session_id = session.session_id;
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
             * * Ball Handler
             */
            socket.on("ball-handler", async (action: iAction) => {
                try {
                    const session: any =
                        await this.sessionRepository.readOneBySessionId(
                            socket_session_id
                        );
                    if (!session) {
                        console.error("not found");
                        return false;
                    }
                    this.io
                        .to(session.patient_socket_id)
                        .emit("ball-handler", action);
                } catch (search_session_error) {
                    console.error(search_session_error); // TODO emit not found session;
                }
            });
            socket.on("disconnect", () =>
                console.log(
                    `🚪 [websocket]: User ${id} disconnected from Websocket Server.`
                )
            );
        });
    }
}
