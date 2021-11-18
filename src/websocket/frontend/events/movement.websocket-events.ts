import { Server as SocketServer, Socket } from "socket.io";
import SessionRepository from "../../../repository/session-repository";
import { MovementListeners } from "../../websocket.listeners-list";

export default class MovementWebSocketEvents {
    private io: SocketServer;
    private sessionRepository: SessionRepository;
    private ws_listeners: iListener;
    private socket: Socket;
    private socket_session_id: string | boolean;
    constructor(
        io: SocketServer,
        socket: Socket,
        socket_session_id: string | boolean
    ) {
        this.io = io;
        this.ws_listeners = MovementListeners;
        this.socket = socket;
        this.sessionRepository = new SessionRepository();
        this.socket_session_id = socket_session_id;
    }
    listenEvents() {
        /**
         * * Ball Handler
         */
        this.socket.on(
            this.ws_listeners.ball.handler,
            async (action: iAction) => {
                try {
                    const session: any =
                        await this.sessionRepository.readOneBySessionId(
                            this.socket_session_id
                        );
                    if (!session) {
                        console.error("not found");
                        return false;
                    }
                    this.io
                        .to(session.paciente_socket_id)
                        .emit("ball-handler", action);
                } catch (search_session_error) {
                    console.error(search_session_error); // TODO emit not found session;
                }
            }
        );

        /**
         * * Audio Handler
         */
        this.socket.on(
            this.ws_listeners.audio.handler,
            async (action: iAction) => {
                try {
                    const session: any =
                        await this.sessionRepository.readOneBySessionId(
                            this.socket_session_id
                        );
                    if (!session) {
                        console.error("not found");
                        return false;
                    }
                    this.io
                        .to(session.paciente_socket_id)
                        .emit("audio-handler", action);
                } catch (search_session_error) {
                    console.error(search_session_error); // TODO emit not found session;
                }
            }
        );
    }
}
