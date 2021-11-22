const SessionListeners: iListener = {
    session: {
        connection: "connection",
        join_session: "join-session",
        disconnect: "disconnect",
    },
};
const MovementListeners: iListener = {
    session: SessionListeners.session,
    ball: {
        handler: "ball-handler",
    },
    audio: {
        handler: "audio-handler"
    }
};

const ChatListeners: iListener = {
    session: SessionListeners.session,
    chat: {
        new_message: "new-message",
    },
};
export { MovementListeners, SessionListeners, ChatListeners };
