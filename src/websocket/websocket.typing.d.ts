declare interface iWebSocketUser {
    id: string;
    type: string; //* psychologist | patient
}
declare interface iWebsocketRoom {
    id: string;
    psychologist: iWebSocketUser;
    patient: iWebSocketUser;
}

declare interface iAction {
    property: string;
    value: string;
}
