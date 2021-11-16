declare interface iWebSocketUser {
    id: string;
    type: string; //* psychologist | patient
}
declare interface iWebsocketRoom {
    id: string;
    psychologist: iWebSocketUser;
    patient: iWebSocketUser;
}

declare interface iBallColor {
    color_name: string;
    hex_color: string;
}
