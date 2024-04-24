import {Server as SocketServer, Socket} from "socket.io";
import SessionRepository from "../repository/session-repository";
import ChatWebSocketEvents from "./chat/chat.websocket-events";

import MovementWebSocketEvents from "./frontend/events/movement.websocket-events";
import {SessionListeners} from "./websocket.listeners-list";

export default class WebSocket {
    private io: SocketServer;
    private ws_listeners: iListener;
    private sessionRepository: SessionRepository;
    private socket_session_id: string;
    private socket: Socket;
    public messages: any
    private connections: any

    constructor(io: SocketServer) {
        this.io = io;
        this.ws_listeners = SessionListeners;
        this.sessionRepository = new SessionRepository();
        this.connections = []
    }

    start() {
        this.messages = {}
        this.io.on(
            this.ws_listeners.session.connection,
            (socket: Socket) => {
                this.socket = socket;
                const {id} = this.socket;
                console.log(
                    `👾 [websocket]: User ${id} connected on Websocket Server.`
                );
                /**
                 * * Join Session
                 */
                this.socket.on(
                    this.ws_listeners.session.join_session,
                    async ({session_code, user}) => {
                        if (!session_code || !user) {
                            console.error("lacks information");
                            return false;
                        }

                        console.log(user)
                        try {
                            const session: any =
                                await this.sessionRepository.readOneBySessionCode(
                                    session_code
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
                                console.log(session.session_id)
                                this.socket_session_id = session_code;
                                this.listenEvents(session_code, this.messages)
                            } catch (update_session_error) {
                                console.error(update_session_error);

                                // TODO emit not updated session;
                            }
                            // * emit
                        } catch (search_session_error) {
                            console.error(search_session_error); // TODO emit not found session;
                        }
                    }
                );
                this.socket.on('user-joined', async ({codigo}) => {
                    const code = codigo.split('/')[3]
                    const pacienteOrPsicologo = codigo.split('/')[2]
                    if (!this.connections[code])
                        this.connections[code] = []

                    const session: any =
                        await this.sessionRepository.readOneBySessionCode(
                            code
                        );
                    if (!session) {
                        console.error("not found");
                        return false;
                    }
                    this.connections[code].push(id)

                    if (pacienteOrPsicologo === 'paciente') {
                        await this.sessionRepository.updateOneBySessionId(
                            code,
                            {
                                paciente_in: new Date(),
                            }
                        );
                    } else if (pacienteOrPsicologo === 'psicologo') {
                        await this.sessionRepository.updateOneBySessionId(
                            code,
                            {
                                psicologo_in: new Date(),
                            }
                        );
                    }

                    if (this.connections[code].length >= 2) {
                        console.log('start-cron')
                        this.io.to(session.psicologo_socket_id).emit('start-cron', {paciente: session.paciente.nome})
                        this.io.to(session.paciente_socket_id).emit('start-cron')
                    }
                })
                this.socket.on('end-call', async ({code}) => {
                    const session: any =
                        await this.sessionRepository.readOneBySessionCode(
                            code
                        );
                    await this.sessionRepository.updateOneBySessionId(
                        code,
                        {
                            session_out: new Date()
                        }
                    );
                    if (!session) {
                        console.error("not found");
                        return false;
                    }
                    this.io.to(session.psicologo_socket_id).emit('end-call')
                    this.io.to(session.paciente_socket_id).emit('end-call')
                })
                this.socket.on(this.ws_listeners.session.disconnect, () => {
                        this.messages = []
                        this.connections = {}
                        console.log(
                            `🚪 [websocket]: User ${id} disconnected from Websocket Server.`
                        )
                    }
                );
            }
        );

    }

    listenEvents(socket_session_id, messages) {
        /**
         * * Chat Events Listeners
         */
        new ChatWebSocketEvents(
            this.io,
            this.socket,
            socket_session_id,
            this.messages
        ).listenEvents();

        /**
         * * Movement Events Listeners
         */

        new MovementWebSocketEvents(
            this.io,
            this.socket,
            socket_session_id
        ).listenEvents();
    }
}
