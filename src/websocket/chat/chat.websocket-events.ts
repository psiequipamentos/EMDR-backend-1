import { Server as SocketServer, Socket } from "socket.io";
import SessionRepository from "../../repository/session-repository";
import { ChatListeners } from "../websocket.listeners-list";

export default class ChatWebSocketEvents {
    private io: SocketServer;
    private sessionRepository: SessionRepository;
    private ws_listeners: iListener;
    private socket: Socket;
    private socket_session_id: string;
    private messages: any;
    constructor(io: SocketServer, socket: Socket, socket_session_id: string, messages: any) {
        this.io = io;
        this.ws_listeners = ChatListeners;
        this.socket = socket;
        this.sessionRepository = new SessionRepository();
        this.socket_session_id = socket_session_id;
        this.messages = messages
    }
    listenEvents() {
        const { id } = this.socket;
        /**
         * * Chat Handler
         */
        console.log(this.ws_listeners.chat.new_message);

        this.socket.on(
            this.ws_listeners.chat.new_message,
            async (action: any) => {
                if(this.socket_session_id){
                    this.messages.push(action);
                    
                    let session:any
                    try {
                    session =
                        await this.sessionRepository.readOneBySessionCode(
                            this.socket_session_id
                        );
                        const [user_type, recipient_id]: any = Object.entries(
                            session
                        ).filter(
                            ([key, value]) =>
                                value !== id && key.endsWith("_socket_id")
                        )[0];
                        let user_category = user_type.split('_')[0]

                        if(user_category == 'paciente'){
                            user_category = 'psicologo'
                        }else{
                            user_category = 'paciente'
                        }
                        action.message['nome'] = user_category
                        console.log(recipient_id);
                        console.log(action);
                        this.io
                            .to(recipient_id)
                            .emit(this.ws_listeners.chat.new_message, action);
                } catch (search_session_error) {
                    console.log(search_session_error); // TODO emit not found session;
                    return false
                }
             
            }else{
                console.log('not setted')
            }
        }
        );

        this.socket.on(this.ws_listeners.chat.update_messages,() => {
            console.log(this.messages)
            this.io.to(id).emit(this.ws_listeners.chat.update_messages,this.messages)
        })
        
    }
}
