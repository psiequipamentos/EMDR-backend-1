import { Server as SocketServer, Socket } from "socket.io";
import SessionRepository from "../../repository/session-repository";
import { ChatListeners } from "../websocket.listeners-list";

export default class ChatWebSocketEvents {
    private io: SocketServer;
    private sessionRepository: SessionRepository;
    private ws_listeners: iListener;
    private socket: Socket;
    private socket_session_id: string;
    constructor(io: SocketServer, socket: Socket, socket_session_id: string) {
        this.io = io;
        this.ws_listeners = ChatListeners;
        this.socket = socket;
        this.sessionRepository = new SessionRepository();
        this.socket_session_id = socket_session_id;
    }
    listenEvents() {
        const { id } = this.socket;
        /**
         * * Ball Handler
         */
        this.socket.on(
            this.ws_listeners.chat.new_message,
            async (action: iChatAction) => {
                console.log("here");
                try {
                    const session: any =
                        await this.sessionRepository.readOneBySessionId(
                            this.socket_session_id
                        );
                    const [_, recipient_id]: any = Object.entries(
                        session
                    ).filter(
                        ([key, value]) =>
                            value !== id && key.endsWith("_socket_id")
                    )[0];
                    console.log(recipient_id);
                    console.log(action);
                    this.io
                        .to(recipient_id)
                        .emit(this.ws_listeners.chat.new_message, action);
                } catch (search_session_error) {
                    console.error(search_session_error); // TODO emit not found session;
                }
            }
        );
    }
}
