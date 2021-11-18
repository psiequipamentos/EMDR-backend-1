import { Server as SocketServer, Socket } from "socket.io";
import SessionRepository from "../repository/session-repository";
import ChatWebSocketEvents from "./chat/chat.websocket-events";

import MovementWebSocketEvents from "./frontend/events/movement.websocket-events";
import { SessionListeners } from "./websocket.listeners-list";

export default class WebSocket {
    private io: SocketServer;
    private ws_listeners: iListener;
    private sessionRepository: SessionRepository;
    private socket_session_id: string;
    private socket: Socket;
    constructor(io: SocketServer) {
        this.io = io;
        this.ws_listeners = SessionListeners;
        this.sessionRepository = new SessionRepository();
    }

    start() {
        return new Promise((resolve, reject) => {
            this.io.on(
                this.ws_listeners.session.connection,
                (socket: Socket) => {
                    this.socket = socket;
                    const { id } = this.socket;
                    console.log(
                        `👾 [websocket]: User ${id} connected on Websocket Server.`
                    );
                    /**
                     * * Join Session
                     */
                    this.socket.on(
                        this.ws_listeners.session.join_session,
                        async ({ session_id, user }) => {
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
                                    await this.sessionRepository.update(
                                        session.id,
                                        {
                                            [`${user.type}_socket_id`]: id,
                                        }
                                    );
                                    console.log("Updated session.");
                                    this.socket_session_id = session.session_id;
                                    resolve(this.socket_session_id);
                                } catch (update_session_error) {
                                    console.error(update_session_error);
                                    reject(update_session_error);
                                    // TODO emit not updated session;
                                }
                                // * emit
                            } catch (search_session_error) {
                                console.error(search_session_error); // TODO emit not found session;
                            }
                        }
                    );
                    this.socket.on(this.ws_listeners.session.disconnect, () =>
                        console.log(
                            `🚪 [websocket]: User ${id} disconnected from Websocket Server.`
                        )
                    );
                }
            );
        });
    }

    listenEvents() {
        /**
         * * Chat Events Listeners
         */
        new ChatWebSocketEvents(
            this.io,
            this.socket,
            this.socket_session_id
        ).listenEvents();

        /**
         * * Movement Events Listeners
         */

        new MovementWebSocketEvents(
            this.io,
            this.socket,
            this.socket_session_id
        ).listenEvents();
    }
}
